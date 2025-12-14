// Design Showcase Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all showcase items
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach(item => {
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
});

// Utility function to create dynamic placeholder colors
function generatePlaceholderGradient(index) {
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
        'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        'linear-gradient(135deg, #f8b500 0%, #fceabb 100%)'
    ];
    return gradients[index % gradients.length];
}

// Apply different gradients to placeholders
document.addEventListener('DOMContentLoaded', function() {
    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach((container, index) => {
        container.style.background = generatePlaceholderGradient(index);
    });
});
