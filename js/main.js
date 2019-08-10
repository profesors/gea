var canvas, panel1, input, output;
var arrTokens = [];						// Tokens in the board
var arrCommands = [], iCommands = 0;	// Commands sended. Array and index to ArrowUp and ArrowDown recover
var timerUpdates;						// Timer to check each second for updates from the server
var arrActions = [], localLastActionId=0, arrRq = [];	// All actions of the game {ts, action}
var board;	// Info about the board {name, tilew, tileh, ntilesw, ntilesh, bg, drawGridi, lastActionId}
var lastTouch = 0;

function inputKeyPress_inputBox(event){
	//console.log(event.keyCode);
	switch (event.keyCode){
	case 13:
		var rq = new XMLHttpRequest();
		rq.open("GET", "rq/send.php?m="+encodeURIComponent(input.value)+"&idBoard="+board.id);
		rq.send();
		arrCommands.push(input.value);
		iCommands = arrCommands.length;	// Index of commands for historial
		input.value="";	// Empty the input
		setOpacityCoordinates(0);
		input.style.display = document.getElementById("input_hidden").style.display;
		input.blur();
		break;
	case 27:	// ESC
		input.value = "";
		input.style.display = document.getElementById("input_hidden").style.display;
		break;
	case 38:	// UP arrow
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
				iCommands = arrCommands.length-1;
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

function inputKeyPress_allDocument(event){
	//console.log("DOCUMENT KeyCode "+event.keyCode);
	var input = document.getElementById("stdInput");
	var bShowInput = false;
	switch(event.keyCode){
	case 27:	// ESC
		input.value = "";
		input.style.display = document.getElementById("input_hidden").style.display;
		console.log(document.getElementById("input_hidden").style.display);
		break;
	case 48:	// =
		input.value = "=";
		bShowInput = true;
		break;
	case 50:	// @
		input.value = "@";
		bShowInput = true;
		break;
	case 51:	// #
		input.value = "#";
		bShowInput = true;
		break;
	case 190:	// :
		input.value = ":";
		bShowInput = true;
		break;
	}
	if (bShowInput){
		input.style.display = "block";
		input.focus();
	}
}

function touch(event){
	if ((Date.now() - lastTouch) < 500)	{
		//alert(canvas.offsetLeft);
		//showInputBox(event.touches[0].clientX, event.touches[0].clientY);
		showInputBox();
	}
	lastTouch = Date.now();
}

function showInputBox(){
	var input = document.getElementById("stdInput");
	input.style.display = "block";
	input.focus();
	//input.style.top = x+"px";
	//input.style.left = y+"px";

}

function checkUpdates(){
	// Get Last Action ID
	var rq = new XMLHttpRequest();
	rq.open("GET", "rq/getLastActionId.php?idBoard="+board.id);
	rq.send();
	rq.onreadystatechange = function () {
		if (rq.readyState == XMLHttpRequest.DONE && rq.status == 200){
			board.lastActionId = parseInt(rq.responseText);	// lastActionId is the last action recorded in the server
			
			if (localLastActionId < board.lastActionId){	// Update tokens
				getTokens(board.id);
				//localLastActionId = board.lastActionId;
			}
			if (localLastActionId > board.lastActionId){	// Remove all tokens and update all of them
				removeAllLoadedTokens();	
				localLastActionId = 0;
			}
		}
	}
}

window.addEventListener("load", function() {
	MAXX = window.innerWidth;
	MAXY = window.innerHeight;
	canvas = document.getElementById("canvas");
	panel1 = document.getElementById("panel1");
	input = document.getElementById("stdInput");
	output = document.getElementById("stdOutput");
	//canvas.style.width = MAXX+"px";
	//canvas.style.height = MAXY+"px";
	output.style.height = (MAXY-100)+"px";
	input.addEventListener("keyup", function (event) {inputKeyPress_inputBox(event);});
	document.addEventListener("keyup", function (event) {inputKeyPress_allDocument(event);});
	document.addEventListener("touchend", function (event) {touch(event)});

	input.focus();
	input.value = "";
	getBoard(2);
	timerUpdates = setInterval(checkUpdates,1000);
});

window.addEventListener("resize", function() {
	console.log("RESIZE");
	MAXX = window.innerWidth;
	MAXY = window.innerHeight;
	//canvas.style.width = MAXX+"px";
	//canvas.style.height = MAXY+"px";
	panel1.style.height = MAXY+"px";
	output.style.height = (MAXY-100)+"px";
});

/*
window.addEventListener("scroll", function (){
	var input = document.getElementById("stdInput");
	var canvas = document.getElementById("casnvas");
	input.style.top = canvas.scroll.top;
	input.style.left = canvas.scroll.left;
});*/
