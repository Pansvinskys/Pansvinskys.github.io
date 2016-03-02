
function setup(){
 var esferaForma=new THREE.SphereGeometry(1);
 var cilindroForma=new THREE.CylinderGeometry(0.5,0.5,4);
 var esfera1=new THREE.Mesh(esferaForma);
 var esfera2=new THREE.Mesh(esferaForma);
 var cilindro=new THREE.Mesh(cilindroForma);
 cilindro.matrix.makeRotationY(Math.PI/2);
 esfera1.position.y=2;
 esfera2.position.y=-2;
 var forma=new THREE.Geometry();
 THREE.GeometryUtils.merge(forma,cilindro);
 malla=new THREE.Mesh(forma);
 wireframe = new THREE.WireframeHelper( malla, 0x00ff00 );
 escena=new THREE.Scene();
 escena.add(malla,wireframe);
 camara=new THREE.PerspectiveCamera();
 camara.position.z=10;
 renderer=new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
 document.body.appendChild(renderer.domElement);
}

function loop(){
requestAnimationFrame(loop);
renderer.render(escena,camara);
}

var escena,camara,renderer,malla,wireframe;
setup();
loop();
