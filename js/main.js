/* ========================================
   MAIN JAVASCRIPT — Cedrick Portfolio
   ======================================== */

// ── Matrix Rain ──
(function initMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0ff';
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 50);

  window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  });
})();

// ── Cursor Glow ──
(function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.matchMedia('(max-width: 768px)').matches) return;

  document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  });
})();

// ── Navbar Scroll & Mobile Toggle ──
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('active');
    });

    links.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('active');
      });
    });
  }
})();

// ── Hero Greeting ──
(function initGreeting() {
  const el = document.getElementById('heroGreeting');
  if (!el) return;
  const name = 'Cedrick Jay A. Tobias';
  let i = 0;
  function type() {
    if (i <= name.length) {
      el.textContent = name.substring(0, i);
      i++;
      setTimeout(type, 50);
    }
  }
  setTimeout(type, 800);
})();

// ── Role Typing Effect ──
(function initRoleTyping() {
  const el = document.getElementById('typingRole');
  if (!el) return;

  const roles = [
    'Full-Stack Software Engineer',
    'React 19 & Next.js Architect',
    'FastAPI & Python Backend Specialist',
    'Applied ML & Tesseract OCR Integrator',
    'AES-256 Cryptography Engineer',
    'Dean\'s Lister — GPA 1.4'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = roles[roleIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  setTimeout(type, 2200);
})();

// ── Counter Animation ──
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let started = false;

  function animateCounters() {
    counters.forEach(counter => {
      const rawTarget = counter.getAttribute('data-count');
      if (rawTarget.includes('.')) {
        counter.textContent = rawTarget;
        return;
      }
      const target = parseInt(rawTarget);
      const increment = Math.ceil(target / 40);
      let current = 0;

      function update() {
        if (current < target) {
          current += increment;
          if (current > target) current = target;
          counter.textContent = current;
          requestAnimationFrame(update);
        }
      }
      update();
    });
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      animateCounters();
    }
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
})();

// ── Reveal on Scroll ──
(function initReveal() {
  const reveals = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
})();

// ── Project Filters ──
(function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
})();

// ── Interactive Live Preview Modal ──
(function initLivePreviewModal() {
  const modal = document.getElementById('previewModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseDot = document.getElementById('modalCloseDot');
  const modalReloadBtn = document.getElementById('modalReloadBtn');
  const modalIframe = document.getElementById('modalIframe');
  const modalLoader = document.getElementById('modalLoader');
  const modalUrlText = document.getElementById('modalUrlText');
  const modalExternalLink = document.getElementById('modalExternalLink');
  const modalFrameWrapper = document.getElementById('modalFrameWrapper');
  const deviceBtns = document.querySelectorAll('.device-btn');
  const previewTriggers = document.querySelectorAll('.btn-preview-modal');

  if (!modal || !modalIframe) return;

  function openModal(url, title) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    modalUrlText.textContent = url;
    modalExternalLink.href = url;
    modalLoader.classList.remove('hidden');

    modalIframe.src = url;

    modalIframe.onload = () => {
      modalLoader.classList.add('hidden');
    };
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalIframe.src = '';
  }

  previewTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = btn.getAttribute('data-preview-url');
      const title = btn.getAttribute('data-preview-title');
      if (url) openModal(url, title);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCloseDot) modalCloseDot.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  if (modalReloadBtn) {
    modalReloadBtn.addEventListener('click', () => {
      const currentSrc = modalIframe.src;
      if (currentSrc) {
        modalLoader.classList.remove('hidden');
        modalIframe.src = currentSrc;
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  deviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      deviceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const device = btn.getAttribute('data-device');
      modalFrameWrapper.classList.remove('tablet', 'mobile');
      if (device === 'tablet') modalFrameWrapper.classList.add('tablet');
      if (device === 'mobile') modalFrameWrapper.classList.add('mobile');
    });
  });
})();
