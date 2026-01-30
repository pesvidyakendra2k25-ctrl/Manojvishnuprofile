// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

// Three.js 3D Wave Grid
let scene, camera, renderer, waveGrid;
let time = 0;

function initThreeJS() {
  const canvas = document.getElementById('wave-grid-canvas');
  if (!canvas) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  // Create wave grid geometry
  const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });

  waveGrid = new THREE.Mesh(geometry, material);
  waveGrid.rotation.x = -Math.PI / 3;
  waveGrid.position.z = -5;

  scene.add(waveGrid);
  camera.position.z = 10;

  animateThreeJS();
}

function animateThreeJS() {
  requestAnimationFrame(animateThreeJS);

  time += 0.01;
  const positions = waveGrid.geometry.attributes.position.array;

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    positions[i + 2] = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 2;
  }

  waveGrid.geometry.attributes.position.needsUpdate = true;
  waveGrid.rotation.z += 0.002;

  renderer.render(scene, camera);
}

// Canvas Wave Animation
let canvasWave, ctxWave;
let wavePoints = [];

function initCanvasWave() {
  canvasWave = document.getElementById('canvas-wave-bg');
  if (!canvasWave) return;

  ctxWave = canvasWave.getContext('2d');
  canvasWave.width = window.innerWidth;
  canvasWave.height = window.innerHeight;

  // Create wave points
  for (let i = 0; i < 100; i++) {
    wavePoints.push({
      x: (i / 99) * canvasWave.width,
      y: canvasWave.height / 2,
      baseY: canvasWave.height / 2,
      amplitude: Math.random() * 50 + 20,
      frequency: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2
    });
  }

  animateCanvasWave();
}

function animateCanvasWave() {
  if (!ctxWave) return;

  requestAnimationFrame(animateCanvasWave);

  ctxWave.clearRect(0, 0, canvasWave.width, canvasWave.height);

  ctxWave.strokeStyle = 'rgba(0, 255, 255, 0.3)';
  ctxWave.lineWidth = 2;
  ctxWave.shadowColor = '#00ffff';
  ctxWave.shadowBlur = 10;

  ctxWave.beginPath();
  ctxWave.moveTo(0, canvasWave.height);

  wavePoints.forEach((point, index) => {
    point.phase += point.frequency;
    point.y = point.baseY + Math.sin(point.phase) * point.amplitude;

    if (index === 0) {
      ctxWave.lineTo(point.x, point.y);
    } else {
      const prevPoint = wavePoints[index - 1];
      const cpX = (prevPoint.x + point.x) / 2;
      const cpY = (prevPoint.y + point.y) / 2;
      ctxWave.quadraticCurveTo(prevPoint.x, prevPoint.y, cpX, cpY);
    }
  });

  ctxWave.lineTo(canvasWave.width, canvasWave.height);
  ctxWave.closePath();
  ctxWave.stroke();

  // Draw grid lines
  ctxWave.strokeStyle = 'rgba(0, 128, 255, 0.2)';
  ctxWave.lineWidth = 1;
  ctxWave.shadowBlur = 0;

  // Vertical lines
  for (let x = 0; x < canvasWave.width; x += 100) {
    ctxWave.beginPath();
    ctxWave.moveTo(x, 0);
    ctxWave.lineTo(x, canvasWave.height);
    ctxWave.stroke();
  }

  // Horizontal lines
  for (let y = 0; y < canvasWave.height; y += 100) {
    ctxWave.beginPath();
    ctxWave.moveTo(0, y);
    ctxWave.lineTo(canvasWave.width, y);
    ctxWave.stroke();
  }
}

// Enhanced Particles.js Background with Wave Grid
particlesJS('particles-js', {
  particles: {
    number: { value: 120, density: { enable: true, value_area: 800 } },
    color: { value: ['#00ffff', '#0080ff', '#8000ff'] },
    shape: { type: 'circle' },
    opacity: { value: 0.6, random: true },
    size: { value: 4, random: true },
    line_linked: {
      enable: true,
      distance: 120,
      color: '#00ffff',
      opacity: 0.4,
      width: 2
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: { enable: true, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: {
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// Initialize all wave systems
document.addEventListener('DOMContentLoaded', function() {
  initThreeJS();
  initCanvasWave();
});

// Handle window resize
window.addEventListener('resize', function() {
  if (renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  if (canvasWave) {
    canvasWave.width = window.innerWidth;
    canvasWave.height = window.innerHeight;
  }
});

// Sticky Navigation Menu JS Code
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
console.log(scrollBtn);
let val;
window.onscroll = function() {
  if(document.documentElement.scrollTop > 20){
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  }else{
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }

}

// Side NavIgation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function(){
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
}
cancelBtn.onclick = function(){
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
}

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click" , function() {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}

// Scroll Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
});

const sections = document.querySelectorAll('section');
sections.forEach((section) => {
  observer.observe(section);
});

// Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Simple form handling - in real scenario, send to server
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}
