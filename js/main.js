var canvas, panel1, input, output;
var arrItems = [];						// Items in the board
var arrCommands = [], iCommands = 0;	// Commands sended. Array and index to ArrowUp and ArrowDown recover
var timerUpdates;						// Timer to check each second for updates from the server
var arrActions = [], lastActionId=0, arrRq = [];	// All actions of the game {ts, action}
var tilew = 0, tileh = 0;
var board;	// Info about the board {name, tilew, tileh, ntilesw, ntilesh, bg, drawGrid}


const IMGW = 111;
const IMGH = 128;


function inputKeyPress(event){
	// console.log(event.keyCode);
	switch (event.keyCode){
	case 13:
		var rq = new XMLHttpRequest();
		rq.open("GET", "rq/send.php?m="+encodeURIComponent(input.value)+"&idBoard="+board.id);
		rq.send();
		arrCommands.push(input.value);
		iCommands = arrCommands.length;	// Index of commands for historial
		input.value="";	// Empty the input
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
}

function checkUpdates(){
	// Get Last Action ID
	var rq = new XMLHttpRequest();
	rq.open("GET", "rq/getLastActionId.php?idBoard="+board.id);
	rq.send();
	rq.onreadystatechange = function () {
		if (rq.readyState == XMLHttpRequest.DONE && rq.status == 200){
			lastActionId = rq.responseText;	// lastActionId is the last action recorded in the server
		}
	}
	//console.log("SIZE "+arrActions.length);
	
	// Get actions I do not have in my arrActions
	for(var i=1; i<=lastActionId; i++){
		if (arrActions[i] == undefined){	// Client needs the 'i' action
			arrRq[i] = new XMLHttpRequest();
			arrRq[i].open("GET", "rq/getAction.php?idAction="+i+"&idBoard="+board.id);	// Asyncronous
			arrRq[i].send();
			arrRq[i].onreadystatechange = function () {
				if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
					var arrResponse = this.responseText.split("\n");	// id, action
					var actionId = arrResponse[0];
					arrActions[actionId] = {
						'ts': arrResponse[1],
						'action': arrResponse[2]
					}
					//arrRq[arrResponse[0]] = null;
					
					// Move TOKENS

					if (arrActions[actionId].action.charAt(0) == "@"){
						var arr = arrActions[actionId].action.split(" ");
						var name = arr[0];
						arrItems.forEach(function (item) {
							if (item.name == name && item.lastActionIdUpdated < actionId){
								item.x = (arr[1].charCodeAt(0))-'A'.charCodeAt(0)+1;
								item.y = arr[2];
								item.lastActionIdUpdated = actionId;
								var xPixel = getPixel(item.x, board.tilew);
								var yPixel = getPixel(item.y, board.tileh);
								item.img.style.left = xPixel.toString()+"px";
								item.img.style.top = yPixel.toString()+"px";
							}
						});
					}
				}
			}
		}
	}
	
	// If I am updated dump it into standard output
	if (lastActionId == arrActions.length-1){
		//console.log("UPDATE TEXT");
		output.innerHTML = "";
		//console.log(arrActions);
		for (var i=1; i<arrActions.length; i++){
			if (arrActions[i] != undefined){
				var time = arrActions[i].ts.substring(10, 16);
				output.innerHTML += '<p><time>'+time+'</time> '+arrActions[i].action+'</p>';
				output.scrollTop = output.scrollHeight;
			}
		}
	} else {
		console.log("Sync Server: "+lastActionId+" Local"+(arrActions.length-1));
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
	input.addEventListener("keyup", function (event) {inputKeyPress(event);});
	input.focus();
	input.value = "";
	getFullBoard();
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

