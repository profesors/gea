var canvas, panel1, input, output;
var arrItems = [];						// Items in the board
var arrCommands = [], iCommands = 0;	// Commands sended. Array and index to ArrowUp and ArrowDown recover
var timerUpdates;						// Timer to check each second for updates from the server
var arrActions = [], lastActionId=0, arrRq = [];	// All actions of the game
// Each action is struct {ts, action}

// Duplico arrItems para conservar las posiciones originales: arrOItems u arrItems
// Cuando leo la lista de acciones lo aplico a la lista actual
// Conado de arrays https://davidwalsh.name/javascript-clone-array

const IMGW = 111;
const IMGH = 128;

function getFullBoard(){
	const rq = new XMLHttpRequest();
	rq.open("GET", "rq/getFullBoard.php");
	rq.send();
	rq.onreadystatechange = function(e) {
		if(rq.readyState === XMLHttpRequest.DONE && rq.status === 200){
			//console.log(rq.responseText);
			var arrResponse = rq.responseText.split("\n");
			arrResponse.forEach(function(sItem){
				if (sItem !== ""){
					const arrRq = sItem.split(" ");
					const item = {
						x: arrRq[0],
						y: arrRq[1],
						z: arrRq[2],
						step: arrRq[3],
						src: arrRq[4],
						name: arrRq[5],
						idType: arrRq[6],
						lastActionIdUpdated: 0,
						img: document.createElement("img")

					}
					arrItems.push(item);
					//console.log(item);
					//item.img = document.createElement("img");
					item.img.src = "img/"+item.src;
					item.img.name = item.name;
					item.img.style.position = "absolute";
					var x = item.x*65+250;
					var y = item.y*65;
					/*
					var posx = item.x-1;
					var posy = item.y-1;
					var posz = item.z*1.75;
					var x = 0.5*IMGW*posx+600 - 0.5*IMGW*posy;
					var y = 0.25*IMGH*posy + posx*IMGH*0.25 - posz*IMGH*0.25 + 100;
				
					var mod = Math.sqrt(item.x*item.x+item.y+item.y)*100;
					*/
					item.img.style.left = x.toString()+"px";
					item.img.style.top = y.toString()+"px";
					if (item.idType == "2"){	// Is a PC
						item.img.style.border = "4px green solid";
						item.img.style.borderRadius = "50%";
						item.img.style.width = "64px";
						if (item.name.charAt(1)=="4"){
							item.img.style.border = "4px red solid";
						}
					}
					
					//item.img.style.zIndex = Math.round(mod);
					item.img.onload = function () { canvas.appendChild(item.img); }
					//console.log("POS "+posx+","+posy+" MOD "+mod);
				}
			});
		}
	}
}

function drawCellsNames(){
	for (var x=0; x!=10; ++x){
		var txt = document.createElement("div");	
		txt.innerHTML = String.fromCharCode(65+x);
		txt.style.color = "white";
		txt.style.position = "absolute";
		txt.style.left = x*65+340+"px";
		txt.style.top = "30px";
		canvas.appendChild(txt);
	}
	for (var y=0; y!=9; ++y){
		var txt = document.createElement("div");	
		txt.innerHTML = y+1;
		txt.style.color = "white";
		txt.style.position = "absolute";
		txt.style.top = y*65+90+"px";
		txt.style.left = "270px";
		canvas.appendChild(txt);
	}
}

function inputKeyPress(event){
	// console.log(event.keyCode);
	switch (event.keyCode){
	case 13:
		var rq = new XMLHttpRequest();
		rq.open("GET", "rq/send.php?m="+encodeURIComponent(input.value));
		rq.send();
		arrCommands.push(input.value);
		iCommands = arrCommands.length;
		input.value="";	// Empty the input
		rq.onreadystatechange = function (){
			if (rq.readyState == XMLHttpRequest.DONE && rq.status == 200){
				//var arrResponse = rq.responseText.split("\n");
				//var action = arrResponse[0];
				//arrActions[action] = arrResponse[1];
				//output.innerHTML += "<p>"+arrResponse[1]+"</p>";
				//output.scrollTop = output.scrollHeight;
			}
		}
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
	rq.open("GET", "rq/getLastActionId.php");
	rq.send();
	rq.onreadystatechange = function () {
		if (rq.readyState == XMLHttpRequest.DONE && rq.status == 200){
			lastActionId = rq.responseText;
		}
	}
	//console.log("SIZE "+arrActions.length);
	
	// Get actions I do not have in my arrActions
	for(var i=1; i<=lastActionId; i++){
		if (arrActions[i] == undefined){	// Client needs the 'i' action
			arrRq[i] = new XMLHttpRequest();
			arrRq[i].open("GET", "rq/getAction.php?id="+i);	// Asyncronous
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
					if (arrActions[actionId].action.charAt(0) == "@"){
						var arr = arrActions[actionId].action.split(" ");
						var name = arr[0];
						var x = (arr[1].charCodeAt(0))-'A'.charCodeAt(0)+1;
						var y = arr[2];
						arrItems.forEach(function (item) {
							if (item.name == name){
								item.x = x;
								item.y = y;
								item.lastActionIdUpdated = actionId;
								var xPixel = item.x*65+250;
								var yPixel = item.y*65;
								item.img.style.left = xPixel.toString()+"px";
								item.img.style.top = yPixel.toString()+"px";
							}
						});
					}
				}
			}
		}
	}
	
	// If I am updated dump it into standard output and move tokens
	if (lastActionId == arrActions.length-1){
		console.log("UPDATE TEXT");
		output.innerHTML = "";
		for (var i=1; i<arrActions.length; i++){
			var time = arrActions[i].ts.substring(10, 16);
			output.innerHTML += '<p><time>'+time+'</time> '+arrActions[i].action+'</p>';
			output.scrollTop = output.scrollHeight;
		}
	} else {
		console.log("Sync Local: "+lastActionId+" Server"+(arrActions.length-1));
	}
}

window.addEventListener("load", function() {
	MAXX = window.innerWidth;
	MAXY = window.innerHeight;
	canvas = document.getElementById("container");
	panel1 = document.getElementById("panel1");
	input = document.getElementById("stdInput");
	output = document.getElementById("stdOutput");
	canvas.style.width = MAXX+"px";
	canvas.style.height = MAXY+"px";
	output.style.height = (MAXY-100)+"px";
	input.addEventListener("keyup", function (event) {inputKeyPress(event);});
	input.focus();
	input.value = "";
	getFullBoard();
	drawCellsNames();
	timerUpdates = setInterval(checkUpdates,1000);
});

window.addEventListener("resize", function() {
	MAXX = window.innerWidth;
	MAXY = window.innerHeight;
	canvas.style.width = MAXX+"px";
	canvas.style.height = MAXY+"px";
	panel1.style.height = MAXY+"px";
	output.style.height = (MAXY-100)+"px";
});

