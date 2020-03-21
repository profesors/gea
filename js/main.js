var canvas, svg, panel1, input, output;
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
	case 38:	// Arrow UP
		iCommands--;
		if (iCommands>=0){
			input.value = arrCommands[iCommands];
		} else {
			iCommands = 0;
		}
		bShowInput = true;
		break;
	case 40:	// DOWN arrow
		iCommands++;
		if (iCommands<arrCommands.length){
			input.value = arrCommands[iCommands];
		} else {
			iCommands = arrCommands.length;
			input.value = "";
		}
		bShowInput = true;
		break;
	case 48:	// =
		bShowInput = true;
		break;
	case 50:	// @
		bShowInput = true;
		break;
	case 51:	// #
		bShowInput = true;
		break;
	case 72:	// h
		const panel = document.getElementById("panel1");
		console.log(panel.style.display);
		if (panel.style.display != 'block'){
			panel.style.display = 'block';
			updateActionsPanel(board.id);
		} else {
			panel.style.display = 'none';
		}
		break
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
				if (panel1.style.display == 'block')	updateActionsPanel(board.id);
			}
			// Remove all tokens and update all of them
			if (localLastActionId > board.lastActionId){	
				removeAllLoadedTokens();	
				localLastActionId = 0;
			}
		}
	}
}

// ************* PHASE 1 ****************

function movementClick(event){
	//event.preventDefault();
    //event.stopImmediatePropagation();
	const x = (isNaN(event.clientX)?event.touches[0].screenX:event.clientX) + window.pageXOffset;	// En el tablero
	const y = (isNaN(event.clientY)?event.touches[0].screenY:event.clientY) + window.pageYOffset;
	if (movement.token == null){
		movementSelectToken(x, y, false);
	} else {
		movementMoveToken(x, y, false);
		movement.token = null;
	}
}

// Generic, both for touch and mouse
function movementSelectToken(x, y, bLine){
	//movement.pixel_x0 = movement.pixel_x1 = x;
	//movement.pixel_y0 = movement.pixel_y1 = y;
	// Tiles selected
	const tilex = Math.floor((x-board.offsetx)/board.tilew)+1;
	const tiley = Math.floor((y-board.offsety)/board.tileh)+1;
	// Select Token
	movement.token = null;
	for (var i=0; i<arrTokens.length; i++){
		const token = arrTokens[i];
		const w = parseInt(token.w);
		const h = parseInt(token.h);
		token.x = parseInt(token.x);
		token.y = parseInt(token.y);
		//console.log(tilex+">="+token.x+" && "+tilex+" <= "+parseInt(token.x+w-1)+" && "+tiley+" >= "+token.y+" && "+tiley+" <= "+parseInt(token.y+h-1));
		if (tilex >= token.x && tilex <= parseInt(token.x+w-1) && tiley >=token.y && tiley <= parseInt(token.y+h-1)){
			if (bLine){
				addSvgLine("line_movement", movement.pixel_x0, movement.pixel_y0, movement.pixel_x1, movement.pixel_y1, "red", 4);
			}
			movement.token = token;
			token.tagName.style.opacity = 1;	// BORRAR
			//console.log("SELECTED "+token.name+" from "+tilex+" "+tiley);
			break;
		}
	}
}

function movementMoveToken(x, y, bLine){
	const m = movement;
	if (m.token != null){
		// Tiles selected
		const tilex = Math.floor((x-board.offsetx)/board.tilew)+1;
		const tiley = Math.floor((y-board.offsety)/board.tileh)+1;
		//console.log("TILE DEST: "+tilex+" "+tiley);
		m.pixel_x0 = m.pixel_x1 = m.pixel_y0 = m.pixel_y1 = -1;
		//moveToken(m.token, tilex, tiley);
		//console.log(m.token.name+" -> "+tilex+","+tiley);
		sendCommand("@"+m.token.name+" "+tilex+","+tiley);
		m.token.tagName.style.opacity = 0;
		if (bLine){
			const l = document.getElementById("line_movement");
			svg.removeChild(l);
		}
	}
}
// **************** PHASE 2
/*
function mouseMove(event){
	event.preventDefault();
    event.stopImmediatePropagation();
	const x = event.clientX + window.pageXOffset;
	const y = event.clientY + window.pageYOffset;
	movementGenericMove(x, y);
}

function touchMove(event){
	event.preventDefault();
    event.stopImmediatePropagation();
	const x = event.touches[0].clientX;
	const y = event.touches[0].clientY;
	//movementGenericMove(x, y);
}

function movementGenericMove(x, y){
	if (movement.token != null){
		movement.pixel_x1 = x;
		movement.pixel_y1 = y;
		const l = document.getElementById("line_movement");
		if (l != null){
			l.setAttribute("x1", movement.pixel_x0);
			l.setAttribute("y1", movement.pixel_y0);
			l.setAttribute("x2", x);
			l.setAttribute("y2", y);
		}
	}
}
*/
// **************** PHASE 3
/*
function mouseUp(event){
	event.preventDefault();
    event.stopImmediatePropagation();
	const x = event.clientX + window.pageXOffset;
	const y = event.clientY + window.pageYOffset;
	movementGenericMoveToken(x, y, true);
}

function touchUp(event){
	console.log(event);
	const x = event.changedTouches[0].clientX;
	const y = event.changedTouches[0].clientY;
	console.log("Touch END: "+x+" "+y);
	movementGenericMoveToken(x, y, false);
}
*/

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
	panel1 = document.getElementById("panel1");
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
	getBoard(2);
	updateActionsPanel(3)
	timerUpdates = setInterval(checkUpdates,1000);
});

window.addEventListener("resize", function() {
	console.log("RESIZE");
	MAXX = window.innerWidth;
	MAXY = window.innerHeight;
	//canvas.style.width = MAXX+"px";
	//canvas.style.height = MAXY+"px";
	panel1.style.height = MAXY+"px";
	output.style.height = MAXY+"px";
});

/*
window.addEventListener("scroll", function (){
	var input = document.getElementById("stdInput");
	var canvas = document.getElementById("casnvas");
	input.style.top = canvas.scroll.top;
	input.style.left = canvas.scroll.left;
});*/
