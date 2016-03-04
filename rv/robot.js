function setup(){
 var llantaForma=new THREE.CylinderGeometry(0.5,0.5,1);
 var material=new THREE.MeshBasicMaterial({color:0x0f0f0f});
 var material2=new THREE.MeshBasicMaterial({color:0xb0b0b0});
 var placaForma=new THREE.BoxGeometry(6,0.5,4);
 var placa=new THREE.Mesh(placaForma,material2);
 var llanta1=new THREE.Mesh(llantaForma,material);
 var llanta2=new THREE.Mesh(llantaForma,material);
 var llanta3=new THREE.Mesh(llantaForma,material);
 var llanta4=new THREE.Mesh(llantaForma,material);
 var llanta5=new THREE.Mesh(llantaForma,material);
 var llanta6=new THREE.Mesh(llantaForma,material);
 var rotation = new THREE.Matrix4().makeRotationX(Math.PI/2);
 placa.position.y=-2.5;
 llanta1.applyMatrix(rotation);
 llanta1.position.x=-2;
 llanta1.position.z=2;
 llanta1.position.y=-3;
 llanta2.applyMatrix(rotation);
 llanta2.position.z=2;
 llanta2.position.y=-3;
 llanta3.applyMatrix(rotation);
 llanta3.position.x=2;
 llanta3.position.z=2;
 llanta3.position.y=-3;
 llanta4.applyMatrix(rotation);
 llanta4.position.x=-2;
 llanta4.position.z=-2;
 llanta4.position.y=-3;
 llanta5.applyMatrix(rotation);
 llanta5.position.z=-2;
 llanta5.position.y=-3;
 llanta6.applyMatrix(rotation);
 llanta6.position.x=2;
 llanta6.position.z=-2;
 llanta6.position.y=-3;
 wllanta1 = new THREE.WireframeHelper( llanta1, 0x7f0000 );
 wllanta2 = new THREE.WireframeHelper( llanta2, 0x7f0000 );
 wllanta3 = new THREE.WireframeHelper( llanta3, 0x7f0000 );
 wllanta4 = new THREE.WireframeHelper( llanta4, 0x7f0000 );
 wllanta5 = new THREE.WireframeHelper( llanta5, 0x7f0000 );
 wllanta6 = new THREE.WireframeHelper( llanta6, 0x7f0000 );
 wplaca = new THREE.WireframeHelper( placa, 0x0 );
 escena=new THREE.Scene();
 escena.add(llanta1,wllanta1,llanta2,wllanta2,llanta3,wllanta3,llanta4,wllanta4,llanta5,wllanta5,llanta6,wllanta6,placa,wplaca);
 camara=new THREE.PerspectiveCamera();
 camara.position.z=10;
 camara.position.y=6;
 renderer=new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
 document.body.appendChild(renderer.domElement);
}

function loop(){
var timer = Date.now() * 0.0002;
camara.position.x = Math.cos( timer ) * 10;
camara.position.z = Math.sin( timer ) * 10;
camara.lookAt( escena.position );
requestAnimationFrame(loop);
renderer.render(escena,camara);
}

var escena,camara,renderer,malla,wireframe;
setup();
loop();
