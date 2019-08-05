var canvas, ctx, gl;
const IMGW = 111;
const IMGH = 128;

function getFullBoard(){
	const rq = new XMLHttpRequest();
	rq.open("GET", "rq/getFullBoard.php");
	rq.send();
	rq.onreadystatechange = function(e) {
		if(rq.readyState === XMLHttpRequest.DONE && rq.status === 200){
			//console.log(rq.responseText);
			var arrItems = rq.responseText.split("\n");
			arrItems.forEach(function(sItem){
				if (sItem !== ""){
					console.log("ITEM: "+sItem);
					const arrRq = sItem.split(" ");
					const item = {
						x: arrRq[0],
						y: arrRq[1],
						z: arrRq[2],
						step: arrRq[3],
						img: arrRq[4],
						name: arrRq[5]
					}
					var sq = document.createElement("img");
					sq.src = "img/"+item.img;
					sq.style.position = "absolute";
					var x = item.x*65+250;
					var y = item.y*65;
					/*
					var posx = item.x-1;
					var posy = item.y-1;
					var posz = item.z*1.75;
					var x = 0.5*IMGW*posx+600 - 0.5*IMGW*posy;
					var y = 0.25*IMGH*posy + posx*IMGH*0.25 - posz*IMGH*0.25 + 100;
				
					var mod = Math.sqrt(item.x*item.x+item.y+item.y)*100;
					*/
					sq.style.left = x.toString()+"px";
					sq.style.top = y.toString()+"px";
					//sq.style.zIndex = Math.round(mod);
					sq.onload = function () { canvas.appendChild(sq); }
					//console.log("POS "+posx+","+posy+" MOD "+mod);
				}
			});
		}
	}
}

window.addEventListener("load", function() {
	MAXX = window.innerWidth;
	MAXY = window.innerHeight;
	canvas = document.getElementById("container");
	canvas.style.width = MAXX+"px";
	canvas.style.height = MAXY+"px";
	getFullBoard();

});

window.addEventListener("resize", function() {
	MAXX = window.innerWidth;
	MAXY = window.innerHeight;
	canvas.style.width = MAXX+"px";
	canvas.style.height = MAXY+"px";
});
