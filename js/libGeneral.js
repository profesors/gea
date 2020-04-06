var MAXX = 0, MAXY = 0;

// Wait for a time
// You can use it so: await sleep(ms);	Remember your delayed function must be 'async'
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Return pixels from the screen
function getPixel(nTile, sizeOfTile, offset){
	return (nTile-1)*sizeOfTile+offset; 
}

// @TODO cambiar nombre a getTokenByName
function getTokenFromArrTokens(name){
	var token = null;
	for (var i=0; i<arrTokens.length; i++){
		if (arrTokens[i].name == name){
			token = arrTokens[i];
			break;
		}
	}
	return token;
}

function getTokenByTile(tilex,tiley){
	for (var i=0; i<arrTokens.length; i++){
		if (arrTokens[i].x == tilex && arrTokens[i].y == tiley){
			return arrTokens[i];
		}
		// If the token is grater than 1x1
		if (arrTokens[i].w >1 || arrTokens[i].h>1){
			if (tilex>=arrTokens[i].x && tilex<=arrTokens[i].x+arrTokens[i].w && 
					tiley>=arrTokens[i].y && tiley<=arrTokens[i].y+arrTokenks[i].h){
				return arrTokens[i];
			}
		}
	}
	return null;
}

// Rounded to floor
function getDistanceTiles(tilex1, tiley1, tilex2, tiley2){
	return Math.floor(Math.sqrt(((tilex2-tilex1)**2+(tiley2-tiley1)**2)));
}

// Change opacity of ALL coordinates
function setOpacityCoordinates(newVal){
	var arrCoordinates = document.getElementsByClassName("coordinates");
	for (var i=0; i<arrCoordinates.length; i++){
		arrCoordinates[i].style.opacity = newVal;
		//arrCoordinates[i].style.opacity = 0;
	}
}

function getOpacityCoordinates(){
	var arrCoordinates = document.getElementsByClassName("coordinates");
	return arrCoordinates[0].style.opacity;
}

// Change tag names of ALL tokens
function setOpacityTagNames(newVal){
	for (var i=0; i<arrTokens.length; i++){
		arrTokens[i].tagName.style.opacity = newVal;
	}
}

function getOpacityTagNames(){
	return arrTokens[0].tagName.style.opacity;
}

// Change just ONE tag Dice, if name=='' hide all
function setOpacityTagDice(name, newVal){
	if (name == ''){
		for (var i=0; i<arrTokens.length; i++){
			arrTokens[i].tagDice.style.opacity = 0;
		}
	} else {
		var bPj= document.getElementById("b"+name);
		if (bPj!=null){
			bPj.style.opacity="0.3";
			setTimeout(function(){bPj.style.opacity="1";}, 8000);
		}
		var tagDice = document.getElementById("tagDice"+name);
		if (tagDice != undefined){
			tagDice.style.opacity = newVal;
		}
	}
}

// It shows the result of the dice fadeIn and then fadoOut
async function showDiceResult(name){
	setOpacityTagDice(name, 0);
	document.getElementById("aDado").play();
	var dice = document.getElementById("tagDice"+name);
	var y = board.tileh/2;
	const oy = y, p2 = Math.PI/2;
	dice.style.top = y+"px";
	var wait = 25;
	for (var i=0; i<=1; i+=0.025){
		y = oy - Math.sin(i*p2)*oy;
		dice.style.top = y+"px";
		setOpacityTagDice(name, i);
		await sleep(wait);
	}
	await sleep(200*wait);
	for (var i=1; i>=0; i-=0.025){
		y = -oy * (Math.cos(i*p2));
		dice.style.top = y+"px";
		setOpacityTagDice(name, i);
		await sleep(wait);
	}
	dice.style.opacity = 0;
}

async function moveToken(token, toX, toY){
	// From (ox, oy) to (ox+dx, oy+dy)
	if (token.x != toX || token.y != toY){
		//setOpacityCoordinates(0);
		//setOpacityTagNames(0);
		const ox = getPixel(token.x, board.tilew, board.offsetx);
		const oy = getPixel(token.y, board.tileh, board.offsety);
		const dx = getPixel(toX, board.tilew, board.offsetx)-ox;
		const dy = getPixel(toY, board.tileh, board.offsety)-oy;
		const oz = token.z;
		token.div.style.zIndex = 200;
		const pi2 = Math.PI/2;
		for (var i=0; i<=pi2; i+=0.01){
			token.div.style.left = (ox+Math.sin(i)*dx)+"px";
			token.div.style.top = (oy+Math.sin(i)*dy)+"px";
			token.div.style.transform = "scale("+(0.5*Math.sin(2*i)+1)+")";
			await sleep(1);
		}
		token.x = toX;
		token.y = toY;
		token.div.style.zIndex = 100;
		token.div.style.transform = "scale(1)";
	}
}

