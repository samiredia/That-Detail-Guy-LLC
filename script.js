/* ==========================================================
   That Detail Guy — main.js
   Custom cursor · canvas particles · scroll reveal ·
   count-up · gallery filter · form handling · mobile menu
   ========================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------ */
  /* Loader                                                 */
  /* ------------------------------------------------------ */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('is-out'), 1100);
  });

  /* ------------------------------------------------------ */
  /* Year in footer                                         */
  /* ------------------------------------------------------ */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ------------------------------------------------------ */
  /* Custom cursor (desktop)                                */
  /* ------------------------------------------------------ */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (isFinePointer && cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    });
    (function tick() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(tick);
    })();

    const hoverables = 'a, button, input, textarea, select, .service-card, .price-card, .g-tile, .review-card';
    document.querySelectorAll(hoverables).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('is-cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('is-cursor-hover'));
    });
  }

  /* ------------------------------------------------------ */
  /* Sticky header                                          */
  /* ------------------------------------------------------ */
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------ */
  /* Mobile menu                                            */
  /* ------------------------------------------------------ */
  const burger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileMenu');
  if (burger && drawer) {
    const toggle = () => {
      const open = burger.classList.toggle('is-open');
      drawer.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open);
      drawer.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', toggle);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (drawer.classList.contains('is-open')) toggle();
    }));
  }

  /* ------------------------------------------------------ */
  /* Smooth-scroll for in-page anchors                      */
  /* ------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const top = t.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ------------------------------------------------------ */
  /* Reveal-on-scroll                                       */
  /* ------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const d = parseInt(e.target.dataset.delay || 0, 10);
          setTimeout(() => e.target.classList.add('is-in'), d);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }

  /* ------------------------------------------------------ */
  /* Count-up stats                                         */
  /* ------------------------------------------------------ */
  function countUp(el) {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || 0, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = (target * eased).toFixed(decimals);
      el.textContent = v + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    const sIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.num').forEach(countUp);
          sIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.hero-stats').forEach(el => sIO.observe(el));
  }

  /* ------------------------------------------------------ */
  /* Hero canvas — water mist + drifting glow orbs          */
  /* ------------------------------------------------------ */
  const canvas = document.getElementById('heroCanvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let W, H, dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    // Mist particles
    class Mist {
      constructor(spread) {
        this.reset(spread);
      }
      reset(spread) {
        this.x = Math.random() * W;
        this.y = spread ? Math.random() * H : H + 10;
        this.r = Math.random() * 1.6 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -(Math.random() * 0.35 + 0.05);
        this.life = 0;
        this.max = 240 + Math.random() * 280;
        const t = Math.random();
        this.color = t > 0.65 ? '110, 200, 255' : (t > 0.3 ? '0, 168, 255' : '255, 255, 255');
        this.peak = Math.random() * 0.5 + 0.15;
      }
      step() {
        this.x += this.vx; this.y += this.vy; this.life++;
        if (this.life > this.max || this.y < -10) this.reset(false);
      }
      draw() {
        const a = this.peak * Math.sin((this.life / this.max) * Math.PI);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${a})`;
        ctx.fill();
      }
    }

    class Orb {
      constructor() { this.reset(true); }
      reset(spread) {
        this.x = Math.random() * W;
        this.y = spread ? Math.random() * H : H + 60;
        this.r = 60 + Math.random() * 90;
        this.vx = (Math.random() - 0.5) * 0.18;
        this.vy = (Math.random() - 0.5) * 0.14;
        this.a = 0.02 + Math.random() * 0.04;
      }
      step() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < -this.r || this.x > W + this.r) this.reset(false);
        if (this.y < -this.r || this.y > H + this.r) this.reset(false);
      }
      draw() {
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        g.addColorStop(0, `rgba(0, 168, 255, ${this.a})`);
        g.addColorStop(1, 'rgba(0, 168, 255, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const mists = Array.from({ length: 110 }, (_, i) => new Mist(i < 80));
    const orbs  = Array.from({ length: 7 }, () => new Orb());

    let raf;
    function frame() {
      ctx.clearRect(0, 0, W, H);
      orbs.forEach(o => { o.step(); o.draw(); });
      mists.forEach(m => { m.step(); m.draw(); });
      raf = requestAnimationFrame(frame);
    }
    frame();

    // Pause when offscreen
    if ('IntersectionObserver' in window) {
      const heroIO = new IntersectionObserver((es) => {
        es.forEach(e => {
          if (e.isIntersecting && !raf) frame();
          else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = null; }
        });
      }, { threshold: 0 });
      heroIO.observe(canvas);
    }
  }

  /* ------------------------------------------------------ */
  /* Hero parallax                                          */
  /* ------------------------------------------------------ */
  const heroLeft  = document.querySelector('.hero-left');
  const heroRight = document.querySelector('.hero-right');
  let lastY = 0, ticking = false;
  function parallax() {
    const y = lastY;
    if (heroLeft)  heroLeft.style.transform  = `translateY(${y * 0.12}px)`;
    if (heroRight) heroRight.style.transform = `translateY(${y * 0.06}px)`;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    lastY = window.scrollY;
    if (!ticking && lastY < window.innerHeight) {
      ticking = true;
      requestAnimationFrame(parallax);
    }
  }, { passive: true });

  /* ------------------------------------------------------ */
  /* Service card 3D tilt                                   */
  /* ------------------------------------------------------ */
  if (isFinePointer) {
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 5}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });
  }

  /* ------------------------------------------------------ */
  /* Gallery filter                                         */
  /* ------------------------------------------------------ */
  const tabs  = document.querySelectorAll('.gtab');
  const tiles = document.querySelectorAll('.g-tile');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      tiles.forEach(t => {
        const match = cat === 'all' || t.dataset.cat === cat;
        t.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ------------------------------------------------------ */
  /* Booking form                                           */
  /* ------------------------------------------------------ */
  const form    = document.getElementById('bookingForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic native validation
      if (!form.reportValidity()) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const original = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending…';

      // Collect form data (ready for any backend)
      const data = Object.fromEntries(new FormData(form).entries());

      // ───────────── TODO: connect to a real backend ─────────────
      // Option A — Formspree:
      //   fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      //
      // Option B — EmailJS (https://emailjs.com):
      //   emailjs.send('SERVICE_ID', 'TEMPLATE_ID', data)
      //
      // Option C — Netlify Forms: add `data-netlify="true"` on the <form> and host on Netlify.
      // ────────────────────────────────────────────────────────────

      // Simulated success for now
      setTimeout(() => {
        form.reset();
        if (success) success.classList.add('is-on');
        submitBtn.innerHTML = '✓  Sent';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = original;
          if (success) success.classList.remove('is-on');
        }, 6000);
      }, 900);

      // For now we log so you can see data shape during dev:
      console.log('Booking request:', data);
    });
  }

  /* ------------------------------------------------------ */
  /* Active nav-link on scroll                              */
  /* ------------------------------------------------------ */
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = ['home','services','pricing','gallery','reviews','book']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  function setActive() {
    let cur = sections[0];
    sections.forEach(s => {
      const t = s.getBoundingClientRect().top;
      if (t < 120) cur = s;
    });
    if (!cur) return;
    navLinks.forEach(l => {
      l.style.color = l.getAttribute('href') === '#' + cur.id ? 'var(--white)' : '';
    });
  }
  window.addEventListener('scroll', setActive, { passive: true });
})();
