// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Add slide animations to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('slide-in-left');
        } else {
            item.classList.add('slide-in-right');
        }
        observer.observe(item);
    });

    // Add animations to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.classList.add('fade-in');
        observer.observe(item);
    });

    // Add animations to stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.classList.add('fade-in');
        observer.observe(item);
    });
});

// Counter animation for statistics
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (target > 100) {
                    counter.textContent = Math.ceil(current) + '+';
                } else {
                    counter.textContent = Math.ceil(current);
                }
                setTimeout(updateCounter, 20);
            } else {
                if (target === 100) {
                    counter.textContent = '100+';
                } else if (target === 5) {
                    counter.textContent = '5';
                } else {
                    counter.textContent = '1M+';
                }
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section comes into view
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add button click effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Show alert for demo purposes (replace with actual functionality)
        if (this.textContent.includes('Donate') || this.textContent.includes('Volunteer')) {
            e.preventDefault();
            showNotification(this.textContent.includes('Donate') ? 
                'Thank you for your interest in donating! This is a demo website.' : 
                'Thank you for your interest in volunteering! This is a demo website.');
        }
    });
});

// Simple notification system
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 4000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const tillIllustration = document.querySelector('.till-illustration');
    
    if (heroTitle && scrolled < window.innerHeight) {
        heroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroSubtitle.style.transform = `translateY(${scrolled * 0.2}px)`;
        if (tillIllustration) {
            tillIllustration.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
});

// Add hover effects to gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 500);
    }
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.pageYOffset / scrollTotal) * 100;
        progressBar.style.width = scrollProgress + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
        position: relative;
    }
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--primary-color);
        border-radius: 2px;
    }
