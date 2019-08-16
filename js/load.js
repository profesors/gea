// Load functions of the board
function getBoard(idBoard){
	const rq = new XMLHttpRequest();
	rq.open("GET", "rq/getBoard.php?idBoard="+idBoard);
	rq.send();
	rq.onreadystatechange = function(e) {
		if(rq.readyState === XMLHttpRequest.DONE && rq.status === 200){
			var arrResponse = rq.responseText.split("\n");
			board = {
				id: arrResponse.shift(),
				name: arrResponse.shift(),
				tilew: parseInt(arrResponse.shift()),
				tileh: parseInt(arrResponse.shift()),
				ntilesw: parseInt(arrResponse.shift()),
				ntilesh: parseInt(arrResponse.shift()),
				offsetx: parseInt(arrResponse.shift()),
				offsety: parseInt(arrResponse.shift()),
				bg: arrResponse.shift(),
				drawGrid: (arrResponse.shift()=='1'),
				lastActionId: parseInt(arrResponse.shift())
			}
			//console.log(board);
			// BG
			if (board.bg != ""){
				var canvas = document.getElementById("canvas");
				canvas.style.backgroundImage = "url(img/"+board.bg+")";
				canvas.style.backgroundRepeat = "no-repeat";
				canvas.style.width = (board.tilew*board.ntilesw)+0.5*board.tilew+"px";
				canvas.style.height = (board.tileh*board.ntilesh)+0.5*board.tileh+"px";
			}
			drawCellNames();
			getTokens(board.id);
		}
	}
}

function getTokens(idBoard){
	const rq = new XMLHttpRequest();
	rq.open("GET", "rq/getTokens.php?idBoard="+idBoard);
	rq.send();
	rq.onreadystatechange = function(e) {
	if(rq.readyState === XMLHttpRequest.DONE && rq.status === 200){
		var arrResponse = rq.responseText.split("\n");
		// Create arr tokens
		for(var i=0; i<arrResponse.length; i++){
			var sToken = arrResponse[i];
			if (sToken !== ""){
				const arrOneToken = sToken.split(" ");
				const token = {
					x: arrOneToken[0],
					y: arrOneToken[1],
					z: arrOneToken[2],
					step: arrOneToken[3],
					src: arrOneToken[4],
					name: arrOneToken[5],
					div: document.createElement("div"),	// Pointer to 'html div' tag with the container
					border: arrOneToken[6].replace(/\+/g, ' '),
					tagName: document.createElement("div"),
					tagDice: document.createElement("div"),
					dice: arrOneToken[7],
					diceActionId: arrOneToken[8]
				}
				//console.log(token);
				// Position of the token
				var x = getPixel(token.x, board.tilew, board.offsetx);
				var y = getPixel(token.y, board.tileh, board.offsety)
				token.div.id = token.name;
				token.div.style.left = x.toString()+"px";
				token.div.style.top = y.toString()+"px";
				token.div.style.width = board.tilew;
				token.div.style.height = board.tileh;
				
				token.div.img = document.createElement("img");
				token.div.img.style.border = token.border;
				token.div.img.src = "img/tokens/"+token.src;
				
				token.tagDice.innerHTML = token.dice;
				
				// As the token is inserted, we just need update its possition
				// so do not do anything more
				// IF THE TOKEN EXISTS previously... execute this IF
				var currentToken = getTokenFromArrTokens(token.name);
				if (currentToken != null){
					//console.log("Ya existe este token. Actualizo " +currentToken.name);
					moveToken(currentToken, token.x, token.y);
					//currentToken.div.style.left = token.div.style.left;
					//currentToken.div.style.top = token.div.style.top;
					currentToken.div.img.style.border = token.div.img.style.border;
					currentToken.div.img.src = "img/tokens/"+token.src;
					currentToken.tagDice.innerHTML = token.tagDice.innerHTML;
					//showDiceResult(currentToken.name);
					//console.log("local "+localLastActionId+" token "+token.diceActionId);
					if (localLastActionId < token.diceActionId){
						var name = currentToken.name;
						setTimeout(function () {showDiceResult(name)} ,0);
					}
					continue;
				} else {
					//console.log("No existe este token. Añado "+token.name);
				}
				//console.log(token);
				token.div.setAttribute("class", "token");
				token.div.style.position = "absolute";
				token.div.style.textAlign = "center";
				
				// IMG of the token
				token.div.img.name = token.name;
				token.div.img.style.position = "relative";
				token.div.img.style.left = 0;
				token.div.img.style.top = 0;
				token.div.img.style.borderRadius = "50%";
				token.div.img.style.width = board.tilew+"px";
				
				// Tag with the NAME 
				token.tagName.id = "tagName"+token.name;
				token.tagName.innerHTML = "@"+token.name;
				token.tagName.style.color = "yellow";
				token.tagName.style.position = "absolute";
				token.tagName.style.fontWeight = "bold";
				token.tagName.style.top = 0.5*board.tileh+"px";
				token.tagName.style.width = board.tilew+"px";
				token.tagName.style.textShadow = "2px 2px black";
				token.tagName.style.zIndex = 100;
				token.tagName.style.opacity = 0;
				token.div.appendChild(token.tagName);

				// Tag with DICE results
				token.tagDice.id = "tagDice"+token.name;
				token.tagDice.innerHTML = "";
				token.tagDice.style.color = "white";
				token.tagDice.style.position = "absolute";
				token.tagDice.style.fontWeight = "bold";
				token.tagDice.style.top = -0.2*board.tileh+"px";
				token.tagDice.style.width = board.tilew+"px";
				token.tagDice.style.textShadow = "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black";
				token.tagDice.style.fontSize = "180%";
				token.tagDice.style.zIndex = 100;
				token.tagDice.style.opacity = 0;
				token.div.appendChild(token.tagDice);

				arrTokens.push(token);

				token.div.img.onload = function () { 
					canvas.appendChild(token.div);
					token.div.appendChild(token.div.img); }
			} // if
		}	// forEach
		localLastActionId = board.lastActionId;	// QUITAR @TODO @1
	} // if STATUS 200
	} // onReadyStateChange
}

function removeAllLoadedTokens(){
	while (arrTokens.length > 0){
		var token = arrTokens.shift();
		console.log("REMOVE TOKEN "+token.name);
		canvas.removeChild(token.img);
	}
}

// NO TESTED
/*
function getDice(idBoard, name){
	const rq = new XMLHttpRequest();
	rq.open("GET", "rq/getDice.php?idBoard="+idBoard+"&name="+name);
	rq.send();
	rq.onreadystatechange = function(e) {
	if(rq.readyState === XMLHttpRequest.DONE && rq.status === 200){
		console.log("DICE "+name+":"+rq.responseText);
	}
	}
}*/

function drawCellNames(){
	for (var y=1; y<=board.ntilesh; y++){
		for (var x=1; x<=board.ntilesw; x++){
			var txt = document.createElement("div");	
			txt.innerHTML = x+","+y;
			txt.style.left = getPixel(x, board.tilew, board.offsetx)+"px";
			txt.style.top = getPixel(y, board.tileh, board.offsety)+"px";
			txt.style.position = "absolute";
			txt.style.color = "white";
			txt.style.zIndex = 100;
			txt.style.textShadow = "2px 2px black";
			txt.style.opacity = "0";
			txt.setAttribute("class", "coordinates");
			canvas.appendChild(txt);
		}
	}
}