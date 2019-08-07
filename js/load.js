function getPixel(pos, sizeOfTile){
	return (pos-1)*sizeOfTile; 
}

// Load functions of the board
function getFullBoard(){
	const rq = new XMLHttpRequest();
	rq.open("GET", "rq/getFullBoard.php?idBoard=2");
	rq.send();
	rq.onreadystatechange = function(e) {
		if(rq.readyState === XMLHttpRequest.DONE && rq.status === 200){
			//console.log(rq.responseText);
			var arrResponse = rq.responseText.split("\n");
			board = {
				id: arrResponse.shift(),
				name: arrResponse.shift(),
				tilew: parseInt(arrResponse.shift()),
				tileh: parseInt(arrResponse.shift()),
				ntilesw: parseInt(arrResponse.shift()),
				ntilesh: parseInt(arrResponse.shift()),
				bg: arrResponse.shift(),
				drawGrid: (arrResponse.shift()=='1'),
				lastActionId: parseInt(arrResponse.shift())
			}
			console.log(board);
			// BG
			if (board.bg != ""){
				var canvas = document.getElementById("canvas");
				canvas.style.backgroundImage = "url(img/"+board.bg+")";
				canvas.style.backgroundRepeat = "no-repeat";
				canvas.style.width = (board.tilew*board.ntilesw)+0.5*board.tilew+"px";
				canvas.style.height = (board.tileh*board.ntilesh)+0.5*board.tileh+"px";
			}
			// Create arr items
			arrResponse.forEach(function(sItem){
				if (sItem !== ""){
					const arrRq = sItem.split(" ");
					const item = {
						x: arrRq[0],
						y: arrRq[1],
						z: arrRq[2],
						step: arrRq[3],
						src: arrRq[4],
						name: arrRq[5],
						idType: arrRq[6],
						lastActionIdUpdated: 0,
						img: document.createElement("img")
					}
					arrItems.push(item);
					//console.log(item);
					//item.img = document.createElement("img");
					item.img.src = "img/"+item.src;
					item.img.name = item.name;
					item.img.style.position = "absolute";
					var x = getPixel(item.x, board.tilew);
					var y = getPixel(item.y, board.tileh)
					/*
					var posx = item.x-1;
					var posy = item.y-1;
					var posz = item.z*1.75;
					var x = 0.5*IMGW*posx+600 - 0.5*IMGW*posy;
					var y = 0.25*IMGH*posy + posx*IMGH*0.25 - posz*IMGH*0.25 + 100;
				
					var mod = Math.sqrt(item.x*item.x+item.y+item.y)*100;
					*/
					item.img.style.left = x.toString()+"px";
					item.img.style.top = y.toString()+"px";
					if (item.idType == "2"){	// Is a PC
						item.img.style.border = "4px green solid";
						item.img.style.borderRadius = "50%";
						item.img.style.width = board.tilew+"px";
						if (item.name.charAt(1)=="4"){
							item.img.style.border = "4px red solid";
						}
					}
					
					//item.img.style.zIndex = Math.round(mod);
					item.img.onload = function () { canvas.appendChild(item.img); }
					//console.log("POS "+posx+","+posy+" MOD "+mod);
				}
			});	// END push items into array 
			drawCellNames();
		}
	}
}

function drawCellNames(){
	for (var x=0; x!=board.ntilesw; ++x){
		var txt = document.createElement("div");	
		txt.innerHTML = String.fromCharCode(65+x); // 65 = A
		txt.style.color = "white";
		txt.style.position = "absolute";
		txt.style.left = x*(board.tilew+1)+(board.tilew*0.5)+"px";
		txt.style.top = "5px";
		canvas.appendChild(txt);
	}
	for (var y=0; y!=board.ntilesh; ++y){
		var txt = document.createElement("div");	
		txt.innerHTML = y+1;
		txt.style.color = "white";
		txt.style.position = "absolute";
		txt.style.top = y*(board.tileh+1)+(board.tileh*0.5)+"px";
		txt.style.left = "10px";
		canvas.appendChild(txt);
	}
}
