/*==================================================
  PORTFOLIO WEBSITE JAVASCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

   /*=============== MOBILE MENU ===============*/
   const navMenu = document.getElementById("nav-menu");
   const navToggle = document.getElementById("nav-toggle");
   const navClose = document.getElementById("nav-close");
   const navLinks = document.querySelectorAll(".nav__link");

   /* Show Menu */
   if (navToggle) {
      navToggle.addEventListener("click", () => {
         navMenu.classList.add("show-menu");
      });
   }

   /* Hide Menu */
   if (navClose) {
      navClose.addEventListener("click", () => {
         navMenu.classList.remove("show-menu");
      });
   }

   /* Remove Mobile Menu on Link Click */
   navLinks.forEach(link => {
      link.addEventListener("click", () => {
         navMenu.classList.remove("show-menu");
      });
   });

   /*=============== HEADER BACKGROUND ===============*/
   const header = document.querySelector(".header");

   const bgHeader = () => {
      if (window.scrollY >= 50) {
         header.classList.add("bg-header");
      } else {
         header.classList.remove("bg-header");
      }
   };

   window.addEventListener("scroll", bgHeader);

   /*=============== DARK / LIGHT THEME ===============*/
   const themeButton = document.getElementById("theme-button");
   const darkTheme = "dark-theme";
   const iconTheme = "ri-sun-line";

   const selectedTheme = localStorage.getItem("selected-theme");
   const selectedIcon = localStorage.getItem("selected-icon");

   /* Apply Saved Theme */
   if (selectedTheme === "dark") {
      document.body.classList.add(darkTheme);
   }

   if (selectedIcon === "ri-sun-line") {
      themeButton.classList.add(iconTheme);
   }

   /* Theme Toggle */
   if (themeButton) {

      themeButton.addEventListener("click", () => {

         document.body.classList.toggle(darkTheme);

         themeButton.classList.toggle(iconTheme);

         /* Save Theme */
         const currentTheme =
            document.body.classList.contains(darkTheme)
               ? "dark"
               : "light";

         const currentIcon =
            themeButton.classList.contains(iconTheme)
               ? "ri-sun-line"
               : "ri-moon-line";

         localStorage.setItem("selected-theme", currentTheme);
         localStorage.setItem("selected-icon", currentIcon);
      });
   }

   /*=============== SCROLL TOP BUTTON ===============*/
   const scrollTopBtn = document.getElementById("scroll-top");

   const scrollUp = () => {

      if (window.scrollY >= 350) {
         scrollTopBtn.classList.add("show-scroll");
      } else {
         scrollTopBtn.classList.remove("show-scroll");
      }
   };

   window.addEventListener("scroll", scrollUp);

   /*=============== ACTIVE NAV LINK ===============*/
   const sections = document.querySelectorAll("section[id]");

   const scrollActive = () => {

      const scrollY = window.pageYOffset;

      sections.forEach(current => {

         const sectionHeight = current.offsetHeight;
         const sectionTop = current.offsetTop - 120;
         const sectionId = current.getAttribute("id");

         const navLink = document.querySelector(
            `.nav__menu a[href*="${sectionId}"]`
         );

         if (navLink) {

            if (
               scrollY > sectionTop &&
               scrollY <= sectionTop + sectionHeight
            ) {
               navLink.classList.add("active-link");
            } else {
               navLink.classList.remove("active-link");
            }
         }
      });
   };

   window.addEventListener("scroll", scrollActive);

   /*=============== SMOOTH SCROLL ===============*/
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {

      anchor.addEventListener("click", function (e) {

         e.preventDefault();

         const target = document.querySelector(
            this.getAttribute("href")
         );

         if (target) {

            target.scrollIntoView({
               behavior: "smooth"
            });
         }
      });
   });

   /*=============== SCROLL REVEAL ANIMATION ===============*/
   const revealElements = document.querySelectorAll(
      ".project-card, .stat-card, .timeline-item, .skill-group, .publication-card"
   );

   const revealOnScroll = () => {

      revealElements.forEach(element => {

         const windowHeight = window.innerHeight;
         const revealTop = element.getBoundingClientRect().top;
         const revealPoint = 120;

         if (revealTop < windowHeight - revealPoint) {
            element.classList.add("active-reveal");
         }
      });
   };

   window.addEventListener("scroll", revealOnScroll);

   revealOnScroll();

   /*=============== PROJECT FILTERING ===============*/
   const filterButtons = document.querySelectorAll(".filter-btn");
   const projectCards = document.querySelectorAll(".project-card");

   if (filterButtons.length > 0) {

      filterButtons.forEach(button => {

         button.addEventListener("click", () => {

            const filterValue =
               button.getAttribute("data-filter");

            filterButtons.forEach(btn =>
               btn.classList.remove("active")
            );

            button.classList.add("active");

            projectCards.forEach(card => {

               const category =
                  card.getAttribute("data-category");

               if (
                  filterValue === "all" ||
                  category.includes(filterValue)
               ) {

                  card.style.display = "block";

                  setTimeout(() => {
                     card.style.opacity = "1";
                     card.style.transform = "translateY(0)";
                  }, 100);

               } else {

                  card.style.opacity = "0";
                  card.style.transform = "translateY(30px)";

                  setTimeout(() => {
                     card.style.display = "none";
                  }, 300);
               }
            });
         });
      });
   }

   /*=============== TYPING EFFECT ===============*/
   const typingElement =
      document.querySelector(".hero-subtitle");

   if (typingElement) {

      const texts = [
         "Full Stack Software Engineer",
         "AI / ML Engineer",
         "Cloud Developer",
         "Backend Engineer"
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

   console.log("Portfolio Loaded Successfully 🚀");
});

/* ===============================
   CURSOR GLOW
================================ */

const glow = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', e => {

   glow.style.left = `${e.clientX}px`;
   glow.style.top = `${e.clientY}px`;

});

/* ===============================
   PARALLAX EFFECT
================================ */

window.addEventListener('scroll', () => {

   const scrollY = window.scrollY;

   document.querySelectorAll('.orb').forEach(
      (orb, index) => {

         const speed = (index + 1) * 0.2;

         orb.style.transform =
            `translateY(${scrollY * speed}px)`;
      }
   );

});

/* ===============================
   ACTIVE PROJECT HOVER
================================ */

const projectCards =
document.querySelectorAll('.project-card-large');

projectCards.forEach(card => {

   card.addEventListener('mousemove', e => {

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.background = `
         radial-gradient(
            circle at ${x}px ${y}px,
            rgba(124,58,237,.18),
            rgba(255,255,255,.04)
         )
      `;
   });

});