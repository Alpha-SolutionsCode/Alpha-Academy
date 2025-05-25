// Carousel functionality
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    
    if (carousels.length === 0) return;
    
    carousels.forEach(carousel => {
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const controls = carousel.querySelectorAll('.carousel-control');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        
        if (!inner || items.length === 0) return;
        
        let currentIndex = 0;
        const itemCount = items.length;
        
        // Set initial state
        updateCarousel();
        
        // Add event listeners to controls
        if (controls.length >= 2) {
            const prevButton = controls[0];
            const nextButton = controls[1];
            
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + itemCount) % itemCount;
                updateCarousel();
            });
            
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % itemCount;
                updateCarousel();
            });
        }
        
        // Add event listeners to indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Auto-play functionality (optional)
        let interval;
        const startAutoPlay = () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % itemCount;
                updateCarousel();
            }, 5000); // Change slide every 5 seconds
        };
        
        const stopAutoPlay = () => {
            clearInterval(interval);
        };
        
        // Start auto-play
        startAutoPlay();
        
        // Pause auto-play on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        
        // Update carousel state
        function updateCarousel() {
            // For standard carousel
            if (!carousel.classList.contains('carousel-3d')) {
                inner.style.transform = `translateX(-${currentIndex * 100}%)`;
            } 
            // For 3D carousel
            else {
                items.forEach((item, index) => {
                    if (index === currentIndex) {
                        item.classList.add('active');
                        item.classList.remove('prev', 'next');
                    } else if (index === (currentIndex - 1 + itemCount) % itemCount) {
                        item.classList.add('prev');
                        item.classList.remove('active', 'next');
                    } else if (index === (currentIndex + 1) % itemCount) {
                        item.classList.add('next');
                        item.classList.remove('active', 'prev');
                    } else {
                        item.classList.remove('active', 'prev', 'next');
                    }
                });
            }
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
    });
}
