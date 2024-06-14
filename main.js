import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/Addons.js';

import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const scene=new THREE.Scene();
scene.background=new THREE.Color(0x000000);

const camera=new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

camera.position.set(0, 1, 5);

const renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light=new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,5,5).normalize();
scene.add(light);

const loader=new GLTFLoader();
loader.load('modules/DamagedHelmet.glb', function(gltf)
{
    scene.add(gltf.scene);
}, undefined, function(error)
{
    console.error(error);
});

const controls=new OrbitControls(camera, renderer.domElement);
controls.enableDamping=true;
controls.dampingFactor=0.05;

window.addEventListener('resize', function()
{
    camera.aspect=this.window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.SetSize(this.window.innerWidth, window.innerHeight);
});

function animate()
{
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();