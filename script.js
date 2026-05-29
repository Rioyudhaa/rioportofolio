// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const cursorGlow = document.getElementById('cursorGlow');

if (cursorDot && cursorRing && cursorGlow) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let glowX = 0, glowY = 0;
  let isVisible = false;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      isVisible = true;
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    }
    // Dot follows instantly
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Ring and glow follow with lerp
  function animateCursor() {
    // Ring follows with smooth delay
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';

    // Glow follows even slower
    glowX += (mouseX - glowX) * 0.06;
    glowY += (mouseY - glowY) * 0.06;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hide when mouse leaves window
  document.addEventListener('mouseleave', () => {
    isVisible = false;
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    isVisible = true;
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });

  // Click effects
  document.addEventListener('mousedown', () => {
    cursorDot.classList.add('clicking');
    cursorRing.classList.add('clicking');
  });
  document.addEventListener('mouseup', () => {
    cursorDot.classList.remove('clicking');
    cursorRing.classList.remove('clicking');
  });

  // Hover effects on interactive elements
  const interactiveEls = document.querySelectorAll('a, button, .carousel-dot, .skill-card, .project-card, .contact-link, .footer-socials a, .timeline-content');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hovering');
      cursorRing.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hovering');
      cursorRing.classList.remove('hovering');
    });
  });

  // Text input cursor
  const textEls = document.querySelectorAll('input, textarea');
  textEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hovering');
      cursorRing.classList.add('text-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hovering');
      cursorRing.classList.remove('text-hover');
    });
  });
}

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  
  // Active link
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 200;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  navMenu.classList.add('open');
  navOverlay?.classList.add('active');
  document.body.style.overflow = 'hidden';
  const spans = menuToggle.querySelectorAll('span');
  spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
  spans[1].style.opacity = '0';
  spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
}

function closeMenu() {
  navMenu.classList.remove('open');
  navOverlay?.classList.remove('active');
  document.body.style.overflow = '';
  const spans = menuToggle?.querySelectorAll('span');
  if (spans) {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
}

menuToggle?.addEventListener('click', () => {
  navMenu.classList.contains('open') ? closeMenu() : openMenu();
});

// Close on overlay click
navOverlay?.addEventListener('click', closeMenu);

// Close on nav link click
navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal, .timeline-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== TYPING EFFECT =====
const typingEl = document.querySelector('.typing-text');
if (typingEl) {
  const words = ['UI/UX Designer', 'Frontend Developer', 'Creative Designer', 'Pixel Perfectionist'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;
  
  function typeEffect() {
    const current = words[wordIndex];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let delay = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 500;
    }
    
    setTimeout(typeEffect, delay);
  }
  typeEffect();
}

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      const suffix = entry.target.getAttribute('data-suffix') || '';
      let count = 0;
      const increment = Math.ceil(target / 60);
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        entry.target.textContent = count + suffix;
      }, 30);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const btn = form.querySelector('.btn-primary');
  const origText = btn.innerHTML;
  
  // Show loading state
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  btn.disabled = true;
  
  try {
    const formData = new FormData(form);
    
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Success
      btn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
      btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
      form.reset();
    } else {
      // API returned error
      btn.innerHTML = '<i class="fas fa-times"></i> Gagal Mengirim';
      btn.style.background = 'linear-gradient(135deg, #f87171, #ef4444)';
    }
  } catch (error) {
    // Network error
    btn.innerHTML = '<i class="fas fa-times"></i> Gagal Mengirim';
    btn.style.background = 'linear-gradient(135deg, #f87171, #ef4444)';
  }
  
  setTimeout(() => {
    btn.innerHTML = origText;
    btn.style.background = '';
    btn.disabled = false;
  }, 3000);
});

// ===== PARALLAX ON SCROLL =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  document.querySelectorAll('.hero-bg .orb').forEach((orb, i) => {
    const speed = 0.3 + (i * 0.1);
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===== PROJECT CAROUSEL =====
const carouselTrack = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const dotsContainer = document.getElementById('carouselDots');
const progressBar = document.getElementById('carouselProgressBar');

if (carouselTrack && slides.length > 0) {
  let currentSlide = 0;
  let autoplayInterval;
  let progressInterval;
  const SLIDE_DURATION = 5000; // 5 seconds per slide
  const PROGRESS_STEP = 50; // update every 50ms
  let progressValue = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function goToSlide(index, direction = 'next') {
    if (index === currentSlide) return;

    const prevSlideEl = slides[currentSlide];
    const nextSlideEl = slides[index];

    // Hide all slides except current and next
    slides.forEach((s, i) => {
      if (i !== currentSlide && i !== index) {
        s.classList.remove('active', 'exit-left');
        s.style.opacity = '0';
        s.style.transform = '';
        s.style.zIndex = '0';
      }
    });

    // Position the next slide off-screen first (disable transition briefly)
    nextSlideEl.style.transition = 'none';
    if (direction === 'next') {
      nextSlideEl.style.transform = 'translateX(80px) scale(0.96)';
    } else {
      nextSlideEl.style.transform = 'translateX(-80px) scale(0.96)';
    }
    nextSlideEl.style.opacity = '0';
    nextSlideEl.style.zIndex = '2';

    // Force reflow to apply the starting position
    void nextSlideEl.offsetWidth;

    // Re-enable transition
    nextSlideEl.style.transition = '';

    // Animate current slide out
    prevSlideEl.style.zIndex = '1';
    prevSlideEl.classList.remove('active');
    if (direction === 'next') {
      prevSlideEl.classList.add('exit-left');
    } else {
      prevSlideEl.style.opacity = '0';
      prevSlideEl.style.transform = 'translateX(80px) scale(0.96)';
    }

    // Animate next slide in
    nextSlideEl.classList.remove('exit-left');
    nextSlideEl.classList.add('active');
    nextSlideEl.style.opacity = '';
    nextSlideEl.style.transform = '';

    // Update dots
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');

    currentSlide = index;

    // Reset progress
    resetProgress();
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next, 'next');
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev, 'prev');
  }

  // Progress bar
  function resetProgress() {
    progressValue = 0;
    if (progressBar) progressBar.style.width = '0%';
  }

  function startProgress() {
    clearInterval(progressInterval);
    resetProgress();
    progressInterval = setInterval(() => {
      progressValue += (PROGRESS_STEP / SLIDE_DURATION) * 100;
      if (progressBar) progressBar.style.width = progressValue + '%';
      if (progressValue >= 100) {
        clearInterval(progressInterval);
      }
    }, PROGRESS_STEP);
  }

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    startProgress();
    autoplayInterval = setInterval(() => {
      nextSlide();
      startProgress();
    }, SLIDE_DURATION);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
    clearInterval(progressInterval);
  }

  // Controls
  prevBtn?.addEventListener('click', () => {
    prevSlide();
    stopAutoplay();
    startAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    stopAutoplay();
    startAutoplay();
  });

  // Pause on hover
  carouselTrack.addEventListener('mouseenter', stopAutoplay);
  carouselTrack.addEventListener('mouseleave', startAutoplay);

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  carouselTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  carouselTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    startAutoplay();
  }, { passive: true });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;
    const rect = projectsSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowLeft') { prevSlide(); stopAutoplay(); startAutoplay(); }
    if (e.key === 'ArrowRight') { nextSlide(); stopAutoplay(); startAutoplay(); }
  });

  // Start autoplay
  startAutoplay();
}
