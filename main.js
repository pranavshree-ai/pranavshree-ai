/**
 * PRANAV JADHAV — 3D GITHUB PROFILE INTERACTION ENGINE
 * Powered by Lenis, GSAP, Vanta.js Fog, and React Bits Components
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* =====================================================================
     1. LENIS SMOOTH SCROLL & GSAP SCROLLTRIGGER SYNCHRONIZATION
     ===================================================================== */
  let lenis;
  try {
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      });

      // Synchronize Lenis with GSAP ScrollTrigger
      if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }

      // Smooth scroll for internal anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (href === '#' || href === '') return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -30 });
          }
        });
      });
    }
  } catch (err) {
    console.warn('Lenis smooth scroll initialization error:', err);
  }

  /* =====================================================================
     2. 3D VANTA.JS FOG BACKGROUND EFFECT (Three.js WebGL)
     ===================================================================== */
  let vantaEffect = null;
  const vantaEl = document.getElementById('vanta-bg');

  if (vantaEl && typeof VANTA !== 'undefined' && typeof THREE !== 'undefined') {
    try {
      vantaEffect = VANTA.FOG({
        el: '#vanta-bg',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        highlightColor: 0x22d3ee, // Neon Cyan
        midtoneColor: 0x0ea5e9,   // Sky Blue
        lowlightColor: 0x0f172a,  // Deep Slate Navy
        baseColor: 0x030712,      // Cosmic Void Black
        blurFactor: 0.65,
        zoom: 1.15,
        speed: 1.25,
      });
    } catch (err) {
      console.warn('Vanta Fog initialization fallback:', err);
    }
  }

  /* =====================================================================
     3. REACT BITS: SPOTLIGHT CARD & 3D PERSPECTIVE TILT
     ===================================================================== */
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach((card) => {
    // Mouse movement inside card
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables for radial spotlight gradient
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Perspective Tilt Calculation
      if (!card.classList.contains('no-tilt')) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5.5; // subtle degrees
        const rotateY = ((x - centerX) / centerX) * 5.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
      }
    });

    // Reset on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', `-500px`);
      card.style.setProperty('--mouse-y', `-500px`);

      if (!card.classList.contains('no-tilt')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      }
    });
  });

  /* =====================================================================
     4. CURSOR GLOW FOLLOW EFFECT
     ===================================================================== */
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderCursor() {
      curX += (mouseX - curX) * 0.15;
      curY += (mouseY - curY) * 0.15;
      cursorGlow.style.left = `${curX}px`;
      cursorGlow.style.top = `${curY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();
  }

  /* =====================================================================
     5. REACT BITS: MAGNET PHYSICS ON BUTTONS & BADGES
     ===================================================================== */
  const magnetItems = document.querySelectorAll('.magnet');

  magnetItems.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - elCenterX) * 0.35;
      const deltaY = (e.clientY - elCenterY) * 0.35;

      if (typeof gsap !== 'undefined') {
        gsap.to(el, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }
    });

    el.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
        });
      } else {
        el.style.transform = 'translate(0px, 0px)';
      }
    });
  });

  /* =====================================================================
     6. REACT BITS: DECRYPTED / HACKER TEXT ANIMATION
     ===================================================================== */
  const chars = '!<>-_\\/[]{}—=+*^?#________0101';

  function scrambleText(element, finalString, duration = 1200) {
    const startTime = performance.now();
    const length = finalString.length;

    function update() {
      const now = performance.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const revealedCount = Math.floor(progress * length);

      let output = '';
      for (let i = 0; i < length; i++) {
        if (i < revealedCount) {
          output += finalString[i];
        } else if (finalString[i] === ' ') {
          output += ' ';
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      element.textContent = output;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = finalString;
      }
    }

    requestAnimationFrame(update);
  }

  // Trigger Decrypted title on Hero on load
  const heroTitleElement = document.querySelector('.decrypted-title');
  if (heroTitleElement) {
    const originalText = heroTitleElement.getAttribute('data-text') || heroTitleElement.textContent;
    setTimeout(() => {
      scrambleText(heroTitleElement, originalText, 1400);
    }, 300);
  }

  /* =====================================================================
     7. GSAP SCROLLTRIGGER: ENTRANCE ANIMATIONS & COUNTERS
     ===================================================================== */
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Fade-up elements
    const fadeUpEls = document.querySelectorAll('[data-gsap="fade-up"]');
    fadeUpEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Metric Counters with localized numbers
    const metricCounters = document.querySelectorAll('.metric-counter');
    metricCounters.forEach((counter) => {
      const targetVal = parseFloat(counter.getAttribute('data-target') || '0');

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: targetVal,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: () => {
              if (targetVal > 1000) {
                counter.textContent = Math.floor(obj.val).toLocaleString();
              } else if (targetVal % 1 !== 0) {
                counter.textContent = obj.val.toFixed(1);
              } else {
                counter.textContent = Math.floor(obj.val);
              }
            },
          });
        },
      });
    });
  }

  /* =====================================================================
     8. SELF-HEALING ARCHITECTURE SIMULATION
     ===================================================================== */
  const simBtn = document.getElementById('trigger-sim-btn');
  const simIndicator = document.getElementById('sim-indicator');
  const simStatusText = document.getElementById('sim-status-text');
  const simLogOutput = document.getElementById('sim-log-output');

  let isSimulating = false;

  function appendSimLog(text, type = 'info') {
    if (!simLogOutput) return;
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const logLine = document.createElement('div');
    logLine.className = `log-line ${type}`;
    logLine.textContent = `[${time}] ${text}`;
    simLogOutput.appendChild(logLine);
    simLogOutput.scrollTop = simLogOutput.scrollHeight;
  }

  if (simBtn) {
    simBtn.addEventListener('click', () => {
      if (isSimulating) return;
      isSimulating = true;
      simBtn.disabled = true;
      simBtn.style.opacity = '0.6';

      const nodes = [
        document.getElementById('step-node-1'),
        document.getElementById('step-node-2'),
        document.getElementById('step-node-3'),
        document.getElementById('step-node-4'),
      ];

      const connectors = [
        document.getElementById('connector-1'),
        document.getElementById('connector-2'),
        document.getElementById('connector-3'),
      ];

      // Step 1: Normal Evaluation
      simIndicator.className = 'sim-indicator';
      simStatusText.textContent = 'Pipeline Status: Evaluating live traffic';
      nodes[0].classList.add('active-node');
      appendSimLog('STAGE 1 [EVALUATE]: Incoming request batch evaluated by dual AI judges.', 'info');

      setTimeout(() => {
        // Pulse Connector 1
        connectors[0].querySelector('.connector-pulse').classList.add('running');
        appendSimLog('STAGE 1: Pydantic response valid. Inter-rater score agreement: 94.1%.', 'success');
      }, 700);

      // Step 2: Inject Synthetic Drift Alert
      setTimeout(() => {
        nodes[0].classList.remove('active-node');
        nodes[1].classList.add('active-node');
        simIndicator.className = 'sim-indicator active-drift';
        simStatusText.textContent = 'Pipeline Status: Concept Drift Detected (< 0.85 threshold)';
        appendSimLog('STAGE 2 [DETECT DRIFT]: Evidently AI test suite flagged embedding shift (score = 0.812).', 'alert');
        appendSimLog('STAGE 2: Alert triggered -> Dispatched automated LoRA retraining payload.', 'warn');
      }, 1600);

      // Step 3: LoRA Training Job
      setTimeout(() => {
        connectors[1].querySelector('.connector-pulse').classList.add('running');
        nodes[1].classList.remove('active-node');
        nodes[2].classList.add('active-node');
        simIndicator.className = 'sim-indicator active-tune';
        simStatusText.textContent = 'Pipeline Status: Automated PEFT / LoRA Fine-Tuning Job Active';
        appendSimLog('STAGE 3 [FINE-TUNE]: Initializing PEFT container (r=16, alpha=32, target=q_proj,v_proj).', 'info');
        appendSimLog('STAGE 3: 3 epochs completed on curated edge cases -> Adapter pushed to HuggingFace Hub.', 'success');
      }, 3000);

      // Step 4: vLLM Hot Swap & Redeploy
      setTimeout(() => {
        connectors[2].querySelector('.connector-pulse').classList.add('running');
        nodes[2].classList.remove('active-node');
        nodes[3].classList.add('active-node');
        simIndicator.className = 'sim-indicator';
        simStatusText.textContent = 'Pipeline Status: Hot-swapping vLLM Model Weights';
        appendSimLog('STAGE 4 [REDEPLOY]: vLLM serving swapped active LoRA adapter without downtime.', 'success');
        appendSimLog('STAGE 4: Latency p50 verified at 42ms. Agreement restored to 95.8%.', 'success');
      }, 4500);

      // Return to Steady State
      setTimeout(() => {
        nodes[3].classList.remove('active-node');
        connectors.forEach((c) => c.querySelector('.connector-pulse').classList.remove('running'));
        simStatusText.textContent = 'Pipeline Status: Active Observation (Self-Healed)';
        appendSimLog('CYCLE COMPLETE: System self-healed successfully with 0 human steps.', 'success');
        isSimulating = false;
        simBtn.disabled = false;
        simBtn.style.opacity = '1';
      }, 6000);
    });
  }

  /* =====================================================================
     9. INTERACTIVE SYSTEM REPL / CLASS PRANAV
     ===================================================================== */
  const runCodeBtn = document.getElementById('run-code-btn');
  const copyCodeBtn = document.getElementById('copy-code-btn');
  const copyBtnLabel = document.getElementById('copy-btn-label');
  const consoleOutput = document.getElementById('console-output');

  if (runCodeBtn && consoleOutput) {
    runCodeBtn.addEventListener('click', () => {
      consoleOutput.innerHTML = '';

      const lines = [
        { text: '>>> pranav = Pranav()', cls: 'out-dim' },
        { text: '>>> diagnostics = pranav.build_system()', cls: 'out-dim' },
        { text: '>>> [INFO] Initializing system telemetry...', cls: 'out-cyan' },
        { text: '✓ Role: "Machine Learning Engineer, LLMOps, MLOps, GenAI"', cls: 'out-success' },
        { text: '✓ Philosophy: "Correct, not just fluent"', cls: 'out-success' },
        { text: '✓ Vectors Indexed: 1,037,086 in single Qdrant node', cls: 'out-cyan' },
        { text: '✓ AI Judge Inter-rater Agreement: 94.0%', cls: 'out-cyan' },
        { text: '✓ P50 Latency: 42ms (ONNX INT8 quantized)', cls: 'out-cyan' },
        { text: '✓ Uptime Guarantee: 99.99%', cls: 'out-success' },
        { text: '>>> System Status: READY_FOR_DEPLOYMENT', cls: 'out-success' },
      ];

      lines.forEach((line, index) => {
        setTimeout(() => {
          const p = document.createElement('p');
          p.className = `out-line ${line.cls}`;
          p.textContent = line.text;
          consoleOutput.appendChild(p);
        }, index * 120);
      });
    });
  }

  if (copyCodeBtn && copyBtnLabel) {
    copyCodeBtn.addEventListener('click', () => {
      const code = `class Pranav:
    role = "Machine Learning Engineer, LLMOps, MLOps, GenAI"
    location = "Pune, India (Open to Worldwide Remote & Relocation)"
    
    going_deep_on = [
        "LLM evaluation: AI-judge scoring, drift, hallucination checks",
        "Closed-loop fine-tuning: drift alert -> LoRA -> redeploy",
        "Inference optimisation: vLLM, ONNX INT8, 4-bit quantisation",
        "RAG at scale: hybrid retrieval, 1M+ vector indexes",
    ]

    open_to = ["Full-time", "Internships", "Remote-first ML roles"]

    def build_system(self):
        return {
            "philosophy": "Correct, not just fluent",
            "metrics": ["p50/p99 latency", "judge agreement", "VRAM footprint"],
            "uptime": 99.99,
            "status": "READY_FOR_DEPLOYMENT"
        }`;

      navigator.clipboard.writeText(code).then(() => {
        copyBtnLabel.textContent = 'Copied!';
        setTimeout(() => {
          copyBtnLabel.textContent = 'Copy';
        }, 2000);
      });
    });
  }

  /* =====================================================================
     10. PROJECT CATEGORY FILTER PILLS
     ===================================================================== */
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          if (typeof gsap !== 'undefined') {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.35,
              display: 'flex',
            });
          } else {
            card.style.display = 'flex';
            card.style.opacity = '1';
          }
        } else {
          if (typeof gsap !== 'undefined') {
            gsap.to(card, {
              opacity: 0,
              scale: 0.95,
              duration: 0.25,
              onComplete: () => {
                card.style.display = 'none';
              },
            });
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
});
