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
			canvas.style.width = (parseInt(board.tilew)*parseInt(board.ntilesw))+0.5*board.tilew+100+"px";
			canvas.style.height = (board.tileh*board.ntilesh)+0.5*board.tileh+"px";
			getTokens(board.id, 0);	
			const scrollTop = Cookies.get("scrollTop");
			const scrollLeft =Cookies.get("scrollLeft"); 
			window.scrollTo(scrollLeft, scrollTop);
			addSvgCanvas();	
		}
	}
}

async function getTokens(idBoard, fromActionId=null){
	const rq = new XMLHttpRequest();
	rq.open("GET", "rq/getTokens.php?idBoard="+idBoard+"&fromActionId="+(fromActionId==null?0:fromActionId));
	rq.send();
	rq.onreadystatechange = function(e) {
	if(rq.readyState === XMLHttpRequest.DONE && rq.status === 200){
		var s = rq.responseText;
		//console.log(s);
		var arrUpdatedTokens = JSON.parse(s);
		//console.log("--- Llegan "+arrUpdatedTokens.length+" nuevos tokens");
		//console.log(arrUpdatedTokens);
		// Create arr tokens
		for(var i=0; i<arrUpdatedTokens.length; i++){
			var upToken = arrUpdatedTokens[i];	// Updated token
			//console.log("Nuevo token:"+upToken);
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
				token.div.style.width = (board.tilew*upToken.w)+"px";
				token.div.style.height = (board.tileh*upToken.h)+"px";
				token.div.style.textAlign = "center";

				// IMG of the token	NEW
				token.img = document.createElement("img");
				token.img.src = "img/tokens/"+upToken.imgSrc;
				token.img.style.position = "absolute";
				token.img.style.left = 0;
				token.img.style.top = 0;
				token.img.style.zIndex = 1;
				token.img.style.borderRadius = "50%";
				token.img.style.border = upToken.border.replace(/\+/g," ");
				var reBorderWidth = RegExp(/^(\d)+/);
				var borderWidth = reBorderWidth.exec(token.img.style.border.split(' ')[0])[0];
				token.img.style.width = ((board.tilew*upToken.w)-(2*borderWidth))+"px";
				token.img.style.height = ((board.tileh*upToken.h)-(2*borderWidth))+"px";
				token.div.appendChild(token.img);

				// Div with the NAME NEW
				token.divName = document.createElement("div");
				token.divName.id = "divName_"+upToken.name;
				token.divName.innerHTML = "@"+upToken.name;
				token.divName.style.color = "yellow";
				token.divName.style.position = "absolute";
				token.divName.style.fontWeight = "bold";
				token.divName.style.top = 0.75*board.tileh*token.h+"px";
				token.divName.style.width = board.tilew*token.w+"px";
				token.divName.style.textShadow = "2px 2px black";
				token.divName.style.zIndex = 2;
				token.divName.style.opacity = 0;
				token.div.appendChild(token.divName);

				// Div with DICE results NEW
				token.divDice = document.createElement("div");
				token.divDice.id = "divDice_"+upToken.name;
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
				updateHp(token);
				var bPj= document.getElementById("b"+token.name);
				if (bPj!=null){
					bPj.style.opacity=1;
				}
			}	// if NEW token

			// Caso 1: El token está sano
			if (token.attrs.hp>=0 && upToken.attrs.hp>=0){
				//console.log("Caso 1: "+token.name+" HP:"+token.attrs.hp+" -> "+upToken.attrs.hp);
				if (token.attrs.hp > upToken.attrs.hp){	// Lose HP
					showDamage(token, token.attrs.hp-upToken.attrs.hp);
					token.attrs.hp = upToken.attrs.hp;
					updateHp(token);
				}
				token.guidelines = upToken.guidelines;
				moveToken(token, upToken.x, upToken.y);

				// This token has pending actions to show
				if (token.diceActionId < upToken.diceActionId){	
					token.diceActionId = upToken.diceActionId;
					token.diceResult = upToken.diceResult;
					showDiceResult(token.name);
					var token2 = getTokenByName(upToken.diceActionTargets);
					if (token2 != null){	// A roll dice without target has not token2
						runAnimationAttack(token, token2);
					}
				}
			} else
			// Case 2: Token is death in this action
			if (token.attrs.hp >= 0 && upToken.attrs.hp<0){
				//console.log("Caso 2: "+token.name+" HP:"+token.attrs.hp+" -> "+upToken.attrs.hp);
				token.attrs = upToken.attrs;
				updateHp(token);
				removeToken(token.name);
			}
			// Case 3
			if (token.attrs.hp<0){
				token.attrs = upToken.attrs;
				var bPj= document.getElementById("b"+token.name);
				if (bPj!=null){
					bPj.style.opacity="0.3";
				}
			}
		}	// for
		if (remoteLastAction != undefined){
			board.lastActionId = remoteLastAction.id;
		}

	} // if STATUS 200
	} // onReadyStateChange
}

