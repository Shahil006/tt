/* ============================================
   VOX8 PRODUCTION — PREMIUM SCRIPT
============================================ */

'use strict';

/* ============================================
   LOADER
============================================ */

(function initLoader(){

  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loaderFill');

  if(!loader || !fill) return;

  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    fill.style.width = '100%';
  });

  function hideLoader(){

    setTimeout(() => {

      loader.classList.add('hidden');

      document.body.style.overflow = '';

    },300);

  }

  if(document.readyState === 'complete'){

    setTimeout(hideLoader,1600);

  }else{

    window.addEventListener('load',() => {

      setTimeout(hideLoader,1600);

    });

  }

})();

/* ============================================
   CUSTOM CURSOR
============================================ */

(function initCursor(){

  if(window.innerWidth < 768) return;

  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  if(!cursor || !cursorDot) return;

  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove',(e)=>{

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';

  });

  function animateCursor(){

    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;

    cursor.style.left = cursorX + 'px';
    cursor.style.top  = cursorY + 'px';

    requestAnimationFrame(animateCursor);

  }

  animateCursor();

  const hoverItems = document.querySelectorAll(
    'a, button, .service-card, .contact-btn'
  );

  hoverItems.forEach((item)=>{

    item.addEventListener('mouseenter',()=>{

      cursor.classList.add('expanded');

    });

    item.addEventListener('mouseleave',()=>{

      cursor.classList.remove('expanded');

    });

  });

})();

/* ============================================
   NAVBAR SCROLL EFFECT
============================================ */

(function initNavbar(){

  const nav = document.getElementById('nav');

  if(!nav) return;

  window.addEventListener('scroll',()=>{

    if(window.scrollY > 40){

      nav.classList.add('scrolled');

    }else{

      nav.classList.remove('scrolled');

    }

  });

})();

/* ============================================
   MOBILE MENU
============================================ */

(function initMobileMenu(){

  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if(!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click',()=>{

    mobileMenu.classList.toggle('open');

    if(mobileMenu.classList.contains('open')){

      document.body.style.overflow = 'hidden';

    }else{

      document.body.style.overflow = '';

    }

  });

  const mobileLinks = document.querySelectorAll(
    '.mobile-link'
  );

  mobileLinks.forEach((link)=>{

    link.addEventListener('click',()=>{

      mobileMenu.classList.remove('open');

      document.body.style.overflow = '';

    });

  });

})();

/* ============================================
   SMOOTH SCROLL
============================================ */

(function initSmoothScroll(){

  const links = document.querySelectorAll(
    'a[href^="#"]'
  );

  links.forEach((link)=>{

    link.addEventListener('click',(e)=>{

      const target = document.querySelector(
        link.getAttribute('href')
      );

      if(!target) return;

      e.preventDefault();

      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        70;

      window.scrollTo({

        top,
        behavior:'smooth'

      });

    });

  });

})();

/* ============================================
   SCROLL REVEAL
============================================ */

(function initReveal(){

  const reveals = document.querySelectorAll(
    '.scroll-reveal'
  );

  if(!reveals.length) return;

  const observer = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

      if(entry.isIntersecting){

        entry.target.classList.add('in-view');

        observer.unobserve(entry.target);

      }

    });

  },{
    threshold:0.15
  });

  reveals.forEach((el)=>{
    observer.observe(el);
  });

})();

/* ============================================
   HERO PARTICLES
============================================ */

(function initParticles(){

  const canvas = document.getElementById(
    'particleCanvas'
  );

  if(!canvas) return;

  const ctx = canvas.getContext('2d');

  let width;
  let height;

  let particles = [];

  const PARTICLE_COUNT =
    window.innerWidth < 768 ? 35 : 80;

  function resize(){

    width  = canvas.width  = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;

  }

  function createParticle(){

    return{

      x:Math.random() * width,
      y:Math.random() * height,

      r:Math.random() * 1.8 + 0.4,

      vx:(Math.random() - 0.5) * 0.18,
      vy:(Math.random() - 0.5) * 0.18,

      alpha:Math.random() * 0.35 + 0.05

    };

  }

  function init(){

    particles = [];

    for(let i = 0; i < PARTICLE_COUNT; i++){

      particles.push(createParticle());

    }

  }

  function draw(){

    ctx.clearRect(0,0,width,height);

    particles.forEach((p)=>{

      p.x += p.vx;
      p.y += p.vy;

      if(p.x < 0 || p.x > width){
        p.vx *= -1;
      }

      if(p.y < 0 || p.y > height){
        p.vy *= -1;
      }

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.r,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(255,255,255,${p.alpha})`;

      ctx.fill();

    });

    requestAnimationFrame(draw);

  }

  resize();
  init();
  draw();

  window.addEventListener('resize',()=>{

    resize();
    init();

  });

})();

/* ============================================
   HERO PARALLAX
============================================ */

(function initParallax(){

  const heroImage = document.querySelector(
    '.hero-bg-img'
  );

  if(!heroImage) return;

  window.addEventListener('scroll',()=>{

    const scroll = window.scrollY;

    heroImage.style.transform =
      `scale(1.06) translateY(${scroll * 0.08}px)`;

  });

})();

/* ============================================
   HERO CONTENT FADE
============================================ */

(function initHeroFade(){

  const heroContent = document.querySelector(
    '.hero-content'
  );

  if(!heroContent) return;

  window.addEventListener('scroll',()=>{

    const scroll = window.scrollY;

    heroContent.style.opacity =
      1 - scroll / 550;

    heroContent.style.transform =
      `translateY(${scroll * 0.12}px)`;

  });

})();

/* ============================================
   MAGNETIC BUTTONS
============================================ */

(function initMagneticButtons(){

  if(window.innerWidth < 768) return;

  const buttons = document.querySelectorAll(
    '.btn, .nav-cta, .contact-btn'
  );

  buttons.forEach((button)=>{

    button.addEventListener('mousemove',(e)=>{

      const rect = button.getBoundingClientRect();

      const x =
        e.clientX - (rect.left + rect.width / 2);

      const y =
        e.clientY - (rect.top + rect.height / 2);

      button.style.transform =
        `translate(${x * 0.15}px, ${y * 0.15}px)`;

    });

    button.addEventListener('mouseleave',()=>{

      button.style.transform = '';

    });

  });

})();

/* ============================================
   SERVICE IMAGE ZOOM
============================================ */

(function initServiceCards(){

  const cards = document.querySelectorAll(
    '.service-card'
  );

  cards.forEach((card)=>{

    card.addEventListener('mousemove',(e)=>{

      const rect = card.getBoundingClientRect();

      const x =
        ((e.clientX - rect.left) / rect.width) * 100;

      const y =
        ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--x',`${x}%`);
      card.style.setProperty('--y',`${y}%`);

    });

  });

})();

/* ============================================
   ACTIVE NAVIGATION
============================================ */

(function initScrollSpy(){

  const sections = document.querySelectorAll(
    'section[id]'
  );

  const navLinks = document.querySelectorAll(
    '.nav-link'
  );

  if(!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

      if(!entry.isIntersecting) return;

      const id = entry.target.getAttribute('id');

      navLinks.forEach((link)=>{

        if(
          link.getAttribute('href') === `#${id}`
        ){

          link.style.color = '#ffffff';

        }else{

          link.style.color = '';

        }

      });

    });

  },{
    threshold:0.5
  });

  sections.forEach((section)=>{
    observer.observe(section);
  });

})();

/* ============================================
   PAGE READY
============================================ */

document.addEventListener(
  'DOMContentLoaded',
  ()=>{

    document.body.classList.add('loaded');

  }
);