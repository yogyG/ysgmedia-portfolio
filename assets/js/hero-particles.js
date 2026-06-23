// Hero Particle Sphere Animation using Three.js

let scene, camera, renderer;
let sphereParticles, backgroundParticles;
let targetX = 0;
let targetY = 0;
let mouseX = 0;
let mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
let clock;
let isMobile = window.innerWidth <= 768;

const config = {
  sphereCount: isMobile ? 1500 : 4000,
  bgCount: isMobile ? 100 : 300,
  sphereRadius: 15,
  colors: ['#8B5CF6', '#A855F7', '#C084FC'],
};

export function initHeroParticles() {
  const container = document.getElementById('hero-canvas-container');
  if (!container) return;

  // Wait for Three.js to load
  if (typeof THREE === 'undefined') {
    setTimeout(initHeroParticles, 100);
    return;
  }

  clock = new THREE.Clock();

  // Scene setup
  scene = new THREE.Scene();
  // Optional: add a tiny bit of fog to blend the back particles
  scene.fog = new THREE.FogExp2(0x050505, 0.02);

  // Camera setup
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 40;

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Create Sphere Particles
  createSphereParticles();
  
  // Create Background Particles
  createBackgroundParticles();

  // Event Listeners
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);

  // Start animation loop
  animate();
}

function createSphereParticles() {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const colors = [];
  const sizes = [];

  const colorObjects = config.colors.map(c => new THREE.Color(c));

  for (let i = 0; i < config.sphereCount; i++) {
    // Generate point on a sphere using spherical coordinates
    const phi = Math.acos(-1 + (2 * i) / config.sphereCount);
    const theta = Math.sqrt(config.sphereCount * Math.PI) * phi;

    // Add some random noise to make it feel organic and not perfectly geometric
    const r = config.sphereRadius + (Math.random() * 0.8 - 0.4);

    const x = r * Math.cos(theta) * Math.sin(phi);
    const y = r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(phi);

    vertices.push(x, y, z);

    // Randomize colors
    const color = colorObjects[Math.floor(Math.random() * colorObjects.length)];
    colors.push(color.r, color.g, color.b);

    // Randomize sizes for the shimmer effect
    sizes.push(Math.random() * 2);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

  // Custom shader material for size variation and round particles
  const material = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.8,
    depthWrite: false
  });

  sphereParticles = new THREE.Points(geometry, material);
  
  // Position it slightly to the right to balance the hero text layout
  sphereParticles.position.x = isMobile ? 0 : 15;
  scene.add(sphereParticles);
}

function createBackgroundParticles() {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const colors = [];

  const colorObjects = config.colors.map(c => new THREE.Color(c));

  for (let i = 0; i < config.bgCount; i++) {
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 100;
    // Spread them deep in the background
    const z = (Math.random() - 0.5) * 100 - 20; 

    vertices.push(x, y, z);

    const color = colorObjects[Math.floor(Math.random() * colorObjects.length)];
    colors.push(color.r, color.g, color.b);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.3, // Low opacity as requested
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  backgroundParticles = new THREE.Points(geometry, material);
  scene.add(backgroundParticles);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Update mobile state and adjust position if needed
  isMobile = window.innerWidth <= 768;
  if (sphereParticles) {
    sphereParticles.position.x = isMobile ? 0 : 15;
  }
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  const time = clock.getElapsedTime();

  // Gentle constant rotation
  if (sphereParticles) {
    sphereParticles.rotation.y = time * 0.1;
    sphereParticles.rotation.x = time * 0.05;
    
    // Breathing glow effect via opacity modulation
    sphereParticles.material.opacity = 0.6 + Math.sin(time * 2) * 0.2;
  }

  if (backgroundParticles) {
    backgroundParticles.rotation.y = time * 0.02;
    // Float slightly
    backgroundParticles.position.y = Math.sin(time * 0.5) * 2;
  }

  // Interaction: Sphere follows mouse smoothly
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  if (sphereParticles) {
    sphereParticles.rotation.y += 0.05 * (targetX - sphereParticles.rotation.y);
    sphereParticles.rotation.x += 0.05 * (targetY - sphereParticles.rotation.x);
  }
  
  if (backgroundParticles) {
    // Parallax effect for background
    backgroundParticles.position.x += 0.02 * (mouseX * 0.01 - backgroundParticles.position.x);
    backgroundParticles.position.y += 0.02 * (-mouseY * 0.01 - backgroundParticles.position.y);
  }

  renderer.render(scene, camera);
}

// Auto-initialize when the DOM is ready and the script is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroParticles);
} else {
  initHeroParticles();
}
