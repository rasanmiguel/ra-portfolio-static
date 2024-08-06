import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Model loader
const loader = new GLTFLoader();
let model;

loader.load('./assets/3d/me-3d.glb', (gltf) => {
    const mePortrait = gltf.scene;
    mePortrait.position.set(0, 0, 0);
    model.mePortrait = mePortrait;
    scene.add(mePortrait);
})

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const desiredWidth = 700;
const desiredHeight = 650;
renderer.setSize(desiredWidth, desiredHeight);

// Append renderer canvas to container
const container = document.getElementById('me-portrait');
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
    if (models.mePortrait) {
        models.mePortrait.rotation.y += 0.002;
    }
    renderer.render(scene, camera);
};

animate();

// Update camera aspect ration and renderer size
const updateSize = () => {
    renderer.setSize(desiredWidth, desiredHeight);
    camera.aspect = desiredWidth / desiredHeight;
    camera.updateProjectionMatrix();
};

window.addEventListener('resize', updateSize);
updateSize(); // Initial size update