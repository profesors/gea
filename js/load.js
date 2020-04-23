var test;
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
			var newToken = arrUpdatedTokens[i];	// Updated token
			var token = getTokenByName(arrUpdatedTokens[i].name);
			if (token==null){	// Es un nuevo token
				token = newToken;
				// Position of the token
				var px = getPixel(token.x, board.tilew, board.offsetx);
				var py = getPixel(token.y, board.tileh, board.offsety)

				// DIV container
				token.div = document.createElement("div");
				token.div.id = "token_"+newToken.name;
				token.div.class = "token";
				token.div.style.position = "absolute";
				token.div.style.left = px.toString()+"px";
				token.div.style.top = py.toString()+"px";
				token.div.style.width = (board.tilew*newToken.w)+"px";
				token.div.style.height = (board.tileh*newToken.h)+"px";
				token.div.style.textAlign = "center";

				// IMG of the token	NEW
				token.img = document.createElement("img");
				token.img.src = "img/tokens/"+newToken.imgSrc;
				token.img.style.position = "absolute";
				token.img.style.left = 0;
				token.img.style.top = 0;
				token.img.style.zIndex = 1;
				token.img.style.borderRadius = "50%";
				token.img.style.border = newToken.border.replace(/\+/g," ");
				var reBorderWidth = RegExp(/^(\d)+/);
				var borderWidth = reBorderWidth.exec(token.img.style.border.split(' ')[0])[0];
				token.img.style.width = ((board.tilew*newToken.w)-(2*borderWidth))+"px";
				token.img.style.height = ((board.tileh*newToken.h)-(2*borderWidth))+"px";
				token.div.appendChild(token.img);

				// Div with the NAME NEW
				token.divName = document.createElement("div");
				token.divName.id = "divName_"+newToken.name;
				token.divName.innerHTML = newToken.name;
				token.divName.style.color = "yellow";
				token.divName.style.position = "absolute";
				token.divName.style.fontWeight = "bold";
				token.divName.style.top = 0.75*board.tileh*token.h+"px";
				token.divName.style.width = board.tilew*token.w+"px";
				token.divName.style.textShadow = "2px 2px black";
				token.divName.style.zIndex = 2;
				token.divName.style.opacity = 0;
				token.div.appendChild(token.divName);

				// Div with DICE results NEW token
				token.divDice = document.createElement("div");
				token.divDice.id = "divDice_"+newToken.name;
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

				// Div with Indicator results token
				token.divIndicator = document.createElement("div");
				token.divIndicator.id = "divIndicator_"+newToken.name;
				token.divIndicator.style.color = "white";
				token.divIndicator.style.position = "absolute";
				token.divIndicator.style.fontWeight = "bold";
				token.divIndicator.style.top = -0.2*board.tileh+"px";
				token.divIndicator.style.width = board.tilew+"px";
				token.divIndicator.style.textShadow = "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black";
				token.divIndicator.style.fontSize = "1.4rem";
				token.divIndicator.style.zIndex = 3;
				token.divIndicator.style.opacity = 0;
				token.div.appendChild(token.divIndicator);

				// Div with guideline icon
				token.divGuideline = document.createElement("img");
				token.divGuideline.id = "divGuideline_"+newToken.name;
				token.divGuideline.style.color = "white";
				token.divGuideline.style.position = "absolute";
				token.divGuideline.style.top = 0;
				token.divGuideline.style.right = 0;
				token.divGuideline.style.width = "20px";

				token.divGuideline.style.zIndex = 3;
				token.divGuideline.style.opacity = 1;
				token.div.appendChild(token.divGuideline);

				arrTokens.push(token);
				canvas.appendChild(token.div);
				updateHp(token);
				var bPj= document.getElementById("b"+token.name);
				if (bPj!=null){
					bPj.style.opacity=1;
				}
			}	// if NEW token

			test = token;
			// Caso 1: Token is healthy
			if (token.attrs.hp>0 && newToken.attrs.hp>0){
				console.log("Caso 1: "+token.name+" HP:"+token.attrs.hp+" -> "+newToken.attrs.hp);
				if (token.attrs.hp > newToken.attrs.hp){	// Lose HP
					showDamage(token, token.attrs.hp-newToken.attrs.hp);
					token.attrs.hp = newToken.attrs.hp;
					updateHp(token);
				} 
				token.guidelines = newToken.guidelines;
				token.defaultGuideline.n = newToken.defaultGuideline.n;
				token.defaultGuideline.icon = newToken.defaultGuideline.icon;
				if (newToken.defaultGuideline.icon != null){
					document.getElementById("divGuideline_"+token.name).src = 'img/icons/'+token.defaultGuideline.icon;
				}
				moveToken(token, newToken.x, newToken.y);

				// This token has pending actions to show
				if (token.diceActionId < newToken.diceActionId){	
					token.diceActionId = newToken.diceActionId;
					token.diceResult = newToken.diceResult;
					showDiceResult(token.name);
					var token2 = getTokenByName(newToken.diceActionTargets);
					var returnedData = parseInt((token.diceResult.split(' '))[0]);
					if (token2 != null && Number.isInteger(returnedData)){	// A roll dice without target has not token2
						runAnimationAttack(token, token2);
					}
				}
			} else
			// Case 2: Token is death in this action
			if (token.attrs.hp > 0 && newToken.attrs.hp<=0){
				console.log("Caso 2: "+token.name+" HP:"+token.attrs.hp+" -> "+newToken.attrs.hp);
				showDamage(token, token.attrs.hp-newToken.attrs.hp);
				token.attrs = newToken.attrs;
				updateHp(token);
				removeToken(token.name);
			} else if (token.attrs.hp<0){	// Caso 3
				console.log("Caso 3: "+token.name+" HP:"+token.attrs.hp+" -> "+newToken.attrs.hp);
				token.attrs = newToken.attrs;
				updateHp(token);
				//removeToken(token.name);
			}
		}	// for

		if (remoteLastAction != undefined){
			board.lastActionId = remoteLastAction.id;
		}

	} // if STATUS 200
	} // onReadyStateChange
}

