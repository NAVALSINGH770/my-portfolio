/* ==========================================================================
   NOVA OS // HOLOGRAPHIC CORE & NEURAL CANVAS SYSTEM (SPEC #5, #21, #22)
   Orbital parallax, interactive 3D core tilt, dynamic cursor, and particle grid
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. NEURAL GRID CANVAS SYSTEM
  const canvas = document.getElementById('neural-grid-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle nodes count based on screen width
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 30 : 65;
    const maxDistance = isMobile ? 90 : 130;

    const nodes = [];
    const mouse = { x: null, y: null, radius: 140 };

    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.8 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Subtle mouse repulsion / attraction
        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.45)';
        ctx.fill();
      }
    }

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node());
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting filaments
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update nodes
      nodes.forEach((node) => {
        node.update();
        node.draw();
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  // 2. HOLOGRAPHIC CORE 3D MOUSE REACTION (SPEC #5)
  const coreWrapper = document.querySelector('.hero-core-wrapper');
  const holographicCore = document.querySelector('.holographic-core');
  const orbitalTags = document.querySelectorAll('.orbital-tag');

  if (coreWrapper && holographicCore) {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const xPct = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yPct = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      targetX = -yPct * 18; // degrees
      targetY = xPct * 22; // degrees
    });

    const updateCoreTilt = () => {
      // Smooth interpolation (lerp)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      holographicCore.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`;

      // Depth offset for orbital badges
      orbitalTags.forEach((tag, idx) => {
        const factor = (idx % 2 === 0 ? 1 : -1) * 8;
        tag.style.transform = `translateZ(${(25 + idx * 5)}px) rotateX(${(-currentX * 0.5).toFixed(2)}deg) rotateY(${(-currentY * 0.5).toFixed(2)}deg)`;
      });

      requestAnimationFrame(updateCoreTilt);
    };

    updateCoreTilt();
  }

  // 3. CUSTOM FUTURISTIC CURSOR (DESKTOP)
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorRing = document.querySelector('.custom-cursor-ring');

  if (cursorDot && cursorRing && window.innerWidth >= 1024) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const updateCursorRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(updateCursorRing);
    };

    updateCursorRing();

    // Hover effect over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .glass-panel, .nova-option-chip, .orbital-tag');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('cursor-hover');
        if (window.novaSound) window.novaSound.hover();
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('cursor-hover');
      });
    });
  }
});
