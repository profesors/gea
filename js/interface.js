document.addEventListener('DOMContentLoaded', function(){ 
	/******************* PJ 1 ********************************/
	document.querySelectorAll(".b11").forEach(function (item){
		item.addEventListener('click', function (){
		var token = getTokenByName(item.parentElement.id.substring(1));
		if (item.parentElement.style.opacity!= DISABLED_OPACITY){
			sendCommand("@"+token.name+" "+token.guidelines[1]);
		}
		event.stopPropagation();
		}, false);

	});
	document.querySelectorAll(".b12").forEach(function (item){
		item.addEventListener('click', function (){
		var token = getTokenByName(item.parentElement.id.substring(1));
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@"+token.name+" "+token.guidelines[2]);
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b13").forEach(function (item){
		item.addEventListener('click', function (){
		var token = getTokenByName(item.parentElement.id.substring(1));
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@bar #1d4");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b14").forEach(function (item){
		item.addEventListener('click', function (){
		var token = getTokenByName(item.parentElement.id.substring(1));
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@bar #1d6");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b15").forEach(function (item){
		item.addEventListener('click', function (){
		var token = getTokenByName(item.parentElement.id.substring(1));
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@bar #1d8");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b16").forEach(function (item){
		item.addEventListener('click', function (){
		var token = getTokenByName(item.parentElement.id.substring(1));
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@bar #1d10");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b17").forEach(function (item){
		item.addEventListener('click', function (){
		var token = getTokenByName(item.parentElement.id.substring(1));
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@bar #1d20");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b18").forEach(function (item){
		item.addEventListener('click', function (){
		var token = getTokenByName(item.parentElement.id.substring(1));
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@bar #1d100");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b19a").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			var token = getTokenByName(item.parentElement.id.substring(1));
			var hpbar = document.getElementById("hpbar_"+token.name);
			var currenthp = token.attrs.hp;
			var maxhp = token.attrs.maxhp;
			currenthp++;
			(currenthp>maxhp)?hpbar.setAttribute("fill","orange"):hpbar.setAttribute("fill","lime");
			//token.attrs.hp = currenthp;
			sendCommand("@"+token.name+" [hp:"+currenthp+"]");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b19b").forEach(function (item){
		item.addEventListener('click', function (){
		var token = getTokenByName(item.parentElement.id.substring(1));
		if (item.parentElement.style.opacity!="0.3"){
			var token = getTokenByName(item.parentElement.id.substring(1));
			var hpbar = document.getElementById("hpbar_"+token.name);
			var currenthp = parseInt(token.attrs.hp);
			var maxhp = parseInt(token.attrs.maxhp);
			currenthp--;
			(currenthp>maxhp)?hpbar.setAttribute("fill","orange"):hpbar.setAttribute("fill","lime");
			//token.attrs.hp = currenthp;
			sendCommand("@"+token.name+" [hp:"+currenthp+"]");
		}
		event.stopPropagation();
		}, false);
	});
	/******************* PJ 2 ********************************/
	document.querySelectorAll(".b21").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@exp #1d20+2,1d8+2");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b22").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@exp #1d20+1,1d8");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b23").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@exp #1d4");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b24").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@exp #1d6");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b25").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@exp #1d8");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b26").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@exp #1d10");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b27").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@exp #1d20");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b28").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@exp #1d100");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b29a").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			var token = getTokenByName(item.parentElement.id.substring(1));
			var hpbar = document.getElementById("hpbar_"+token.name);
			var currenthp = parseInt(token.attrs.hp);
			var maxhp = parseInt(token.attrs.maxhp);
			currenthp++;
			(currenthp>maxhp)?hpbar.setAttribute("fill","orange"):hpbar.setAttribute("fill","lime");
			//token.attrs.hp = currenthp;
			updateHp(token);
			sendCommand("@"+token.name+" [hp:"+currenthp+"]");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b29b").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			var token = getTokenByName(item.parentElement.id.substring(1));
			var hpbar = document.getElementById("hpbar_"+token.name);
			var currenthp = parseInt(token.attrs.hp);
			var maxhp = parseInt(token.attrs.maxhp);
			currenthp--;
			(currenthp>maxhp)?hpbar.setAttribute("fill","orange"):hpbar.setAttribute("fill","lime");
			//token.attrs.hp = currenthp;
			updateHp(token);
			sendCommand("@"+token.name+" [hp:"+currenthp+"]");
		}
		event.stopPropagation();
		}, false);
	});
	/******************* PJ 3 ********************************/
	document.querySelectorAll(".b31").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@elf #1d20+2,1d8+1");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b32").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@elf #1d20+3,1d8");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b33").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@elf #1d4");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b34").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@elf #1d6");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b35").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@elf #1d8");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b36").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@elf #1d10");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b37").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@elf #1d20");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b38").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@elf #1d100");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b39a").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			var token = getTokenByName(item.parentElement.id.substring(1));
			var hpbar = document.getElementById("hpbar_"+token.name);
			var currenthp = parseInt(token.attrs.hp);
			var maxhp = parseInt(token.attrs.maxhp);
			currenthp++;
			(currenthp>maxhp)?hpbar.setAttribute("fill","orange"):hpbar.setAttribute("fill","lime");
			//token.attrs.hp = currenthp;
			updateHp(token);
			sendCommand("@"+token.name+" [hp:"+currenthp+"]");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b39b").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			var token = getTokenByName(item.parentElement.id.substring(1));
			var hpbar = document.getElementById("hpbar_"+token.name);
			var currenthp = parseInt(token.attrs.hp);
			var maxhp = parseInt(token.attrs.maxhp);
			currenthp--;
			(currenthp>maxhp)?hpbar.setAttribute("fill","orange"):hpbar.setAttribute("fill","lime");
			//token.attrs.hp = currenthp;
			updateHp(token);
			sendCommand("@"+token.name+" [hp:"+currenthp+"]");
		}
		event.stopPropagation();
		}, false);
	});
	/******************* PJ 4 ********************************/
	document.querySelectorAll(".b41").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@cle #1d20+1,1d8+1");
		}
		event.stopPropagation();
		}, false);

	});
	document.querySelectorAll(".b42").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@cle #1d20,1d8");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b43").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@cle #1d4");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b44").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@cle #1d6");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b45").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@cle #1d8");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b46").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@cle #1d10");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b47").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@cle #1d20");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b48").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@cle #1d100");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b49a").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			var token = getTokenByName(item.parentElement.id.substring(1));
			var hpbar = document.getElementById("hpbar_"+token.name);
			var currenthp = parseInt(token.attrs.hp);
			var maxhp = parseInt(token.attrs.maxhp);
			currenthp++;
			(currenthp>maxhp)?hpbar.setAttribute("fill","orange"):hpbar.setAttribute("fill","lime");
			//token.attrs.hp = currenthp;
			updateHp(token);
			sendCommand("@"+token.name+" [hp:"+currenthp+"]");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b49b").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			var token = getTokenByName(item.parentElement.id.substring(1));
			var hpbar = document.getElementById("hpbar_"+token.name);
			var currenthp = parseInt(token.attrs.hp);
			var maxhp = parseInt(token.attrs.maxhp);
			currenthp--;
			(currenthp>maxhp)?hpbar.setAttribute("fill","orange"):hpbar.setAttribute("fill","lime");
			//token.attrs.hp = currenthp;
			updateHp(token);
			sendCommand("@"+token.name+" [hp:"+currenthp+"]");
		}
		event.stopPropagation();
		}, false);
	});
	/******************* PJ 5 ********************************/
	document.querySelectorAll(".b51").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@lad #1d20,1d6");
		}
		event.stopPropagation();
		}, false);

	});
	document.querySelectorAll(".b52").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@lad #1d20+2,1d6");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b53").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@lad #1d4");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b54").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@lad #1d6");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b55").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@lad #1d8");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b56").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@lad #1d10");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b57").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@lad #1d20");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b58").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@lad #1d100");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b59a").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			var token = getTokenByName(item.parentElement.id.substring(1));
			var hpbar = document.getElementById("hpbar_"+token.name);
			var currenthp = parseInt(token.attrs.hp);
			var maxhp = parseInt(token.attrs.maxhp);
			currenthp++;
			(currenthp>maxhp)?hpbar.setAttribute("fill","orange"):hpbar.setAttribute("fill","lime");
			//token.attrs.hp = currenthp;
			updateHp(token);
			sendCommand("@"+token.name+" [hp:"+currenthp+"]");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b59b").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			var token = getTokenByName(item.parentElement.id.substring(1));
			var hpbar = document.getElementById("hpbar_"+token.name);
			var currenthp = parseInt(token.attrs.hp);
			var maxhp = parseInt(token.attrs.maxhp);
			currenthp--;
			(currenthp>maxhp)?hpbar.setAttribute("fill","orange"):hpbar.setAttribute("fill","lime");
			//token.attrs.hp = currenthp;
			updateHp(token);
			sendCommand("@"+token.name+" [hp:"+currenthp+"]");
		}
		event.stopPropagation();
		}, false);
	});

	// Show character sheet
	document.querySelectorAll(".portrait").forEach(function (item) {
		item.addEventListener('click', function () {
			if (movement.token!=null){
				movement.token.divName.style.color="yellow";
				movement.token.divName.style.opacity = movement.opacityDivName;
				movement.token = null;
			}
			hidePanelI();			
			var name = item.parentElement.id.substring(1);
			var divInfo = document.getElementById("info_character");
			divInfo.style.display = "grid";
			//divInfo.innerHTML = name+" loading<br/>"+divInfo.innerHTML;
			getSheetCharacter(name, board.id, divInfo);
		});
	});

}, false);

