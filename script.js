// ================================
// WHATSAPP BOOKING
// ================================

function bookWhatsApp() {
  const phone = "918134838733";

  const message = `Hello Kapsimotwo Gardens,

I would like to book a stay:

📅 Check-in:
📅 Check-out:
👥 Guests:
🏡 Room Type:

Please share availability.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

/* =========================================================
   MAIN NAVBAR
   ========================================================= */

   const navMenuBtn = document.getElementById("navMenuBtn");
   const navLinks = document.getElementById("navLinks");
   const navDropdown = document.getElementById("navDropdown");
   
   if(navMenuBtn && navLinks){
   
     navMenuBtn.addEventListener("click", () => {
       const isOpen = navLinks.classList.toggle("open");
   
       navMenuBtn.classList.toggle("active", isOpen);
       navMenuBtn.setAttribute("aria-expanded", String(isOpen));
     });
   
     navLinks.querySelectorAll("a").forEach(link => {
       link.addEventListener("click", () => {
   
         if(
           window.innerWidth <= 900 &&
           !link.classList.contains("nav-dropdown-toggle")
         ){
           navLinks.classList.remove("open");
           navMenuBtn.classList.remove("active");
           navMenuBtn.setAttribute("aria-expanded","false");
         }
   
       });
     });
   }
   
   /* =========================================================
      ROOMS DROPDOWN — MOBILE
      ========================================================= */
   
   if(navDropdown){
   
     const navDropdownToggle =
       navDropdown.querySelector(".nav-dropdown-toggle");
   
     if(navDropdownToggle){
   
       navDropdownToggle.addEventListener("click", event => {
   
         if(window.innerWidth <= 900){
           event.preventDefault();
           navDropdown.classList.toggle("open");
         }
   
       });
   
     }
   }
   
   /* =========================================================
      RESET MOBILE MENU ON RESIZE
      ========================================================= */
   
   window.addEventListener("resize", () => {
   
     if(window.innerWidth > 900){
   
       navLinks?.classList.remove("open");
       navMenuBtn?.classList.remove("active");
       navMenuBtn?.setAttribute("aria-expanded","false");
       navDropdown?.classList.remove("open");
   
     }
   
   });
// ================================
// MOBILE MENU
// ================================

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeButton = document.getElementById("mobileMenuClose");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.toggle("active");

    mobileMenu.classList.toggle("active", isActive);
    document.body.classList.toggle("menu-open", isActive);
    hamburger.setAttribute("aria-expanded", String(isActive));
  });

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  }

  document.querySelectorAll("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}
// ================================
// HERO SLIDER
// ================================

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.getElementById("heroDots");

if (heroSlides.length && heroDots) {
  let heroIndex = 0;

  heroSlides.forEach((_, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = `hero-dot${index === 0 ? " active" : ""}`;
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

    dot.addEventListener("click", () => {
      goHeroSlide(index);
    });

    heroDots.appendChild(dot);
  });

  function goHeroSlide(index) {
    if (index === heroIndex) {
      return;
    }

    heroSlides[heroIndex].classList.remove("active");
    heroDots.children[heroIndex].classList.remove("active");

    heroIndex = index;

    heroSlides[heroIndex].classList.add("active");
    heroDots.children[heroIndex].classList.add("active");
  }

  setInterval(() => {
    goHeroSlide((heroIndex + 1) % heroSlides.length);
  }, 5000);
}

// ================================
// FLYING BIRDS
// ================================

const birdsContainer = document.getElementById("heroBirds");

if (birdsContainer) {
  function createBird() {
    const bird = document.createElement("div");

    bird.className = "bird";
    bird.style.top = `${10 + Math.random() * 40}%`;
    bird.style.animationDuration = `${8 + Math.random() * 6}s`;
    bird.style.animationDelay = `${Math.random() * 6}s`;

    bird.innerHTML = `
      <svg width="24" height="12" viewBox="0 0 48 24" aria-hidden="true">
        <path
          d="M0 12 Q12 0 24 12 Q36 0 48 12"
          stroke="rgba(255,255,255,0.7)"
          stroke-width="2.5"
          fill="none"
        />
      </svg>
    `;

    birdsContainer.appendChild(bird);
  }

  for (let i = 0; i < 8; i++) {
    createBird();
  }
}

// ================================
// SCROLL REVEAL
// ================================

const revealElements = document.querySelectorAll(".scroll-reveal");

if ("IntersectionObserver" in window && revealElements.length) {
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// ================================
// GALLERY LIGHTBOX
// ================================

function openLightbox(element) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const image = element?.querySelector("img");

  if (!lightbox || !lightboxImg || !image) {
    return;
  }

  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt || "Gallery image";

  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox(event) {
  if (event) {
    const target = event.target;

    if (
      target.id === "lightboxImg" ||
      target.closest(".lightbox-close")
    ) {
      if (target.closest(".lightbox-close")) {
        event.stopPropagation();
      }
    } else if (target !== document.getElementById("lightbox")) {
      return;
    }
  }

  const lightbox = document.getElementById("lightbox");

  if (!lightbox) {
    return;
  }

  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

// ================================
// LIGHTBOX ESCAPE KEY
// ================================

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

// ================================
// DATE PICKER
// ================================

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");

if (checkin && checkout) {
  const today = new Date().toISOString().split("T")[0];

  checkin.min = today;
  checkout.min = today;

  checkin.addEventListener("change", function () {
    checkout.min = this.value || today;

    if (checkout.value && checkout.value < checkout.min) {
      checkout.value = checkout.min;
    }
  });
}

/* =========================================================
   EXPERIENCE SLIDER
   Auto + Hover + Scroll
   ========================================================= */

   const experienceSlider =
   document.getElementById("experienceSlider");
 
 const experienceSlides =
   document.querySelectorAll(".experience-slide");
 
 let experienceIndex = 0;
 let experienceTimer = null;
 let lastExperienceScroll = window.scrollY;
 let experienceScrollTimeout = null;
 
 if (experienceSlider && experienceSlides.length) {

   const isMobileExperience = () =>
     window.matchMedia("(max-width: 768px)").matches;
 
   /* -------------------------------------------------------
      SHOW SLIDE
      ------------------------------------------------------- */
 
   function showExperience(index) {
     experienceIndex =
       (index + experienceSlides.length) %
       experienceSlides.length;
 
     experienceSlides.forEach((slide, i) => {
       slide.classList.toggle(
         "active",
         i === experienceIndex
       );
     });
   }
 
   /* -------------------------------------------------------
      NEXT SLIDE
      ------------------------------------------------------- */
 
   function nextExperience() {
     showExperience(experienceIndex + 1);
   }
 
   /* -------------------------------------------------------
      PREVIOUS SLIDE
      ------------------------------------------------------- */
 
   function previousExperience() {
     showExperience(experienceIndex - 1);
   }
 
   /* -------------------------------------------------------
      AUTO SLIDE
      ------------------------------------------------------- */
 
   function startExperienceAuto() {
     clearInterval(experienceTimer);
 
     experienceTimer = setInterval(() => {
       nextExperience();
     }, 4500);
   }
 
   /* -------------------------------------------------------
      HOVER / CURSOR
      ------------------------------------------------------- */
 
   experienceSlides.forEach((slide, index) => {
 
     slide.addEventListener("mouseenter", () => {
       showExperience(index);
       startExperienceAuto();
     });
 
   });
 
   /* -------------------------------------------------------
      SCROLL
      ------------------------------------------------------- */
 
   window.addEventListener(
     "scroll",
     () => {

       /* Scrolling a phone page must not change the current photo. */
       if (isMobileExperience()) {
         return;
       }

       const rect =
         experienceSlider.getBoundingClientRect();
 
       const viewportHeight =
         window.innerHeight;
 
       const sectionVisible =
         rect.top < viewportHeight * 0.8 &&
         rect.bottom > viewportHeight * 0.2;
 
       if (!sectionVisible) {
         return;
       }
 
       const currentScroll =
         window.scrollY;
 
       const difference =
         currentScroll - lastExperienceScroll;
 
       if (Math.abs(difference) < 120) {
         return;
       }
 
       lastExperienceScroll =
         currentScroll;
 
       clearTimeout(
         experienceScrollTimeout
       );
 
       experienceScrollTimeout =
         setTimeout(() => {
 
           if (difference > 0) {
             nextExperience();
           } else {
             previousExperience();
           }
 
           startExperienceAuto();
 
         }, 100);
 
     },
     {
       passive:true
     }
   );

   /* Let phone visitors move between photos with a natural swipe. */
   let experienceTouchStartX = 0;

   experienceSlider.addEventListener("touchstart", event => {
     experienceTouchStartX = event.changedTouches[0].clientX;
   }, { passive:true });

   experienceSlider.addEventListener("touchend", event => {
     if (!isMobileExperience()) {
       return;
     }

     const distance =
       event.changedTouches[0].clientX - experienceTouchStartX;

     if (Math.abs(distance) < 40) {
       return;
     }

     if (distance < 0) {
       nextExperience();
     } else {
       previousExperience();
     }

     startExperienceAuto();
   }, { passive:true });
 
   /* -------------------------------------------------------
      INITIAL SLIDE
      ------------------------------------------------------- */
 
   showExperience(experienceIndex);
 
   /* Start automatic movement */
 
   startExperienceAuto();
 }
 /* =========================================================
   GALLERY SLIDER
   ========================================================= */

const gallerySlides = document.querySelectorAll(".gallery-slide");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");

let galleryIndex = 0;
let galleryTimer;

if(
  gallerySlides.length &&
  galleryPrev &&
  galleryNext
){

  function showGallery(index){

    galleryIndex =
      (index + gallerySlides.length) %
      gallerySlides.length;

    gallerySlides.forEach((slide,i)=>{
      slide.classList.toggle(
        "active",
        i === galleryIndex
      );
    });
  }

  function nextGallery(){
    showGallery(galleryIndex + 1);
  }

  function prevGallery(){
    showGallery(galleryIndex - 1);
  }

  function resetGalleryTimer(){

    clearInterval(galleryTimer);

    galleryTimer = setInterval(()=>{
      nextGallery();
    },4500);
  }

  galleryNext.addEventListener("click",()=>{
    nextGallery();
    resetGalleryTimer();
  });

  galleryPrev.addEventListener("click",()=>{
    prevGallery();
    resetGalleryTimer();
  });

  showGallery(galleryIndex);
  resetGalleryTimer();
}
