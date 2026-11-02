/* ==========================================================
   PORTFOLIO — interactions
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {

   /* ---------- Mobile menu ---------- */
   const navMenu = document.getElementById("nav-menu");
   const navToggle = document.getElementById("nav-toggle");
   const navClose = document.getElementById("nav-close");

   const openMenu = () => navMenu.classList.add("show");
   const closeMenu = () => navMenu.classList.remove("show");

   navToggle?.addEventListener("click", openMenu);
   navClose?.addEventListener("click", closeMenu);
   navMenu?.querySelectorAll(".nav__link").forEach(l =>
      l.addEventListener("click", closeMenu)
   );

   /* ---------- Theme toggle ---------- */
   const themeBtn = document.getElementById("theme-button");
   const stored = localStorage.getItem("theme");

   if (stored === "dark") document.body.classList.add("dark");

   themeBtn?.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem(
         "theme",
         document.body.classList.contains("dark") ? "dark" : "light"
      );
   });

   /* ---------- Header border on scroll ---------- */
   const header = document.querySelector(".header");
   const onScroll = () =>
      header.classList.toggle("scrolled", window.scrollY > 10);
   onScroll();
   window.addEventListener("scroll", onScroll, { passive: true });

   /* ---------- Reveal on scroll ---------- */
   const revealEls = document.querySelectorAll("[data-reveal]");

   if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
         (entries, obs) => {
            entries.forEach((e, i) => {
               if (e.isIntersecting) {
                  // slight stagger for siblings
                  e.target.style.transitionDelay = `${Math.min(i * 60, 180)}ms`;
                  e.target.classList.add("in");
                  obs.unobserve(e.target);
               }
            });
         },
         { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach(el => io.observe(el));
   } else {
      revealEls.forEach(el => el.classList.add("in"));
   }

   /* ---------- Active nav link ---------- */
   const sections = document.querySelectorAll("section[id]");
   const links = document.querySelectorAll(".nav__link");

   const setActive = () => {
      const y = window.scrollY + 120;
      sections.forEach(sec => {
         const link = document.querySelector(
            `.nav__link[href="#${sec.id}"]`
         );
         if (!link) return;
         if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
         }
      });
   };
   window.addEventListener("scroll", setActive, { passive: true });
   setActive();
});
