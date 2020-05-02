const ID_MOVEMENT_LINE = "movementLine";
const ID_MOVEMENT_LINE_NUMBER = ID_MOVEMENT_LINE+"_number";

class Movement{
	token=null;
	color=null;
	opacityDivName=null;
	line=null;
	pathLong=null;
	pathTiles=null;
	board=null;
	tokenTarget=null;

	constructor(board){
		this.opacityDivName=0;
		this.board=board;
		this.pathTiles=null;
		// obsolete? :
		this.pixel_x0=-1;
		this.pixel_y0=-1;
		this.pixel_x1=-1;
		this.pixel_y1=-1;
		this.toTileX=0;
		this.toTileY=0;
	}

	async reset(){
		if (this.token!=null) {
			this.highlightName(false);
			if (this.line!=null)	svg.removeChild(this.line);
			this.hidePath();
			this.pathTiles=null;
			this.line=null;
			this.token=null;
		}
	}

	select(token){
		if (token!=null){
			this.token = token;
			this.color = this.token.img.style.border.split(' ')[2];
		} else {
			this.reset();
		}
	}

	isSelected(){
		return this.token!=null;
	}

	highlightName(highlight){
		if (highlight){
			this.opacityDivName = this.token.divName.style.opacity;
			this.token.divName.style.opacity = 1;
			this.token.divName.style.color = "white";
		} else {
			this.token.divName.style.opacity = this.opacityDivName;
			this.token.divName.style.color = "yellow";
		}
	}

	get line(){
		return this.line;
	}

	get color(){
		return this.color;
	}

	get pathTilesString(){
		var pathString = "p";
		for (var i=0; i<this.pathTiles.length; i++){
			pathString+=this.pathTiles[i][0]+","+this.pathTiles[i][1]+",";
		}
		return pathString.substring(0, pathString.length-1);
	}

	/*
	pathPixels(){
		var x1 = getPixel(this.token.x, this.board.tilew, this.board.offsetx+(this.token.w*this.board.tilew)/2);
		var y1 = getPixel(this.token.y, this.board.tileh, this.board.offsety+(this.token.h*this.board.tileh)/2);
		var pathString = "M "+x1+" "+y1;
		for (var i=1; i<this.pathTiles.length; i++){
			var x2 = (this.pathTiles[i][0]-0.5)*this.board.tilew+this.board.offsetx;	// [0] is x   [1] is y
			var y2 = (this.pathTiles[i][1]-0.5)*this.board.tileh+this.board.offsety;
			pathString += " L "+x2+" "+y2;
			//this.line.setAttribute("d", pathString);
		}
		return pathString;
	}*/

	createPathLine(){
		this.line = document.createElementNS("http://www.w3.org/2000/svg", "path");
		this.line.setAttribute("id",ID_MOVEMENT_LINE);
		this.line.setAttribute("x1", this.token.x);
		this.line.setAttribute("y1", this.token.y);
		this.line.setAttribute("x2", this.token.x);
		this.line.setAttribute("y2", this.token.y);
		var style = "stroke-width: 2; stroke:"+this.color+"; ";
		style+= "stroke-linecap:butt; stroke-dasharray:5,5; opacity:1;";
		style+= "fill: none;";
		this.line.setAttribute("style", style);
		this.pathTiles = [[this.token.x,this.token.y]];
		svg.appendChild(this.line);
	}

	hidePath(){
		if (this.pathTiles!=null){
			for (var i=0; i<this.pathTiles.length; i++){
				var el = document.getElementById(ID_MOVEMENT_LINE_NUMBER+i);
				if (el!=null) svg.removeChild(el);
			}
		}
		var line = document.getElementById(ID_MOVEMENT_LINE);
		if (line!=null) this.line.style.opacity= 0;
	}

	isInPathTiles(tilex, tiley){
		if (this.pathTiles != null){
			for (var i=0; i<this.pathTiles.length; i++){
				if (tilex==this.pathTiles[i][0] && tiley == this.pathTiles[i][1]){
					return true;
				}
			}
		}
		return false;
	}
/*
	drawPathSteps(){
		var distanceOfPath = 0;
		for (var i=0; i<this.pathTiles.length-1; i++){
			var tilex1 = this.pathTiles[i][0];
			var tiley1 = this.pathTiles[i][1];
			var tilex2 = this.pathTiles[i+1][0];
			var tiley2 = this.pathTiles[i+1][1];
			var x = (tilex2-0.5)*this.board.tilew+this.board.offsetx;
			var y = (tiley2-0.1)*this.board.tileh+this.board.offsety;
			distanceOfPath += getDistanceTiles(tilex1, tiley1, tilex2, tiley2);
			if (document.getElementById(ID_MOVEMENT_LINE_NUMBER+i) == null){
				addSvgText(ID_MOVEMENT_LINE_NUMBER+i,x,y,this.color, null, Math.round(distanceOfPath), 24);
			}
		}
		this.pathLong = distanceOfPath;
	}
	*/
	drawPath(){
		var distanceOfPath = 0;
		var x1 = getPixel(this.token.x, this.board.tilew, this.board.offsetx+(this.token.w*this.board.tilew)/2);
		var y1 = getPixel(this.token.y, this.board.tileh, this.board.offsety+(this.token.h*this.board.tileh)/2);
		var pathString = "M "+x1+" "+y1;
		for (var i=0; i<this.pathTiles.length-1; i++){
			var tilex1 = this.pathTiles[i][0];
			var tiley1 = this.pathTiles[i][1];
			var tilex2 = this.pathTiles[i+1][0];
			var tiley2 = this.pathTiles[i+1][1];
			var x = (tilex2-0.5)*this.board.tilew+this.board.offsetx;
			var y = (tiley2-0.1)*this.board.tileh+this.board.offsety;
			var x2 = (this.pathTiles[i+1][0]-0.5)*this.board.tilew+this.board.offsetx;	// [0] is x   [1] is y
			var y2 = (this.pathTiles[i+1][1]-0.5)*this.board.tileh+this.board.offsety;
			distanceOfPath += getDistanceTiles(tilex1, tiley1, tilex2, tiley2);
			pathString += " L "+x2+" "+y2;
			if (document.getElementById(ID_MOVEMENT_LINE_NUMBER+i) == null){
				addSvgText(ID_MOVEMENT_LINE_NUMBER+i,x,y,this.color, null, Math.round(distanceOfPath), 24);
			}
		}
		this.pathLong = distanceOfPath;
		//pathString += " L "+x2+" "+y2;
		this.line.style.opacity=1;
		this.line.setAttribute("d", pathString);
	}
}

