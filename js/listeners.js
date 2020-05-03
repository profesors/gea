/* listenerPathLine */
function listenerPathLine(e){
	if (movement.isSelected()){
		if (movement.line==null){
			movement.createPathLine();
		}
		const tilex = Math.floor(e.offsetX/board.tilew)+1;
		const tiley = Math.floor(e.offsetY/board.tileh)+1;

		// Is there other token in the cell
		var overToken = false;
		var tokenInCell = getTokenByTile(tilex, tiley);
		if (tokenInCell!=null){
			var tokenInCellColor = tokenInCell.img.style.border.split(' ')[2];
			if (tokenInCell.name != movement.token.name && tokenInCell.div.style.opacity!=0){
				overToken = true;
				movement.tokenTarget = tokenInCell;
				//var pixelx = (tokenInCell.x-1)*board.tilew+board.offsetx;
				//var pixely = (tokenInCell.y-1)*board.tileh+board.offsety;
				// Hide movement line
				var idGuideline = movement.token.defaultGuideline.n;
				var sIndicator = "Usar "+movement.token.guidelines[idGuideline]+" sobre "+tokenInCell.name;
				showIndicator(tokenInCell, sIndicator, movement.color, 0, 2000, null);
			}
		}
		if (!overToken && movement.tokenTarget!=null) hideIndicator(movement.tokenTarget);
		if (movement.tokenTarget!=null) hideAllIndicatorsBut(movement.tokenTarget);

		// Build the path data structure
		var dcx = e.offsetX-((tilex-0.5)*board.tilew);
		var dcy = e.offsetY-((tiley-0.5)*board.tileh);
		var distToCenterOfTile = Math.round(Math.sqrt(dcx**2+dcy**2));
		if (!movement.isInPathTiles(tilex, tiley) && distToCenterOfTile<board.tilew/2){	
				movement.pathTiles.push([tilex, tiley]);
		}
		var d = movement.computePathLong();
		if (d>movement.token.steps.movement.current){
			movement.pathTiles.pop();
		}
		//console.log(movement.pathTilesString);
		movement.drawPath();
		if (overToken) movement.hidePath();
		
	}
}

