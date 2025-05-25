// Three.js setup and configuration
let scene, camera, renderer;

function initThreeJS(containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) return null;
    
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    const aspectRatio = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    return { scene, camera, renderer };
}

// Helper function to create a basic light setup
function createLights(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    return { ambientLight, directionalLight };
}

// Helper function to create particles
function createParticles(scene, count = 200, color = 0xffffff) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 20;
        
        vertices.push(x, y, z);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    const material = new THREE.PointsMaterial({
        color: color,
        size: 0.1,
        transparent: true,
        opacity: 0.8
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    return particles;
}

// Helper function to create a simple cube
function createCube(scene, color = 0x1E3A8A, size = 1) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({ 
        color: color,
        metalness: 0.3,
        roughness: 0.4
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    return cube;
}

// Helper function to create a graduation cap
function createGraduationCap(scene) {
    const group = new THREE.Group();
    
    // Create the cap base
    const baseGeometry = new THREE.BoxGeometry(2, 0.2, 2);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1E3A8A,
        metalness: 0.3,
        roughness: 0.4
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    group.add(base);
    
    // Create the cap top
    const topGeometry = new THREE.ConeGeometry(0.5, 0.5, 4);
    const topMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1E3A8A,
        metalness: 0.3,
        roughness: 0.4
    });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.y = 0.35;
    top.rotation.y = Math.PI / 4;
    group.add(top);
    
    // Create the tassel
    const tasselGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8);
    const tasselMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xF59E0B,
        metalness: 0.3,
        roughness: 0.4
    });
    const tassel = new THREE.Mesh(tasselGeometry, tasselMaterial);
    tassel.position.set(0.8, -0.2, 0.8);
    tassel.rotation.z = Math.PI / 6;
    group.add(tassel);
    
    // Add the group to the scene
    scene.add(group);
    
    return group;
}

// Helper function to create a book
function createBook(scene, width = 1.5, height = 0.2, depth = 1, color = 0x10B981) {
    const group = new THREE.Group();
    
    // Create the book body
    const bodyGeometry = new THREE.BoxGeometry(width, height, depth);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: color,
        metalness: 0.1,
        roughness: 0.8
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);
    
    // Create the book pages
    const pagesGeometry = new THREE.BoxGeometry(width - 0.1, height - 0.02, depth - 0.1);
    const pagesMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        metalness: 0,
        roughness: 0.9
    });
    const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
    pages.position.y = 0.01;
    group.add(pages);
    
    // Add the group to the scene
    scene.add(group);
    
    return group;
}
