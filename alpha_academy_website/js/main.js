// Main JavaScript functionality for the Alpha Academy website

// Global variables
let isMenuOpen = false;
let currentTheme = 'light';

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize modals
    initModals();
    
    // Initialize tooltips
    initTooltips();
    
    // Check for page-specific initializations
    initPageSpecific();
    
    // Initialize responsive behaviors
    initResponsiveBehaviors();

    // FAQ accordion functionality
    const faqButtons = document.querySelectorAll('.faq-item button');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const icon = button.querySelector('i');
            
            answer.classList.toggle('hidden');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });

    // Form validation and submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, this would send data to a server
            alert('Thank you for your submission! We will get back to you soon.');
            form.reset();
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('text-primary');
            link.classList.remove('text-gray-600');
        }
    });
});

// Initialize navigation functionality
function initNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            isMenuOpen = true;
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            isMenuOpen = false;
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu on window resize if it's open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && isMenuOpen && mobileMenu) {
            mobileMenu.classList.remove('active');
            isMenuOpen = false;
            document.body.style.overflow = '';
        }
    });
    
    // Add scroll behavior to header
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .fade-right, .fade-left');
    
    if (animatedElements.length > 0) {
        // Initial check for elements in viewport
        checkElementsInViewport(animatedElements);
        
        // Check on scroll
        window.addEventListener('scroll', function() {
            checkElementsInViewport(animatedElements);
        });
    }
}

// Check if elements are in viewport and add animation class
function checkElementsInViewport(elements) {
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initialize modals
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close modal when clicking outside content
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Initialize tooltips
function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = tooltipText;
            
            document.body.appendChild(tooltip);
            
            const triggerRect = this.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            tooltip.style.top = (triggerRect.top - tooltipRect.height - 10) + 'px';
            tooltip.style.left = (triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2)) + 'px';
            
            tooltip.classList.add('visible');
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// Initialize page-specific functionality
function initPageSpecific() {
    // Get current page
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';
    
    // Home page
    if (pageName === 'index.html' || pageName === '') {
        initCounters();
    }
    
    // Courses page
    if (pageName === 'courses.html') {
        initCourseFilters();
    }
    
    // Blog page
    if (pageName === 'blog.html') {
        initBlogFilters();
    }
    
    // Team page
    if (pageName === 'team.html') {
        initTeamFilters();
    }
    
    // Contact page
    if (pageName === 'contact.html') {
        initContactForm();
    }
}

// Initialize counters for statistics
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const step = Math.ceil(target / (duration / 16)); // 60fps
                    
                    let count = 0;
                    const updateCounter = () => {
                        count += step;
                        if (count < target) {
                            counter.textContent = count;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

// Initialize responsive behaviors
function initResponsiveBehaviors() {
    // Responsive tables
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('table-responsive');
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
    
    // Responsive videos
    const videos = document.querySelectorAll('iframe[src*="youtube"], iframe[src*="vimeo"]');
    videos.forEach(video => {
        if (!video.parentNode.classList.contains('video-responsive')) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('video-responsive');
            video.parentNode.insertBefore(wrapper, video);
            wrapper.appendChild(video);
        }
    });
}

// Initialize course filters
function initCourseFilters() {
    const filterTabs = document.getElementById('courseFilterTabs');
    const courseGrid = document.getElementById('courseGrid');
    
    if (filterTabs && courseGrid) {
        const tabs = filterTabs.querySelectorAll('.filter-tab');
        const courses = courseGrid.querySelectorAll('.course-card');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                const filter = tab.getAttribute('data-filter');
                
                // Show/hide courses based on filter
                courses.forEach(course => {
                    if (filter === 'all' || course.getAttribute('data-category') === filter) {
                        course.style.display = '';
                    } else {
                        course.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Initialize blog filters
function initBlogFilters() {
    const filterTabs = document.getElementById('blogFilterTabs');
    const blogGrid = document.getElementById('blogGrid');
    
    if (filterTabs && blogGrid) {
        const tabs = filterTabs.querySelectorAll('.filter-tab');
        const posts = blogGrid.querySelectorAll('.blog-card');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                const filter = tab.getAttribute('data-filter');
                
                // Show/hide posts based on filter
                posts.forEach(post => {
                    if (filter === 'all' || post.getAttribute('data-category') === filter) {
                        post.style.display = '';
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Initialize team filters
function initTeamFilters() {
    const filterTabs = document.getElementById('teamFilterTabs');
    const teamGrid = document.getElementById('teamGrid');
    
    if (filterTabs && teamGrid) {
        const tabs = filterTabs.querySelectorAll('.filter-tab');
        const members = teamGrid.querySelectorAll('.team-card');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                const filter = tab.getAttribute('data-filter');
                
                // Show/hide team members based on filter
                members.forEach(member => {
                    if (filter === 'all' || member.getAttribute('data-category') === filter) {
                        member.style.display = '';
                    } else {
                        member.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const privacyAgree = document.getElementById('privacyAgree').checked;
            
            // Validate form
            let isValid = true;
            let errorMessage = '';
            
            if (!name) {
                isValid = false;
                errorMessage += 'Name is required.\n';
            }
            
            if (!email) {
                isValid = false;
                errorMessage += 'Email is required.\n';
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            if (!subject) {
                isValid = false;
                errorMessage += 'Subject is required.\n';
            }
            
            if (!message) {
                isValid = false;
                errorMessage += 'Message is required.\n';
            }
            
            if (!privacyAgree) {
                isValid = false;
                errorMessage += 'You must agree to the Privacy Policy.\n';
            }
            
            if (!isValid) {
                alert('Please correct the following errors:\n' + errorMessage);
                return;
            }
            
            // In a real application, this would send data to a server
            // For demo purposes, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
