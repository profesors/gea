var MAXX = 0, MAXY = 0;
var T_PRECISION = 20;

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
	var y = 2*board.tileh/3;
	var y0 = y;
	dice.style.top = y+"px";
	var t0 = (new Date).getTime();
	var tf = t0+2000;
	var t = 0.0;
	var tt = tf-t0;
	var k = Math.PI/(tt*2);
	var a = board.tileh/2;
	while(t<(tf-t0)){
		var p = Math.sin(t*k);
		y = y0 - a*p;
		dice.style.top=y+"px";
		setOpacityTagDice(name, p);
		await sleep(T_PRECISION);
		t = (new Date).getTime()-t0;
	}
	await sleep(2000);	// Wait for a time to show result
	t0 = (new Date).getTime();
	tf = t0+2000;
	t = 0.0;
	tt = tf-t0;
	k = Math.PI/(tt*2);
	a = board.tileh/2;
	y0 = y;
	while(t<(tf-t0)){
		var p = Math.cos(t*k);
		y = y0 - a*(1-p);
		dice.style.top=y+"px";
		setOpacityTagDice(name, p);
		await sleep(T_PRECISION);
		t = (new Date).getTime()-t0;
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
		token.div.style.zIndex = 10;
		const pi2 = Math.PI/2;
		for (var i=0; i<=pi2; i+=0.01){
			token.div.style.left = (ox+Math.sin(i)*dx)+"px";
			token.div.style.top = (oy+Math.sin(i)*dy)+"px";
			token.div.style.transform = "scale("+(0.5*Math.sin(2*i)+1)+")";
			await sleep(1);
		}
		token.x = toX;
		token.y = toY;
		token.div.style.zIndex = 1;
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
	var p = parseFloat(currenthp)/maxhp*100;	// Porcentaje
	var hpbar = document.getElementById("hpbar_"+token.name)
	if (hpbar != null) {	// Some tokens does not have hp bar
		var hpnum = document.getElementById("hpnum_"+token.name)
		hpbar.setAttribute("y",101-p);
		hpbar.setAttribute("height",p-1);
		// Number tag with HP
		var npy = 101-p+5;	// Posición Y del número de puntos de golpe
		if (npy<20) npy=20;
		if (npy>100) npy=100;
		hpnum.setAttribute("y",npy);
		hpnum.innerHTML = currenthp;
	}
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
	svg.setAttribute("style", "z-index: 5; position: absolute;");
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
async function drawLineDisappears(token, tilex, tiley){
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
async function drawCloseCombatDisappears(token, tilex, tiley){
	disablePj(token, 6000);
	var el = document.createElementNS("http://www.w3.org/2000/svg", "line");
	var id = "attack"+(new Date).getTime();
	var x1 = getPixel(token.x, board.tilew, board.offsetx+board.tilew/2);
	var y1 = getPixel(token.y, board.tileh, board.offsety+board.tileh/2);
	var x2 = getPixel(tilex, board.tilew, board.offsetx+board.tilew/2);
	var y2 = getPixel(tiley, board.tileh, board.offsety+board.tileh/2);
	var pmx = (x2+x1)/2;	// Middle point in x
	var pmy = (y2+y1)/2;	// Middle point in y
	var tx = (x2-x1)/3;		// Transaltion in x
	var ty = (y2-y1)/3;		// Translation in y
	el.setAttribute("id",id);
	el.setAttribute("x1", (pmx+x1)/2);
	el.setAttribute("y1", (pmy+y1)/2);
	el.setAttribute("x2", x2);
	el.setAttribute("y2", y2);
	var style = "stroke-width: 12; stroke:"+token.border.split(' ')[2]+"; ";
	//style+= "animation-name: disappear; animation-duration: 2s; stroke-linecap:butt; stroke-dasharray:10,5";
	style+= "stroke-linecap:butt; stroke-dasharray:10,5";
	el.setAttribute("style", style);
	var transform = "translate("+tx+" "+ty+") rotate("+(70+Math.floor(Math.random()*40)+1)+" "+pmx+" "+pmy+")";
	el.setAttribute("transform",transform);
	svg.appendChild(el);
	at = el;
	for (var t=0; t<=Math.PI; t+=(Math.PI/100)){
		el.style.opacity = Math.sin(t);
		await sleep(1);
	}
	await sleep(1500);
	svg.removeChild(el);
}

// Draw a ranged combat icon from token to tilex, tiley and then disappears
async function drawRangedCombatDisappears(token, tilex, tiley){
	disablePj(token, 8000);
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
	elLine.setAttribute("id",id);
	elLine.setAttribute("x1", x1);
	elLine.setAttribute("y1", y1);
	elLine.setAttribute("x2", x2);
	elLine.setAttribute("y2", y2);
	var style = "stroke-width: 3; stroke:"+token.border.split(' ')[2]+"; ";
	var animation= "animation-name: disappear; animation-duration: 3s; stroke-linecap:butt; stroke-dasharray:5,25;";
	style+=animation;
	elLine.setAttribute("style", style);
	svg.appendChild(elLine);
	setTimeout(function (){
		var idC = "circ"+(new Date).getTime();
		var elCircle = addSvgCircle(idC,x2,y2,20,token.border.split(' ')[2], animation);
		setTimeout(function (){
			svg.removeChild(elLine);
			svg.removeChild(elCircle);
		},2500);
	},500);
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
			destDiv.innerHTML = "<a class='close' onclick='closeInfoCharacter();'>Cerrar</a><br>"+rq.responseText;
		}
	}
}

function runGuidelines(token, tilex, tiley, bSendCommand=false){
	// Acording to de distance, use one guideline or other
	var d = getDistanceTiles(token.x, token.y, tilex, tiley);
	if (d<=1 && (1 in token.guidelines)){
		if (bSendCommand) sendCommand("@"+token.name+" "+token.guidelines[1]+" t"+tilex+","+tiley);
		drawCloseCombatDisappears(token, tilex, tiley);
	}
	if (d>1 && (2 in token.guidelines)){
		if (bSendCommand) sendCommand("@"+token.name+" "+token.guidelines[2]+" t"+tilex+","+tiley);
		drawRangedCombatDisappears(token, tilex, tiley);
	}
}

async function disablePj(token, time){
	var tf = (new Date).getTime()+time;
	var bPj= document.getElementById("b"+token.name);
	if (bPj!=null){
		bPj.style.opacity="0.3";
		var t = tf-(new Date).getTime();
		while((tf-(new Date).getTime())>0) await sleep(T_PRECISION);
		bPj.style.opacity="1";
	}
}

function isEnabled(token){
	var bRet = true;
	if (document.getElementById("b"+token.name)){	// It has b control panel (=portrait)
		if (document.getElementById("b"+token.name).style.opacity=="0.3"){
			bRet = false;
		}
	}
	return bRet;
}
