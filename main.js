/* ==========================================================================
   NOVA OS // MAIN CORE CONTROLLER
   Navigation, Telemetry Clock, Viewport Observer & Contact Transceiver
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. NAVBAR SCROLL EFFECT & ACTIVE LINK SPY
  const navbar = document.getElementById('nova-navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Spy
    let currentId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. MOBILE MENU TOGGLE
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');

  if (mobileToggle && mobileNavMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileNavMenu.classList.toggle('open');
      if (window.novaSound) window.novaSound.click();
    });

    mobileNavMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavMenu.classList.remove('open');
      });
    });
  }

  // 3. SOUND TOGGLE BUTTON
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIconActive = document.getElementById('sound-icon-active');
  const soundIconMuted = document.getElementById('sound-icon-muted');

  const updateSoundIcon = (muted) => {
    if (soundIconActive && soundIconMuted) {
      if (muted) {
        soundIconActive.style.display = 'none';
        soundIconMuted.style.display = 'inline-block';
      } else {
        soundIconActive.style.display = 'inline-block';
        soundIconMuted.style.display = 'none';
      }
    }
  };

  if (soundToggleBtn && window.novaSound) {
    updateSoundIcon(window.novaSound.isMuted);

    soundToggleBtn.addEventListener('click', () => {
      const isMuted = window.novaSound.toggleMute();
      updateSoundIcon(isMuted);
      if (!isMuted) window.novaSound.playBeep(900, 0.05, 'sine', 0.05);
    });
  }

  // 4. LIVE TELEMETRY CLOCK & LOCATION
  const clockEl = document.getElementById('telemetry-clock');
  const dateEl = document.getElementById('telemetry-date');

  const updateTelemetryClock = () => {
    const now = new Date();
    if (clockEl) {
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      clockEl.textContent = `${hours}:${minutes}:${seconds} IST`;
    }
    if (dateEl) {
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      dateEl.textContent = `${year}.${month}.${day}`;
    }
  };

  updateTelemetryClock();
  setInterval(updateTelemetryClock, 1000);

  // 5. VIEWPORT SCROLL REVEAL OBSERVER
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, unobserve to save battery/resources
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. CONTACT FORM INTERACTION (SPEC #18 & #22)
  const contactForm = document.getElementById('contact-form');
  const transmitBtn = document.getElementById('transmit-btn');
  const transmitLabel = document.getElementById('transmit-label');
  const responseMsg = document.getElementById('form-response-msg');

  if (transmitBtn && transmitLabel) {
    // Hover text change: TRANSMIT MESSAGE -> READY TO TRANSMIT
    transmitBtn.addEventListener('mouseenter', () => {
      transmitLabel.textContent = 'READY TO TRANSMIT';
    });

    transmitBtn.addEventListener('mouseleave', () => {
      transmitLabel.textContent = 'TRANSMIT MESSAGE';
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        alert('Please complete all transmission fields.');
        return;
      }

      if (window.novaSound) window.novaSound.transmit();

      if (transmitBtn) {
        transmitBtn.disabled = true;
        transmitLabel.textContent = 'TRANSMITTING DISPATCH...';
      }

      setTimeout(() => {
        if (responseMsg) {
          responseMsg.textContent = `TRANSMISSION CONFIRMED // Thank you ${name}. Your message has been logged into Naval's communication queue.`;
          responseMsg.className = 'form-response-msg success';
        }

        contactForm.reset();

        if (transmitBtn) {
          transmitBtn.disabled = false;
          transmitLabel.textContent = 'TRANSMIT MESSAGE';
        }
      }, 1200);
    });
  }

  // 7. SMOOTH SCROLL FOR BUTTONS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        if (window.novaSound) window.novaSound.click();
      }
    });
  });
});
