// Student Portal 3D elements
function initPortal3D() {
    const container = document.getElementById('portal3dContainer');
    if (!container) return;
    
    // Initialize Three.js
    const threeJS = initThreeJS('portal3dContainer');
    if (!threeJS) return;
    
    const scene = threeJS.scene;
    const camera = threeJS.camera;
    const renderer = threeJS.renderer;
    
    // Add lights
    createLights(scene);
    
    // Create digital portal elements
    
    // Create a grid floor
    const gridSize = 20;
    const gridDivisions = 20;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x1E3A8A, 0x3B82F6);
    gridHelper.position.y = -2;
    scene.add(gridHelper);
    
    // Create floating data cubes
    const cubes = [];
    for (let i = 0; i < 15; i++) {
        const size = Math.random() * 0.5 + 0.2;
        const cube = createCube(scene, 0x3B82F6, size);
        cube.position.set(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 10
        );
        cube.material.transparent = true;
        cube.material.opacity = 0.7;
        cubes.push(cube);
    }
    
    // Create digital streams (lines)
    const createStream = () => {
        const points = [];
        const startPoint = new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            -5,
            (Math.random() - 0.5) * 20
        );
        
        const endPoint = new THREE.Vector3(
            startPoint.x + (Math.random() - 0.5) * 10,
            5,
            startPoint.z + (Math.random() - 0.5) * 10
        );
        
        // Create a curved path
        for (let i = 0; i <= 10; i++) {
            const t = i / 10;
            const x = startPoint.x + (endPoint.x - startPoint.x) * t;
            const y = startPoint.y + (endPoint.y - startPoint.y) * t;
            const z = startPoint.z + (endPoint.z - startPoint.z) * t;
            
            // Add some curve
            const curveX = Math.sin(t * Math.PI) * (Math.random() - 0.5) * 2;
            const curveZ = Math.sin(t * Math.PI) * (Math.random() - 0.5) * 2;
            
            points.push(new THREE.Vector3(x + curveX, y, z + curveZ));
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ 
            color: 0x10B981, 
            linewidth: 1,
            transparent: true,
            opacity: 0.7
        });
        
        return new THREE.Line(geometry, material);
    };
    
    const streams = [];
    for (let i = 0; i < 20; i++) {
        const stream = createStream();
        scene.add(stream);
        streams.push(stream);
    }
    
    // Add particles
    const particles = createParticles(scene, 200, 0xFFFFFF);
    
    // Start animation loop
    animate();
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate cubes
        cubes.forEach((cube, index) => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cube.position.y = cube.position.y + Math.sin(Date.now() * 0.001 + index) * 0.01;
        });
        
        // Animate streams
        streams.forEach((stream, index) => {
            stream.material.opacity = 0.3 + Math.sin(Date.now() * 0.001 + index) * 0.2;
        });
        
        // Rotate particles
        particles.rotation.y += 0.001;
        
        // Render scene
        renderer.render(scene, camera);
    }
}

// Initialize tabs functionality
function initTabs(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const tabButtons = container.querySelectorAll('[data-tab]');
    const tabPanels = container.querySelectorAll('[data-tab-content]');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Deactivate all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Activate selected button and panel
            button.classList.add('active');
            const selectedPanel = container.querySelector(`[data-tab-content="${tabId}"]`);
            if (selectedPanel) {
                selectedPanel.classList.add('active');
            }
        });
    });
}

// Initialize all portal-related functionality
document.addEventListener('DOMContentLoaded', function() {
    initPortal3D();
    initTabs('authTabs');
    initTabs('dashboardTabs');
});
