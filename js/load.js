// Load functions of the board
async function getBoard(idBoard){
	const rq = new XMLHttpRequest();
	rq.open("GET", "rq/getBoard.php?idBoard="+idBoard);
	rq.send();
	rq.onreadystatechange = async function(e) {
		if(rq.readyState === XMLHttpRequest.DONE && rq.status === 200){
			var s = rq.responseText;
			board = JSON.parse(s);
			board.output = document.getElementById("board_output");

			// BG
			var canvasBg = document.getElementById("canvas_bg");
			await fadeOutScreen(1000);
			canvasBg.style.backgroundImage = "url(img/bg/"+board.bg+".jpg)";
			await fadeInScreen(1000);
			canvasBg.style.backgroundRepeat = "no-repeat";
			//canvasBg.style.opacity=1;
			canvasBg.style.zIndex=1;
			canvasBg.style.position = "absolute";
			canvasBg.style.width = (parseInt(board.tilew)*parseInt(board.ntilesw))+0.5*board.tilew+100+"px";
			canvasBg.style.height = (board.tileh*board.ntilesh)+0.5*board.tileh+"px";

			var canvas = document.getElementById("canvas");
			canvas.style.zIndex=2;
			//canvas.style.opacity=1;
			canvas.style.position = "absolute";
			canvas.style.left=0;
			canvas.style.top=0;
			//canvas.style.backgroundColor = "rgba(255,255,255,0)";
			canvas.style.width = (parseInt(board.tilew)*parseInt(board.ntilesw))+0.5*board.tilew+100+"px";
			canvas.style.height = (board.tileh*board.ntilesh)+0.5*board.tileh+"px";

			var canvasOver = document.getElementById("canvas_over");
			canvasOver.style.opacity = 0;
			canvasOver.style.zIndex=2;
			canvasOver.style.position = "absolute";
			canvasOver.style.left=0;
			canvasOver.style.top=0;
			canvasOver.style.backgroundRepeat = "no-repeat";
			canvasOver.style.width = (parseInt(board.tilew)*parseInt(board.ntilesw))+0.5*board.tilew+100+"px";
			canvasOver.style.height = (board.tileh*board.ntilesh)+0.5*board.tileh+"px";

			getTokens(board.id, 0);	
			const scrollTop = document.cookie.match(reScrollTop);
			const scrollLeft = document.cookie.match(reScrollLeft);
			if (scrollTop!=null && scrollTop!=null){
				window.scrollTo(scrollLeft[1], scrollTop[1]);
			}
			
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
		// Create arr tokens
		for(var i=0; i<arrUpdatedTokens.length; i++){
			var newToken = arrUpdatedTokens[i];	// Updated token
			//console.log("NUEVO "+newToken.name);
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
				//console.log(newToken);
				token.div.style.opacity = newToken.opacity;
				token.div.style.position = "absolute";
				token.div.style.left = px.toString()+"px";
				token.div.style.top = py.toString()+"px";
				token.div.style.zIndex = 10;
				token.div.style.width = (board.tilew*newToken.w)+"px";
				token.div.style.height = (board.tileh*newToken.h)+"px";
				token.div.style.textAlign = "center";

				// IMG of the token	NEW
				token.img = document.createElement("img");
				token.img.src = "img/tokens/"+newToken.imgSrc;
				token.img.style.position = "absolute";
				token.img.style.left = 0;
				token.img.style.top = 0;
				token.img.style.zIndex = 10;
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
				//token.divName.style.top = 0.75*board.tileh*token.h+"px";
				token.divName.style.top = 0;
				token.divName.style.width = board.tilew*token.w+"px";
				token.divName.style.textShadow = "2px 2px black";
				token.divName.style.zIndex = 11;
				token.divName.style.opacity = 0;
				token.div.appendChild(token.divName);

				// Div with OUTPUT results NEW token
				token.divOutput = document.createElement("div");
				token.divOutput.id = "divOutput_"+newToken.name;
				token.divOutput.style.color = "white";
				token.divOutput.style.position = "absolute";
				token.divOutput.style.fontWeight = "bold";
				token.divOutput.style.top = -0.2*board.tileh+"px";
				token.divOutput.style.width = board.tilew+"px";
				token.divOutput.style.textShadow = "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black";
				token.divOutput.style.fontSize = "1.4rem";
				token.divOutput.style.zIndex = 14;
				token.divOutput.style.opacity = 0;
				token.div.appendChild(token.divOutput);

				// Div with Indicator results token
				token.timeOutIndicator = null;
				token.divIndicator = document.createElement("div");
				token.divIndicator.id = "divIndicator_"+newToken.name;
				token.divIndicator.style.color = "white";
				token.divIndicator.style.textAlign = "center";
				token.divIndicator.style.position = "absolute";
				token.divIndicator.style.fontWeight = "bold";
				token.divIndicator.style.top = 0;//board.tileh+"px";
				//token.divIndicator.style.left = -0.5*board.tilew+"px";//board.tileh+"px";
				//token.divIndicator.style.width = "140px";
				token.divIndicator.style.textShadow = "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black";
				token.divIndicator.style.fontSize = "1rem";
				token.divIndicator.style.zIndex = 12;
				token.divIndicator.style.opacity = 0;
				token.div.appendChild(token.divIndicator);

				// Div with guideline icon
				const iconSize = 20;
				token.divGuideline = document.createElement("img");
				token.divGuideline.id = "divGuideline_"+newToken.name;
				token.divGuideline.style.color = "white";
				token.divGuideline.style.position = "absolute";
				//token.divGuideline.style.top = (board.tileh*newToken.h-iconSize)+"px";
				token.divGuideline.style.bottom = 0;
				token.divGuideline.style.right = 0;
				token.divGuideline.style.width = iconSize+"px";

				token.divGuideline.style.zIndex = 13;
				token.divGuideline.style.opacity = 1;
				token.div.appendChild(token.divGuideline);

				arrTokens.push(token);
				canvas.appendChild(token.div);

				var bPj= document.getElementById("b"+token.name);
				if (bPj!=null){
					bPj.style.opacity=1;
				}
			}	// if NEW token

			// Caso 1: Token is healthy
			if (token.attrs.hp>0 && newToken.attrs.hp>0){
				//console.log("Caso 1: "+token.name+" HP:"+token.attrs.hp+" -> "+newToken.attrs.hp);

				// Opacity
				if (token.div.style.opacity != newToken.opacity){
					changeTokenOpacity(token, newToken.opacity);
				}
				// Lose HP
				if (token.attrs.hp != newToken.attrs.hp){	// Lose HP
					var diff = newToken.attrs.hp-token.attrs.hp;
					diff = diff<=0?diff:'+'+diff;
					var color = 'white';
					var color = diff<0?'red':'aqua';
					showIndicator(token, diff, color, 2000, 2000, (board.tileh/2)+"px");
					token.attrs.hp = newToken.attrs.hp;
					updateHp(token);
				} 
				// New guidelines
				token.guidelines = newToken.guidelines;
				token.defaultGuideline.n = newToken.defaultGuideline.n;
				token.defaultGuideline.icon = newToken.defaultGuideline.icon;
				if (newToken.defaultGuideline.icon != null){
					document.getElementById("divGuideline_"+token.name).src = 'img/icons/'+token.defaultGuideline.icon+'.png';
				}
				// Movement
				var eq = pathEqual(token.path, newToken.path);
				if (newToken.path != null && !eq){
					token.path = newToken.path;
					moveTokenByPath(token, token.path);
				}

				/* Animations */
				for (var ani_step=0; newToken.animation!=null && ani_step<newToken.animation.length; ani_step++){
					//console.log(board.lastActionId+" "+newToken.animation[0].actionId);
					if (board.lastActionId<newToken.animation[ani_step].actionId){
						token.animation = newToken.animation;
						runAnimation(token, ani_step);
					} else {
						token.animation = null;
					}
				} 

				/* Steps */
				token.steps = newToken.steps;
				if (token.steps.action.current<=0){
					token.divGuideline.style.filter = "invert(1)";
				}

				// OUTPUT
				if (newToken.output!= null && board.lastActionId < newToken.output.actionId){
					token.output = newToken.output;
					showTokenOutput(token);
				}
			} else
			// Case 2: Token is death in this action
			if (token.attrs.hp > 0 && newToken.attrs.hp<=0){
				console.log("Caso 2: "+token.name+" HP:"+token.attrs.hp+" -> "+newToken.attrs.hp);
				var damage = newToken.attrs.hp-token.attrs.hp;
				showIndicator(token, damage, "red", 2000, 2000, (board.tileh/2)+"px");
				token.attrs = newToken.attrs;
				updateHp(token);
				removeToken(token);
			} else if (token.attrs.hp<0){	// Caso 3
				console.log("Caso 3: "+token.name+" HP:"+token.attrs.hp+" -> "+newToken.attrs.hp);
				token.attrs = newToken.attrs;
				updateHp(token);
				token.x=newToken.x;
				token.y=newToken.y;
				removeToken(token.name);
			}
		}	// for
		if (remoteLastAction != null){
			board.lastActionId = remoteLastAction.id;
		}
		drawPCPortraits();
		updateAllHpBar();

	} // if STATUS 200
	} // onReadyStateChange
}

