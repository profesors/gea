var MAXX = 0, MAXY = 0;
var T_PRECISION = 20;
var reRemoveToken = RegExp(/\sx/);
var reTokenName = RegExp(/@([^ ]*)/);
const DISABLED_OPACITY = 0.3;

// Wait for a time
// You can use it so: await sleep(ms);	Remember your delayed function must be 'async'
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Return pixels from the screen
function getPixel(nTile, sizeOfTile, offset){
	return (nTile-1)*sizeOfTile+offset; 
}

function getTokenByName(name){
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
			if (tilex>=arrTokens[i].x && tilex<(parseInt(arrTokens[i].x)+parseInt(arrTokens[i].w)) && 
					tiley>=arrTokens[i].y && tiley<(parseInt(arrTokens[i].y)+parseInt(arrTokens[i].h))){
				return arrTokens[i];
			}
		}
	}
	return null;
}

function getDistanceTiles(tilex1, tiley1, tilex2, tiley2){
	return Math.sqrt(((tilex2-tilex1)**2+(tiley2-tiley1)**2));
}


function getOpacityCoordinates(){
	var arrCoordinates = document.getElementsByClassName("coordinates");
	return arrCoordinates[0].style.opacity;
}

// Change div names of ALL tokens
function setOpacityDivNames(newVal){
	for (var i=0; i<arrTokens.length; i++){
		arrTokens[i].divName.style.opacity = newVal;
	}
}

function getOpacityDivNames(){
	return arrTokens[0].divName.style.opacity;
}

// Change just ONE div Dice, if name=='' hide all
function setOpacityDivDice(name, newVal){
	if (name == ''){
		for (var i=0; i<arrTokens.length; i++){
			arrTokens[i].divDice.style.opacity = 0;
		}
	} else {
		var divDice = document.getElementById("divDice_"+name);
		if (divDice != undefined){
			divDice.style.opacity = newVal;
		}
	}
}

// It shows the result of the dice fadeIn and then fadoOut
async function showDiceResult(name){
	setOpacityDivDice(name, 0);
	var dice = document.getElementById("divDice_"+name);
	dice.innerHTML = getTokenByName(name).diceResult;
	try{
		if (Number.isInteger(parseInt(getTokenByName(name).diceResult.split(' ')[0]))){
			document.getElementById("aDado").play();
		}
	} catch(e){
		console.log("Sonido de lanzamiento de dados. Audio no habilitado");
	}
	var y = 2*board.tileh/3;
	var y0 = y;
	dice.style.top = y+"px";
	dice.style.color = "white";
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
		setOpacityDivDice(name, p);
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
		setOpacityDivDice(name, p);
		await sleep(T_PRECISION);
		t = (new Date).getTime()-t0;
	}
	dice.style.opacity = 0;
}


