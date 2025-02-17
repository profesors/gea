function runAnimation(token, i){
	switch(token.animation[i].typeId){
		case 1:
			runAnimation_closeCombat(token, i);
			break;
		case 2:
			runAnimation_rangedCombat(token, i);
			break;
		case 3:
			runAnimation_magicMissile(token, i);
			break;
	}	// Switch case
}

async function showIndicator(token, text, color, preWait, postWait, top){
	if (token.divIndicator.style.opacity!=0){
		clearTimeout(token.timeOutIndicator);
	}
	await sleep(preWait);
	token.divIndicator.style.opacity=1;
	token.divIndicator.innerHTML = text;
	token.divIndicator.style.top = top;
	if (token.w==1){
		token.divIndicator.style.width = (board.tilew*2)+"px";
		token.divIndicator.style.left = -0.5*board.tilew+"px";//board.tileh+"px";
	} else {
		token.divIndicator.style.width = board.tilew*token.w+"px";
	}
	token.divIndicator.style.color = color;
	if (postWait!=null){
		token.timeOutIndicator = setTimeout(function (){
			token.divIndicator.style.opacity=0;
		},postWait);
	}
}
function hideIndicator(token){
	clearTimeout(token.timeOutIndicator);
	token.divIndicator.style.opacity = 0;
	token.divIndicator.innerHTML = "";
}

function hideAllIndicators(){
	for (var i=0; i<arrTokens.length; i++){
		hideIndicator(arrTokens[i]);
	}
}

function hideAllIndicatorsBut(token){
	for (var i=0; i<arrTokens.length; i++){
		if (arrTokens[i].name!=token.name){
			hideIndicator(arrTokens[i]);
		}
	}
}

async function moveTokenByPath(token, path){
	if (path != null){
		var d = 0;
		var ox = getPixel(token.x, board.tilew, board.offsetx);
		var oy = getPixel(token.y, board.tileh, board.offsety);
		for (var i=1; i<path.length; i++){
			const dx = getPixel(path[i].x, board.tilew, board.offsetx)-ox;
			const dy = getPixel(path[i].y, board.tileh, board.offsety)-oy;
			const oz = token.z;
			var t0 = (new Date).getTime();
			var tf = t0+250;
			var tt = tf-t0;
			var t = 0.0;
			const k = Math.PI/(2*tt);
			while(t<tt){
				var p = t/tt;
				token.div.style.left = (ox+dx*p)+"px";
				token.div.style.top = (oy+dy*p)+"px";
				await sleep(T_PRECISION);
				t = (new Date).getTime() - t0;
			}
			d += getDistanceTiles(path[i-1].x, path[i-1].y, path[i].x, path[i].y);
			ox = getPixel(path[i].x, board.tilew, board.offsetx);
			oy = getPixel(path[i].y, board.tileh, board.offsety);
		}
		token.div.style.left = getPixel(path[path.length-1].x,
			board.tilew, board.offsetx)+"px";
		token.div.style.top = getPixel(path[path.length-1].y,
			board.tileh, board.offsety)+"px";
		token.x = path[path.length-1].x;
		token.y = path[path.length-1].y;
		//token.steps.movement.current-=d;
	}
}

async function moveTokenJumpTo(token, toX, toY){
	// From (ox, oy) to (ox+dx, oy+dy)
	if (token.x != toX || token.y != toY){
		token.divDice.style.opacity=0;
		//setOpacityCoordinates(0);
		//setOpacityDivNames(0);
		var ox = getPixel(token.x, board.tilew, board.offsetx);
		var oy = getPixel(token.y, board.tileh, board.offsety);
		const dx = getPixel(toX, board.tilew, board.offsetx)-ox;
		const dy = getPixel(toY, board.tileh, board.offsety)-oy;
		const oz = token.z;
		token.div.style.zIndex = 10;
		const pi2 = Math.PI/2;
		var t0 = (new Date).getTime();
		var tf = t0+500;
		var tt = tf-t0;
		var t = 0.0;
		const k = Math.PI/(2*tt);
		const dx2 = dx/2;
		const dy2 = dy/2;
		while(t<tt){
			//token.div.style.left = (ox+dx2*Math.sin(t*k))+"px";
			//token.div.style.top = (oy+dy2*Math.sin(t*k))+"px";
			var p = t/tt;
			token.div.style.left = (ox+dx2*p)+"px";
			token.div.style.top = (oy+dy2*p)+"px";
			token.div.style.transform = "scale("+(0.5*Math.sin(t*k)+1)+")";
			await sleep(T_PRECISION);
			t = (new Date).getTime() - t0;
		}
		t0 = (new Date).getTime();
		tf = t0+500;
		tt = tf-t0;
		t = 0.0;
		ox += dx2;
		oy += dy2;
		while(t<tt){
			//token.div.style.left = (ox+dx2+dx2*Math.sin(t*k))+"px";
			//token.div.style.top = (oy+dy2+dy2*Math.sin(t*k))+"px";
			var p = t/tt;
			token.div.style.left = (ox+dx2*p)+"px";
			token.div.style.top = (oy+dy2*p)+"px";
			token.div.style.transform = "scale("+(0.5*Math.cos(t*k)+1)+")";
			await sleep(T_PRECISION);
			t = (new Date).getTime() - t0;
		}
		token.x = toX;
		token.y = toY;
		token.div.style.left = (ox+dx2)+"px";
		token.div.style.top = (oy+dy2)+"px";
		token.div.style.zIndex = 10;
		token.div.style.transform = "scale(1)";
	}
}

