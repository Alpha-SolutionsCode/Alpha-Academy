// Contact page 3D elements
function initContact3D() {
    const container = document.getElementById('contactForm3D');
    if (!container) return;
    
    // Initialize Three.js
    const threeJS = initThreeJS('contactForm3D');
    if (!threeJS) return;
    
    const scene = threeJS.scene;
    const camera = threeJS.camera;
    const renderer = threeJS.renderer;
    
    // Add lights
    createLights(scene);
    
    // Create floating communication symbols
    
    // Create envelope
    const envelopeGroup = new THREE.Group();
    
    // Envelope body
    const envelopeGeometry = new THREE.BoxGeometry(2, 1.2, 0.1);
    const envelopeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF,
        metalness: 0.1,
        roughness: 0.8
    });
    const envelope = new THREE.Mesh(envelopeGeometry, envelopeMaterial);
    envelopeGroup.add(envelope);
    
    // Envelope flap
    const flapShape = new THREE.Shape();
    flapShape.moveTo(-1, 0);
    flapShape.lineTo(0, 0.8);
    flapShape.lineTo(1, 0);
    
    const flapGeometry = new THREE.ShapeGeometry(flapShape);
    const flapMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xF0F0F0,
        metalness: 0.1,
        roughness: 0.8
    });
    const flap = new THREE.Mesh(flapGeometry, flapMaterial);
    flap.position.set(0, 0.6, 0.05);
    flap.rotation.x = Math.PI * 0.1;
    envelopeGroup.add(flap);
    
    // Position envelope
    envelopeGroup.position.set(-1.5, 0, 0);
    envelopeGroup.rotation.z = -Math.PI * 0.1;
    scene.add(envelopeGroup);
    
    // Create phone
    const phoneGroup = new THREE.Group();
    
    // Phone body
    const phoneGeometry = new THREE.BoxGeometry(0.8, 1.6, 0.1);
    const phoneMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        metalness: 0.5,
        roughness: 0.5
    });
    const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
    phoneGroup.add(phone);
    
    // Phone screen
    const screenGeometry = new THREE.BoxGeometry(0.7, 1.4, 0.02);
    const screenMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3B82F6,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x3B82F6,
        emissiveIntensity: 0.2
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.06;
    phoneGroup.add(screen);
    
    // Position phone
    phoneGroup.position.set(1.5, 0, 0);
    phoneGroup.rotation.z = Math.PI * 0.1;
    scene.add(phoneGroup);
    
    // Create location pin
    const pinGroup = new THREE.Group();
    
    // Pin head
    const pinHeadGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const pinMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xEF4444,
        metalness: 0.3,
        roughness: 0.7
    });
    const pinHead = new THREE.Mesh(pinHeadGeometry, pinMaterial);
    pinHead.position.y = 0.3;
    pinGroup.add(pinHead);
    
    // Pin point
    const pinPointGeometry = new THREE.ConeGeometry(0.3, 0.6, 16);
    const pinPoint = new THREE.Mesh(pinPointGeometry, pinMaterial);
    pinPoint.position.y = -0.3;
    pinPoint.rotation.x = Math.PI;
    pinGroup.add(pinPoint);
    
    // Position pin
    pinGroup.position.set(0, 1.5, 0);
    pinGroup.scale.set(0.7, 0.7, 0.7);
    scene.add(pinGroup);
    
    // Add particles
    const particles = createParticles(scene, 100, 0xFFFFFF);
    
    // Start animation loop
    animate();
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate envelope
        envelopeGroup.rotation.y += 0.01;
        envelopeGroup.position.y = Math.sin(Date.now() * 0.001) * 0.2;
        
        // Animate phone
        phoneGroup.rotation.y += 0.01;
        phoneGroup.position.y = Math.sin(Date.now() * 0.001 + 1) * 0.2;
        
        // Animate pin
        pinGroup.rotation.y += 0.01;
        pinGroup.position.y = 1.5 + Math.sin(Date.now() * 0.001 + 2) * 0.2;
        
        // Rotate particles
        particles.rotation.y += 0.001;
        
        // Render scene
        renderer.render(scene, camera);
    }
}

// Initialize accordion functionality
function initAccordions() {
    const accordionItems = document.querySelectorAll('.faq-item');
    
    accordionItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', () => {
            // Toggle current item
            answer.classList.toggle('active');
            
            // Update icon
            if (answer.classList.contains('active')) {
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });
    });
}

// Initialize all contact-related functionality
document.addEventListener('DOMContentLoaded', function() {
    initContact3D();
    initAccordions();
});