/* listenerPathLine */
function listenerPathLine(e){
	if (movement.isSelected()){
		if (!movement.line){
			movement.createPathLine();
			svg.appendChild(movement.line);
		}
		const tilex = Math.floor(e.offsetX/board.tilew)+1;
		const tiley = Math.floor(e.offsetY/board.tileh)+1;

		// Is there other token in the cell
		var tokenInCell = getTokenByTile(tilex, tiley);
		if (tokenInCell!=null){
			var tokenInCellColor = tokenInCell.img.style.border.split(' ')[2];
			if (tokenInCellColor != movement.color){
				// Exit: Hide movement line and exit. Can not pass over enemy
				movement.highlightName(false);
				svgOver.removeEventListener('mousemove', listenerPathLine, true);
				//movement.removeLine();
				return;
			}
		}

		// Build the path data structure
		var dcx = e.offsetX-((tilex-0.5)*board.tilew);
		var dcy = e.offsetY-((tiley-0.5)*board.tileh);
		var distToCenterOfTile = Math.round(Math.sqrt(dcx**2+dcy**2));
		if (!movement.isInPathTiles(tilex, tiley) && distToCenterOfTile<board.tilew/2){	// Check is a new tiles not a return
			movement.pathTiles.push([tilex, tiley]);
			movement.line.setAttribute("d", movement.pathPixels());
			// Distance
			movement.drawPathSteps();
		}
	}
}

