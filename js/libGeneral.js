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

/*
function isInPathTiles(tilex, tiley){
	if (movement.pathTiles != null){
		for (var i=0; i<movement.pathTiles.length; i++){
			if (tilex==movement.pathTiles[i][0] && tiley == movement.pathTiles[i][1]){
				return true;
			}
		}
	}
	return false;
}*/

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

function setOpacityDivOutput(tokenName, newVal){
	var el = document.getElementById("divOutput_"+tokenName);
	if (el!=null){
		el.style.opacity = newVal;
	}
}

// ShowOutput
async function showTokenOutput(token){
	var divOutput = document.getElementById("divOutput_"+token.name);
	while(divOutput.style.opacity!=0){
		await sleep(T_PRECISION);
	}
	//setOpacityDivOutput(token.name, 0);
	if (divOutput!=null){
		divOutput.innerHTML = token.output.text;
		try{
			if (token.output.sound!=null){
				document.getElementById("aDado").play();
			}
		} catch(e){
			console.log("Sonido de lanzamiento de dados. Audio no habilitado");
		}
		var y = 2*board.tileh/3;
		var y0 = y;
		divOutput.style.top = y+"px";
		divOutput.style.color = "white";
		var t0 = (new Date).getTime();
		var tf = t0+2000;
		var t = 0.0;
		var tt = tf-t0;
		var k = Math.PI/(tt*2);
		var a = board.tileh/2;
		while(t<(tf-t0)){
			var p = Math.sin(t*k);
			y = y0 - a*p;
			divOutput.style.top=y+"px";
			setOpacityDivOutput(token.name, p);
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
			divOutput.style.top=y+"px";
			setOpacityDivOutput(token.name, p);
			await sleep(T_PRECISION);
			t = (new Date).getTime()-t0;
		}
		divOutput.style.opacity = 0;
	}
}

async function showMasterOutput(text, preTime, postTime){
	if (preTime!=null){
		await sleep(preTime);
	}
	//svgMaster = document.getElementById("svgMaster");

}

function updateAllHpBar(){
	for (var i=0; i<arrTokens.length; i++){
		if (arrTokens[i].pc == 1){
			updateHp(arrTokens[i]);
		}
	}
}

