import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

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

// Animation
const animate = () => {
    requestAnimationFrame(animate);
    if (model) {
        model.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
};

// Start Animation
animate();

// Update camera aspect ratio and renderer size
const updateSize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
};

// Resize fix
window.addEventListener('resize', updateSize);
updateSize(); // Initial size update