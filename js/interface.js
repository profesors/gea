var at;
document.addEventListener('DOMContentLoaded', function(){ 
	/******************* PJ 1 ********************************/
	document.querySelectorAll(".b11").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@bar #1d20+2,1d12+2");
			item.parentElement.style.color="rgba(255,255,255,0)";
		}
		event.stopPropagation();
		}, false);

	});
	document.querySelectorAll(".b12").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@bar #1d20+2,1d6+2");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b13").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@bar #1d20");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b14").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@bar #1d100");
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
			sendCommand("@exp #1d20");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b24").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@exp #1d100");
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
			sendCommand("@elf #1d20+2,1d8");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b33").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@elf #1d20");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b34").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@elf #1d100");
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
			sendCommand("@cle #1d20");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b44").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@cle #1d100");
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
			sendCommand("@lad #1d20");
		}
		event.stopPropagation();
		}, false);
	});
	document.querySelectorAll(".b54").forEach(function (item){
		item.addEventListener('click', function (){
		if (item.parentElement.style.opacity!="0.3"){
			sendCommand("@lad #1d100");
		}
		event.stopPropagation();
		}, false);
	});
}, false);