async function updateHp(token){
	if (Number.isInteger(parseInt(token.attrs.hp)) && Number.isInteger(parseInt(token.attrs.maxhp))){
		var p = parseFloat(token.attrs.hp)/token.attrs.maxhp*100;	// Porcentaje
		var hpbar = document.getElementById("hpbar_"+token.name)
		if (hpbar != null) {	// Some tokens does not have hp bar
			//console.log("DENTRO "+token.name+" "+token.attrs.hp+" "+(new Date).getTime());
			//console.log(token.name+" "+token.attrs.hp);
			var hpnum = document.getElementById("hpnum_"+token.name)
			hpbar.setAttribute("y",101-p);
			hpbar.setAttribute("height",p-1);
			// Number div with HP
			var npy = 101-p+5;	// Posición Y del número de puntos de golpe
			if (npy<20) npy=20;
			if (npy>100) npy=100;
			hpnum.setAttribute("y",npy);
			hpnum.innerHTML = token.attrs.hp;
			if (token.attrs.hp<=0){
				document.getElementById("b"+token.name).style.opacity = DISABLED_OPACITY;
			}
		}
	}
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


function sendCommand(command){
	var rq = new XMLHttpRequest();
	rq.open("GET", "rq/send.php?m="+encodeURIComponent(command)+"&idBoard="+board.id);
	rq.send();
}

function runGuideline(guideline){
	var rq = new XMLHttpRequest();
	rq.open("GET", "rq/runGuideline.php?m="+encodeURIComponent(guideline)+"&idBoard="+board.id);
	rq.send();
}

function getSheetCharacter(name, idBoard, destDiv){
	var rq = new XMLHttpRequest();
	rq.open("GET", "rq/getSheet.php?idBoard="+board.id+"&name="+name);
	rq.send();
	rq.onreadystatechange = function(e) {
		if(rq.readyState === XMLHttpRequest.DONE && rq.status === 200){
			//destDiv.innerHTML = "<a class='close' onclick='closeInfoCharacter();'>Cerrar</a><br>"+rq.responseText;
			destDiv.innerHTML = rq.responseText;
		}
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

function removeAllLoadedTokens(){
	while (arrTokens.length > 0){
		var token = arrTokens.shift();
		var divToken = document.getElementById("token_"+token.name);
		canvas.removeChild(divToken);
	}
}

function drawCellCoordinates(){
	for (var y=1; y<=board.ntilesh; y++){
		for (var x=1; x<=board.ntilesw; x++){
			var txt = document.createElement("div");	
			txt.innerHTML = x+","+y;
			txt.style.left = getPixel(x, board.tilew, board.offsetx)+"px";
			txt.style.top = getPixel(y, board.tileh, board.offsety)+"px";
			txt.style.position = "absolute";
			txt.style.color = "#aaaaaa";//"white";
			txt.style.zIndex = 10;
			txt.style.textShadow = "1px 1px black";
			txt.style.opacity = "0";
			txt.setAttribute("class", "coordinates");
			canvas.appendChild(txt);
		}
	}
}

async function removeToken(name){
	await sleep(1000);
	var token = getTokenByName(name);
	var t0 = (new Date).getTime();
	var tf = t0+2000;
	var tt = tf-t0;
	var t=0.0;
	const k = Math.PI/(2*tt);
	while (t<tt){
		token.div.style.opacity = Math.cos(t*k);
		await sleep(T_PRECISION);
		t = (new Date).getTime()-t0;
	}
	sendCommand("@"+name+" p"+(board.ntilesw+1)+","+(board.ntilesh+1)+" aout");
	token.div.style.left = (board.ntilesw*board.tilew)+"px";
	token.div.style.top = (board.ntilesh*board.tilesh)+"px";
}

// Change opacity of ALL coordinates
function setOpacityCoordinates(newVal){
       var arrCoordinates = document.getElementsByClassName("coordinates");
       for (var i=0; i<arrCoordinates.length; i++){
               arrCoordinates[i].style.opacity = newVal;
       }
}

function distanceFromTokenToToken(token1, token2){
	var dMin = Number.MAX_SAFE_INTEGER;
	var x1,y1,x2,y2;
	for (var a=0; a<token1.w; a++){
		for (var b=0; b<token1.h; b++){
			for (var c=0; c<token2.w; c++){
				for (var d=0; d<token2.h; d++){
					var dTmp = getDistanceTiles(token1.x+a, token1.y+b, token2.x+c, token2.y+d);
					if (dTmp<dMin) {
						dMin=dTmp;
						x1=token1.x+a;
						y1=token1.y+b;
						x2=token2.x+c;
						y2=token2.y+d;
					}
				}
			}
		}
	}
	return {distance:dMin, p1:{x:x1, y:y1}, p2:{x:x2, y:y2}};
}

function distance(x1, y1, x2, y2){
	return Math.sqrt(((x2-x1)**2+(y2-y1)**2));
}


function togglePanelI(){
	var panel = document.getElementById("panelI");
	if (panel.style.display != 'block'){
		panel.style.display = 'block';
		updateActionsPanel(board.id);
	} else {
		panel.style.display = 'none';
	}
}

function hidePanelI(){
	var panel = document.getElementById("panelI");
	panel.style.display = 'none';
}
