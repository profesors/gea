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
					lastActionIdUpdated: 0,
					img: document.createElement("img")	// Pointer to 'html img' tag
				}
				// Position of the token
				var x = getPixel(token.x, board.tilew);
				var y = getPixel(token.y, board.tileh)
				token.img.style.left = x.toString()+"px";
				token.img.style.top = y.toString()+"px";
				token.img.style.border = "4px lime solid";
				token.img.src = "img/tokens/"+token.src;
				
				// As the token is inserted, we just need update its possition
				// so do not do anything more
				var currentToken = getTokenFromArrTokens(token.name);
				if (currentToken != null){
					console.log("Ya existe este token. Actualizo " +currentToken.name);
					currentToken.img.style.left = token.img.style.left;
					currentToken.img.style.top = token.img.style.top;
					currentToken.img.style.border = token.img.style.border;
					currentToken.img.src = "img/tokens/"+token.src;
					continue;
				} else {
					console.log("No existe este token. Añado "+token.name);
				}
				//console.log(token);
				token.img.setAttribute("class", "token");
				token.img.name = token.name;
				token.img.style.position = "absolute";
				token.img.style.borderRadius = "50%";
				token.img.style.width = board.tilew+"px";
				if (token.name.charAt(1)=="4"){
					token.img.style.border = "4px red solid";
				}
				arrTokens.push(token);
				token.img.onload = function () { canvas.appendChild(token.img); }
			} // if
		}	// forEach
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

function drawCellNames(){
	for (var x=0; x<=board.ntilesw; ++x){
		var txt = document.createElement("div");	
		txt.innerHTML = String.fromCharCode(65+x); // 65 = A
		txt.style.color = "white";
		txt.style.position = "absolute";
		txt.style.left = x*(board.tilew+1)+(board.tilew*0.5)+"px";
		txt.style.top = "5px";
		canvas.appendChild(txt);
	}
	for (var y=0; y<=board.ntilesh; ++y){
		var txt = document.createElement("div");	
		txt.innerHTML = y+1;
		txt.style.color = "white";
		txt.style.position = "absolute";
		txt.style.top = y*(board.tileh+1)+(board.tileh*0.5)+"px";
		txt.style.left = "10px";
		canvas.appendChild(txt);
	}
}
