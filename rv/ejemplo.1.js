function Pierna(){
THREE.Object3D.call(this);
this.pierna=new THREE.Mesh(new THREE.BoxGeometry(1,5,1));
this.pie=new THREE.Mesh(new THREE.BoxGeometry(2,1,1));
this.pierna.position.y=-2.5;
this.pie.position.y=-4.5;
this.pie.position.x=1;
this.add(this.pierna);
this.add(this.pie);
}

Pierna.prototype=new THREE.Object3D();

function setup(){
var cuerpo=new THREE.Mesh(new THREE.CylinderGeometry(1,2,5,10));
piernaD=new Pierna();
piernaI=new Pierna();
cuerpo.position.y=2;
piernaD.position.z=-1;
piernaI.position.z=1;
step=.01;
escena=new THREE.Scene();
escena.add(cuerpo,piernaD,piernaI);
camara=new THREE.PerspectiveCamera();
camara.position.z=40;
renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderer.domElement);
}

function loop(){
var timer = Date.now() * 0.0002;
camara.position.x = (Math.cos( timer ) * 30);
camara.position.z = (Math.sin( timer ) * 30);
camara.lookAt( escena.position );
requestAnimationFrame(loop);
renderer.render(escena,camara);
if(Math.abs(piernaD.rotation.z)>.5)
step=-step;
piernaD.rotation.z+=step;
piernaI.rotation.z-=step;
}

var escena,camara,renderer,step,piernaD,piernaI;
setup();
loop();
