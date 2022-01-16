import './style.css'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer ({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

//Stars / BG
const spaceTexture = new THREE.TextureLoader().load('images/background.jpg');
scene.background = spaceTexture;

function addStar() {

  const geometry = new THREE.SphereGeometry(0.02, 24, 24);
  const material = new THREE.MeshStandardMaterial ( {color: 0xffffff} );
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);

  scene.add(star);
  
}

Array(200).fill().forEach(addStar);

//Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);


//The Planets
const sunTexture = new THREE.TextureLoader().load('images/sun.jpg');
const normalTexture = new THREE.TextureLoader().load('images/normal.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(30, 72, 72),
  new THREE.MeshStandardMaterial ({ 
    map: sunTexture,
    normalMap: normalTexture,
  })
);


scene.add(sun);

sun.position.z = -75;
sun.position.setX(115);

const mercuryTexture = new THREE.TextureLoader().load('images/mercury.jpg');

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(1, 72, 72),
  new THREE.MeshStandardMaterial ({ 
    map: mercuryTexture,
    normalMap: normalTexture,
  })
);

mercury.position.z = -45;
mercury.position.setX(75);


scene.add(mercury);

const venusTexture = new THREE.TextureLoader().load('images/venus.jpg');
const venusMap = new THREE.TextureLoader().load('images/venusmap.jpg');

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(2,32,32),
  new THREE.MeshStandardMaterial ({ 
    map: venusTexture,
    normalMap: venusMap,
  })
);

scene.add(venus);

venus.position.z = -35;
venus.position.setX(65);


const earthTexture = new THREE.TextureLoader().load('images/earth.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(2,32,32),
  new THREE.MeshStandardMaterial ({ 
    map: earthTexture,
    normalMap: normalTexture,
  })
);

scene.add(earth);

earth.position.z = -25;
earth.position.setX(55);


const marsTexture = new THREE.TextureLoader().load('images/mars.jpg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(1,32,32),
  new THREE.MeshStandardMaterial ({ 
    map: marsTexture,
    normalMap: normalTexture,
  })
);

scene.add(mars);

mars.position.z = -15;
mars.position.setX(45);


const jupiterTexture = new THREE.TextureLoader().load('images/jupiter.jpg');

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(11,32,32),
  new THREE.MeshStandardMaterial ({ 
    map: jupiterTexture,
    normalMap: normalTexture,
  })
);

scene.add(jupiter);

jupiter.position.z = 1;
jupiter.position.setX(25);

const saturnTexture = new THREE.TextureLoader().load('images/saturn.jpg');

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(9,32,32),
  new THREE.MeshStandardMaterial ({ 
    map: saturnTexture
  })
);

scene.add(saturn);

saturn.position.z = 35;
saturn.position.setX(-10);

// const uranusTexture = new THREE.TextureLoader().load('images/uranus.jpg');

// const uranus = new THREE.Mesh(
//   new THREE.SphereGeometry(5,32,32),
//   new THREE.MeshStandardMaterial ({ 
//     map: uranusTexture
//   })
// );

// scene.add(uranus);

// uranus.position.z = 0;
// uranus.position.setX(30);


// const neptuneTexture = new THREE.TextureLoader().load('images/neptune.jpg');

// const neptune = new THREE.Mesh(
//   new THREE.SphereGeometry(5,32,32),
//   new THREE.MeshStandardMaterial ({ 
//     map: neptuneTexture
//   })
// );

// scene.add(neptune);

// neptune.position.z = 0;
// neptune.position.setX(100);





///END OF PLANETS


const controls = new OrbitControls(camera, renderer.domElement);

// const profileTexture = new THREE.TextureLoader().load('profile.jpg');

// const profile = new THREE.Mesh(
//   new THREE.BoxGeometry(3,3,3),
//   new THREE.MeshBasicMaterial ( { map: profileTexture } )
// );

// scene.add(profile);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  venus.rotation.x += 0.05;
  venus.rotation.y += 0.075;
  venus.rotation.z += 0.05;

  profile.rotation.y += 0.01;
  profile.rotation.z += 0.01;

  camera.rotation.z = t * -0.01;
  camera.rotation.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.001;
  mercury.rotation.y += 0.002;
  venus.rotation.y += 0.002;
  earth.rotation.y += 0.002;
  mars.rotation.y += 0.004;
  jupiter.rotation.y += 0.001;
  saturn.rotation.y += 0.001;

  controls.update();

  renderer.render(scene, camera);
}

animate();