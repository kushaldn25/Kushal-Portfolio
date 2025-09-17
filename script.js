document.addEventListener('DOMContentLoaded', function () {
    // Scrollspy functionality
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Theme toggle functionality
    const themeSwitch = document.getElementById('theme-switch');
    const doc = document.documentElement;
    // Set Light mode as default
    if (localStorage.getItem('theme') === 'dark') {
        doc.classList.add('dark');
        themeSwitch.checked = true;
    } else {
        doc.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }

    themeSwitch.addEventListener('change', function () {
        if (this.checked) {
            doc.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            doc.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Skill Filtering (Card System)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            skillCards.forEach(card => {
                if (card.getAttribute('data-category') === category) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        });
    });
    document.querySelector('.filter-btn[data-category="languages"]').click();

    // Typing animation
    const typingText = document.getElementById('typing-text');
    const roles = [
        "An AI/ML Researcher",
        "An MLOps Enthusiast",
        "A Creative Developer",
        "A Problem Solver"
    ];
    let roleIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < roles[roleIndex].length) {
            typingText.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500);
        }
    }

    type();

    // Scroll Animation Observer
    const animatedElements = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Triggers when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // === NEW: Mobile Menu Functionality ===
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = mobileMenu.querySelectorAll('a.nav-link');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
});