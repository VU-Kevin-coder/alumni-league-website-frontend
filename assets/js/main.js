   document.addEventListener('DOMContentLoaded', function() {
        // Slider functionality
        const slider = document.querySelector('.hero-slider');
        const slides = document.querySelectorAll('.hero-slide');
        const dotsContainer = document.querySelector('.slider-dots');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        let currentSlide = 0;
        let slideInterval;
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.slider-dot');
        
        // Initialize slider
        function initSlider() {
            slides[0].classList.add('active');
            dots[0].classList.add('active');
        }
        
        // Go to specific slide
        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = (index + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            resetInterval();
        }
        
        // Next slide
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
        
        // Previous slide
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }
        
        // Reset autoplay interval
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000);
        }
        
        // Event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Pause on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', resetInterval);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Initialize
        initSlider();
        resetInterval();
        
        // Countdown timer for next match
        function updateCountdown() {
            // Set your target date here (YYYY, MM-1, DD, HH, MM, SS)
            const targetDate = new Date(2025, 7, 10, 10, 0, 0).getTime();
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                // If countdown is over
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                return;
            }
            
            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display results
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
        
        // Update countdown every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
document.addEventListener('DOMContentLoaded', function() {
  
    // =====================
    // Common Functionality
    // =====================
    
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('#navbarNav');
    
    if (navbarToggler && navbarNav) {
        navbarToggler.addEventListener('click', function() {
            navbarNav.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarNav.classList.contains('show')) {
                navbarNav.classList.remove('show');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
            
            // Also highlight parent dropdown item if this is a dropdown page
            const dropdown = link.closest('.dropdown-menu');
            if (dropdown) {
                const dropdownToggle = document.querySelector(`[aria-labelledby="${dropdown.id}"]`);
                if (dropdownToggle) {
                    dropdownToggle.classList.add('active');
                }
            }
        } else {
            link.classList.remove('active');
        }
    });
    
    // =====================
    // Home Page Specific
    // =====================
    if (document.querySelector('.hero-section')) {
        // Home page hero animation
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                heroSection.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            });
        }
        
        // Match cards hover effect
        const matchCards = document.querySelectorAll('.match-card');
        matchCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }
    
    // =====================
    // Blog Page Specific
    // =====================
    if (document.querySelector('.blog-post-card')) {
        // Blog post card hover effects
        const blogCards = document.querySelectorAll('.blog-post-card');
        blogCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
        
        // Category filter functionality
        const categoryLinks = document.querySelectorAll('.list-group-item-action');
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                categoryLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                // Here you would typically filter blog posts by category
                console.log(`Filtering by: ${this.textContent.trim()}`);
            });
        });
    }
    
    // =====================
    // Media Page Specific
    // =====================
    if (document.querySelector('.gallery-item')) {
        // Initialize Lightbox
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'showImageNumberLabel': true,
            'positionFromTop': 100,
            'disableScrolling': true
        });
        
        // Team filter functionality
        const teamFilterBtn = document.getElementById('filterDropdown');
        const teamFilterItems = document.querySelectorAll('.dropdown-item');
        
        if (teamFilterBtn) {
            teamFilterItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const teamName = this.textContent;
                    teamFilterBtn.textContent = `Filter by: ${teamName}`;
                    
                    // Here you would typically filter the gallery by team
                    console.log(`Filtering gallery by: ${teamName}`);
                    
                    // Show all items first
                    const galleryItems = document.querySelectorAll('.gallery-item');
                    galleryItems.forEach(item => item.style.display = 'block');
                    
                    // If not "All Teams", filter
                    if (teamName !== 'All Teams') {
                        galleryItems.forEach(item => {
                            const caption = item.querySelector('h6').textContent;
                            if (!caption.includes(teamName)) {
                                item.style.display = 'none';
                            }
                        });
                    }
                });
            });
        }
        
        // Video card play button functionality
        const videoCards = document.querySelectorAll('.video-card');
        videoCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Prevent triggering if clicking on links inside the card
                if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
                    return;
                }
                
                const videoTitle = this.querySelector('.card-title').textContent;
                console.log(`Playing video: ${videoTitle}`);
                // In a real implementation, this would open a modal with the video player
                // For now, we'll just show an alert
                alert(`Now playing: ${videoTitle}`);
            });
        });
    }
    
    // =====================
    // Newsletter Form Handling
    // =====================
    const newsletterForms = document.querySelectorAll('form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // Here you would typically send the email to your server
                console.log(`Subscribed email: ${emailInput.value}`);
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    });
    
    // =====================
    // Social Share Buttons
    // =====================
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.split(' ')[1];
            let shareUrl = '';
            const currentUrl = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            switch (platform) {
                case 'fa-facebook-f':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
                    break;
                case 'fa-twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`;
                    break;
                case 'fa-instagram':
                    // Instagram doesn't have a direct share URL, so we'll just open their main site
                    shareUrl = 'https://www.instagram.com/';
                    break;
                case 'fa-youtube':
                    shareUrl = 'https://www.youtube.com/';
                    break;
                default:
                    return;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
    
    // =====================
    // Scroll to Top Button
    // =====================
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'btn btn-primary scroll-to-top';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.style.zIndex = '1000';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.width = '50px';
    scrollToTopBtn.style.height = '50px';
    scrollToTopBtn.style.fontSize = '1.2rem';
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // =====================
    // Animation Triggers
    // =====================
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                const animationClass = element.classList[1]; // Get the animate__ class
                element.classList.add(animationClass);
            }
        });
    }
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
// Contact Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form fields
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Reset error states
            document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
            document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
            
            // Validate First Name
            if (!firstName.value.trim()) {
                showError(firstName, 'Please enter your first name');
                isValid = false;
            }
            
            // Validate Last Name
            if (!lastName.value.trim()) {
                showError(lastName, 'Please enter your last name');
                isValid = false;
            }
            
            // Validate Email
            if (!email.value.trim()) {
                showError(email, 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate Subject
            if (!subject.value) {
                showError(subject, 'Please select a subject');
                isValid = false;
            }
            
            // Validate Message
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message should be at least 10 characters');
                isValid = false;
            }
            
            if (isValid) {
                // In a real application, you would send the form data to the server here
                // For demonstration, we'll show a success message
                showFormSuccess();
                
                // Reset form
                contactForm.reset();
            }
        });
        
        // Helper function to show error messages
        function showError(input, message) {
            input.classList.add('is-invalid');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            errorDiv.textContent = message;
            input.parentNode.appendChild(errorDiv);
        }
        
        // Helper function to validate email
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        
        // Show success message
        function showFormSuccess() {
            // Create success alert
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success alert-dismissible fade show mt-4';
            alertDiv.setAttribute('role', 'alert');
            alertDiv.innerHTML = `
                <strong>Thank you!</strong> Your message has been sent. We'll get back to you soon.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            
            // Insert after form
            contactForm.parentNode.insertBefore(alertDiv, contactForm.nextSibling);
            
            // Auto-dismiss after 5 seconds
            setTimeout(() => {
                const alert = bootstrap.Alert.getOrCreateInstance(alertDiv);
                alert.close();
            }, 5000);
        }
    }
    
    // FAQ Accordion Enhancements
    const faqAccordion = document.getElementById('faqAccordion');
    if (faqAccordion) {
        // Add click handler to all accordion buttons
        const accordionButtons = faqAccordion.querySelectorAll('.accordion-button');
        
        accordionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Add animation class when opening
                const collapseTarget = document.querySelector(button.getAttribute('data-bs-target'));
                
                if (!collapseTarget.classList.contains('show')) {
                    collapseTarget.classList.add('animate__animated', 'animate__fadeIn');
                    
                    // Remove animation class after animation completes
                    collapseTarget.addEventListener('animationend', function() {
                        collapseTarget.classList.remove('animate__animated', 'animate__fadeIn');
                    }, { once: true });
                }
            });
        });
    }
    
    // Contact Info Card Hover Effects
    const contactCards = document.querySelectorAll('.contact-info .card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Map Interaction
    const mapIframe = document.querySelector('.ratio-16x9 iframe');
    if (mapIframe) {
        // Make map container focusable for accessibility
        mapIframe.setAttribute('tabindex', '0');
        
        // Add hover effect to map container
        const mapContainer = mapIframe.parentElement;
        mapContainer.style.transition = 'box-shadow 0.3s ease';
        
        mapContainer.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        
        mapContainer.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    }
});