async function updateHp(token){
	var maxhp, currenthp;
	token.attrs.forEach(function (item){
		if (item[0]=="maxhp"){
			maxhp = item[1];
		}
		if (item[0]=="hp"){
			currenthp = item[1];
		}
	});
	//currenthp = 7;
	//maxhp=10;
	var p = parseFloat(currenthp)/maxhp*100;	// Porcentaje
	var hpbar = document.getElementById("hpbar_"+token.name)
	if (hpbar == null) console.log("NULO PARA "+token.name);
	var hpnum = document.getElementById("hpnum_"+token.name)
	hpbar.setAttribute("y",101-p);
	hpbar.setAttribute("height",p-1);
	// Número con los puntos de golpe
	var npy = 101-p+5;	// Posición Y del número de puntos de golpe
	if (npy<20) npy=20;
	if (npy>100) npy=100;
	hpnum.setAttribute("y",npy);
	hpnum.innerHTML = currenthp;
	//sendCommand("@"+token.name+" [hp:"+currenthp+"]");
}

function setAttr(token, attr, val){
	for(var i=0; i<token.attrs.length; i++){
		if (token.attrs[i][0]==attr) {
			token.attrs[i][1]=val;
			return;
		}
	}
}

function getAttr(token, attr){
	for(var i=0; i<token.attrs.length; i++){
		if (token.attrs[i][0]==attr){
			return token.attrs[i][1];
		}
	}
	return null;
}

function updateActionsPanel(idBoard){
	const rq = new XMLHttpRequest();
	rq.open("GET", "rq/getActions.php?idBoard="+idBoard+"&op=player");
	rq.send();
	rq.onreadystatechange = function(e) {
	if(rq.readyState === XMLHttpRequest.DONE && rq.status === 200){
		const stdOutput = document.getElementById("stdOutput");
		stdOutput.innerHTML = rq.responseText;
		stdOutput.scrollTop = stdOutput.scrollHeight;
	}
	}
}

// Add the SVG child
function addSvgCanvas(){
	var w = board.ntilesw*board.tilew;
	var h = board.ntilesh*board.tileh;
	svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("id", "svgCanvas");
	svg.setAttribute("width", w);
	svg.setAttribute("height", h);
	svg.setAttribute("style", "z-index: 101; position: absolute;");
	svg.setAttribute("version", "1.1");
	canvas.appendChild(svg);
}

function addSvgCircle(id, x, y, r, fill, extraStyle=null){
	var el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	el.setAttribute("id",id);
	el.setAttribute("cx",x);
	el.setAttribute("cy",y);
	el.setAttribute("r",r);
	el.setAttribute("fill",fill);
	var style = "";
	if (extraStyle!=null) style+=extraStyle;
	el.setAttribute("style", style);
	svg.appendChild(el);
	return el;
}

function addSvgLine(id, x0, y0, x1, y1, color, width, extraStyle=null){
	var el = document.createElementNS("http://www.w3.org/2000/svg", "line");
	el.setAttribute("id",id);
	el.setAttribute("x1",x0);
	el.setAttribute("y1",y0);
	el.setAttribute("x2",x1);
	el.setAttribute("y2",y1);
	var style = "stroke-width: "+width+"; stroke:"+color+";";
	if (extraStyle!=null) style+=extraStyle;
	el.setAttribute("style", style);
	svg.appendChild(el);
	return el;
}

// Draw a line from token to tilex, tiley and then disappears
function drawLineDisappears(token, tilex, tiley){
	var extraStyle = "animation-name: disappear; animation-duration: 4s; stroke-linecap:round; stroke-dasharray:15,5";
	var l=addSvgLine("line_movement"+(new Date).getTime(), 
		getPixel(token.x,board.tilew,board.offsetx+board.tilew/2),
		getPixel(token.y,board.tileh,board.offsety+board.tileh/2),
		getPixel(tilex,board.tilew,board.offsetx+board.tilew/2),
		getPixel(tiley,board.tileh,board.offsety+board.tileh/2), 
		(token.border.split(' '))[2], 2, extraStyle);
	setTimeout(function (){svg.removeChild(l);},3500);
}

