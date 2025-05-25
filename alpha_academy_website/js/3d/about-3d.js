// About page 3D elements
function initAbout3D() {
    const container = document.getElementById('aboutCta3dElements');
    if (!container) return;
    
    // Initialize Three.js
    const threeJS = initThreeJS('aboutCta3dElements');
    if (!threeJS) return;
    
    const scene = threeJS.scene;
    const camera = threeJS.camera;
    const renderer = threeJS.renderer;
    
    // Add lights
    createLights(scene);
    
    // Create floating shapes
    const shapes = [];
    
    // Create cubes and other geometric shapes
    for (let i = 0; i < 8; i++) {
        const size = Math.random() * 0.5 + 0.2;
        let shape;
        
        // Alternate between different shape types
        if (i % 3 === 0) {
            // Create cube
            shape = createCube(scene, 0xFFFFFF, size);
        } else if (i % 3 === 1) {
            // Create sphere
            const geometry = new THREE.SphereGeometry(size/2, 16, 16);
            const material = new THREE.MeshStandardMaterial({ 
                color: 0xFFFFFF,
                metalness: 0.1,
                roughness: 0.8
            });
            shape = new THREE.Mesh(geometry, material);
            scene.add(shape);
        } else {
            // Create tetrahedron
            const geometry = new THREE.TetrahedronGeometry(size/2);
            const material = new THREE.MeshStandardMaterial({ 
                color: 0xFFFFFF,
                metalness: 0.1,
                roughness: 0.8
            });
            shape = new THREE.Mesh(geometry, material);
            scene.add(shape);
        }
        
        shape.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
        );
        shape.material.transparent = true;
        shape.material.opacity = 0.3;
        shapes.push(shape);
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
