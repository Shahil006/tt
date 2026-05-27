/* ============================================
   VOX8 PRODUCTION — SCRIPT
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
    }, 300);
  }

  if(document.readyState === 'complete'){
    setTimeout(hideLoader, 1600);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hideLoader, 1600);
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

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
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

  document.querySelectorAll('a, button, .service-card, .contact-btn')
    .forEach((item) => {
      item.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
      item.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
    });

})();

/* ============================================
   NAVBAR SCROLL EFFECT
============================================ */

(function initNavbar(){

  const nav = document.getElementById('nav');
  if(!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

})();

/* ============================================
   MOBILE MENU
============================================ */

(function initMobileMenu(){

  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if(!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* FIX: close menu on Escape key */
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && mobileMenu.classList.contains('open')){
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

})();

/* ============================================
   SMOOTH SCROLL
============================================ */

(function initSmoothScroll(){

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if(!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();

/* ============================================
   SCROLL REVEAL
============================================ */

(function initReveal(){

  const reveals = document.querySelectorAll('.scroll-reveal');
  if(!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((el) => observer.observe(el));

})();

/* ============================================
   HERO PARTICLES
============================================ */

(function initParticles(){

  const canvas = document.getElementById('particleCanvas');
  if(!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, particles = [];

  const COUNT = window.innerWidth < 768 ? 30 : 75;

  function resize(){
    width  = canvas.width  = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function makeParticle(){
    return {
      x:  Math.random() * width,
      y:  Math.random() * height,
      r:  Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      alpha: Math.random() * 0.3 + 0.05
    };
  }

  function init(){
    particles = Array.from({ length: COUNT }, makeParticle);
  }

  function draw(){
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if(p.x < 0 || p.x > width)  p.vx *= -1;
      if(p.y < 0 || p.y > height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize(); init(); draw();

  /* FIX: debounce resize so it doesn't hammer on every px */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); init(); }, 200);
  }, { passive: true });

})();

/* ============================================
   HERO PARALLAX — desktop only
============================================ */

(function initParallax(){

  if(window.innerWidth < 768) return;

  const heroImage = document.querySelector('.hero-bg-img');
  if(!heroImage) return;

  window.addEventListener('scroll', () => {
    heroImage.style.transform =
      `scale(1.06) translateY(${window.scrollY * 0.08}px)`;
  }, { passive: true });

})();

/* ============================================
   HERO CONTENT FADE — desktop only
============================================ */

(function initHeroFade(){

  if(window.innerWidth < 768) return;

  const heroContent = document.querySelector('.hero-content');
  if(!heroContent) return;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    heroContent.style.opacity   = Math.max(0, 1 - scroll / 550);
    heroContent.style.transform = `translateY(${scroll * 0.12}px)`;
  }, { passive: true });

})();

/* ============================================
   MAGNETIC BUTTONS — desktop only
============================================ */

(function initMagneticButtons(){

  if(window.innerWidth < 768) return;

  document.querySelectorAll('.btn, .nav-cta, .contact-btn').forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width  / 2);
      const y = e.clientY - (rect.top  + rect.height / 2);
      button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });

})();

/* ============================================
   SERVICE CARD SPOTLIGHT
============================================ */

(function initServiceCards(){

  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${((e.clientX - rect.left) / rect.width)  * 100}%`);
      card.style.setProperty('--y', `${((e.clientY - rect.top)  / rect.height) * 100}%`);
    });
  });

})();

/* ============================================
   SCROLL SPY — active nav link
============================================ */

(function initScrollSpy(){

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if(!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.style.color = link.getAttribute('href') === `#${id}` ? '#ffffff' : '';
      });
    });
  }, { threshold: 0.5 });

  sections.forEach((s) => observer.observe(s));

})();

/* ============================================
   PAGE READY
============================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});