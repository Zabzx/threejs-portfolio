import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.setZ(5)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Axes helper
// const axesHelper = new THREE.AxesHelper(10, 10, 10);
// axesHelper.setColors('white', 'blue', 'red')
// scene.add(axesHelper);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Space GLTF 3D Model
let space;
const loader = new GLTFLoader();
loader.load('./3D-renders/space3d/scene.gltf', (gltf) => {
  gltf.scene.position.set(1, -2, 1)
  scene.add(gltf.scene);
  space = gltf.scene;
});

// Animate
function animate() {
  // controls.update();
  if (space) {
    space.rotation.y += 0.002;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();

// Move camera on scroll
function moveCamera() {
  const top = document.body.getBoundingClientRect().top;
  camera.position.z = top * -0.01;
}
document.body.onscroll = moveCamera;
moveCamera();

// GSAP
// const tl = gsap.timeline({repeooat: 2, repeatDelay: 1});
// tl.to('#z', {x: 100, duration: 1});
// tl.to('#z', {y: 50, duration: 1});
// tl.to('#z', {opacity: 0, duration: 1});