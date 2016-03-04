function setup(){
 var cilindroForma=new THREE.CylinderGeometry(0.5,0.5,4);
 var material=new THREE.MeshBasicMaterial({color:0x0f0f0f});
 var cilindro=new THREE.Mesh(cilindroForma,material);
 var rotation = new THREE.Matrix4().makeRotationX((7*Math.PI)/12);
 cilindro.applyMatrix(rotation);
 wireframe = new THREE.WireframeHelper( cilindro, 0x0000ff );
 escena=new THREE.Scene();
 escena.add(cilindro,wireframe);
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
