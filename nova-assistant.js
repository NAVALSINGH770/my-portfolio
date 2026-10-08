/* ==========================================================================
   NOVA OS // AI ASSISTANT WIDGET (SPEC #7)
   Interactive floating guide with typing animations and contextual briefings
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const chatBubble = document.getElementById('nova-chat-bubble');
  const avatarBtn = document.getElementById('nova-avatar-btn');
  const closeBtn = document.getElementById('nova-close-btn');
  const typingTextEl = document.getElementById('nova-typing-text');
  const optionChips = document.querySelectorAll('.nova-option-chip');

  const defaultGreeting = "Hello. I'm NOVA, Naval's digital portfolio assistant. What would you like to explore?";

  const sectionBriefings = {
    about: "Naval is currently in his 1st year of B.Tech at JECRC University, Jaipur, building rigorous engineering and programming foundations.",
    education: "Loading academic milestones: Rao International School (RBSE 10th & 12th) to JECRC University B.Tech.",
    skills: "Displaying currently developing competencies: Programming Fundamentals, CS Concepts, and AI Awareness.",
    projects: "Entering Project Lab. Reviewing early-stage problem solvers, AI research ideas, and the live NOVA OS system.",
    vision: "Accessing Naval's engineering mission: Learn systematically, build practically, and innovate for real impact.",
    contact: "Establishing communication channels. Connect directly with Naval on LinkedIn or transmit a connection dispatch."
  };

  let typingTimeout = null;

  // Typing animation generator
  const typeMessage = (text, speed = 25) => {
    if (!typingTextEl) return;
    if (typingTimeout) clearTimeout(typingTimeout);

    typingTextEl.textContent = '';
    let index = 0;

    const typeNextChar = () => {
      if (index < text.length) {
        typingTextEl.textContent += text.charAt(index);
        index++;
        if (window.novaSound && index % 4 === 0) {
          window.novaSound.playBeep(900 + (index * 8), 0.02, 'sine', 0.015);
        }
        typingTimeout = setTimeout(typeNextChar, speed);
      }
    };

    typeNextChar();
  };

  // Toggle Assistant Widget
  if (avatarBtn && chatBubble) {
    avatarBtn.addEventListener('click', () => {
      const isCollapsed = chatBubble.classList.contains('collapsed');
      if (isCollapsed) {
        chatBubble.classList.remove('collapsed');
        typeMessage(defaultGreeting);
      } else {
        chatBubble.classList.add('collapsed');
      }
      if (window.novaSound) window.novaSound.click();
    });
  }

  if (closeBtn && chatBubble) {
    closeBtn.addEventListener('click', () => {
      chatBubble.classList.add('collapsed');
      if (window.novaSound) window.novaSound.click();
    });
  }

  // Handle Quick Navigation Chips
  optionChips.forEach((chip) => {
    chip.addEventListener('click', (e) => {
      const targetSectionId = chip.getAttribute('data-target');
      if (!targetSectionId) return;

      const targetEl = document.getElementById(targetSectionId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }

      const briefing = sectionBriefings[targetSectionId] || defaultGreeting;
      typeMessage(briefing);

      if (window.novaSound) window.novaSound.click();
    });
  });

  // Initial prompt trigger after boot sequence completes
  setTimeout(() => {
    if (chatBubble && !chatBubble.classList.contains('collapsed')) {
      typeMessage(defaultGreeting);
    }
  }, 3200);
});