async function updateHp(token){
	if (Number.isInteger(parseInt(token.attrs.hp)) && Number.isInteger(parseInt(token.attrs.maxhp))){
		var p = parseFloat(token.attrs.hp)/token.attrs.maxhp*100;	// Porcentaje
		var hpbar = document.getElementById("PCHealthBar_"+token.name)
		if (hpbar != null) {	// Some tokens does not have hp bar
			//console.log("DENTRO "+token.name+" "+token.attrs.hp+" "+(new Date).getTime());
			//console.log(token.name+" "+token.attrs.hp);
			var hpnum = document.getElementById("PCHealthNum_"+token.name)
			hpbar.setAttribute("y",101-p);
			hpbar.setAttribute("height",p-1);
			// Number div with HP
			var npy = 101-p+5;	// Posición Y del número de puntos de golpe
			if (npy<20) npy=20;
			if (npy>100) npy=100;
			hpnum.setAttribute("y",npy);
			hpnum.innerHTML = token.attrs.hp;
			if (token.attrs.hp<=0){
				document.getElementById("panel_"+token.name).style.opacity = DISABLED_OPACITY;
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
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	svg.setAttribute("id", "svgCanvas");
	svg.setAttribute("width", w);
	svg.setAttribute("height", h);
	svg.setAttribute("style", "z-index: 20; position: absolute;");
	svg.setAttribute("version", "1.1");
	canvas.appendChild(svg);

	var w = board.ntilesw*board.tilew;
	var h = board.ntilesh*board.tileh;
	svgOver = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgOver.setAttribute("id", "svgCanvasOver");
	svgOver.setAttribute("width", w);
	svgOver.setAttribute("height", h);
	svgOver.setAttribute("style", "z-index: 21; position: absolute;");
	svgOver.setAttribute("version", "1.1");
	canvas.appendChild(svgOver);

	var svgPanelPC = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgPanelPC.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svgPanelPC.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	svgPanelPC.setAttribute("id", "svgPanelPC");
	svgPanelPC.setAttribute("width", 128);
	svgPanelPC.setAttribute("height", 128);
	svgPanelPC.setAttribute("style", "z-index: 22; position: fixed; top:0; right:0; background-color:black;");
	svgPanelPC.setAttribute("version", "1.1");
	canvas.appendChild(svgPanelPC);
	/*
	var buttonNewTurn =document.createElementNS("http://www.w3.org/2000/svg", "circle");
	buttonNewTurn.setAttribute("cx",50);
	buttonNewTurn.setAttribute("cy",50);
	buttonNewTurn.setAttribute("r",40);
	buttonNewTurn.setAttribute("fill", "white");
	buttonNewTurn.setAttribute("stroke-width",1);
	buttonNewTurn.setAttribute("stroke","blue");
	svgPanelPC.appendChild(buttonNewTurn);
*/

	/*
	var svgMaster = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgMaster.setAttribute("id", "svgMaster");
	svgMaster.setAttribute("width", 512);
	svgMaster.setAttribute("height", 64);
	svgMaster.setAttribute("fill", "white");
	svgMaster.setAttribute("style", "z-index: 22; position: fixed; top:0; left:0;");
	svgMaster.setAttribute("version", "1.1");
	canvas.appendChild(svgMaster);
	*/
}

function newTurn(){
	console.log("COMIENZA TURNO "+board.turn);
	for(var i=0; i<=arrTokens.length; i++){
		if (arrTokens[i]!=null){
			for (var key in arrTokens[i].steps){
				arrTokens[i].steps[key].current = arrTokens[i].steps[key].max;
			}
			arrTokens[i].divGuideline.style.filter = "initial";
		}
	}
}

function drawPCPortraits(){
	var nPCs = 0;
	for(var i=0; i<arrTokens.length; i++){
		if (arrTokens[i].pc==1){
			nPCs++;
			if (!document.getElementById("panel_"+arrTokens[i].name)){
				svgPanelPC = document.getElementById("svgPanelPC");
				svgPanelPC.setAttribute("height", 64+128*nPCs);

				// Container
				var svgPC = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				svgPC.setAttribute("xmlns", "http://www.w3.org/2000/svg");
				svgPC.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
				svgPC.setAttribute("id", "panel_"+arrTokens[i].name);
				svgPC.setAttribute('weight', 128);
				svgPC.setAttribute('height', 140);
				svgPC.setAttribute('y', 64+128*(nPCs-1));

				var im = document.createElementNS('http://www.w3.org/2000/svg','image');
				im.setAttribute('height', '100');
				im.setAttribute('weight', '100');
				im.setAttribute('id', 'portrait_'+arrTokens[i].name);
				im.setAttribute("class", "portrait");
				im.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/tokens/'+arrTokens[i].imgSrc);
				im.setAttribute('x', '28');
				im.setAttribute('y', '0');
				im.setAttribute('onclick','openSheet(this);');
				im.setAttribute('onmousemove',"this.style.cursor='pointer'");
				svgPC.appendChild(im);

				var recBgWhite = document.createElementNS('http://www.w3.org/2000/svg','rect');
				recBgWhite.setAttribute("x",17);
				recBgWhite.setAttribute("y",0);
				recBgWhite.setAttribute("width",8);
				recBgWhite.setAttribute("height",100);
				recBgWhite.setAttribute("fill", "white");
				recBgWhite.setAttribute("stroke-width",1);
				recBgWhite.setAttribute("stroke","white");
				svgPC.appendChild(recBgWhite);

				var recBar = document.createElementNS('http://www.w3.org/2000/svg','rect');
				recBar.setAttribute("id","PCHealthBar_"+arrTokens[i].name);
				recBar.setAttribute("x",18);
				recBar.setAttribute("y",50);
				recBar.setAttribute("width",6);
				recBar.setAttribute("height",50);
				recBar.setAttribute("fill", "lime");
				svgPC.appendChild(recBar);

				var num = document.createElementNS('http://www.w3.org/2000/svg','text');
				num.setAttribute("id","PCHealthNum_"+arrTokens[i].name);
				num.setAttribute("x",0);
				num.setAttribute("y",60);
				num.setAttribute("font-size","0.7rem");
				num.setAttribute("font-weight","bold");
				num.setAttribute("fill", "white");
				svgPC.appendChild(num);


				svgPanelPC.appendChild(svgPC);
			}
		}
	}
	// Icon dice
	/*
	var iconDice = document.createElementNS('http://www.w3.org/2000/svg','circle');
	iconDice.setAttribute("cx",16);
	iconDice.setAttribute("cy",16);
	iconDice.setAttribute("r",16);
	iconDice.setAttribute("fill", "white");
	iconDice.setAttribute("stroke-width",1);
	iconDice.setAttribute("stroke","white");
	iconDice.setAttribute("onclick","showPanelDice()");
	svgPanelPC.appendChild(iconDice);
	*/
}
/*
function showPanelDice(){
}*/

function openSheet(item){
	if (movement.token!=null){
		movement.token.divName.style.color="yellow";
		movement.token.divName.style.opacity = movement.opacityDivName;
		movement.token = null;
	}
	hidePanelI();			
	var name = item.parentElement.id.substring(6);
	var divInfo = document.getElementById("info_character");
	divInfo.style.display = "grid";
	getSheetCharacter(name, board.id, divInfo);
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

function addSvgText(id ,x, y, color, colorStroke, text, size, extraStyle=null){
	var el = document.createElementNS("http://www.w3.org/2000/svg", "text");
	el.setAttribute("id",id);
	el.setAttribute("x",x);
	el.setAttribute("y",y);
	el.setAttribute("fill", color);
	el.setAttribute("stroke", colorStroke);
	el.setAttribute("font-size", size+"px");
	var style = "";
	if (extraStyle!=null) style+=extraStyle;
	el.setAttribute("style", style);
	var txt = document.createTextNode(text);
	el.appendChild(txt);
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
	rq.open("GET", "systems/lmde/getSheet.php?idBoard="+board.id+"&name="+name);
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
			txt.style.zIndex = 11;
			txt.style.textShadow = "1px 1px black";
			txt.style.opacity = "0";
			txt.setAttribute("class", "coordinates");
			canvas.appendChild(txt);
		}
	}
}

async function removeToken(token){
	await sleep(2000);
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
	sendCommand("@"+(token.name)+" p"+(token.x)+","+(token.y)+","+(board.ntilesw+1)+","+(board.ntilesh+1)+" aout");
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

function pathEqual(path1, path2){
	if (path1 == null) return false;
	if (path2 == null) return false;
	if (path1.length !== path2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i < path1.length; i++) {
		if ((path1[i].x!=path2[i].x)) return false;
		if ((path1[i].y!=path2[i].y)) return false;
	}
	return true;
}

function svgRemoveAllChildren(){
	var child = svg.lastElementChild;
	while(child){
		svg.removeChild(child);
		child = svg.lastElementChild;
	}
}
