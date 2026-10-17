/**
 * PRANAV JADHAV — NOCTURNE ATELIER INTERACTION ENGINE
 * Built with Lenis, GSAP, Vanta Fog (Nocturne Palette), and React Bits Components
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* =====================================================================
     1. LENIS SMOOTH SCROLL & GSAP SYNCHRONIZATION
     ===================================================================== */
  let lenis;
  try {
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      });

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

      // Smooth scroll anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (href === '#' || href === '') return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -40 });
          }
        });
      });
    }
  } catch (err) {
    console.warn('Lenis initialization notice:', err);
  }

  /* =====================================================================
     2. 3D VANTA.JS FOG (NOCTURNE ATELIER PALETTE)
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
        highlightColor: 0xa8d4ff, // Crystalline Ice-Blue
        midtoneColor: 0x142238,   // Deep Midnight Azure
        lowlightColor: 0x070b12,  // Deep Obsidian Slate
        baseColor: 0x060606,      // Endless Dark Void
        blurFactor: 0.72,
        zoom: 1.1,
        speed: 1.05,
      });
    } catch (err) {
      console.warn('Vanta Fog fallback notice:', err);
    }
  }

  /* =====================================================================
     3. REACT BITS: SPOTLIGHT CARD & 3D TILT
     ===================================================================== */
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (!card.classList.contains('no-tilt')) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', `-500px`);
      card.style.setProperty('--mouse-y', `-500px`);

      if (!card.classList.contains('no-tilt')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      }
    });
  });

  /* =====================================================================
     4. CURSOR SPOTLIGHT TRACKING
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

    function renderGlow() {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      cursorGlow.style.left = `${curX}px`;
      cursorGlow.style.top = `${curY}px`;
      requestAnimationFrame(renderGlow);
    }
    renderGlow();
  }

  /* =====================================================================
     5. REACT BITS: MAGNET PHYSICS
     ===================================================================== */
  const magnetItems = document.querySelectorAll('.magnet');

  magnetItems.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - elCenterX) * 0.32;
      const deltaY = (e.clientY - elCenterY) * 0.32;

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
     6. REACT BITS: CIPHER DECRYPTED TEXT
     ===================================================================== */
  const glyphs = 'abcdefghijklmnopqrstuvwxyz0123456789!<>_\\/[]{}—=+*^';

  function scrambleText(element, finalString, duration = 1200) {
    const startTime = performance.now();
    const length = finalString.length;

    function frame() {
      const now = performance.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const revealed = Math.floor(progress * length);

      let str = '';
      for (let i = 0; i < length; i++) {
        if (i < revealed) {
          str += finalString[i];
        } else if (finalString[i] === ' ') {
          str += ' ';
        } else {
          str += glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      }

      element.textContent = str;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        element.textContent = finalString;
      }
    }

    requestAnimationFrame(frame);
  }

  const heroTitle = document.querySelector('.decrypted-title');
  if (heroTitle) {
    const original = heroTitle.getAttribute('data-text') || heroTitle.textContent;
    setTimeout(() => {
      scrambleText(heroTitle, original, 1300);
    }, 250);
  }

  /* =====================================================================
     7. GSAP SCROLL ENTRANCES & METRIC COUNTERS
     ===================================================================== */
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Fade-up elements
    document.querySelectorAll('[data-gsap="fade-up"]').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Metric numbers animation
    document.querySelectorAll('.metric-counter').forEach((counter) => {
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

  let isRunning = false;

  function writeLog(text, type = 'info') {
    if (!simLogOutput) return;
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const row = document.createElement('div');
    row.className = `log-row ${type}`;
    row.textContent = `[${time}] ${text}`;
    simLogOutput.appendChild(row);
    simLogOutput.scrollTop = simLogOutput.scrollHeight;
  }

  if (simBtn) {
    simBtn.addEventListener('click', () => {
      if (isRunning) return;
      isRunning = true;
      simBtn.disabled = true;
      simBtn.style.opacity = '0.5';

      const nodes = [
        document.getElementById('step-node-1'),
        document.getElementById('step-node-2'),
        document.getElementById('step-node-3'),
        document.getElementById('step-node-4'),
      ];

      const arrows = [
        document.getElementById('connector-1'),
        document.getElementById('connector-2'),
        document.getElementById('connector-3'),
      ];

      // Stage 1: Evaluate
      simIndicator.className = 'status-indicator';
      simStatusText.textContent = 'SYSTEM STATUS: EVALUATING ACTIVE TRAFFIC';
      nodes[0].classList.add('active-node');
      writeLog('STAGE 01 [EVALUATE]: Dual judges (Phi-3 & Claude) scoring batch against Pydantic schema.', 'info');

      setTimeout(() => {
        arrows[0].querySelector('.arrow-pulse').classList.add('running');
        writeLog('STAGE 01: Pydantic validation 100%. Inter-rater agreement: 94.1%.', 'success');
      }, 700);

      // Stage 2: Drift
      setTimeout(() => {
        nodes[0].classList.remove('active-node');
        nodes[1].classList.add('active-node');
        simIndicator.className = 'status-indicator active-drift';
        simStatusText.textContent = 'SYSTEM STATUS: EMBEDDING DRIFT DETECTED (< 0.85)';
        writeLog('STAGE 02 [DETECT DRIFT]: Evidently AI statistical test flagged concept shift (score = 0.812).', 'alert');
        writeLog('STAGE 02: Alert threshold triggered -> Dispatched automated LoRA retraining payload.', 'warn');
      }, 1600);

      // Stage 3: Fine-Tune
      setTimeout(() => {
        arrows[1].querySelector('.arrow-pulse').classList.add('running');
        nodes[1].classList.remove('active-node');
        nodes[2].classList.add('active-node');
        simIndicator.className = 'status-indicator active-tune';
        simStatusText.textContent = 'SYSTEM STATUS: AUTOMATED PEFT / LORA JOB RUNNING';
        writeLog('STAGE 03 [FINE-TUNE]: Initializing PEFT container (r=16, alpha=32) on curated failure cases.', 'info');
        writeLog('STAGE 03: 3 epochs completed -> Calibrated adapter pushed to HuggingFace Hub.', 'success');
      }, 3000);

      // Stage 4: Redeploy
      setTimeout(() => {
        arrows[2].querySelector('.arrow-pulse').classList.add('running');
        nodes[2].classList.remove('active-node');
        nodes[3].classList.add('active-node');
        simIndicator.className = 'status-indicator';
        simStatusText.textContent = 'SYSTEM STATUS: vLLM SERVING HOT-SWAP';
        writeLog('STAGE 04 [REDEPLOY]: vLLM hot-swapped LoRA adapter weights in real-time.', 'success');
        writeLog('STAGE 04: Zero dropped requests. P50 latency verified at 42ms. Agreement restored to 95.8%.', 'success');
      }, 4500);

      // Completed
      setTimeout(() => {
        nodes[3].classList.remove('active-node');
        arrows.forEach((a) => a.querySelector('.arrow-pulse').classList.remove('running'));
        simStatusText.textContent = 'SYSTEM STATUS: OBSERVATION ACTIVE (SELF-HEALED)';
        writeLog('CYCLE COMPLETE: Closed loop self-healed successfully with 0 human steps.', 'success');
        isRunning = false;
        simBtn.disabled = false;
        simBtn.style.opacity = '1';
      }, 6000);
    });
  }

  /* =====================================================================
     9. INTERACTIVE SYSTEM SPECIFICATION (CLASS PRANAV)
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
        { text: '>>> system_spec = pranav.build_system()', cls: 'out-dim' },
        { text: '>>> [INFO] Initializing system telemetry...', cls: 'out-ice' },
        { text: '✓ Role: "Machine Learning Engineer, LLMOps, MLOps, GenAI"', cls: 'out-green' },
        { text: '✓ Philosophy: "Correct, not just fluent"', cls: 'out-green' },
        { text: '✓ Vector Index Capacity: 1,037,086 vectors in 1 Qdrant container', cls: 'out-ice' },
        { text: '✓ AI Judge Inter-rater Agreement: 94.0%', cls: 'out-ice' },
        { text: '✓ P50 Latency: 42ms (ONNX INT8 quantized)', cls: 'out-ice' },
        { text: '✓ Uptime SLA: 99.99%', cls: 'out-green' },
        { text: '>>> System Status: READY_FOR_DEPLOYMENT', cls: 'out-green' },
      ];

      lines.forEach((line, index) => {
        setTimeout(() => {
          const p = document.createElement('p');
          p.className = `out-row ${line.cls}`;
          p.textContent = line.text;
          consoleOutput.appendChild(p);
        }, index * 110);
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
     10. PROJECT CATEGORY FILTER
     ===================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-hero-card, .project-sub-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

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
              scale: 0.96,
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