async function disablePc(token, time){
	var tf = (new Date).getTime()+time;
	var bPj= document.getElementById("b"+token.name);
	if (bPj!=null){
		bPj.style.opacity= DISABLED_OPACITY;
		var t = tf-(new Date).getTime();
		while((tf-(new Date).getTime())>0) await sleep(T_PRECISION);
		bPj.style.opacity="1";
	}
}

// Draw a combat icon from token to tilex, tiley and then disappears
async function runAnimation_closeCombat(token, i){
	disablePc(token, 6000);
	var el = document.createElementNS("http://www.w3.org/2000/svg", "line");
	var id = "attack"+(new Date).getTime();
	var x1 = getPixel(token.animation[i].src_x, board.tilew, board.offsetx+board.tilew/2);
	var y1 = getPixel(token.animation[i].src_y, board.tileh, board.offsety+board.tileh/2);
	var x2 = getPixel(token.animation[i].target_x, board.tilew, board.offsetx+board.tilew/2);
	var y2 = getPixel(token.animation[i].target_y, board.tileh, board.offsety+board.tileh/2);
	var pmx = (x2+x1)/2;	// Middle point in x
	var pmy = (y2+y1)/2;	// Middle point in y
	var tx = (x2-x1)/2;		// Transaltion in x
	var ty = (y2-y1)/2;		// Translation in y
	el.setAttribute("id",id);
	el.setAttribute("x1", (pmx+x1)/2);
	el.setAttribute("y1", (pmy+y1)/2);
	el.setAttribute("x2", x2);
	el.setAttribute("y2", y2);
	var style = "stroke-width: 12; stroke:"+token.img.style.border.split(' ')[2]+"; ";
	style+= "stroke-linecap:butt; stroke-dasharray:10,5; opacity:1;";
	el.setAttribute("style", style);
	var transform = "translate("+tx+" "+ty+") rotate("+(70+Math.floor(Math.random()*40)+1)+" "+pmx+" "+pmy+")";
	el.setAttribute("transform",transform);
	svg.appendChild(el);

	var t0 = (new Date).getTime();
	var tf = t0+1000;
	var tt = tf-t0;
	var t = 0.0;
	const k = Math.PI/(2*tt);
	while (t<tt){
		el.style.opacity = Math.sin(t*k);
		await sleep(T_PRECISION);
		t = (new Date).getTime()-t0;
	}
	svg.removeChild(el);
}

// Draw a ranged combat icon from token to tilex, tiley and then disappears
async function runAnimation_rangedCombat(token, i){
	disablePc(token, 6000);
	var elLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
	var id = "ranged"+(new Date).getTime();
	var x1 = getPixel(token.animation[i].src_x, board.tilew, board.offsetx+board.tilew/2);
	var y1 = getPixel(token.animation[i].src_y, board.tileh, board.offsety+board.tileh/2);
	var x2 = getPixel(token.animation[i].target_x, board.tilew, board.offsetx+board.tilew/2);
	var y2 = getPixel(token.animation[i].target_y, board.tileh, board.offsety+board.tileh/2);
	elLine.setAttribute("id",id);
	var style = "stroke-width: 2; stroke:"+token.img.style.border.split(' ')[2]+"; opacity: 1;";
	style += "stroke-linecap:butt;";
	elLine.setAttribute("style", style);
	svg.appendChild(elLine);
	// First part: Arrow flying

	var t0 = (new Date).getTime();	// Time _0
	var tt = 500;					// Total Time
	var tf = t0+tt;					// Time _final
	var t = 0.0;					// current Time
	const k = (Math.PI/2)/(tf-t0);	// Constant
	var vX = x2-x1, vY = y2-y1;
	var l=0, ani_x2, ani_y2;	// l = longitude of ray
	var dx = dy = 0;
	while(t<tt){					//t*k \in {0, pi/2}
		var p = t/tt;				// Lineal proportionality \in {0..1}
		ani_x2 = x1+p*vX;
		ani_y2 = y1+p*vY;
		elLine.setAttribute("x1", ani_x2-dx);
		elLine.setAttribute("y1", ani_y2-dy);
		elLine.setAttribute("x2", ani_x2);
		elLine.setAttribute("y2", ani_y2);
		if (l<5){
			l = distance(x1,y1,ani_x2,ani_y2);
		} else if (dx == 0 && dy == 0){
			dx=ani_x2-x1;
			dy=ani_y2-y1;
		}
		await sleep(T_PRECISION);
		t = (new Date).getTime()-t0;
	}
	setTimeout(function(){svg.removeChild(elLine);}, 1000);
}

