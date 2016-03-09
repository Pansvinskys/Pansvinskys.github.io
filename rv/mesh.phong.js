function setup(){
 var forma=new THREE.BoxGeometry(1,1,1);
 var material=new THREE.MeshPhongMaterial({color:'#00cc00'});
 malla=new THREE.Mesh(forma,material);
 var luzPuntual=new THREE.PointLight(0xFFFFFF);
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
 var timer = Date.now() * 0.0002;
 camara.position.x = Math.cos( timer ) * 10;
 camara.position.z = Math.sin( timer ) * 10;
 camara.lookAt( escena.position );
 requestAnimationFrame(loop);
 malla.rotation.x+=0.001;
 malla.rotation.y+=0.001;
 renderer.render(escena,camara);
}

var camara,escena,renderer,malla;
setup();
loop();