`;
document.head.appendChild(navStyle);

// ===== 3D CAROUSEL GALLERY =====
function initGalleryCarousel() {
    console.log("Initializing Gallery Carousel...");
    
    const galleryItems = [
        { 
            name: "Official HumaniTill Launch", 
            description: "The transparent human figure at Anuradhapura sacred sites",
            image: "images/humanitill-official.jpg"
        },
        { 
            name: "HumaniTill Initiative", 
            description: "Maliban's CSR project restoring hope and mobility",
            image: "images/humanitill-morning.jpg"
        },
        { 
            name: "Community Response", 
            description: "Overwhelming support from devotees and visitors",
            image: "images/humanitill-lbn.jpg"
        },
        { 
            name: "Jeewithaloka Programme", 
            description: "Maliban's commitment to inspiring goodness",
            image: "images/temple-sri-lanka.jpg"
        },
        { 
            name: "Meththa Foundation Partnership", 
            description: "Three decades of humanitarian service",
            image: "images/helping-hands.jpg"
        },
        { 
            name: "HumaniTill Vision", 
            description: "Restoring hope and dignity to lives across Sri Lanka",
            image: "images/main-image.png"
        }
    ];

    const cards = document.querySelectorAll(".card");
    const dots = document.querySelectorAll(".dot");
    const galleryItemName = document.querySelector(".gallery-item-name");
    const galleryItemDescription = document.querySelector(".gallery-item-description");
    const leftArrow = document.querySelector(".nav-arrow.left");
    const rightArrow = document.querySelector(".nav-arrow.right");
    
    console.log("Elements found:");
    console.log("Cards:", cards.length);
    console.log("Dots:", dots.length);
    console.log("Gallery name element:", galleryItemName ? "Found" : "Not found");
    console.log("Gallery description element:", galleryItemDescription ? "Found" : "Not found");
    console.log("Left arrow:", leftArrow ? "Found" : "Not found");
    console.log("Right arrow:", rightArrow ? "Found" : "Not found");
    
    if (!cards.length || !dots.length || !galleryItemName || !galleryItemDescription) {
        console.error("Missing carousel elements!");
        return; // Exit if elements don't exist
    }
    
    let currentIndex = 0;
    let isAnimating = false;

    function updateCarousel(newIndex) {
        console.log("Updating carousel to index:", newIndex);
        if (isAnimating) return;
        isAnimating = true;

        currentIndex = (newIndex + cards.length) % cards.length;

        cards.forEach((card, i) => {
            const offset = (i - currentIndex + cards.length) % cards.length;

            card.classList.remove(
                "center",
                "left-1",
                "left-2",
                "right-1",
                "right-2",
                "hidden"
            );

            if (offset === 0) {
                card.classList.add("center");
            } else if (offset === 1) {
                card.classList.add("right-1");
            } else if (offset === 2) {
                card.classList.add("right-2");
            } else if (offset === cards.length - 1) {
                card.classList.add("left-1");
            } else if (offset === cards.length - 2) {
                card.classList.add("left-2");
            } else {
                card.classList.add("hidden");
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });

        // Update gallery info with smooth transition
        galleryItemName.style.opacity = "0";
        galleryItemDescription.style.opacity = "0";

        setTimeout(() => {
            galleryItemName.textContent = galleryItems[currentIndex].name;
            galleryItemDescription.textContent = galleryItems[currentIndex].description;
            galleryItemName.style.opacity = "1";
            galleryItemDescription.style.opacity = "1";
        }, 300);

        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    // Event listeners with debugging
    if (leftArrow) {
        leftArrow.addEventListener("click", () => {
            console.log("Left arrow clicked");
            updateCarousel(currentIndex - 1);
        });
        
        leftArrow.tabIndex = 0;
        leftArrow.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                console.log("Left arrow activated with keyboard");
                updateCarousel(currentIndex - 1);
            }
        });
    } else {
        console.error("Left arrow not found!");
    }

    if (rightArrow) {
        rightArrow.addEventListener("click", () => {
            console.log("Right arrow clicked");
            updateCarousel(currentIndex + 1);
        });
        
        rightArrow.tabIndex = 0;
        rightArrow.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                console.log("Right arrow activated with keyboard");
                updateCarousel(currentIndex + 1);
            }
        });
    } else {
        console.error("Right arrow not found!");
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            console.log("Dot", i, "clicked");
            updateCarousel(i);
        });
        
        dot.tabIndex = 0;
        dot.setAttribute("role", "button");
        dot.setAttribute("aria-label", `Go to image ${i + 1}`);
        
        dot.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                console.log("Dot", i, "activated with keyboard");
                updateCarousel(i);
            }
        });
    });

    cards.forEach((card, i) => {
        card.addEventListener("click", () => {
            console.log("Card", i, "clicked");
            updateCarousel(i);
        });
    });

    // Simple keyboard navigation that always works
    document.addEventListener("keydown", function(e) {
        // Check if we're in an input field or textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        console.log("Key pressed:", e.key);
        
        if (e.key === "ArrowLeft" || e.key === "Left") {
            e.preventDefault();
            console.log("Left arrow - moving to previous");
            updateCarousel(currentIndex - 1);
        } else if (e.key === "ArrowRight" || e.key === "Right") {
            e.preventDefault();
            console.log("Right arrow - moving to next");
            updateCarousel(currentIndex + 1);
        } else if (e.key >= "1" && e.key <= "6") {
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            if (index < galleryItems.length) {
                console.log("Number key pressed:", e.key, "going to index:", index);
                updateCarousel(index);
            }
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    const carouselContainer = document.querySelector(".carousel-container");
    if (carouselContainer) {
        carouselContainer.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselContainer.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                updateCarousel(currentIndex + 1);
            } else {
                updateCarousel(currentIndex - 1);
            }
        }
    }

    // Auto-rotate carousel 
    let autoRotateInterval;
    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            updateCarousel(currentIndex + 1);
        }, 5000); // Rotate every 5 seconds
    }

    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }

    // Pause auto-rotate on hover
    const gallery = document.querySelector(".gallery");
    if (gallery) {
        gallery.addEventListener("mouseenter", stopAutoRotate);
        gallery.addEventListener("mouseleave", startAutoRotate);
    }

    // Initialize carousel
    updateCarousel(0);
    startAutoRotate();
    
    console.log("Gallery carousel initialized successfully!");
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Initializing all components...");
    initGalleryCarousel();
});
