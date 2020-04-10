var canvas, svg, panelI, input, output;
var arrTokens = [];						// Tokens in the board
var arrCommands = [], iCommands = 0;	// Commands sended. Array and index to ArrowUp and ArrowDown recover
var timerUpdates;						// Timer to check each second for updates from the server
var arrActions = [], localLastActionId=0, arrRq = [];	// All actions of the game {ts, action}
var remoteLastAction;
var board;	// Info about the board {name, tilew, tileh, ntilesw, ntilesh, bg, drawGridi, lastActionId}
var touch = {
	ts: 0,
	ts2: 0,
	x: 0,
	y: 0
}
var movement = {
	pixel_x0: -1,
	pixel_y0: -1,
	pixel_x1: -1,
	pixel_y1: -1,
	token: null,
	toTileX: 0,
	toTileY: 0
}

function inputKeyPress_inputBox(event){
	//console.log(event.keyCode);
	switch (event.keyCode){
	case 13:	// Enter
		sendCommand(input.value);
		arrCommands.push(input.value);
		iCommands = arrCommands.length;	// Index of commands for historial
		// If sent command to remove token
		if (reRemoveToken.test(input.value))	{
			var arrInput = reTokenName.exec(input.value);
			removeToken(arrInput[1]);
		}
		input.value="";	// Empty the input
		setOpacityCoordinates(0);
		input.style.display = document.getElementById("input_hidden").style.display;
		input.blur();
		break;
	case 38:	// Arrow UP
		iCommands--;
		if (iCommands>=0){
			input.value = arrCommands[iCommands];
		} else {
			iCommands = 0;
		}
		break;
	case 40:	// DOWN arrow
		iCommands++;
		if (iCommands<arrCommands.length){
			input.value = arrCommands[iCommands];
		} else {
			iCommands = arrCommands.length;
			input.value = "";
		}
		break;
	}
	var opacity = 0, name = '';
	if (input.value.includes('@')){
		opacity = 1;
		if (input.value.includes('#')){
			var arrM = input.value.split('@');
			if (arrM.length>0) {
				var name = arrM[1];
			}
		}
	}
	setOpacityCoordinates(opacity);
	setOpacityDivNames(opacity);
	event.stopPropagation();
}

// Key pressed out of the input box
function inputKeyPress_allDocument(event){
	//console.log("DOCUMENT KeyCode "+event.keyCode);
	var input = document.getElementById("stdInput");
	var bShowInput = false;
	switch(event.keyCode){
	case 27:	// ESC
		input.value = "";
		input.style.display = document.getElementById("input_hidden").style.display;
		setOpacityCoordinates(0);
		setOpacityDivNames(0);
		iCommands = arrCommands.length;
		movement.token = null;
		break;
	case 32:	// Space
			bShowInput = true;
			//input.value="";
			event.stopPropagation();
		break;
	case 48:	// =
		bShowInput = true;
		break;
	case 50:	// @ arroba
		//input.value = "@";
		//bShowInput = true;
		break;
	case 51:	// #
		bShowInput = true;
		break;
	case 67:	// c Coordenadas
		setOpacityCoordinates(1-getOpacityCoordinates());
		break;
	case 72:	// h
		const panel = document.getElementById("panelI");
		if (panel.style.display != 'block'){
			panel.style.display = 'block';
			updateActionsPanel(board.id);
		} else {
			panel.style.display = 'none';
		}
		break
	case 78:	// n	Muestra los nombres
		setOpacityDivNames(1-getOpacityDivNames());
		break;
	case 190:	// :
		bShowInput = true;
		break;
	}
	if (bShowInput){
		input.style.display = "block";
		input.focus();
	}
}

function eventTouch(event){
	touch.x = event.touches[0].clientX;
	touch.y = event.touches[0].clientY;
	if ((Math.abs(Date.now() - touch.ts) < 250) && (Math.abs(touch.ts - touch.ts2) < 250))	{
		//showInputBox(event.touches[0].clientX, event.touches[0].clientY);
		//showInputBox();
		//alert((Date.now() - touch.ts)+"     "+(touch.ts-touch.ts2));
		var opacity = getOpacityCoordinates();
		setOpacityCoordinates(1-opacity);
		setOpacityDivNames(1-opacity);
	} else {
		//alert(Date.now()+"         "+touch.ts+"        "+touch.ts2);
	}
	touch.ts2 = touch.ts;
	touch.ts = Date.now();
}

function showInputBox(){
	var input = document.getElementById("stdInput");
	input.style.display = "block";
	input.focus();

}

