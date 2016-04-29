function setup(){
var geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
var material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
malla = new THREE.Mesh( geometry, material );
malla.material.transparent=true;
luzPuntual=new THREE.PointLight(0xffffff);
luzPuntual.position.x=0;
luzPuntual.position.y=0;
luzPuntual.position.z=0;
escena=new THREE.Scene();
escena.add(malla,luzPuntual);
camara=new THREE.PerspectiveCamera();
camara.position.z=10;
renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerHeight*0.95,window.innerHeight*0.95);
document.body.appendChild(renderer.domElement);
}

function loop(){
requestAnimationFrame(loop);
delta=.01;
paso+=delta;
if(paso>=0.9||paso<=0)
delta=-delta;
malla.material.opacity=paso;
renderer.render(escena,camara);
}

var malla,camara,escena,renderer,paso,delta,luzPuntual;
setup();
loop();
