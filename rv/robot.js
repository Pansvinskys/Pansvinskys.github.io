
function setup(){
 var cilindroForma=new THREE.CylinderGeometry(0.5,0.5,4);
 var cilindro=new THREE.Mesh(cilindroForma);
 var rotation = new THREE.Matrix4().makeRotationX(Math.PI/4);
 cilindro.applyMatrix(rotation);
 var forma=new THREE.Geometry();
 THREE.GeometryUtils.merge(forma,cilindro);
 malla=new THREE.Mesh(forma);
 wireframe = new THREE.WireframeHelper( malla, 0x0000ff );
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
