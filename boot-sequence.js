/* ==========================================================================
   NOVA OS // STARTUP BOOT SEQUENCE (SPEC #4)
   Cinematic 2.5-second boot terminal with skip option and sound synchronization
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const bootOverlay = document.getElementById('boot-overlay');
  const bootLogStream = document.getElementById('boot-log-stream');
  const bootProgressBar = document.getElementById('boot-progress-bar');
  const bootSkipBtn = document.getElementById('boot-skip-btn');

  // Exact boot sequence telemetry messages
  const bootLogs = [
    { text: "INITIALIZING NOVA OS...", highlight: false },
    { text: "IDENTIFYING USER...", highlight: false },
    { text: "NAVAL SINGH", highlight: true },
    { text: "ENGINEERING PROFILE FOUND", highlight: false },
    { text: "EDUCATION MODULE ........ ONLINE", highlight: false, status: "ONLINE" },
    { text: "SKILLS MODULE ........ ONLINE", highlight: false, status: "ONLINE" },
    { text: "PROJECT LAB ........ ONLINE", highlight: false, status: "ONLINE" },
    { text: "LINKEDIN CONNECTION ........ READY", highlight: false, status: "READY" },
    { text: "SYSTEM STATUS ........ ONLINE", highlight: true, status: "ONLINE" }
  ];

  let currentStep = 0;
  let hasSkipped = false;

  const completeBoot = () => {
    if (hasSkipped) return;
    hasSkipped = true;
    if (bootProgressBar) bootProgressBar.style.width = '100%';
    if (window.novaSound) window.novaSound.bootChirp();

    setTimeout(() => {
      if (bootOverlay) {
        bootOverlay.classList.add('boot-complete');
      }
      document.body.classList.remove('booting');
      // Trigger Hero Core initial glow
      const heroCore = document.querySelector('.holographic-core');
      if (heroCore) {
        heroCore.classList.add('core-active');
      }
    }, 400);
  };

  // Skip button listener
  if (bootSkipBtn) {
    bootSkipBtn.addEventListener('click', () => {
      completeBoot();
    });
  }

  // Keyboard shortcut (Escape to skip)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      completeBoot();
    }
  });

  // Execute sequential text reveal
  const stepInterval = 260; // 9 steps * 260ms ~= 2.3 seconds
  const stepTimer = setInterval(() => {
    if (currentStep >= bootLogs.length || hasSkipped) {
      clearInterval(stepTimer);
      completeBoot();
      return;
    }

    const logData = bootLogs[currentStep];
    const lineEl = document.createElement('div');
    lineEl.className = `boot-log-line ${logData.highlight ? 'highlight' : ''}`;
    
    if (logData.status) {
      const parts = logData.text.split(logData.status);
      lineEl.innerHTML = `<span>${parts[0]}</span><span class="status-tag">${logData.status}</span>`;
    } else {
      lineEl.textContent = logData.text;
    }

    if (bootLogStream) {
      bootLogStream.appendChild(lineEl);
      setTimeout(() => lineEl.classList.add('active'), 20);
    }

    if (window.novaSound) {
      window.novaSound.playBeep(600 + (currentStep * 80), 0.03, 'sine', 0.03);
    }

    // Update progress bar
    if (bootProgressBar) {
      const progressPct = Math.round(((currentStep + 1) / bootLogs.length) * 100);
      bootProgressBar.style.width = `${progressPct}%`;
    }

    currentStep++;
  }, stepInterval);
});