// Most important function. The LOOP
function checkUpdates(){
	// Save current scroll
	const scrollTop = window.pageYOffset;
	const scrollLeft = window.pageXOffset;
	Cookies.set("scrollTop", scrollTop, 1);
	Cookies.set("scrollLeft", scrollLeft, 1);

	// Get Last Action ID
	var rq = new XMLHttpRequest();
	rq.open("GET", "rq/getLastActionId.php?idBoard="+board.id);
	rq.send();
	rq.onreadystatechange = function () {
		if (rq.readyState == XMLHttpRequest.DONE && rq.status == 200){
			var s = rq.responseText;
			remoteLastAction = JSON.parse(s);
			/*
			if (board.lastAction.bgTs < currentLastAction.bgTs){	// Update BG
				const tsNow = (new Date()).getTime();
				canvas.style.backgroundImage = "url('img/bg/"+board.bg+"?cache="+tsNow+"')";
				board.lastAction.bgTs = currentLastAction.bgTs;
			}*/

			if (board.lastActionId < remoteLastAction.id){	// Update tokens
				getTokens(board.id, board.lastActionId);
				if (panelI.style.display == 'block')	updateActionsPanel(board.id);
			}
			if (board.lastActionId > remoteLastAction.id){	// Remove all tokens and update all of them
				removeAllLoadedTokens();	
				board.lastActionId = 0;
			}
		}
	}
}

// *********** Movement Clic *********************

function movementClick(event){
	const x = (isNaN(event.clientX)?event.touches[0].screenX:event.clientX) + window.pageXOffset;
	const y = (isNaN(event.clientY)?event.touches[0].screenY:event.clientY) + window.pageYOffset;
	const tilex = Math.floor((x-board.offsetx)/board.tilew)+1;
	const tiley = Math.floor((y-board.offsety)/board.tileh)+1;
	var divInfoCharacter = document.getElementById("info_character");
	if (divInfoCharacter.style.display != "block"){
	if (movement.token == null){	// Select token (first click)
		movement.token = getTokenByTile(tilex, tiley);
		if (movement.token!=null) {
			movement.opacityDivName = movement.token.divName.style.opacity;
			movement.token.divName.style.opacity = 1;
			movement.token.divName.style.color = "white";
		}
	} else {	// Second click
		movement.token.divName.style.color = "yellow";
		var destToken = getTokenByTile(tilex,tiley);
		if (destToken==null){	// Destination is empty, you can move
			sendCommand("@"+movement.token.name+" p"+tilex+","+tiley);
		} else {	// There is a token in de destination cell. Run guidelines
			if (destToken.name != movement.token.name && isEnabled(movement.token)){
				var d = distanceFromTokenToToken(movement.token, getTokenByTile(tilex, tiley));
				var target = getTokenByTile(d.p2.x, d.p2.y);
				if (Math.floor(d.distance)<=movement.token.w){
					sendCommand(encodeURI("@"+movement.token.name+" "+movement.token.guidelines[1]+" t"+target.name));
				} else {
					sendCommand(encodeURI("@"+movement.token.name+" "+movement.token.guidelines[2]+" t"+target.name));
				}
			}
		}
		movement.token.divName.style.color="yellow";
		movement.token.divName.style.opacity = movement.opacityDivName;
		movement.token = null;
	}
	}	// close: if (divInfoCharacter.display != block)
}

function hasQuiet() {
  var cold = false,
  hike = function() {};

  try {
  var aid = Object.defineProperty({}, 'passive', {
  get() {cold = true}
  });
  window.addEventListener('test', hike, aid);
  window.removeEventListener('test', hike, aid);
  } catch (e) {}

  return cold;
}

window.addEventListener("resize", function() {
	MAXX = window.innerWidth;
	MAXY = window.innerHeight;
	if (panelI != undefined)	panelI.style.height = MAXY+"px";
	if (output != undefined)	output.style.height = MAXY+"px";
});

window.addEventListener("DOMContentLoaded", function() {
	MAXX = window.innerWidth;
	MAXY = window.innerHeight;
	canvas = document.getElementById("canvas");
	panelI = document.getElementById("panelI");
	input = document.getElementById("stdInput");
	output = document.getElementById("stdOutput");
	output.style.height = MAXY+"px";
	input.addEventListener("keyup", function (event) {inputKeyPress_inputBox(event);});
	document.addEventListener("keydown", function (event) {inputKeyPress_allDocument(event);});
	document.addEventListener("click", function (event) {movementClick(event);});
	document.addEventListener("touchstart", function (event) {eventTouch(event)});	// Show coordinates

	input.focus();
	input.value = "";
	main();
});

async function main(){
	//document.getElementById("body").mozRequestFullScreen();

	getBoard(8);	/* Number of board */
	while(board==undefined)	{
		await sleep(T_PRECISION);
	}
	drawCellCoordinates();
	if (remoteLastAction != undefined){
		board.lastActionId = remoteLastAction.id;
	}
	timerUpdates = setInterval(checkUpdates,1000);

	// Go Full screen
    document.getElementById("canvas").addEventListener("click", function(e){
		if (!canvas.fullScreen){
			getFullscreen(document.documentElement);
			canvas.fullScreen = true;
		}
    },false);

}


function getFullscreen(element){
  if(element.requestFullscreen) {
	  element.requestFullscreen();
	} else if(element.mozRequestFullScreen) {
	  element.mozRequestFullScreen();
	} else if(element.webkitRequestFullscreen) {
	  element.webkitRequestFullscreen();
	} else if(element.msRequestFullscreen) {
	  element.msRequestFullscreen();
	}
}
