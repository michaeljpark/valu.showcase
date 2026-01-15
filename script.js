// Design Showcase Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all showcase items and rows
    const showcaseItems = document.querySelectorAll('.showcase-item, .showcase-row');
    showcaseItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });

    // Lazy load images
    const images = document.querySelectorAll('.showcase-image');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Image will load when src is set (when actual images are added)
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Add smooth scroll behavior for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Handle image load errors (show placeholder gracefully)
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });

    // Add parallax effect on scroll (subtle)
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.showcase-item');

                parallaxElements.forEach((element, index) => {
                    const speed = 0.02;
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });

    // Console log for debugging
    console.log('Design showcase loaded successfully');
    console.log(`Total showcase items: ${showcaseItems.length}`);

    // Add a simple counter for loaded items
    let loadedCount = 0;
    showcaseItems.forEach(item => {
        item.addEventListener('animationend', function() {
            loadedCount++;
            if (loadedCount === showcaseItems.length) {
                console.log('All showcase items have been animated');
            }
        });
    });

    // Iframe load handler
    const iframe = document.querySelector('iframe');
    if (iframe) {
        iframe.addEventListener('load', function() {
            console.log('Embedded content loaded successfully');
        });
    }

    // Scroll-based slideshow for images 6-12
    const scrollSlideshow = document.querySelector('.scroll-slideshow');
    const slides = document.querySelectorAll('.scroll-slide');

    if (scrollSlideshow && slides.length > 0) {
        let ticking = false;

        function updateSlide() {
            const rect = scrollSlideshow.getBoundingClientRect();
            const scrollProgress = -rect.top / (rect.height - window.innerHeight);
            const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

            // Calculate which slide should be active (0-6 for 7 slides)
            const slideIndex = Math.floor(clampedProgress * (slides.length - 0.01));
            const finalIndex = Math.min(slideIndex, slides.length - 1);

            // Update active slide
            slides.forEach((slide, index) => {
                if (index === finalIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateSlide);
                ticking = true;
            }
        });

        // Initial update
        updateSlide();
    }

    // Side Indicator / Navigation Logic
    const navItems = document.querySelectorAll('#side-indicator li');
    // Map data-target to elements
    const sections = Array.from(navItems).map(item => {
        const targetId = item.getAttribute('data-target');
        return document.getElementById(targetId);
    });

    // Click handler
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Determine offset based on section (nav height etc)
                const offset = 100; 
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll handler for active state
    function updateActiveIndicator() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Find the current section
        let currentId = null;
        
        // Check sections status
        sections.forEach(section => {
            if (section) {
                const sectionTop = section.offsetTop - 200; // Trigger point offset
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentId = section.getAttribute('id');
                }
            }
        });
        
        // If bottom of page, highlight last item
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            currentId = sections[sections.length - 1].getAttribute('id');
        } else if (scrollPosition < (sections[0] ? sections[0].offsetTop : 0)) {
             // If above first section (like header), maybe highlight first? or none.
             // Usually first section is Research, which is after header.
             // Let's keep first highlighted if we are effectively inside it or before second.
             // Actually my logic above handles it if we are past sectionTop.
        }

        // Apply active class
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === currentId) {
                item.classList.add('active');
            }
        });

        // Fallback: if no currentId found (maybe between gaps?), highlight the last passed section
        if (!currentId && sections.length > 0) {
             for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && scrollPosition >= section.offsetTop - 200) {
                    navItems[i].classList.add('active');
                    break;
                }
             }
        }
    }

    window.addEventListener('scroll', function() {
        window.requestAnimationFrame(updateActiveIndicator);
    });
    
    // Initial check
    setTimeout(updateActiveIndicator, 100);

});
