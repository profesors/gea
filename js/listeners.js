/* listenerPathLine */
function listenerPathLine(e){
	if (movement.isSelected()){
		if (movement.line==null){
			movement.createPathLine();
		}
		const tilex = Math.floor(e.offsetX/board.tilew)+1;
		const tiley = Math.floor(e.offsetY/board.tileh)+1;

		// Is there other token in the cell
		var overEnemy = false;
		var tokenInCell = getTokenByTile(tilex, tiley);
		if (tokenInCell!=null){
			var tokenInCellColor = tokenInCell.img.style.border.split(' ')[2];
			if (tokenInCell.name != movement.token.name && tokenInCell.div.style.opacity!=0){
				overEnemy = true;
				movement.tokenTarget = tokenInCell;
				var pixelx = (tokenInCell.x-1)*board.tilew+board.offsetx;
				var pixely = (tokenInCell.y-1)*board.tileh+board.offsety;
				// Hide movement line
				var idGuideline = movement.token.defaultGuideline.n;
				var sIndicator = "Usar "+movement.token.guidelines[idGuideline]+" sobre "+tokenInCell.name;
				showIndicator(tokenInCell, sIndicator, movement.color, 0, 2000, null);
				movement.hidePath();
			}
		}
		if (!overEnemy){
			// Build the path data structure
			if (movement.tokenTarget!=null)	hideIndicator(movement.tokenTarget);
			var dcx = e.offsetX-((tilex-0.5)*board.tilew);
			var dcy = e.offsetY-((tiley-0.5)*board.tileh);
			var distToCenterOfTile = Math.round(Math.sqrt(dcx**2+dcy**2));
			movement.drawPath();
			if (!movement.isInPathTiles(tilex, tiley) && distToCenterOfTile<board.tilew/2){	// Check is a new tiles not a return
				movement.pathTiles.push([tilex, tiley]);
			}
		}
		
	}
}

