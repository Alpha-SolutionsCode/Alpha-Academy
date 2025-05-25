// Home page 3D elements
let homeScene, homeCamera, homeRenderer;
let graduationCap, book1, book2, particles;

function initHero3D() {
    const container = document.getElementById('hero3dContainer');
    if (!container) return;
    
    // Initialize Three.js
    const threeJS = initThreeJS('hero3dContainer');
    if (!threeJS) return;
    
    homeScene = threeJS.scene;
    homeCamera = threeJS.camera;
    homeRenderer = threeJS.renderer;
    
    // Add lights
    createLights(homeScene);
    
    // Create graduation cap
    graduationCap = createGraduationCap(homeScene);
    graduationCap.position.set(0, 0, 0);
    graduationCap.rotation.x = Math.PI / 12;
    
    // Create books
    book1 = createBook(homeScene, 1.5, 0.2, 1, 0x10B981);
    book1.position.set(-1.5, -0.5, -0.5);
    book1.rotation.y = Math.PI / 6;
    
    book2 = createBook(homeScene, 1.2, 0.25, 0.8, 0xF59E0B);
    book2.position.set(1.2, -0.7, -0.3);
    book2.rotation.y = -Math.PI / 8;
    
    // Add particles
    particles = createParticles(homeScene, 200, 0xFFFFFF);
    
    // Start animation loop
    animate();
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate graduation cap
        graduationCap.rotation.y += 0.005;
        
        // Float animation for books
        book1.position.y = -0.5 + Math.sin(Date.now() * 0.001) * 0.1;
        book2.position.y = -0.7 + Math.sin(Date.now() * 0.0015 + 1) * 0.1;
        
        // Rotate particles
        particles.rotation.y += 0.001;
        
        // Render scene
        homeRenderer.render(homeScene, homeCamera);
    }
}

function initAbout3D() {
    const container = document.getElementById('about3dContainer');
    if (!container) return;
    
    // Initialize Three.js
    const threeJS = initThreeJS('about3dContainer');
    if (!threeJS) return;
    
    const scene = threeJS.scene;
    const camera = threeJS.camera;
    const renderer = threeJS.renderer;
    
    // Add lights
    createLights(scene);
    
    // Create academy logo (simplified as a rotating cube with "A" texture)
    const cube = createCube(scene, 0x1E3A8A, 2);
    
    // Start animation loop
    animate();
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate cube
        cube.rotation.y += 0.01;
        cube.rotation.x += 0.005;
        
        // Render scene
        renderer.render(scene, camera);
    }
}

function initCTA3D() {
    const container = document.getElementById('cta3dElements');
    if (!container) return;
    
    // Initialize Three.js
    const threeJS = initThreeJS('cta3dElements');
    if (!threeJS) return;
    
    const scene = threeJS.scene;
    const camera = threeJS.camera;
    const renderer = threeJS.renderer;
    
    // Add lights
    createLights(scene);
    
    // Create floating shapes
    const shapes = [];
    
    // Create cubes
    for (let i = 0; i < 5; i++) {
        const size = Math.random() * 0.5 + 0.2;
        const cube = createCube(scene, 0xFFFFFF, size);
        cube.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
        );
        cube.material.transparent = true;
        cube.material.opacity = 0.3;
        shapes.push(cube);
    }
    
    // Add particles
    const particles = createParticles(scene, 100, 0xFFFFFF);
    
    // Start animation loop
    animate();
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate shapes
        shapes.forEach((shape, index) => {
            shape.rotation.x += 0.01;
            shape.rotation.y += 0.01;
            shape.position.y = shape.position.y + Math.sin(Date.now() * 0.001 + index) * 0.01;
        });
        
        // Rotate particles
        particles.rotation.y += 0.001;
        
        // Render scene
        renderer.render(scene, camera);
    }
}
