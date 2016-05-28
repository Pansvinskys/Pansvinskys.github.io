function Wall(size,x,y){
 THREE.ImageUtils.crossOrigin='';
 var textura  =THREE.ImageUtils.loadTexture('https://pansvinskys.github.io/rv/wall-1033777_960_720.jpg?raw=true');
 THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,size),new THREE.MeshPhongMaterial({map:textura}));
 this.size=size;
 this.position.x=x;
 this.position.y=y;
}

Wall.prototype=new THREE.Mesh();

Environment.prototype.setMap=function(map){
 //var _offset=Math.floor(map.length/2);
 for(var i=0;i<map.length;i++)
 for(var j=0;j<map.length;j++){
 if(map[i][j]==="x")
 this.add(new Wall(4,-20+4*j,-20+4*i));
 else if(map[i][j]==='r')
 this.add(new Robots(-20+4*j,-20+4*i));
 }
}

function setup(){
 var mapa=new Array();
 mapa[0] ="xxxxxxxxxxxxxxxxxxxxxxxx";
 mapa[1] ="x                      x";
 mapa[2] ="x                      x";
 mapa[3] ="x             r        x"; 
 mapa[4] ="x                      x";
 mapa[5] ="x                      x";
 mapa[6] ="x                      x"; 
 mapa[7] ="x                      x";
 mapa[8] ="xxx   xxxxxxxxxxxxxxxxxx";
 mapa[9] ="x                      x";
 mapa[10]="x                      x"; 
 mapa[11]="x                      x";
 mapa[12]="xxxxxxxxxxxxxxxxx  xxxxx";
 mapa[13]="x                      x";
 mapa[14]="x                      x";
 mapa[15]="x                      x";
 mapa[16]="x                      x";
 mapa[17]="x                      x";
 mapa[18]="x                      x";
 mapa[19]="xxxxxxxxx   xxxxxxxxxxxx";
 mapa[20]="x                      x";
 mapa[21]="x                      x";
 mapa[22]="x                      x";
 mapa[23]="x                      x";
 mapa[24]="xxxxxxxxxxxxxxxxxxxxxxxx";
 environment=new Environment();
 environment.setMap(mapa);
 camara=new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
 camara.position.set(idRobot.position.x,idRobot.position.y,idRobot.position.z+20);
 renderer=new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
 document.body.appendChild(renderer.domElement);
 environment.add(camara);
}

function loop(){
 requestAnimationFrame(loop);
 environment.sense();
 environment.plan();
 environment.act();
 renderer.render(environment,camara);
}

var clock,environment,camara,renderer,idRobot;
setup();
loop();
