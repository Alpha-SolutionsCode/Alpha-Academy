// Courses page 3D elements
function initCourses3D() {
    const container = document.getElementById('coursesCta3dElements');
    if (!container) return;
    
    // Initialize Three.js
    const threeJS = initThreeJS('coursesCta3dElements');
    if (!threeJS) return;
    
    const scene = threeJS.scene;
    const camera = threeJS.camera;
    const renderer = threeJS.renderer;
    
    // Add lights
    createLights(scene);
    
    // Create floating educational symbols
    const symbols = [];
    
    // Create different educational symbols
    // Book
    const book = createBook(scene, 1.2, 0.2, 0.8, 0x10B981);
    book.position.set(-2, 0, -1);
    book.rotation.y = Math.PI / 6;
    symbols.push(book);
    
    // Computer/laptop (simplified as a box)
    const laptopBase = new THREE.BoxGeometry(1.5, 0.1, 1);
    const laptopScreen = new THREE.BoxGeometry(1.4, 0.8, 0.1);
    const laptopMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF,
        metalness: 0.3,
        roughness: 0.4
    });
    
    const laptopBaseObj = new THREE.Mesh(laptopBase, laptopMaterial);
    const laptopScreenObj = new THREE.Mesh(laptopScreen, laptopMaterial);
    
    const laptop = new THREE.Group();
    laptop.add(laptopBaseObj);
    
    laptopScreenObj.position.set(0, 0.45, -0.45);
    laptopScreenObj.rotation.x = Math.PI / 6;
    laptop.add(laptopScreenObj);
    
    laptop.position.set(2, 0, -1);
    laptop.scale.set(0.7, 0.7, 0.7);
    scene.add(laptop);
    symbols.push(laptop);
    
    // Code brackets
    const bracketGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100, Math.PI);
    const bracketMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xF59E0B,
        metalness: 0.3,
        roughness: 0.4
    });
    
    const leftBracket = new THREE.Mesh(bracketGeometry, bracketMaterial);
    leftBracket.rotation.z = Math.PI / 2;
    leftBracket.position.set(-1, 1, 0);
    scene.add(leftBracket);
    symbols.push(leftBracket);
    
    const rightBracket = new THREE.Mesh(bracketGeometry, bracketMaterial);
    rightBracket.rotation.z = -Math.PI / 2;
    rightBracket.position.set(1, 1, 0);
    scene.add(rightBracket);
    symbols.push(rightBracket);
    
    // Add particles
    const particles = createParticles(scene, 100, 0xFFFFFF);
    
    // Start animation loop
    animate();
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate symbols
        symbols.forEach((symbol, index) => {
            symbol.rotation.y += 0.01;
            symbol.position.y = symbol.position.y + Math.sin(Date.now() * 0.001 + index) * 0.01;
        });
        
        // Rotate particles
        particles.rotation.y += 0.001;
        
        // Render scene
        renderer.render(scene, camera);
    }
}

// Initialize WordPress course 3D preview
function initWordPressCourse3D() {
    const container = document.getElementById('wordpressCourse3D');
    if (!container) return;
    
    // Initialize Three.js
    const threeJS = initThreeJS('wordpressCourse3D');
    if (!threeJS) return;
    
    const scene = threeJS.scene;
    const camera = threeJS.camera;
    const renderer = threeJS.renderer;
    
    // Add lights
    createLights(scene);
    
    // Create WordPress logo
    const group = new THREE.Group();
    
    // Create the circular base
    const baseGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.2, 32);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x21759b, // WordPress blue
        metalness: 0.3,
        roughness: 0.4
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    group.add(base);
    
    // Create the "W" shape (simplified)
    const createWLine = (x1, y1, z1, x2, y2, z2) => {
        const points = [];
        points.push(new THREE.Vector3(x1, y1, z1));
        points.push(new THREE.Vector3(x2, y2, z2));
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3 });
        
        return new THREE.Line(geometry, material);
    };
    
    // Create simplified "W" shape with lines
    const w1 = createWLine(-0.8, 0.5, 0, -0.5, -0.5, 0);
    const w2 = createWLine(-0.5, -0.5, 0, -0.3, 0.2, 0);
    const w3 = createWLine(-0.3, 0.2, 0, -0.1, -0.5, 0);
    const w4 = createWLine(-0.1, -0.5, 0, 0.2, 0.5, 0);
    const w5 = createWLine(0.2, 0.5, 0, 0.5, -0.5, 0);
    const w6 = createWLine(0.5, -0.5, 0, 0.7, 0.2, 0);
    const w7 = createWLine(0.7, 0.2, 0, 0.9, -0.5, 0);
    
    group.add(w1, w2, w3, w4, w5, w6, w7);
    
    // Position and add the group to the scene
    group.position.set(0, 0, 0);
    scene.add(group);
    
    // Add particles
    const particles = createParticles(scene, 50, 0xFFFFFF);
    
    // Start animation loop
    animate();
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the WordPress logo
        group.rotation.y += 0.01;
        
        // Rotate particles
        particles.rotation.y += 0.001;
        
        // Render scene
        renderer.render(scene, camera);
    }
}

// Initialize all course-related 3D elements
document.addEventListener('DOMContentLoaded', function() {
    initCourses3D();
    initWordPressCourse3D();
    
    // Other course-specific 3D initializations would go here
});