// Draw a combat icon from token to tilex, tiley and then disappears
function drawCloseCombatDisappears(token, tilex, tiley){
	var el = document.createElementNS("http://www.w3.org/2000/svg", "line");
	var id = "attack"+(new Date).getTime();
	var x1 = getPixel(token.x, board.tilew, board.offsetx+board.tilew/2);
	var y1 = getPixel(token.y, board.tileh, board.offsety+board.tileh/2);
	var x2 = getPixel(tilex, board.tilew, board.offsetx+board.tilew/2);
	var y2 = getPixel(tiley, board.tileh, board.offsety+board.tileh/2);
	var pmx = (x2+x1)/2;	// Middle point in x
	var pmy = (y2+y1)/2;	// Middle point in y
	var tx = (x2-x1)/2;		// Transaltion in x
	var ty = (y2-y1)/2;		// Translation in y
	el.setAttribute("id",id);
	el.setAttribute("x1", x1);
	el.setAttribute("y1", y1);
	el.setAttribute("x2", x2);
	el.setAttribute("y2", y2);
	var style = "stroke-width: 15; stroke:"+token.border.split(' ')[2]+"; ";
	style+= "animation-name: disappear; animation-duration: 4s; stroke-linecap:butt; stroke-dasharray:10,5";
	el.setAttribute("style", style);
	var transform = "translate("+tx+" "+ty+") rotate(90 "+pmx+" "+pmy+")";
	el.setAttribute("transform",transform);
	svg.appendChild(el);
	setTimeout(function (){svg.removeChild(el);},2500);
}

// Draw a ranged combat icon from token to tilex, tiley and then disappears
function drawRangedCombatDisappears(token, tilex, tiley){
	var elLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
	var id = "ranged"+(new Date).getTime();
	var x1 = getPixel(token.x, board.tilew, board.offsetx+board.tilew/2);
	var y1 = getPixel(token.y, board.tileh, board.offsety+board.tileh/2);
	var x2 = getPixel(tilex, board.tilew, board.offsetx+board.tilew/2);
	var y2 = getPixel(tiley, board.tileh, board.offsety+board.tileh/2);
	var pmx = (x2+x1)/2;	// Middle point in x
	var pmy = (y2+y1)/2;	// Middle point in y
	var tx = (x2-x1)/2;		// Transaltion in x
	var ty = (y2-y1)/2;		// Translation in y
	console.log("T:"+tx+" "+ty);
	elLine.setAttribute("id",id);
	elLine.setAttribute("x1", x1);
	elLine.setAttribute("y1", y1);
	elLine.setAttribute("x2", x2);
	elLine.setAttribute("y2", y2);
	var style = "stroke-width: 1; stroke:"+token.border.split(' ')[2]+"; ";
	var animation= "animation-name: disappear; animation-duration: 4s; stroke-linecap:butt; stroke-dasharray:5,25;";
	style+=animation;
	elLine.setAttribute("style", style);
	var transform = "translate("+tx+" "+ty+")"+pmx+" "+pmy+")";
	elLine.setAttribute("transform",transform);
	svg.appendChild(elLine);
	var elCircle = addSvgCircle("circle",x2,y2,20,token.border.split(' ')[2], animation);
	setTimeout(function (){svg.removeChild(elLine);},1500);
	setTimeout(function (){svg.removeChild(elCircle);},3500);
}
function sendCommand(command){
	var rq = new XMLHttpRequest();
	rq.open("GET", "rq/send.php?m="+encodeURIComponent(command)+"&idBoard="+board.id);
	rq.send();
}

function getSheetCharacter(name, idBoard, destDiv){
	var rq = new XMLHttpRequest();
	rq.open("GET", "rq/getSheet.php?idBoard="+board.id+"&name="+name);
	rq.send();
	rq.onreadystatechange = function(e) {
		if(rq.readyState === XMLHttpRequest.DONE && rq.status === 200){
			destDiv.innerHTML = "<a class='close' onclick='closeInfoCharacter();' href='#'>Cerrar</a><br>"+rq.responseText;
		}
	}
}