function closeInfoCharacter(){
	event.stopPropagation();
	var divInfo = document.getElementById("info_character");
	divInfo.style.display = "none";
}

function showDefaultGuidelineInSheet(name, id){
	sendCommand(":g"+name+","+id);
	var divInfo = document.getElementById("info_character");
	divInfo.style.display = "grid";
	getSheetCharacter(name, board.id, divInfo);
}

/*
async function drawMovementLine(e){
	// New line and new path
	//var tokenColor = movement.token.img.style.border.split(' ')[2];
	if (movement.isSelected()){
		if (!movement.line){
			movement.createLine();
			svg.appendChild(movement.line);
		}
		const tilex = Math.floor(e.offsetX/board.tilew)+1;
		const tiley = Math.floor(e.offsetY/board.tileh)+1;

		// Is there other token in the cell
		var tokenInCell = getTokenByTile(tilex, tiley);
		if (tokenInCell!=null){
			var tokenInCellColor = tokenInCell.img.style.border.split(' ')[2];
			if (tokenInCellColor != movement.color){
				// Exit: Hide movement line and exit. Can not pass over enemy
				movement.highlightName(false);
				svgOver.removeEventListener('mousemove', drawMovementLine, true);
				svgRemoveAllChildren();
				movement.removeLine();
				return;
			}
		}

		// Build the path data structure
		var dcx = e.offsetX-((tilex-0.5)*board.tilew);
		var dcy = e.offsetY-((tiley-0.5)*board.tileh);
		var distToCenterOfTile = Math.round(Math.sqrt(dcx**2+dcy**2));
		if (!movement.isInPathTiles(tilex, tiley) && distToCenterOfTile<board.tilew/2){	// Check is a new tiles not a return
			movement.pathTiles.push([tilex, tiley]);
			movement.line.setAttribute("d", movement.pathPixels());
			// Distance
			movement.drawPathSteps();
		}
	}
}
*/

