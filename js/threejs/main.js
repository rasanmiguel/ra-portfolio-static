import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2.2;

// Model Loader
const loader = new GLTFLoader();
let model;

loader.load('./assets/3d/burger-textured.glb',
    (gltf) => {
        model = gltf.scene;
        scene.add(model);
    }, undefined,
    (error) => {
        console.error(error);
    }
);

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
    if (model) {
        model.rotation.y += 0.004;
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