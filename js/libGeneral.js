var MAXX = 0, MAXY = 0;

// Wait for a time
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
