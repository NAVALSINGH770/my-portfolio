/* ==========================================================================
   NOVA OS // PROJECT CONCEPT DOSSIER MODAL (SPEC #13)
   Inspects early-stage engineering architectures, problem definitions & live status
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const modalBackdrop = document.getElementById('concept-modal-backdrop');
  const modalCloseBtn = document.getElementById('concept-modal-close');
  const modalContentContainer = document.getElementById('concept-modal-body');

  const concepts = {
    'ai-exploration': {
      id: "PROJECT 01 // SYS-AI-01",
      title: "AI EXPLORATION",
      status: "EXPLORING",
      statusClass: "badge-exploring",
      summary: "Exploring how artificial intelligence can be applied to practical student and real-world problems.",
      details: [
        {
          heading: "CONCEPT OBJECTIVE",
          text: "Investigating the fundamental mechanisms of modern generative and assistive artificial intelligence systems, assessing how natural language models and intelligent automation can assist university students in comprehension, STEM problem solving, and research synthesis."
        },
        {
          heading: "CORE FOCUS AREAS",
          text: "• Prompt architecture and contextual reasoning workflows\n• Ethical utilization of AI for active engineering education\n• Algorithmic foundations: vectors, transformers, and data processing"
        },
        {
          heading: "CURRENT STAGE",
          text: "Active self-directed learning, conceptual testing, and foundational mathematics (Linear Algebra & Calculus)."
        }
      ]
    },
    'problem-solver': {
      id: "PROJECT 02 // SYS-ENG-02",
      title: "ENGINEERING PROBLEM SOLVER",
      status: "IDEA STAGE",
      statusClass: "badge-idea",
      summary: "Exploring technology-driven solutions for everyday problems.",
      details: [
        {
          heading: "CONCEPT OBJECTIVE",
          text: "Formulating systematic engineering models to dissect everyday logistical and computational inefficiencies. Grounded in first-principles engineering reasoning: identifying root friction, formulating algorithmic workflows, and prototyping minimal solutions."
        },
        {
          heading: "METHODOLOGY",
          text: "• Problem identification and root-cause decomposition\n• Workflow mapping and logic diagrams\n• Evaluating software vs. hardware feasibility"
        },
        {
          heading: "CURRENT STAGE",
          text: "Ideation phase. Documenting problem statements, study workflows, and evaluating practical development tools."
        }
      ]
    },
    'nova-os': {
      id: "PROJECT 03 // SYS-LIVE-03",
      title: "NOVA PORTFOLIO SYSTEM",
      status: "LIVE",
      statusClass: "badge-live",
      summary: "An interactive futuristic portfolio representing Naval's engineering journey.",
      details: [
        {
          heading: "SYSTEM ARCHITECTURE",
          text: "Built as a high-performance, responsive command dashboard embodying next-generation AI interface ergonomics. Engineered with pure semantic HTML5, CSS3 GPU-accelerated transforms, Canvas 2D particle dynamics, and Web Audio API synthetic telemetry."
        },
        {
          heading: "KEY SUBSYSTEMS",
          text: "• Cinematic boot telemetry loader with skip capability\n• Interactive 3D holographic NS core with orbital physics\n• Floating NOVA AI portfolio guide assistant\n• Academic timeline & strategic 2026-2030 development roadmap"
        },
        {
          heading: "AUTHENTICITY DIRECTIVE",
          text: "Presents Naval Singh's true academic background as a first-year B.Tech engineer at JECRC University without simulated credentials."
        }
      ]
    }
  };

  const openModal = (conceptKey) => {
    const data = concepts[conceptKey];
    if (!data || !modalContentContainer || !modalBackdrop) return;

    let detailsHTML = '';
    data.details.forEach(item => {
      detailsHTML += `
        <div style="margin-bottom: 20px;">
          <h4 style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--cyan-primary); letter-spacing: 0.12em; margin-bottom: 6px;">${item.heading}</h4>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; white-space: pre-line;">${item.text}</p>
        </div>
      `;
    });

    modalContentContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; border-bottom: 1px solid rgba(0,240,255,0.2); padding-bottom: 14px;">
        <div>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--cyan-primary); letter-spacing: 0.15em;">${data.id}</span>
          <h2 style="font-size: 1.8rem; font-weight: 800; color: #ffffff; margin-top: 4px;">${data.title}</h2>
        </div>
        <span class="status-badge ${data.statusClass}" style="margin-top: 6px;">${data.status}</span>
      </div>
      <p style="font-size: 1.05rem; color: var(--text-main); line-height: 1.6; margin-bottom: 24px; font-weight: 500;">${data.summary}</p>
      ${detailsHTML}
      <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
        <span>NOVA OS // DOSSIER INSPECTOR</span>
        <span style="color: var(--cyan-primary);">ENGINEERING SPECIFICATION</span>
      </div>
    `;

    modalBackdrop.classList.add('open');
    if (window.novaSound) window.novaSound.click();
  };

  const closeModal = () => {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      if (window.novaSound) window.novaSound.click();
    }
  };

  // Attach buttons
  document.querySelectorAll('[data-concept]').forEach(btn => {
    btn.addEventListener('click', () => {
      const conceptKey = btn.getAttribute('data-concept');
      openModal(conceptKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
});
