class SplitScreenPortfolio {
    constructor() {
        this.currentSlide = 0;
        this.slides = [
            {
                title: 'THE<br>HILLS -<br>NISSAN',
                categories: ['Photography', 'Branding'],
                credit: 'PHOTOGRAPHER - BAX TOWNER',
                background: `url('images/p4.jpg')`,
            },
            {
                title: 'SAMOKAT<br>OFFICE<br>DESIGN',
                categories: ['Interior Design', 'Architecture'],
                credit: 'ARCHITECT - STUDIO MODERN',
                background: `url('images/p1.jpg')`,
            },
            {
                title: 'BINGE X<br>THE<br>ICONIC',
                categories: ['Web Design', 'Development'],
                credit: 'DEVELOPER - TECH STUDIO',
                background: `url('images/p2.jpg')`,
            },
            {
                title: 'BINGE X<br>THE<br>ICONIC',
                categories: ['Web Design', 'Development'],
                credit: 'DEVELOPER - TECH STUDIO',
                background: `url('images/p3.jpg')`,
            },
            {
                title: 'BINGE X<br>THE<br>ICONIC',
                categories: ['Web Design', 'Development'],
                credit: `DEVELOPER - TECH STUDIO`,
                background: `url('images/p5.jpg')`,
            },
            {
                title: 'BINGE X<br>THE<br>ICONIC',
                categories: ['Web Design', 'Development'],
                credit: `DEVELOPER - TECH STUDIO`,
                background: `url('images/p6.jpg')`,
            },
            {
                title: 'BINGE X<br>THE<br>ICONIC',
                categories: ['Web Design', 'Development'],
                credit: `DEVELOPER - TECH STUDIO`,
                background: `url('images/p7.jpg')`,
            }
        ];

        this.portfolioSlides = document.querySelectorAll('.portfolio-slide');
        this.slideNumber = document.querySelector('.slide-number');
        this.prevNav = document.querySelector('.prev-nav');
        this.nextNav = document.querySelector('.next-nav');

        this.init();
    }

    init() {
        // Navigation events
        this.prevNav.addEventListener('click', () => this.prevSlide());
        this.nextNav.addEventListener('click', () => this.nextSlide());

        // Update navigation previews initially
        this.updateNavigation();

        // Auto-play start
        this.startAutoPlay();

        // Pause on hover
        document.querySelector('.portfolio-container').addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });

        document.querySelector('.portfolio-container').addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }

    goToSlide(slideIndex) {
        // Update slides active class
        this.portfolioSlides.forEach(slide => slide.classList.remove('active'));
        this.portfolioSlides[slideIndex].classList.add('active');

        // Update slide number UI
        const slideNum = (slideIndex + 1).toString().padStart(2, '0');
        this.slideNumber.textContent = slideNum;

        this.currentSlide = slideIndex;

        // Update navigation bottom previews
        this.updateNavigation();

        // Reset animations on new active slide
        this.resetAnimations();
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }

    updateNavigation() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        const nextIndex = (this.currentSlide + 1) % this.slides.length;

        // Update Prev Nav background and title
        const prevSlideData = this.slides[prevIndex];
        const prevTitle = prevSlideData.title.replace(/<br>/g, ' ');
        this.prevNav.style.backgroundImage = prevSlideData.background;
        this.prevNav.querySelector('.nav-title').textContent = prevTitle;

        // Update Next Nav background and title
        const nextSlideData = this.slides[nextIndex];
        const nextTitle = nextSlideData.title.replace(/<br>/g, ' ');
        this.nextNav.style.backgroundImage = nextSlideData.background;
        this.nextNav.querySelector('.nav-title').textContent = nextTitle;
    }

    resetAnimations() {
        const activeSlide = this.portfolioSlides[this.currentSlide];
        const elements = activeSlide.querySelectorAll('.project-title, .project-meta, .project-info');

        elements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = null;
        });
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Initialize the portfolio slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SplitScreenPortfolio();
});


// for text
function applyTextRevealAnimation() {
  gsap.utils.toArray(".line").forEach((line, index) => {
    const whiteEl = line.querySelector(".white");
    if (!whiteEl) {
      console.warn(`Line ${index + 1}: .white element missing`, line);
    } else {
      gsap.to(whiteEl, {
        clipPath: "inset(0 0% 0 0)",
        scrollTrigger: {
          trigger: line,
          start: "top 80%",
          end: "top 10%",
          scrub: 1,
          // markers: true // remove in production
        }
      });
    }
  });
}

window.addEventListener("load", applyTextRevealAnimation);

 
//   service2 horizontal scroll 
gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".service2-item");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 2),
  ease: "none",
  scrollTrigger: {
    trigger: ".service2-outer",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".service2-outer").offsetWidth
  }
});

// testimonial carousel
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:2
        }
    }
})

// for responsev toggle
// Minimal nav toggle — safe, non-destructive
// (function(){
//   const nav = document.querySelector('.nav-menu');
//   // prefer an existing toggle element if present
//   let toggle = document.querySelector('.nav-toggle');
//   if(!toggle){
//     // create minimal toggle button (icon-free, you can style it)
//     toggle = document.createElement('button');
//     toggle.className = 'nav-toggle';
//     toggle.setAttribute('aria-label','Open navigation');
//     toggle.innerHTML = '&#9776;'; // simple hamburger char
//     const header = document.querySelector('.header-wrapper') || document.querySelector('header');
//     if(header) header.insertBefore(toggle, header.firstChild);
//   }
//   toggle.addEventListener('click', ()=> {
//     if(!nav) return;
//     nav.classList.toggle('open');
//     toggle.classList.toggle('is-active');
//   });

//   // close nav when clicking outside or on navigation link (mobile)
//   document.addEventListener('click', (e)=>{
//     if(!nav || !nav.classList.contains('open')) return;
//     if(e.target.closest('.nav-menu') || e.target === toggle) return;
//     nav.classList.remove('open');
//     toggle.classList.remove('is-active');
//   });
// })();
