// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Testimonials Slider
const testimonialsContainer = document.querySelector('.testimonials-container');
const testimonialCards = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.slider-dot');
let currentIndex = 0;
let slideInterval;

function updateSlider() {
    testimonialsContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update active dot
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonialCards.length;
    updateSlider();
}

// Auto slide every 5 seconds
function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
    clearInterval(slideInterval);
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
        stopSlider();
        startSlider();
    });
});

// Pause slider on hover
testimonialsContainer.addEventListener('mouseenter', stopSlider);
testimonialsContainer.addEventListener('mouseleave', startSlider);

// Initialize slider
startSlider();

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    
    // Simple validation
    if (!name || !email) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // In a real application, you would send this data to a server
    alert(`Thank you ${name}! We have received your inquiry for ${service || 'our services'}. We will contact you at ${email} shortly.`);
    
    // Reset form
    contactForm.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.background = 'var(--secondary)';
    }
});

// Animation on scroll
function checkScroll() {
    const elements = document.querySelectorAll('.service-card, .instructor-card, .about-content, .contact-container');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements for animation
document.querySelectorAll('.service-card, .instructor-card, .about-content, .contact-container').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Form validation enhancement
const formControls = document.querySelectorAll('.form-control');

formControls.forEach(control => {
    control.addEventListener('blur', () => {
        if (control.value.trim() !== '') {
            control.classList.add('filled');
        } else {
            control.classList.remove('filled');
        }
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');




    // Enhanced Services Section Interactivity
const serviceCards = document.querySelectorAll('.service-card');



// Add click effect to service cards
serviceCards.forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'translateY(-15px) scale(1)';
        }, 150);
    });
});

// Add keyboard navigation for service cards
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        const focusedCard = document.querySelector('.service-card:focus');
        if (focusedCard) {
            focusedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Pricing Modal Functionality
const pricingModal = document.getElementById('pricingModal');
const comparisonPopup = document.getElementById('comparisonPopup');
const offerPopup = document.getElementById('offerPopup');

// Pricing data for modals
const pricingData = {
    'single-lesson': {
        title: 'Single Driving Lesson',
        price: 'CHF 85',
        features: 'Perfect for trying out our teaching style or getting some extra practice.',
        benefits: [
            '60-minute personalized session',
            'Professional certified instructor',
            'Modern training vehicle',
            'Flexible scheduling',
            'Basic theory introduction'
        ]
    },
    '10-lesson-package': {
        title: '10-Lesson Package',
        price: 'CHF 790',
        features: 'Our most popular package for comprehensive driving education.',
        benefits: [
            '10 x 60-minute sessions',
            'Complete theory materials',
            'Practice test simulations',
            'Progress tracking system',
            'Priority scheduling',
            'Road safety workshop'
        ]
    },
    'complete-course': {
        title: 'Complete Driving Course',
        price: 'CHF 1,450',
        features: 'Everything you need to become a confident, licensed driver.',
        benefits: [
            '20 lessons + exam preparation',
            'Full theory course included',
            'Mock driving test',
            'Exam booking assistance',
            'Certificate of completion',
            '1-year post-license support',
            'Defensive driving techniques'
        ]
    }
};

// Open pricing modal
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('click', function() {
        const packageType = this.querySelector('h4').textContent.toLowerCase();
        openPricingModal(packageType);
    });
});

function openPricingModal(packageType) {
    const data = getPricingData(packageType);
    
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalPrice').textContent = data.price;
    document.getElementById('modalFeatures').innerHTML = `<p>${data.features}</p>`;
    
    const benefitsList = document.getElementById('modalBenefits');
    benefitsList.innerHTML = '';
    data.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        benefitsList.appendChild(li);
    });
    
    pricingModal.classList.add('active');
}

function getPricingData(packageType) {
    if (packageType.includes('single')) return pricingData['single-lesson'];
    if (packageType.includes('10-lesson') || packageType.includes('package')) return pricingData['10-lesson-package'];
    if (packageType.includes('complete')) return pricingData['complete-course'];
    return pricingData['single-lesson'];
}

// Close modals
document.querySelectorAll('.close-modal, .modal-close-btn, .comparison-close, .offer-close').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
});

function closeAllModals() {
    pricingModal.classList.remove('active');
    comparisonPopup.classList.remove('active');
    offerPopup.classList.remove('active');
}

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === pricingModal) closeAllModals();
    if (e.target === comparisonPopup) closeAllModals();
    if (e.target === offerPopup) closeAllModals();
});

// Comparison functionality
document.querySelector('.comparison-btn').addEventListener('click', () => {
    comparisonPopup.classList.add('active');
});

// Special offer timer
function startOfferTimer() {
    let hours = 24;
    let minutes = 59;
    let seconds = 59;
    
    const timer = setInterval(() => {
        document.getElementById('offerHours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('offerMinutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('offerSeconds').textContent = seconds.toString().padStart(2, '0');
        
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    clearInterval(timer);
                    offerPopup.classList.remove('active');
                }
            }
        }
    }, 1000);
}

// Show offer popup after 5 seconds
setTimeout(() => {
    offerPopup.classList.add('active');
    startOfferTimer();
}, 5000);

// Book buttons
document.querySelectorAll('.modal-book-btn, .offer-claim').forEach(btn => {
    btn.addEventListener('click', function() {
        closeAllModals();
        // Scroll to contact form
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        // Show success message
        showTrafficNotification('Ready to Book!', 'Please fill out the contact form and we will get back to you shortly!');
    });
});




});