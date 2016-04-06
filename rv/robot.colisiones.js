function Llanta(angx,angy,angz){
 THREE.Object3D.call(this);
 THREE.ImageUtils.crossOrigin='';
 var textura  =THREE.ImageUtils.loadTexture('https://pansvinskys.github.io/rv/8712596-tire-texture-Stock-Photo-texture-truck-tires.jpg?raw=true');
 this.llanta=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,1),new THREE.MeshLambertMaterial({color:0x3f3f3f,map:textura}));
 var rotx=new THREE.Matrix4().makeRotationX(angx);
 var roty=new THREE.Matrix4().makeRotationY(angy);
 var rotz=new THREE.Matrix4().makeRotationZ(angz);
 this.llanta.applyMatrix(rotx);
 this.llanta.applyMatrix(roty);
 this.llanta.applyMatrix(rotz);
 this.add(this.llanta);
}

function posicionLlanta(cosa,xp,yp,zp){
 cosa.position.x=xp;
 cosa.position.y=yp;
 cosa.position.z=zp;
}

function Cuerpo(){
 THREE.ImageUtils.crossOrigin='';
 var textura  =THREE.ImageUtils.loadTexture('https://pansvinskys.github.io/rv/metal-01.jpg?raw=true');
 THREE.Object3D.call(this);
 this.placa=new THREE.Mesh(new THREE.BoxGeometry(6,0.5,4),new THREE.MeshPhongMaterial({map:textura}));
 this.caja=new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshPhongMaterial({map:textura}));
 this.cam=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,1),new THREE.MeshLambertMaterial({color:0x3f3f3f}));
 var rotcam= new THREE.Matrix4().makeRotationZ(Math.PI/2);
 this.placa.position.y=-2.5;
 this.caja.position.y=-1.1;
 this.cam.applyMatrix(rotcam);
 this.cam.position.y=0.3;
 this.add(this.placa);
 this.add(this.caja);
 this.add(this.cam);
}

function Robot(){
 THREE.Object3D.call(this);
 this.llanta1=new Llanta(Math.PI/2,0,0);
 this.llanta2=new Llanta(Math.PI/2,0,0);
 this.llanta3=new Llanta(Math.PI/2,0,0);
 this.llanta4=new Llanta(Math.PI/2,0,0);
 this.llanta5=new Llanta(Math.PI/2,0,0);
 this.llanta6=new Llanta(Math.PI/2,0,0);
 posicionLlanta(this.llanta1,-2,-3,2);
 posicionLlanta(this.llanta2,0,-3,2);
 posicionLlanta(this.llanta3,2,-3,2);
 posicionLlanta(this.llanta4,-2,-3,-2);
 posicionLlanta(this.llanta5,0,-3,-2);
 posicionLlanta(this.llanta6,2,-3,-2);
 this.cuerpobot=new Cuerpo();
 this.add(this.llanta1,this.llanta2,this.llanta3,this.llanta4,this.llanta5,this.llanta6);
 this.add(this.cuerpobot);
}

function Obstaculos(){
 THREE.ImageUtils.crossOrigin='';
 var textura  =THREE.ImageUtils.loadTexture('https://pansvinskys.github.io/rv/wall-1033777_960_720.jpg?raw=true');
 THREE.Object3D.call(this);
 this.cubo1=new THREE.Mesh(new THREE.BoxGeometry(5,5,5),new THREE.MeshBasicMaterial({map:textura}));
 this.cubo1.position.x=10;
 this.add(this.cubo1);
}

Llanta.prototype=new THREE.Object3D();
Cuerpo.prototype=new THREE.Object3D();
Robot.prototype=new THREE.Object3D();
Obstaculos.prototype=new THREE.Object3D();

function setup(){
 var luzPuntual=new THREE.PointLight(0xffffff);
 luzPuntual.position.x=10;
 luzPuntual.position.y=10;
 luzPuntual.position.z=10;
 rob=new Robot();
 obs=new Obstaculos();
 escena=new THREE.Scene();
 escena.add(rob,luzPuntual,obs);
 camara=new THREE.PerspectiveCamera();
 camara.position.y=100;
 renderer=new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
 document.body.appendChild(renderer.domElement);
}

function loop(){

camara.lookAt( escena.position );
requestAnimationFrame(loop);
renderer.render(escena,camara);
rob.llanta1.rotation.z+=0.1;
rob.llanta2.rotation.z+=0.1;
rob.llanta3.rotation.z+=0.1;
rob.llanta4.rotation.z+=0.1;
rob.llanta5.rotation.z+=0.1;
rob.llanta6.rotation.z+=0.1;
}

var escena,camara,renderer,rob,obs;
setup();
loop();