async function runAnimation_magicMissile(token, i){
	disablePc(token, 6000);
	var elLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
	var id = "mm"+(new Date).getTime();
	var x1 = getPixel(token.animation[i].src_x, board.tilew, board.offsetx+board.tilew/2);
	var y1 = getPixel(token.animation[i].src_y, board.tileh, board.offsety+board.tileh/2);
	var x2 = getPixel(token.animation[i].target_x, board.tilew, board.offsetx+board.tilew/2);
	var y2 = getPixel(token.animation[i].target_y, board.tileh, board.offsety+board.tileh/2);
	elLine.setAttribute("id",id);
	var style = "stroke-width: 2; stroke:"+token.img.style.border.split(' ')[2]+"; opacity: 1;";
	style += "stroke-linecap:butt; stroke-dasharray:5,30;";
	elLine.setAttribute("style", style);
	svg.appendChild(elLine);
	
	// First part: Circle expands
	var idC = "circ"+(new Date).getTime();
	var elCircle = addSvgCircle(idC,x1,y1,0,token.img.style.border.split(' ')[2], "opacity:1;");
	t0 = (new Date).getTime();
	tt = 1500;
	tf = t0 + tt;
	t = 0.0;
	var dest_x = -0.5*board.tilew+board.tilew*Math.random();
	var dest_y = -0.5*board.tileh;
	const k = (Math.PI/2)/(tf-t0);	// Constant
	while(t<tt){
		var p = t/tt;
		elCircle.style.opacity = p;
		elCircle.setAttribute("r", 10*p);
		elCircle.setAttribute("cx", x1+p*dest_x);
		elCircle.setAttribute("cy", y1+p*dest_y);
		await sleep(T_PRECISION);
		t = (new Date).getTime()-t0;
	}
	// Second part: Missile thrown
	var x1 = parseInt(elCircle.getAttribute("cx"));
	var y1 = parseInt(elCircle.getAttribute("cy"));
	var dx=x2-x1;
	var dy=y2-y1;
	t0 = (new Date).getTime();
	tt = 400;
	tf = t0 + tt;
	t = 0.0;
	while(t<tt){
		var p = t/tt;
		elCircle.setAttribute("r", 5*(1-p)+5);
		elCircle.setAttribute("cx", x1+p*dx);
		elCircle.setAttribute("cy", y1+p*dy);
		await sleep(T_PRECISION);
		t = (new Date).getTime()-t0;
	}
	setTimeout(function(){svg.removeChild(elCircle);}, 100);
}

async function changeBackground(newBg){
	const tsNow = (new Date()).getTime();
	var canvasOver = document.getElementById("canvas_over");
	canvasOver.style.backgroundImage = "url('"+newBg+"')";
	var t0 = (new Date).getTime();
	var tf = t0+1000;
	var tt = tf-t0;
	var t = 0.0;
	const k = Math.PI/(2*tt);
	while(t<tt){
		var p = t/tt;
		canvasOver.style.opacity = p;
		await sleep(T_PRECISION);
		t = (new Date).getTime() - t0;
	}
	//setTimeout(function(){canvasOver.style.opacity=0; console.log("OUT");}, 4000);
	var definitiveBg = new Image();
	definitiveBg.onload = function(){
		canvasOver.style.opacity=0;
		document.getElementById("canvas_bg").style.backgroundImage = "url('"+newBg+"')";
	}
	definitiveBg.src = "img/bg/"+board.bg+".jpg";
}

async function changeTokenOpacity(token, newVal){
	//await sleep(1000);
	var t0 = (new Date).getTime();
	var tf = t0+1000;
	var tt = tf-t0;
	var t = 0.0;
	var currentOp = Number.parseFloat(token.div.style.opacity);
	var d = newVal-currentOp;
	const k = Math.PI/(2*tt);
	while(t<tt){
		var p = t/tt;
		token.div.style.opacity = currentOp+p*d;
		await sleep(T_PRECISION);
		t = (new Date).getTime() - t0;
	}
	token.div.style.opacity = newVal;
}

async function fadeOutScreen(duration){
	if (duration==null) duration=1000;
	var t0 = (new Date).getTime();
	var tf = t0+duration;
	var tt = tf-t0;
	var t = 0.0;
	const k = Math.PI/(2*tt);
	while(t<tt){
		var p = t/tt;
		document.getElementById("canvas").style.opacity = 1-p;
		document.getElementById("canvas_bg").style.opacity = 1-p;
		await sleep(T_PRECISION);
		t = (new Date).getTime() - t0;
	}
	document.getElementById("canvas").style.opacity = 0;
	document.getElementById("canvas_bg").style.opacity = 0;
}
async function fadeInScreen(duration){
	if (duration==null) duration=1000;
	var t0 = (new Date).getTime();
	var tf = t0+1000;
	var tt = tf-t0;
	var t = 0.0;
	const k = Math.PI/(2*tt);
	while(t<tt){
		var p = t/tt;
		document.getElementById("canvas").style.opacity = p;
		document.getElementById("canvas_bg").style.opacity = p;
		await sleep(T_PRECISION);
		t = (new Date).getTime() - t0;
	}
	document.getElementById("canvas").style.opacity = p;
	document.getElementById("canvas_bg").style.opacity = p;
}

