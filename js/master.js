function attr_change(tokenId, attr, newVal){
	var rq = new XMLHttpRequest();
	rq.open("GET", "rq/setAttr.php?attr="+attr+"&tokenId="+tokenId+"&newVal="+newVal);
	rq.send();
}
