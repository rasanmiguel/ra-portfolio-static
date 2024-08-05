import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Scene
const scene = new THREE.Scene();


// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2.3;


// Model Loader
const loader = new GLTFLoader();
// let model;
const models = {} // Array for the models

loader.load('./assets/3d/topBun.glb', (gltf) => { // Top 
    const topBun = gltf.scene;
    topBun.position.set(0, 0, 0);
    models.topBun = topBun;
    scene.add(topBun);
});

loader.load('./assets/3d/meat.glb', (gltf) => { // Middle 
    const meat = gltf.scene;
    meat.position.set(0, 0, 0);
    models.meat = meat;
    scene.add(meat);
});

loader.load('./assets/3d/bottomBun.glb', (gltf) => { // Bottom
    const bottomBun = gltf.scene;
    bottomBun.position.set(0, 0, 0);
    models.bottomBun = bottomBun;
    scene.add(bottomBun);
});


// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Alpha set to true makes background transparent
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('burger-model').appendChild(renderer.domElement); // Append renderer to container

// Renderer canvas size controls
const desiredWidth = 700;
const desiredHeight = 650;
renderer.setSize(desiredWidth, desiredHeight);


// Append renderer's canvas to container
const container = document.getElementById('burger-model');
container.appendChild(renderer.domElement);

// Set container size 
container.style.width = `${desiredWidth}px`;
container.style.height = `${desiredHeight}px`;

// Update camera aspect ratio
camera.aspect = desiredWidth / desiredHeight;
camera.updateProjectionMatrix();


// Animation
const animate = () => {
    requestAnimationFrame(animate);
    if (models.topBun) {
        models.topBun.rotation.y += 0.002;
    }
    if (models.meat) {
        models.meat.rotation.y += 0.002;
    }
    if (models.bottomBun) {
        models.bottomBun.rotation.y += 0.002;
    }

    renderer.render(scene, camera);
};

// Start Animation
animate();


// Update camera aspect ratio and renderer size
const updateSize = () => {
    renderer.setSize(desiredWidth, desiredHeight);
    camera.aspect = desiredWidth / desiredHeight;
    camera.updateProjectionMatrix();
};

window.addEventListener('resize', updateSize);
updateSize(); // Initial size update


