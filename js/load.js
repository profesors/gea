// Load functions of the board
function getBoard(idBoard){
	const rq = new XMLHttpRequest();
	rq.open("GET", "rq/getBoard.php?idBoard="+idBoard);
	rq.send();
	rq.onreadystatechange = function(e) {
		if(rq.readyState === XMLHttpRequest.DONE && rq.status === 200){
			var s = rq.responseText;
			board = JSON.parse(s);
			// BG
			var canvas = document.getElementById("canvas");
			canvas.style.backgroundImage = "url(img/bg/"+board.bg+")";
			canvas.style.backgroundRepeat = "no-repeat";
			canvas.style.width = (board.tilew*board.ntilesw)+0.5*board.tilew+100+"px";
			canvas.style.height = (board.tileh*board.ntilesh)+0.5*board.tileh+"px";
			getTokens(board.id);	
			const scrollTop = Cookies.get("scrollTop");
			const scrollLeft =Cookies.get("scrollLeft"); 
			window.scrollTo(scrollLeft, scrollTop);
			addSvgCanvas();	
		}
	}
}

function getTokens(idBoard){
	const rq = new XMLHttpRequest();
	rq.open("GET", "rq/getTokens.php?idBoard="+idBoard);
	rq.send();
	rq.onreadystatechange = function(e) {
	if(rq.readyState === XMLHttpRequest.DONE && rq.status === 200){
		var s = rq.responseText;
		var arrUpdatedTokens = JSON.parse(s);
		// Create arr tokens
		for(var i=0; i<arrUpdatedTokens.length; i++){
			var upToken = arrUpdatedTokens[i];	// Updated token
			var token = getTokenByName(arrUpdatedTokens[i].name);
			if (token==null){	// Es un nuevo token
				token = upToken;
				// Position of the token
				var px = getPixel(token.x, board.tilew, board.offsetx);
				var py = getPixel(token.y, board.tileh, board.offsety)

				// DIV container
				token.div = document.createElement("div");
				token.div.id = "token_"+upToken.name;
				token.div.class = "token";
				token.div.style.position = "absolute";
				token.div.style.left = px.toString()+"px";
				token.div.style.top = py.toString()+"px";
				token.div.style.width = board.tilew*token.w;
				token.div.style.height = board.tileh*token.h;
				token.div.style.textAlign = "center";

				// IMG of the token	NEW
				token.img = document.createElement("img");
				token.img.src = "img/tokens/"+upToken.imgSrc;
				token.img.style.position = "relative";
				token.img.style.left = 0;
				token.img.style.top = 0;
				token.img.style.zIndex = 1;
				token.img.style.borderRadius = "50%";
				token.img.style.border = upToken.border.replace(/\+/g," ");
				var reBorderWidth = RegExp(/^(\d)+/);
				var borderWidth = reBorderWidth.exec(token.img.style.border.split(' ')[0])[0];
				token.img.style.width = (board.tilew-2*borderWidth)+"px";
				token.img.style.height = (board.tileh-2*borderWidth)+"px";
				token.div.appendChild(token.img);

				// Div with the NAME NEW
				token.divName = document.createElement("div");
				token.divName.id = "divName_"+upToken.name;
				token.divName.innerHTML = "@"+upToken.name;
				token.divName.style.color = "yellow";
				token.divName.style.position = "absolute";
				token.divName.style.fontWeight = "bold";
				token.divName.style.top = 0.5*board.tileh*token.h+"px";
				token.divName.style.width = board.tilew*token.w+"px";
				token.divName.style.textShadow = "2px 2px black";
				token.divName.style.zIndex = 2;
				token.divName.style.opacity = 0;
				token.div.appendChild(token.divName);

				// Div with DICE results NEW
				token.divDice = document.createElement("div");
				token.divDice.id = "divDice_"+upToken.name;
				token.divDice.innerHTML = "";
				token.divDice.style.color = "white";
				token.divDice.style.position = "absolute";
				token.divDice.style.fontWeight = "bold";
				token.divDice.style.top = -0.2*board.tileh+"px";
				token.divDice.style.width = board.tilew+"px";
				token.divDice.style.textShadow = "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black";
				token.divDice.style.fontSize = "1.4rem";
				token.divDice.style.zIndex = 3;
				token.divDice.style.opacity = 0;
				token.div.appendChild(token.divDice);

				arrTokens.push(token);
				canvas.appendChild(token.div);
			}	// if NEW token

			if(token.hp != undefined){
				updateHp(token);
			}
				
			moveToken(token, upToken.x, upToken.y);
			token.divDice.innerHTML = upToken.diceResult;

			// First element is diceActionId, nexts are coordinates
			token.diceAction = upToken.diceAction;
			token.diceResult = upToken.diceResult;
			var arrDiceAction = token.diceAction.split(',');
			if (board.lastActionId < arrDiceAction[0]){	
				// This token has pending acitions to show
				showDiceResult(token.name);
				if (1 in arrDiceAction && 2 in arrDiceAction){
					// INFO: tilex is arrDiceAction[1], tiley is arrDiceAction[2]
					runGuidelines(token, arrDiceAction[1], arrDiceAction[2], false);
				}
			}
			updateHp(token);
		}	// for
		if (remoteLastAction != undefined){
			board.lastActionId = remoteLastAction.id;
		}

	} // if STATUS 200
	} // onReadyStateChange
}

