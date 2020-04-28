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

async function drawMovementLine(e){
	if (movement.token != null){
		if (movement.line==null){
			movement.line = document.createElementNS("http://www.w3.org/2000/svg", "path");
			movement.line.setAttribute("id","movementLine");
			const tilex = Math.floor(e.offsetX/board.tilew);
			const tiley = Math.floor(e.offsetY/board.tileh);
			movement.line.setAttribute("x1", x1);
			movement.line.setAttribute("y1", y1);
			movement.line.setAttribute("x2", x1);
			movement.line.setAttribute("y2", y1);
			var style = "stroke-width: 2; stroke:"+movement.token.img.style.border.split(' ')[2]+"; ";
			style+= "stroke-linecap:butt; stroke-dasharray:5,5; opacity:1;";
			style+= "fill: none;";
			movement.line.setAttribute("style", style);
			svg.appendChild(movement.line);
			movement.pathTiles = [[tilex+1,tiley+1]];
		}
		const tilex = Math.floor(e.offsetX/board.tilew)+1;
		const tiley = Math.floor(e.offsetY/board.tileh)+1;


		// There is other token in the cell
		var tokenInCell = getTokenByTile(tilex, tiley);
		if (tokenInCell != null &&
			movement.token.img.style.border.split(' ')[2]!=tokenInCell.img.style.border.split(' ')[2]){
			// Exit: Hide movement line and exit. Can not pass over enemy
			movement.token.divName.style.color="yellow";
			movement.token.divName.style.opacity = movement.opacityDivName;

			svgOver.removeEventListener('mousemove', drawMovementLine, true);
			svg.removeChild(movement.line);
			movement.line = null;
			movement.pathTiles = null;
			return;
		}

		var cx = e.offsetX-((tilex-0.5)*board.tilew);
		var cy = e.offsetY-((tiley-0.5)*board.tileh);
		var distToCenterOfTile = Math.round(Math.sqrt(cx**2+cy**2));
		if (!isInPathTiles(tilex, tiley) && distToCenterOfTile<board.tilew/2){	// Check is a new tiles not a return
			movement.pathTiles.push([tilex, tiley]);
			var x1 = getPixel(movement.token.x, board.tilew, board.offsetx+(movement.token.w*board.tilew)/2);
			var y1 = getPixel(movement.token.y, board.tileh, board.offsety+(movement.token.h*board.tileh)/2);
			var pathString = "M "+x1+" "+y1;
			for (var i=1; i<movement.pathTiles.length; i++){
				var x2 = (movement.pathTiles[i][0]-0.5)*board.tilew+board.offsetx;
				var y2 = (movement.pathTiles[i][1]-0.5)*board.tileh+board.offsety;
				pathString += " L "+x2+" "+y2;
				//console.log(movement.pathTiles);
				movement.line.setAttribute("d", pathString);
			}
		}
	}
}


