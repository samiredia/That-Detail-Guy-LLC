/* ============================================================
   THAT DETAIL GUY LLC — interactions
   ============================================================ */

/* ---- Sticky nav state ---- */
(() => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ---- Mobile menu ---- */
(() => {
  const btn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.mobile-menu');
  const close = document.querySelector('.mobile-menu .close');
  if (!btn || !menu) return;
  const open = () => menu.classList.add('open');
  const shut = () => menu.classList.remove('open');
  btn.addEventListener('click', open);
  close && close.addEventListener('click', shut);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));
})();

/* ---- IntersectionObserver reveal ---- */
(() => {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

/* ---- Before/After slider ---- */
(() => {
  document.querySelectorAll('.ba-stage').forEach(stage => {
    const handle = stage.querySelector('.ba-handle');
    const after  = stage.querySelector('.ba-frame.after');
    if (!handle || !after) return;

    const set = (x) => {
      const rect = stage.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
      handle.style.left = (pct * 100) + '%';
      after.style.clipPath = `inset(0 0 0 ${pct * 100}%)`;
    };

    let dragging = false;
    const onDown = (e) => {
      dragging = true;
      const px = e.touches ? e.touches[0].clientX : e.clientX;
      set(px);
      e.preventDefault();
    };
    const onMove = (e) => {
      if (!dragging) return;
      const px = e.touches ? e.touches[0].clientX : e.clientX;
      set(px);
    };
    const onUp = () => { dragging = false; };

    stage.addEventListener('mousedown', onDown);
    stage.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
  });
})();

/* ---- Form: client validation + success state ---- */
(() => {
  const form = document.querySelector('#bookForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.classList.add('is-sent');
  });

  /* DD.MM.YYYY auto-mask for the date field */
  const dateInput = form.querySelector('#f-date');
  if (dateInput) {
    dateInput.addEventListener('input', (e) => {
      const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
      let out = digits;
      if (digits.length > 4) out = digits.slice(0,2) + '.' + digits.slice(2,4) + '.' + digits.slice(4);
      else if (digits.length > 2) out = digits.slice(0,2) + '.' + digits.slice(2);
      e.target.value = out;
    });
  }
})();

/* ---- Hero video: ensure it plays on iOS Safari ---- */
(() => {
  const v = document.querySelector('.hero-video');
  if (!v) return;
  const tryPlay = () => { v.play().catch(() => {}); };
  v.addEventListener('canplay', tryPlay);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tryPlay(); });
})();

/* ---- Year ---- */
(() => {
  const y = document.querySelector('#year');
  if (y) y.textContent = new Date().getFullYear();
})();
