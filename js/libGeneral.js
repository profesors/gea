var MAXX = 0;
var MAXY = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Create a new element but do not insert it
function newElement(type, data){
	var element = document.createElementNS('http://www.w3.org/2000/svg', type);
	for(var key in data){
		element.setAttributeNS(null, key, data[key]);
	}
	return element;
}

// Create a new element and insert it
function addElement(canvas, type, data){
	var element = newElement(type, data);
	canvas.appendChild(element);
	return element;
}

// Para modificar el texto hacer: element.textContent = "Hola mundo"
function newTextNode(content, data){
	var element = newElement('text', data);
	var textNode = document.createTextNode(content);
	element.appendChild(textNode);
	return element;
}

// Create a text element and add it
function addTextNode(canvas, content, data){
	var txtNode = newTextNode(content, data);
	canvas.appendChild(txtNode);
	return txtNode;
}

