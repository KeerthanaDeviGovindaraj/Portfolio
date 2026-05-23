/*==================================================
  PORTFOLIO WEBSITE JAVASCRIPT
==================================================*/

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navList = document.querySelector('.nav__list');

/* Show Menu */
if (navToggle) {
   navToggle.addEventListener('click', () => {
      navList.classList.add('show-menu');
   });
}

/* Hide Menu */
if (navClose) {
   navClose.addEventListener('click', () => {
      navList.classList.remove('show-menu');
   });
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLinks = document.querySelectorAll('.nav__link');

const linkAction = () => {
   navList.classList.remove('show-menu');
};

navLinks.forEach(link =>
   link.addEventListener('click', linkAction)
);

/*=============== CHANGE HEADER BACKGROUND ===============*/
const bgHeader = () => {
   const header = document.querySelector('.header');

   if (window.scrollY >= 50) {
      header.classList.add('bg-header');
   } else {
      header.classList.remove('bg-header');
   }
};

window.addEventListener('scroll', bgHeader);

/*=============== DARK / LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

/* Previously Selected Theme */
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

/* Current Theme Functions */
const getCurrentTheme = () =>
   document.body.classList.contains(darkTheme)
      ? 'dark'
      : 'light';

const getCurrentIcon = () =>
   themeButton.classList.contains(iconTheme)
      ? 'ri-sun-line'
      : 'ri-moon-line';

/* Apply Saved Theme */
if (selectedTheme) {

   if (selectedTheme === 'dark') {
      document.body.classList.add(darkTheme);
   } else {
      document.body.classList.remove(darkTheme);
   }

   if (selectedIcon === 'ri-sun-line') {
      themeButton.classList.add(iconTheme);
   }
}

/* Theme Toggle */
if (themeButton) {

   themeButton.addEventListener('click', () => {

      document.body.classList.toggle(darkTheme);

      themeButton.classList.toggle(iconTheme);

      localStorage.setItem(
         'selected-theme',
         getCurrentTheme()
      );

      localStorage.setItem(
         'selected-icon',
         getCurrentIcon()
      );
   });
}

/*=============== SHOW SCROLL TOP ===============*/
const scrollUp = () => {
   const scrollUp = document.getElementById('scroll-top');

   if (window.scrollY >= 350) {
      scrollUp.classList.add('show-scroll');
   } else {
      scrollUp.classList.remove('show-scroll');
   }
};

window.addEventListener('scroll', scrollUp);

/*=============== ACTIVE NAVIGATION LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {

   const scrollY = window.pageYOffset;

   sections.forEach(current => {

      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      const sectionsClass = document.querySelector(
         '.nav__menu a[href*=' + sectionId + ']'
      );

      if (sectionsClass) {

         if (
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight
         ) {
            sectionsClass.classList.add('active-link');
         } else {
            sectionsClass.classList.remove('active-link');
         }
      }
   });
};

window.addEventListener('scroll', scrollActive);

/*=============== PROJECT FILTERING ===============*/
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {

   filterButtons.forEach(button => {

      button.addEventListener('click', () => {

         const filterValue =
            button.getAttribute('data-filter');

         /* Active Button */
         filterButtons.forEach(btn =>
            btn.classList.remove('active')
         );

         button.classList.add('active');

         /* Filter Projects */
         projectCards.forEach(card => {

            const category =
               card.getAttribute('data-category');

            if (
               filterValue === 'all' ||
               category.includes(filterValue)
            ) {

               card.style.display = 'block';

               setTimeout(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'scale(1)';
               }, 100);

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

/*=============== ANIMATE STATS ===============*/
const statsSection = document.querySelector('.hero-stats');

let statsAnimated = false;

const animateValue = (
   element,
   start,
   end,
   duration
) => {

   let startTimestamp = null;

   const step = (timestamp) => {

      if (!startTimestamp) {
         startTimestamp = timestamp;
      }

      const progress = Math.min(
         (timestamp - startTimestamp) / duration,
         1
      );

      element.textContent = Math.floor(
         progress * (end - start) + start
      );

      if (progress < 1) {
         window.requestAnimationFrame(step);
      }
   };

   window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver(
   entries => {

      entries.forEach(entry => {

         if (entry.isIntersecting && !statsAnimated) {

            statsAnimated = true;

            const statNumbers =
               document.querySelectorAll('.stat-number');

            statNumbers.forEach(stat => {

               const target =
                  parseInt(stat.textContent);

               animateValue(
                  stat,
                  0,
                  target,
                  2000
               );
            });
         }
      });
   },
   {
      threshold: 0.5
   }
);

if (statsSection) {
   statsObserver.observe(statsSection);
}

/*=============== SCROLL REVEAL ===============*/
const revealElements = document.querySelectorAll(
   '.skill-category, .project-card-large, .experience-card, .contact-content'
);

const revealOnScroll = () => {

   revealElements.forEach(element => {

      const windowHeight = window.innerHeight;

      const revealTop =
         element.getBoundingClientRect().top;

      const revealPoint = 100;

      if (revealTop < windowHeight - revealPoint) {

         element.classList.add('active-reveal');

      }
   });
};

window.addEventListener('scroll', revealOnScroll);

/*=============== SMOOTH SCROLLING ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

   anchor.addEventListener('click', function (e) {

      e.preventDefault();

      const target = document.querySelector(
         this.getAttribute('href')
      );

      if (target) {

         target.scrollIntoView({
            behavior: 'smooth'
         });
      }
   });
});

/*=============== FLOATING CARD ANIMATION ===============*/
const floatingCards =
   document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {

   card.style.animationDelay = `${index * 0.5}s`;
});

/*=============== PRELOADER ===============*/
window.addEventListener('load', () => {

   const loader = document.getElementById('loader');

   if (loader) {

      loader.style.opacity = '0';

      setTimeout(() => {
         loader.style.display = 'none';
      }, 500);
   }
});

/*=============== TYPING EFFECT ===============*/
const typingElement =
   document.querySelector('.hero-subtitle');

if (typingElement) {

   const texts = [
      'Full Stack Software Engineer',
      'Cloud Developer',
      'AI / ML Engineer',
      'Backend Engineer'
   ];

   let textIndex = 0;
   let charIndex = 0;
   let isDeleting = false;

   const typeEffect = () => {

      const currentText = texts[textIndex];

      if (!isDeleting) {

         typingElement.textContent =
            currentText.substring(0, charIndex + 1);

         charIndex++;

         if (charIndex === currentText.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;
         }

      } else {

         typingElement.textContent =
            currentText.substring(0, charIndex - 1);

         charIndex--;

         if (charIndex === 0) {

            isDeleting = false;

            textIndex =
               (textIndex + 1) % texts.length;
         }
      }

      setTimeout(
         typeEffect,
         isDeleting ? 50 : 100
      );
   };

   typeEffect();
}

/*=============== INITIALIZE ===============*/
document.addEventListener('DOMContentLoaded', () => {

   bgHeader();
   scrollUp();
   scrollActive();
   revealOnScroll();

   console.log(
      'Portfolio Loaded Successfully 🚀'
   );
});