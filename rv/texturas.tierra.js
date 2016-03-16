function setup(){
 THREE.ImageUtils.crossOrigin='';
 var textura  =THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/planets/earth_atmos_2048.png');
 var material =new THREE.MeshPhongMaterial({map:textura});
 var forma    =new THREE.SphereGeometry(1);
 malla        =new THREE.Mesh(forma,material);
 malla.rotation.z+=0.25;
 
 var luzPuntual=new THREE.PointLight(0xffffff);
 luzPuntual.position.x=10;
 luzPuntual.position.y=10;
 luzPuntual.position.z=10;
 escena=new THREE.Scene();
 escena.add(malla,luzPuntual);
 camara=new THREE.PerspectiveCamera();
 camara.position.z=5;
 renderer=new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*0.95,window.innerHeight*0.95);
 document.body.appendChild(renderer.domElement);
}

function loop(){
requestAnimationFrame(loop);
malla.rotation.y+=0.01;
renderer.render(escena,camara);
}

var malla,camara,escena,renderer;
setup();
loop();
