var arrD = Array(5);
var l = -20;
var arrP = [[l,4,0], [l,0,0], [l,-4,0], [l,-8,0], [l, 8, 0]];
var arrG = Array(5);
var arrM = Array(5);
var cubo;
var render;
var scene;
var camera;
var light;
var arrL = new Array(5);

function setup(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 45, 
		window.innerWidth / window.innerHeight, 1, 1000 );
	renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.getElementById("canvas_dados").appendChild( renderer.domElement );
	
	// Luces
	for(var i=0; i<2; i++){
		arrL[i] = new THREE.PointLight(0xffffff, 1);
	}
	arrL[0].position.set(0,0,0);
	arrL[1].position.set(-23,0,20);

	arrG[0] = new THREE.IcosahedronGeometry();
	arrG[1] = new THREE.OctahedronGeometry();
	arrG[2] = new THREE.DodecahedronBufferGeometry();
	arrG[3] = new THREE.TetrahedronGeometry();
	arrG[4] = new THREE.CubeGeometry();

	arrM[0] = new THREE.MeshLambertMaterial({color: 0xff0000,opacity: 1} );
	arrM[1] = new THREE.MeshLambertMaterial({color: 0xffff00,opacity: 1} );
	arrM[2] = new THREE.MeshLambertMaterial({color: 0x0000ff,opacity: 1} );
	arrM[3] = new THREE.MeshLambertMaterial({color: 0x00ff00,opacity: 1} );
	arrM[4] = new THREE.MeshLambertMaterial({color: 0x00ffff,opacity: 1} );

	for(var i=0; i<5; i++){
		//arrC[i] = new THREE.Mesh(geometry, material);
		arrD[i] = new THREE.Mesh(arrG[i], arrM[i]);
		arrD[i].position.x = arrP[i][0];
		arrD[i].position.y = arrP[i][1];
		arrD[i].position.z = -25;
		scene.add(arrD[i]);
	}
	for (var i=0; i<2; i++){
		scene.add(arrL[i]);
	}

	camera.position.z = 5;
}

function animate() {
	requestAnimationFrame( animate );
	for(var i=0; i<5; i++){
		arrD[i].rotation.y += 0.002;
	}
	renderer.render( scene, camera );
}

document.addEventListener('DOMContentLoaded', function(){ 
	setup();
	animate();
	console.log("Cargado");
}, false);

