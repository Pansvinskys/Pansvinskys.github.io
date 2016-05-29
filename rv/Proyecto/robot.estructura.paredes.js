function Llanta(angx,angy,angz){
 THREE.Object3D.call(this);
 THREE.ImageUtils.crossOrigin='';
 var textura  =THREE.ImageUtils.loadTexture('https://pansvinskys.github.io/rv/8712596-tire-texture-Stock-Photo-texture-truck-tires.jpg?raw=true');
 this.llanta=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,1),new THREE.MeshBasicMaterial({color:0x3f3f3f,map:textura}));
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
 this.placa=new THREE.Mesh(new THREE.BoxGeometry(6,0.5,4),new THREE.MeshBasicMaterial({map:textura}));
 this.caja=new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshBasicMaterial({map:textura}));
 this.cam=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,1),new THREE.MeshBasicMaterial({color:0x3f3f3f}));
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

function Sensor(position,direction){
 THREE.Raycaster.call(this,position,direction);
 this.colision=false;
}

Sensor.prototype=new THREE.Raycaster();
Llanta.prototype=new THREE.Object3D();
Cuerpo.prototype=new THREE.Object3D();
Robot.prototype=new THREE.Object3D();

function Robots (x,y){
Agent.call(this,x,y);
this.sensor= new Sensor();
this.sensor2= new Sensor();
this.sensor3= new Sensor();
this.sensor4= new Sensor();
this.actuator= new Robot();
idRobot=this.actuator;
this.actuator.rotation.x=Math.PI/2;
this.actuator.commands=[];
this.add(this.actuator);
this.ga=false;
this.gi=false;
this.sC=false;
this.pC=false;
this.g=false;
}
Robots.prototype=new Agent();

Robots.prototype.sense= function(environment){
this.sensor.set(this.position,new THREE.Vector3(Math.cos(this.rotation.z),Math.sin(this.rotation.z),0));
this.sensor2.set(new THREE.Vector3(this.position.x+3*Math.cos(this.rotation.z-Math.PI),this.position.y+2*Math.sin(this.rotation.z-Math.PI),this.position.z),new THREE.Vector3(Math.cos(this.rotation.z-Math.PI/2),Math.sin(this.rotation.z-Math.PI/2),0));
this.sensor3.set(new THREE.Vector3(this.position.x,this.position.y,this.position.z),new THREE.Vector3(Math.cos(this.rotation.z+Math.PI/2),Math.sin(this.rotation.z+Math.PI/2),0));
this.sensor4.set(new THREE.Vector3(this.position.x,this.position.y,this.position.z),new THREE.Vector3(Math.cos(this.rotation.z+Math.PI),Math.sin(this.rotation.z+Math.PI),0));
var obstaculo= this.sensor.intersectObjects(environment.children,true);
var obstaculo2= this.sensor2.intersectObjects(environment.children,true);
var obstaculo3= this.sensor3.intersectObjects(environment.children,true);
if((obstaculo.length>0 && (obstaculo[0].distance<=3)))
{
this.sensor.colision=true;
if(obstaculo[0].object.name=="goal")
this.g=true;
}
else
this.sensor.colision=false;
if((obstaculo3.length>0 && (obstaculo3[0].distance<=3)))
{
if(obstaculo3[0].object.name=="goal")
this.g=true;
}



if((obstaculo2.length>0 && (obstaculo2[0].distance>=5)))
{
this.sensor2.colision=true;
}
else
this.sensor2.colision=false;


if((obstaculo3.length>0 && (obstaculo3[0].distance>=5)))
{
if(obstaculo3[0].object.name=="goal")
this.gi=true;
}
if((obstaculo.length>0 && (obstaculo[0].distance>=3)))
{
if(obstaculo[0].object.name=="goal"){
this.ga=true;
 }
}

};

Robots.prototype.plan=function (environment){
this.actuator.commands=[];
if(this.g==false)
{
 if(this.ga==false&&this.gi==false)
 {
   if(this.pC==false){
    if (this.sensor.colision==true){
    this.actuator.commands.push('rotateCCW');
    this.pC=true;}
    else
    this.actuator.commands.push('goStraight');
    }
    else
    {
    if(this.sC==false){
       if (this.sensor.colision==true)
       this.actuator.commands.push('rotateCCW');
       else if (this.sensor.colision==false&&this.sensor2.colision==false)
       this.actuator.commands.push('goStraight');
       else{
       this.actuator.commands.push('rotateCW');
       this.sC=true;
       }
      }
    else{
      if(this.sensor2.colision==false)
      this.sC=false;
      else
      this.actuator.commands.push('goStraight');
     }
    }
   } 
 else{
  if(this.ga==true)
  this.actuator.commands.push('goStraight');
  if(this.gi==true&&this.ga==false){
  this.actuator.commands.push('rotateCCW'); 
  }
 }
}
};

Robots.prototype.act=function (environment){
 var command=this.actuator.commands.pop();
 if(command===undefined)
 console.log('Undefined Command');
 else if(command in this.operations)
 this.operations[command](this);
 else
 console.log('Unknown Command');
};

Robots.prototype.operations={}

Robots.prototype.operations.goStraight=function(robot,distance){
 if(distance===undefined)
 distance=.5;
 robot.position.x+=distance*Math.cos(robot.rotation.z);
 robot.position.y+=distance*Math.sin(robot.rotation.z);
 robot.actuator.llanta1.rotation.z-=.1;
 robot.actuator.llanta2.rotation.z-=.1;
 robot.actuator.llanta3.rotation.z-=.1;
 robot.actuator.llanta4.rotation.z-=.1;
 robot.actuator.llanta5.rotation.z-=.1;
 robot.actuator.llanta6.rotation.z-=.1;
 idRobot=robot;
};

Robots.prototype.operations.rotateCW=function(robot,angle){
 if(angle===undefined)
 angle=Math.PI/2;
 robot.rotation.z-=angle;
};

Robots.prototype.operations.rotateCCW=function(robot,angle){
 if(angle===undefined)
 angle=Math.PI/2;
 robot.rotation.z+=angle;
}
