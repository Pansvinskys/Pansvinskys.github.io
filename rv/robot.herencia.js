function llanta(xp,yp,zp,angx,angy,angz){
 THREE.Object3D.call(this);
 this.llanta=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,1),new THREE.MeshBasicMaterial({color:0x0f0f0f}));
 this.llanta.position.x=xp;
 this.llanta.position.y=yp;
 this.llanta.position.z=zp;
 var rotx=new THREE.Matrix4().makeRotationX(angx);
 var roty=new THREE.Matrix4().makeRotationY(angy);
 var rotz=new THREE.Matrix4().makeRotationZ(angz);
 this.llanta.applyMatrix(rotx);
 this.llanta.applyMatrix(roty);
 this.llanta.applyMatrix(rotz);
 this.wllanta=new THREE.WireframeHelper(this.llanta,0x7f0000);
 this.add(this.llanta);
 this.add(this.wllanta);
}

function cuerpo(){
 THREE.Object3D.call(this);
 this.placa=new THREE.Mesh(new THREE.BoxGeometry(6,0.5,4),new THREE.MeshBasicMaterial({color:0xb0b0b0}));
 this.caja=new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshBasicMaterial({color:0xb0b0b0}));
 this.cam=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,1),new THREE.MeshBasicMaterial({color:0x0f0f0f}));
 var rotcam= new THREE.Matrix4().makeRotationZ(Math.PI/2);
 this.placa.position.y=-2.5;
 this.caja.position.y=-1.5;
 this.cam.applyMatrix(rotcam);
 this.cam.position.y=-0.1;
 this.add(this.placa);
 this.add(this.caja);
 this.add(this.cam);
}

function robot(){
 llanta.call(this);
 cuerpo.call(this);
 this.llanta1=new llanta(-2,2,-3,Math.PI/2,0,0);
 this.llanta2=new llanta(0,-3,2,Math.PI/2,0,0);
 this.llanta3=new llanta(2,2,-3,Math.PI/2,0,0);
 this.llanta4=new llanta(-2,-2,-3,Math.PI/2,0,0);
 this.llanta5=new llanta(0,-3,-2,Math.PI/2,0,0);
 this.llanta6=new llanta(2,-3,-2,Math.PI/2,0,0);
 this.cuerpobot=new cuerpo();
 this.wrobot=new THREE.WireframeHelper(this.cuerpobot,0x0);
}

llanta.prototype=new THREE.Object3D();
cuerpo.prototype=new THREE.Object3D();

function setup(){
 rob=new llanta();
 escena=new THREE.Scene();
 escena.add(cuerpo);
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

var escena,camara,renderer,rob;
setup();
loop();
