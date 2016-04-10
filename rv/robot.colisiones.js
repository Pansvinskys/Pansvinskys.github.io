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
 var mapa=[];
 this.cubo1={};
 mapa[0]=["x","x","x","x","x","x","x","x","x","x","x"];
 mapa[1]=["x","0","0","0","0","0","0","0","0","0","x"];
 mapa[2]=["x","0","0","0","0","0","0","0","0","0","x"];
 mapa[3]=["x","0","0","r","0","0","0","0","0","0","x"];
 mapa[4]=["x","0","0","0","0","0","0","0","0","0","x"];
 mapa[5]=["x","x","x","x","x","x","x","x","x","x","x"];
 for(j=0;j<=5;j++){
  for(i=0;i<=10;i++){
   if(mapa[j][i]=="x"){
    this.cubo1[j*10+i]=new THREE.Mesh(new THREE.BoxGeometry(4,4,8),new THREE.MeshBasicMaterial({map:textura}));
    this.cubo1[j*10+i].position.x=-20+4*i;
    this.cubo1[j*10+i].position.z=-20+8*j;
    this.add(this.cubo1[j*10+i]);
   }
   else if(mapa[j][i]=="0"){
    
   }
   else if(mapa[j][i]=="r"){
   this.rob=new Robot();
   this.raycaster=new THREE.Raycaster(new THREE.Vector3(this.rob.position.x+.1,this.rob.position.y,this.rob.position.z),new THREE.Vector3(1,0,0));
   this.rob.position.x=-20+4*i;
   this.rob.position.z=-20+8*j;
   this.add(this.rob);
   }
   else{
   }
  }
 }
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
 obs=new Obstaculos();
 escena=new THREE.Scene();
 escena.add(luzPuntual,obs);
 camara=new THREE.PerspectiveCamera();
 camara.position.y=50;
 renderer=new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
 document.body.appendChild(renderer.domElement);
 step=0.1;
}

function loop(){
obstaculo1=obs.raycaster.intersectObjects(escena.children,true);
if((obstaculo1.length>0&&(obstaculo1[0].distance<=0.5)))
step=-step;
obs.rob.position.x+=step;
camara.lookAt( escena.position );
requestAnimationFrame(loop);
renderer.render(escena,camara);
obs.rob.llanta1.rotation.z+=0.1;
obs.rob.llanta2.rotation.z+=0.1;
obs.rob.llanta3.rotation.z+=0.1;
obs.rob.llanta4.rotation.z+=0.1;
obs.rob.llanta5.rotation.z+=0.1;
obs.rob.llanta6.rotation.z+=0.1;
var r=obstaculo1.length;
console.log(r);
}

var escena,camara,renderer,rob,obs;
setup();
loop();
