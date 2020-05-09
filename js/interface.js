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

}, false);


function closeInfoCharacter(){
	event.stopPropagation();
	var divInfo = document.getElementById("info_character");
	divInfo.style.display = "none";
	board.output.style.display = '';
}

function showDefaultGuidelineInSheet(tokenName, guideId){
	sendCommand(":g"+tokenName+","+guideId);
	refreshSheet(tokenName);
}

function refreshSheet(tokenName){
	var divInfo = document.getElementById("info_character");
	divInfo.style.display = "grid";
	getSheetCharacter(tokenName, board.id, divInfo);
}
