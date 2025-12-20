/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navList = document.querySelector('.nav__list');

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navList.classList.add('show-menu');
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navList.classList.remove('show-menu');
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () =>{
    const navList = document.querySelector('.nav__list');
    navList.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = () =>{
    const header = document.querySelector('.header');
    if(header) {
        if(window.scrollY >= 50) {
            header.classList.add('bg-header');
        } else {
            header.classList.remove('bg-header');
        }
    }
}
window.addEventListener('scroll', bgHeader);
bgHeader();

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

// Get previously selected theme
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Function to get current theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton && themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

// Apply previously selected theme on page load
if (selectedTheme) {
    if(selectedTheme === 'dark') {
        document.body.classList.add(darkTheme);
    } else {
        document.body.classList.remove(darkTheme);
    }
    
    if(themeButton && selectedIcon) {
        if(selectedIcon === 'ri-moon-line') {
            themeButton.classList.remove(iconTheme);
            themeButton.classList.add('ri-moon-line');
        } else {
            themeButton.classList.remove('ri-moon-line');
            themeButton.classList.add(iconTheme);
        }
    }
}

// Theme toggle functionality
if(themeButton) {
    themeButton.addEventListener('click', () => {
        // Toggle dark theme on body
        document.body.classList.toggle(darkTheme);
        
        // Toggle icon
        if(themeButton.classList.contains('ri-moon-line')) {
            themeButton.classList.remove('ri-moon-line');
            themeButton.classList.add(iconTheme);
        } else {
            themeButton.classList.remove(iconTheme);
            themeButton.classList.add('ri-moon-line');
        }
        
        // Save theme preference
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
}

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUpBtn = document.getElementById('scroll-top');
    if(scrollUpBtn) {
        if(window.scrollY >= 350) {
            scrollUpBtn.classList.add('show-scroll');
        } else {
            scrollUpBtn.classList.remove('show-scroll');
        }
    }
}
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () =>{
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if(sectionsClass){
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                sectionsClass.classList.add('active-link');
            }else{
                sectionsClass.classList.remove('active-link');
            }
        }
    })
}
window.addEventListener('scroll', scrollActive);

/*=============== PROJECT FILTERING ===============*/
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if(filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if(filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else if(categories && categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/*=============== ANIMATE STATS ON SCROLL ===============*/
const statsSection = document.querySelector('.project-stats');
let statsAnimated = false;

const animateValue = (element, start, end, duration) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
};

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target')) || parseInt(stat.textContent);
                if(target) {
                    animateValue(stat, 0, target, 2000);
                }
            });
        }
    });
}, observerOptions);

if(statsSection) {
    observer.observe(statsSection);
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
const revealElements = document.querySelectorAll('.project-card, .skill-category, .stat-card, .publication-card, .timeline-item');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if(elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/*=============== INITIALIZE ANIMATIONS ===============*/
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Trigger initial reveal
    revealOnScroll();
    
    // Initial scroll checks
    bgHeader();
    scrollUp();
    
    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('selected-theme');
    const savedIcon = localStorage.getItem('selected-icon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add(darkTheme);
        if(themeButton) {
            themeButton.classList.remove('ri-moon-line');
            themeButton.classList.add(iconTheme);
        }
    }
});