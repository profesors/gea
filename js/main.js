var canvas, svg, panelI, input, output;
var arrTokens = [];						// Tokens in the board
var arrCommands = [], iCommands = 0;	// Commands sended. Array and index to ArrowUp and ArrowDown recover
var timerUpdates;						// Timer to check each second for updates from the server
var arrActions = [], localLastActionId=0, arrRq = [];	// All actions of the game {ts, action}
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
	case 13:
		sendCommand(input.value);
		arrCommands.push(input.value);
		iCommands = arrCommands.length;	// Index of commands for historial
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
	setOpacityTagNames(opacity);
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
		setOpacityTagNames(0);
		iCommands = arrCommands.length;
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
		console.log(panel.style.display);
		if (panel.style.display != 'block'){
			panel.style.display = 'block';
			updateActionsPanel(board.id);
		} else {
			panel.style.display = 'none';
		}
		break
	case 78:	// n	Muestra los nombres
		setOpacityTagNames(1-getOpacityTagNames());
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
		setOpacityTagNames(1-opacity);
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

// La función más importante. El LOOP del juego
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
			var arrLastAction = rq.responseText.split(" ");
			// lastActionId is the last action recorded in the server
			board.lastActionId = parseInt(arrLastAction[0]);	
			var bg_ts = parseInt(arrLastAction[1]);
			if (board.bg_ts < bg_ts){
				// Update BG
				const tsNow = new Date().getTime();
				canvas.style.backgroundImage = "url('img/bg/"+board.bg+"?cache="+tsNow+"')";
				board.bg_ts = bg_ts;
				console.log("UPDATE BG:"+canvas.style.backgroundImage);
			}
			//console.log("l:"+localLastActionId+" b:"+board.lastActionId);			
			if (localLastActionId < board.lastActionId){	// Update tokens
				getTokens(board.id);
				//localLastActionId = board.lastActionId;
				if (panelI.style.display == 'block')	updateActionsPanel(board.id);
			}
			// Remove all tokens and update all of them
			if (localLastActionId > board.lastActionId){	
				removeAllLoadedTokens();	
				localLastActionId = 0;
			}
		}
	}
}

// *********** Movement Clic *********************

function movementClick(event){
	const x = (isNaN(event.clientX)?event.touches[0].screenX:event.clientX) + window.pageXOffset;	// En el tablero
	const y = (isNaN(event.clientY)?event.touches[0].screenY:event.clientY) + window.pageYOffset;
	const tilex = Math.floor((x-board.offsetx)/board.tilew)+1;
	const tiley = Math.floor((y-board.offsety)/board.tileh)+1;
	if (movement.token == null){	// Select token (first click)
		movement.token = getTokenByTile(tilex, tiley);
		if (movement.token!=null) {
			movement.token.tagName.style.opacity = 1;
		}
	} else {	// Second click
		var destToken = getTokenByTile(tilex,tiley);
		if (destToken==null){	// Destination is empty, you can move
			sendCommand("@"+movement.token.name+" p"+tilex+","+tiley);
			drawLineDisappears(movement.token,tilex, tiley);
			movement.token.tagName.style.opacity = 0;
			movement.token = null;
		} else {	// There is a token in de destination cell. Run guidelines
			// If the token is enabled
			if (document.getElementById("b"+movement.token.name)){	// It has b control panel (=portrait)
				if (document.getElementById("b"+movement.token.name).style.opacity!="0.3"){
					runGuidelines(movement.token, tilex, tiley, true);
				}
			} else {	// It is a monster
					runGuidelines(movement.token, tilex, tiley, true);
			}
			movement.token.tagName.style.opacity = 0;
			movement.token = null;
		}
	}
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

window.addEventListener("load", function() {
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
	//document.addEventListener("mousedown", function(event) {mouseDown(event)});
	//document.addEventListener("mouseup", function(event) {mouseUp(event)});
	//document.addEventListener("mousemove", function (event) {mouseMove(event)});
	
	document.addEventListener("touchstart", function (event) {eventTouch(event)});	// Show coordinates
	//document.addEventListener("touchstart", function (event) {movementClick(event)},hasQuiet() ? {passive: false} : false);

	//document.addEventListener("touchmove", function (event) {touchMove(event)},hasQuiet() ? {passive: false} : false);
	//document.addEventListener("touchend", function (event) {touchUp(event)},hasQuiet() ? {passive: false} : false);

	input.focus();
	input.value = "";
	getBoard(4);	/* Number of board */
	timerUpdates = setInterval(checkUpdates,1000);
});

window.addEventListener("resize", function() {
	MAXX = window.innerWidth;
	MAXY = window.innerHeight;
	//canvas.style.width = MAXX+"px";
	//canvas.style.height = MAXY+"px";
	panelI.style.height = MAXY+"px";
	output.style.height = MAXY+"px";
});

