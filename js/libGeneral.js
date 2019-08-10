var MAXX = 0, MAXY = 0;

// Wait for a time
// You can use it so: await sleep(ms);	Remember your delayed function must be 'async'
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Return pixels from the screen
function getPixel(pos, sizeOfTile){
	return (pos-1)*sizeOfTile; 
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

async function showDiceResult(name){
	setOpacityTagDice(name, 0);
	var wait = 25;
	for (var i=0; i<=1; i+=0.025){
		setOpacityTagDice(name, i);
		await sleep(wait);
	}
	await sleep(200*wait);
	for (var i=1; i>=0; i-=0.025){
		setOpacityTagDice(name, i);
		await sleep(wait);
	}
}
