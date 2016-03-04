function setup(){
 var llantaForma=new THREE.CylinderGeometry(0.5,0.5,1);
 var material=new THREE.MeshBasicMaterial({color:0x0f0f0f});
 var llanta1=new THREE.Mesh(llantaForma,material);
 var llanta2=new THREE.Mesh(llantaForma,material);
 var llanta3=new THREE.Mesh(llantaForma,material);
 var llanta4=new THREE.Mesh(llantaForma,material);
 var llanta5=new THREE.Mesh(llantaForma,material);
 var llanta6=new THREE.Mesh(llantaForma,material);
 var rotation = new THREE.Matrix4().makeRotationX(Math.PI/2);
 llanta1.applyMatrix(rotation);
 llanta2.applyMatrix(rotation);
 llanta3.applyMatrix(rotation);
 llanta4.applyMatrix(rotation);
 llanta5.applyMatrix(rotation);
 llanta6.applyMatrix(rotation);
 wllanta1 = new THREE.WireframeHelper( llanta1, 0x7f0000 );
 wllanta2 = new THREE.WireframeHelper( llanta2, 0x7f0000 );
 wllanta3 = new THREE.WireframeHelper( llanta3, 0x7f0000 );
 wllanta4 = new THREE.WireframeHelper( llanta4, 0x7f0000 );
 wllanta5 = new THREE.WireframeHelper( llanta5, 0x7f0000 );
 wllanta6 = new THREE.WireframeHelper( llanta6, 0x7f0000 );
 escena=new THREE.Scene();
 escena.add(llanta1,wllanta1);
 camara=new THREE.PerspectiveCamera();
 camara.position.z=10;
 renderer=new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
 document.body.appendChild(renderer.domElement);
}

function loop(){
camara.position.z+=1;	
requestAnimationFrame(loop);
renderer.render(escena,camara);
}

var escena,camara,renderer,malla,wireframe;
setup();
loop();
