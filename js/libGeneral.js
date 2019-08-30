var MAXX = 0, MAXY = 0;

// Wait for a time
// You can use it so: await sleep(ms);	Remember your delayed function must be 'async'
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Return pixels from the screen
function getPixel(pos, sizeOfTile, offset){
	return (pos-1)*sizeOfTile+offset; 
}

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

// Change opacity of ALL coordinates
function setOpacityCoordinates(newVal){
	var arrCoordinates = document.getElementsByClassName("coordinates");
	for (var i=0; i<arrCoordinates.length; i++){
		arrCoordinates[i].style.opacity = newVal;
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

function getOpacityTagNAmes(){
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
		setOpacityCoordinates(0);
		setOpacityTagNames(0);
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

function updateActionsPanel(idBoard){
	const rq = new XMLHttpRequest();
	rq.open("GET", "rq/getActions.php?idBoard="+idBoard);
	rq.send();
	rq.onreadystatechange = function(e) {
	if(rq.readyState === XMLHttpRequest.DONE && rq.status === 200){
		//console.log(rq.responseText);
		const stdOutput = document.getElementById("stdOutput");
		stdOutput.innerHTML = rq.responseText;
		stdOutput.scrollTop = stdOutput.scrollHeight;
	}
	}
}

