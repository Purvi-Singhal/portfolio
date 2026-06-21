/* ══════════════════════════════════════════════
       WELCOME PARTICLES
    ══════════════════════════════════════════════ */
    (function () {
      const cv = document.getElementById('wlcCanvas');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      function resize() { cv.width = window.innerWidth; cv.height = window.innerHeight; }
      resize(); window.addEventListener('resize', resize);
      const pts = [];
      for (let i = 0; i < 80; i++) pts.push({
        x: Math.random() * cv.width, y: Math.random() * cv.height,
        vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
        r: Math.random() * 1.5 + .4
      });
      let raf;
      function draw() {
        ctx.clearRect(0, 0, cv.width, cv.height);
        pts.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = cv.width; if (p.x > cv.width) p.x = 0;
          if (p.y < 0) p.y = cv.height; if (p.y > cv.height) p.y = 0;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(167,139,250,.5)'; ctx.fill();
          for (let j = i + 1; j < pts.length; j++) {
            const dx = p.x - pts[j].x, dy = p.y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
            if (d < 120) {
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = 'rgba(167,139,250,' + (0.12 * (1 - d / 120)) + ')'; ctx.lineWidth = .5; ctx.stroke();
            }
          }
        });
        raf = requestAnimationFrame(draw);
      }
      draw();
      window._stopWlcParticles = function () { cancelAnimationFrame(raf); };
    })();

    /* ══════════════════════════════════════════════
       GET STARTED — clean, professional reveal
       (welcome slides away, grid-sweep "boom" fades
        straight into the homepage — no extra effects)
    ══════════════════════════════════════════════ */
    document.getElementById('btnGetStarted').addEventListener('click', function () {
      // Hard lock: page content must NEVER show through
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.height = '100vh';

      launchPortal();

      // Slide welcome UP off screen so it never goes transparent
      var wlc = document.getElementById('welcome');
      setTimeout(function () {
        wlc.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1), opacity .3s ease .2s';
        wlc.style.transform = 'translateY(-100%)';
        wlc.style.opacity = '0';
        setTimeout(function () {
          wlc.style.display = 'none';
          if (window._stopWlcParticles) window._stopWlcParticles();
        }, 540);
      }, 60);
    });

    /* ══════════════════════════════════════════════
       PORTAL TRANSITION — Grid lines sweep that perfectly
       matches the homepage background aesthetic
    ══════════════════════════════════════════════ */
    function launchPortal() {
      var boom = document.getElementById('boom');
      boom.style.display = 'block';
      boom.style.opacity = '1';
      boom.innerHTML = '';

      // ── Layer 1: Dark base matching homepage ──
      var base = document.createElement('div');
      base.style.cssText = 'position:absolute;inset:0;background:var(--bg);';
      boom.appendChild(base);

      // ── Layer 2: Grid lines — identical to hero-grid (58px × 58px) ──
      var gridEl = document.createElement('div');
      gridEl.style.cssText = [
        'position:absolute;inset:0;',
        'background-image:',
        '  linear-gradient(rgba(167,139,250,.055) 1px,transparent 1px),',
        '  linear-gradient(90deg,rgba(167,139,250,.055) 1px,transparent 1px);',
        'background-size:58px 58px;',
        'opacity:0;transition:opacity .5s ease .1s;',
        'animation:gridPan 3s linear infinite;'
      ].join('');
      boom.appendChild(gridEl);

      // ── Layer 3: Purple radial glow (matches hero-bg) ──
      var glowA = document.createElement('div');
      glowA.style.cssText = [
        'position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;',
        'width:900px;height:900px;',
        'top:50%;left:50%;transform:translate(-50%,-50%) scale(0);',
        'background:radial-gradient(ellipse,rgba(167,139,250,.18),transparent 65%);',
        'transition:transform .9s cubic-bezier(.25,.46,.45,.94);'
      ].join('');
      boom.appendChild(glowA);

      // ── Layer 4: Cyan secondary glow (matches hero-bg) ──
      var glowB = document.createElement('div');
      glowB.style.cssText = [
        'position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;',
        'width:500px;height:500px;',
        'top:65%;left:15%;transform:translate(-50%,-50%) scale(0);',
        'background:radial-gradient(ellipse,rgba(56,189,248,.1),transparent 65%);',
        'transition:transform .85s cubic-bezier(.25,.46,.45,.94) .15s;'
      ].join('');
      boom.appendChild(glowB);

      // ── Layer 5: Thin horizontal scan line sweeping down (tech feel) ──
      var scan = document.createElement('div');
      scan.style.cssText = [
        'position:absolute;left:0;right:0;height:1px;',
        'background:linear-gradient(90deg,transparent,rgba(167,139,250,.6),rgba(240,171,252,.4),rgba(56,189,248,.6),transparent);',
        'box-shadow:0 0 12px rgba(167,139,250,.4);',
        'top:-2px;',
        'transition:top 0.7s cubic-bezier(.4,0,.2,1) .1s;'
      ].join('');
      boom.appendChild(scan);

      // ── Layer 6: Vertical scan line sweeping right ──
      var scanV = document.createElement('div');
      scanV.style.cssText = [
        'position:absolute;top:0;bottom:0;width:1px;',
        'background:linear-gradient(180deg,transparent,rgba(167,139,250,.5),rgba(240,171,252,.3),rgba(56,189,248,.5),transparent);',
        'box-shadow:0 0 10px rgba(167,139,250,.3);',
        'left:-2px;',
        'transition:left 0.75s cubic-bezier(.4,0,.2,1) .05s;'
      ].join('');
      boom.appendChild(scanV);

      // ── ANIMATE IN ──
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          gridEl.style.opacity = '1';
          glowA.style.transform = 'translate(-50%,-50%) scale(1)';
          glowB.style.transform = 'translate(-50%,-50%) scale(1)';
          // Scan lines sweep across screen
          scan.style.top = '100vh';
          scanV.style.left = '100vw';
        });
      });

      // ── REVEAL HOME PAGE — professional fade ──
      setTimeout(function () {
        boom.style.transition = 'opacity .55s ease';
        boom.style.opacity = '0';
        // Unlock body scroll
        document.body.style.overflow = '';
        document.body.style.height = '';
        document.documentElement.style.overflow = '';
        setTimeout(function () {
          boom.style.display = 'none';
          boom.style.opacity = '1';
          boom.style.transition = '';
          boom.innerHTML = '';
        }, 580);
      }, 900);
    }

    /* ══════════════════════════════════════════════
       CERTIFICATES — DIGITAL BOOK
    ══════════════════════════════════════════════ */
    /* Maps a skill/tag name to a relevant FA6-free icon + accent color for the chip */
    function skillIconMeta(skill) {
      var s = skill.toLowerCase();
      if (s.indexOf('python') > -1) return { icon: 'fa-brands fa-python', color: '#facc15' };
      if (s.indexOf('algorithm') > -1) return { icon: 'fa-solid fa-diagram-project', color: '#a78bfa' };
      if (s.indexOf('data structure') > -1) return { icon: 'fa-solid fa-sitemap', color: '#a78bfa' };
      if (s.indexOf('problem') > -1) return { icon: 'fa-solid fa-puzzle-piece', color: '#38bdf8' };
      if (s.indexOf('logic') > -1) return { icon: 'fa-solid fa-code-branch', color: '#38bdf8' };
      if (s.indexOf('fundamentals') > -1 || s.indexOf('programming') > -1) return { icon: 'fa-solid fa-code', color: '#a78bfa' };
      if (s.indexOf('cyber') > -1) return { icon: 'fa-solid fa-shield-halved', color: '#34d399' };
      if (s.indexOf('network') > -1) return { icon: 'fa-solid fa-network-wired', color: '#38bdf8' };
      if (s.indexOf('risk') > -1) return { icon: 'fa-solid fa-triangle-exclamation', color: '#f0abfc' };
      if (s.indexOf('digital literacy') > -1) return { icon: 'fa-solid fa-display', color: '#38bdf8' };
      if (s.indexOf('emerging') > -1) return { icon: 'fa-solid fa-bolt', color: '#facc15' };
      if (s.indexOf('industry') > -1) return { icon: 'fa-solid fa-building', color: '#a78bfa' };
      if (s.indexOf('data analysis') > -1) return { icon: 'fa-solid fa-chart-line', color: '#34d399' };
      if (s.indexOf('forensic') > -1) return { icon: 'fa-solid fa-magnifying-glass', color: '#f0abfc' };
      if (s.indexOf('business') > -1) return { icon: 'fa-solid fa-briefcase', color: '#38bdf8' };
      return { icon: 'fa-solid fa-tag', color: '#a78bfa' };
    }
    function renderSkillChip(skill) {
      var meta = skillIconMeta(skill);
      return '<span class="cb-skill"><i class="' + meta.icon + '" style="color:' + meta.color + '"></i>' + skill + '</span>';
    }

    var certData = [
      {
        title: 'Data Structures and Algorithms using Python',
        subtitle: 'Part 1 \u2014 Foundation Series',
        issuer: 'Infosys Springboard',
        issuerShort: 'Infosys',
        icon: '\ud83e\udde9',
        date: 'Issued March 22, 2026',
        desc: 'A foundational course covering core data structures and algorithmic problem-solving techniques implemented in Python, building the groundwork for efficient, scalable code.',
        learnings: [
          'Arrays, linked lists, stacks &amp; queues',
          'Recursion and algorithmic complexity',
          'Searching and sorting techniques',
          'Writing efficient, optimized Python code'
        ],
        skills: ['Python', 'Data Structures', 'Algorithms', 'Problem Solving'],
        credId: 'INFY-DSA-2026-0322',
        verifyUrl: 'https://verify.onwingspan.com',
        verifyText: 'verify.onwingspan.com',
        img: 'assets/dsa-certificate.png'
      },
      {
        title: 'Data Analytics Job Simulation',
        subtitle: 'Forage \u2014 Virtual Job Experience Program',
        issuer: 'Deloitte',
        issuerShort: 'Deloitte',
        icon: '\ud83d\udcca',
        date: 'Issued January 29, 2026',
        desc: 'A practical, real-world job simulation by Deloitte covering hands-on data analysis and forensic technology tasks, modeled on the actual work performed by Deloitte\u2019s analytics professionals.',
        learnings: [
          'Real-world data analysis workflows',
          'Forensic technology techniques',
          'Translating data into business insight',
          'Working with simulated client scenarios'
        ],
        skills: ['Data Analysis', 'Forensic Technology', 'Business Insight'],
        credId: '697b7adfd3ca09d0a4cf68c3',
        verifyUrl: 'https://www.theforage.com',
        verifyText: 'theforage.com',
        img: 'assets/python-certificate.png'
      },
      {
        title: 'Programming Fundamentals using Python',
        subtitle: 'Science Graduates \u2014 Foundation Program',
        issuer: 'Infosys Springboard',
        issuerShort: 'Infosys',
        icon: '\ud83d\udc0d',
        date: 'Issued February 8, 2026',
        desc: 'A science-graduate foundation program building core programming fundamentals in Python \u2014 syntax, logic building, and hands-on coding practice for real-world problem solving.',
        learnings: [
          'Python syntax and core programming concepts',
          'Conditional logic, loops &amp; functions',
          'Data types and basic I/O handling',
          'Foundational debugging and coding practices'
        ],
        skills: ['Python', 'Programming Fundamentals', 'Logic Building'],
        credId: 'INFY-PF-2026-0208',
        verifyUrl: 'https://verify.onwingspan.com',
        verifyText: 'verify.onwingspan.com',
        img: 'assets/python-certificate.png'
      },
      {
        title: 'Introduction to Cybersecurity',
        subtitle: 'Cisco Networking Academy Program',
        issuer: 'Cisco Networking Academy',
        issuerShort: 'Cisco',
        icon: '\ud83d\udee1\ufe0f',
        date: 'Completed 19 Feb 2026',
        desc: 'An introductory course on cybersecurity fundamentals offered through the Cisco Networking Academy program, covering core concepts in protecting systems, networks, and data.',
        learnings: [
          'Core cybersecurity concepts &amp; terminology',
          'Common threats, attacks &amp; vulnerabilities',
          'Best practices for data &amp; network protection',
          'Cybersecurity career pathways'
        ],
        skills: ['Cybersecurity', 'Network Security', 'Risk Awareness'],
        credId: 'NIET-CSC-2026-0219',
        verifyUrl: 'https://www.netacad.com',
        verifyText: 'netacad.com',
        img: 'assets/cybersecurity-certificate.png'
      },
      {
        title: 'Digital Edge 101',
        subtitle: 'FutureSkills Prime \u2014 NASSCOM',
        issuer: 'FutureSkills Prime \u2014 NASSCOM',
        issuerShort: 'NASSCOM',
        icon: '\ud83d\ude80',
        date: 'Issued 22 Mar 2026',
        desc: 'A course aligned to competency standards developed by the IT-ITeS Sector Skills Council (NASSCOM), in collaboration with industry and government, covering essential digital-era skills.',
        learnings: [
          'Digital workplace &amp; emerging technology awareness',
          'Industry-aligned competency standards',
          'Foundational digital skills for the modern workforce',
          'Govt. &amp; industry-recognized skilling framework'
        ],
        skills: ['Digital Literacy', 'Emerging Tech', 'Industry Readiness'],
        credId: 'NASSCOM-DE101-2026',
        verifyUrl: 'https://futureskillsprime.in',
        verifyText: 'futureskillsprime.in',
        img: 'assets/digital-edge-certificate.png'
      }
    ];

    (function () {
      var curIdx = 0;
      var TOTAL = certData.length;
      var busy = false;

      var cbClosed = document.getElementById('cbClosed');
      var cbOpen = document.getElementById('cbOpen');
      var cbClosedBook = document.getElementById('cbClosedBook');
      var cbOpenBtn = document.getElementById('cbOpenBtn');
      var cbCloseBtn = document.getElementById('cbCloseBtn');
      var cbPrevBtn = document.getElementById('cbPrevBtn');
      var cbNextBtn = document.getElementById('cbNextBtn');
      var cbPrevSide = document.getElementById('cbPrevBtnSide');
      var cbNextSide = document.getElementById('cbNextBtnSide');
      var cbSpread = document.getElementById('cbSpread');
      var cbFlipSheet = document.getElementById('cbFlipSheet');
      var cbViewBtn = document.getElementById('cbViewCertBtn');
      var cbPageDots = document.getElementById('cbPageDots');
      var cbAccordion = document.getElementById('cbAccordion');

      function renderSpread(idx) {
        var c = certData[idx];
        // eyebrow — now uses .cb-ey-text class
        var eyText = document.querySelector('#cbLeftEyebrow .cb-ey-text');
        if (eyText) eyText.textContent = 'Certificate ' + (idx + 1) + ' of ' + TOTAL;
        document.getElementById('cbLeftTitle').textContent = c.title;
        document.getElementById('cbLeftSubtitle').textContent = c.subtitle || '';
        document.getElementById('cbLeftLogo').textContent = c.icon;
        document.getElementById('cbLeftIssuer').textContent = c.issuer;
        document.getElementById('cbLeftDate').textContent = c.date;
        document.getElementById('cbLeftDesc').textContent = c.desc;

        var learnEl = document.getElementById('cbLeftLearnings');
        learnEl.innerHTML = c.learnings.map(function (l) {
          return '<li><span class="cb-learn-icon"><i class="fa-solid fa-check"></i></span>' + l + '</li>';
        }).join('');

        var skillsEl = document.getElementById('cbRightSkills');
        skillsEl.innerHTML = c.skills.map(renderSkillChip).join('');

        updateDots(idx);
        updateNavButtons(idx);
      }

      function updateDots(idx) {
        // External dots below book
        if (cbPageDots) {
          cbPageDots.innerHTML = '';
          for (var i = 0; i < TOTAL; i++) {
            (function (i) {
              var d = document.createElement('div');
              d.className = 'cb-page-dot' + (i === idx ? ' active' : '');
              d.addEventListener('click', function () { goTo(i); });
              cbPageDots.appendChild(d);
            })(i);
          }
        }
        // Internal dots inside right page of book
        var bookDots = document.getElementById('cbBookDots');
        if (bookDots) {
          bookDots.innerHTML = '';
          for (var j = 0; j < TOTAL; j++) {
            (function (j) {
              var d = document.createElement('div');
              d.className = 'cb-book-dot' + (j === idx ? ' active' : '');
              d.addEventListener('click', function () { goTo(j); });
              bookDots.appendChild(d);
            })(j);
          }
        }
      }

      function updateNavButtons(idx) {
        var atFirst = (idx === 0);
        var atLast = (idx === TOTAL - 1);
        if (cbPrevBtn) cbPrevBtn.disabled = atFirst;
        if (cbNextBtn) cbNextBtn.disabled = atLast;
        if (cbPrevSide) cbPrevSide.disabled = atFirst;
        if (cbNextSide) cbNextSide.disabled = atLast;
      }

      function flip(direction, newIdx) {
        if (busy) return;
        busy = true;
        cbSpread.classList.add('flipping');
        cbFlipSheet.className = 'cb-flip-sheet active' + (direction === 'prev' ? ' dir-prev' : '');

        setTimeout(function () {
          renderSpread(newIdx);
          curIdx = newIdx;
        }, 300);

        setTimeout(function () {
          cbFlipSheet.className = 'cb-flip-sheet';
          cbSpread.classList.remove('flipping');
          busy = false;
        }, 640);
      }

      function goTo(idx) {
        if (idx === curIdx || idx < 0 || idx >= TOTAL || busy) return;
        flip(idx > curIdx ? 'next' : 'prev', idx);
      }

      function openBook() {
        cbClosed.style.transition = 'opacity .35s ease, transform .35s ease';
        cbClosed.style.opacity = '0';
        cbClosed.style.transform = 'scale(.96)';
        setTimeout(function () {
          cbClosed.style.display = 'none';
          cbOpen.classList.add('is-active');
          curIdx = 0;
          renderSpread(0);
          buildAccordion();
          requestAnimationFrame(function () {
            cbOpen.style.opacity = '0';
            cbOpen.style.transform = 'translateY(16px) scale(.97)';
            cbOpen.style.transition = 'opacity .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1)';
            requestAnimationFrame(function () {
              cbOpen.style.opacity = '1';
              cbOpen.style.transform = 'translateY(0) scale(1)';
            });
          });
        }, 360);
      }

      function closeBook() {
        cbOpen.style.transition = 'opacity .3s ease, transform .3s ease';
        cbOpen.style.opacity = '0';
        cbOpen.style.transform = 'translateY(10px) scale(.97)';
        setTimeout(function () {
          cbOpen.classList.remove('is-active');
          cbOpen.style.transition = '';
          cbOpen.style.opacity = '';
          cbOpen.style.transform = '';
          cbClosed.style.display = 'flex';
          requestAnimationFrame(function () {
            cbClosed.style.opacity = '1';
            cbClosed.style.transform = 'scale(1)';
          });
        }, 320);
      }

      function buildAccordion() {
        if (!cbAccordion) return;
        cbAccordion.innerHTML = '';
        certData.forEach(function (c, i) {
          var item = document.createElement('div');
          item.className = 'cb-acc-item';
          item.innerHTML =
            '<div class="cb-acc-head">'
            + '<div class="cb-acc-icon">' + c.icon + '</div>'
            + '<div class="cb-acc-head-text">'
            + '<div class="cb-acc-name">' + c.title + '</div>'
            + '<div class="cb-acc-issuer">' + c.issuer + '</div>'
            + '</div>'
            + '<i class="fa-solid fa-chevron-down cb-acc-chevron"></i>'
            + '</div>'
            + '<div class="cb-acc-body">'
            + '<div class="cb-acc-body-inner">'
            + '<div class="cb-acc-date">' + c.date + '</div>'
            + '<div class="cb-acc-desc">' + c.desc + '</div>'
            + '<ul class="cb-acc-learnings">' + c.learnings.map(function (l) { return '<li><span class="cb-learn-icon"><i class="fa-solid fa-check"></i></span>' + l + '</li>'; }).join('') + '</ul>'
            + '<div class="cb-acc-skills">' + c.skills.map(renderSkillChip).join('') + '</div>'
            + '<div class="cb-acc-meta">Credential ID: <strong>' + c.credId + '</strong></div>'
            + '<div class="cb-acc-footer">'
            + '<a href="' + c.verifyUrl + '" target="_blank" class="cb-verify-link"><i class="fa-solid fa-shield-halved"></i> Verify credential</a>'
            + '<button class="cb-view-btn" data-idx="' + i + '"><span class="cb-view-eye"><i class="fa-regular fa-eye"></i></span><span class="cb-view-title">View Certificate</span><span class="cb-view-arrow"><i class="fa-solid fa-arrow-right"></i></span></button>'
            + '</div>'
            + '</div>'
            + '</div>';

          var head = item.querySelector('.cb-acc-head');
          head.addEventListener('click', function () {
            var wasOpen = item.classList.contains('open');
            cbAccordion.querySelectorAll('.cb-acc-item').forEach(function (it) { it.classList.remove('open'); });
            if (!wasOpen) item.classList.add('open');
          });

          var viewBtn = item.querySelector('.cb-view-btn');
          viewBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            openCertModal(parseInt(viewBtn.getAttribute('data-idx'), 10));
          });

          cbAccordion.appendChild(item);
        });
      }

      if (cbClosedBook) {
        cbClosedBook.addEventListener('click', openBook);
        cbClosedBook.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBook(); }
        });
      }
      if (cbOpenBtn) cbOpenBtn.addEventListener('click', openBook);
      if (cbCloseBtn) cbCloseBtn.addEventListener('click', closeBook);
      if (cbPrevBtn) cbPrevBtn.addEventListener('click', function () { goTo(curIdx - 1); });
      if (cbNextBtn) cbNextBtn.addEventListener('click', function () { goTo(curIdx + 1); });
      if (cbPrevSide) cbPrevSide.addEventListener('click', function () { goTo(curIdx - 1); });
      if (cbNextSide) cbNextSide.addEventListener('click', function () { goTo(curIdx + 1); });
      if (cbViewBtn) cbViewBtn.addEventListener('click', function () { openCertModal(curIdx); });

      // Click page corners to navigate (book pages)
      if (cbSpread) {
        cbSpread.addEventListener('click', function (e) {
          var rect = cbSpread.getBoundingClientRect();
          var x = e.clientX - rect.left;
          var w = rect.width;
          if (e.target.closest('button, a, .cb-info-copy')) return;
          if (x > w * 0.85) goTo(curIdx + 1);
          else if (x < w * 0.15) goTo(curIdx - 1);
        });
      }

      // Keyboard navigation while book is open
      document.addEventListener('keydown', function (e) {
        if (!cbOpen.classList.contains('is-active')) return;
        if (e.key === 'ArrowRight') goTo(curIdx + 1);
        if (e.key === 'ArrowLeft') goTo(curIdx - 1);
      });
    })();


    /* ══════════════════════════════════════════════
       CERTIFICATE FULLSCREEN MODAL
    ══════════════════════════════════════════════ */
    function openCertModal(idx) {
      var c = certData[idx];
      if (!c) return;
      var modal = document.getElementById('certModal');
      document.getElementById('certModalImg').src = c.img;
      document.getElementById('certModalImg').alt = c.title + ' certificate';
      document.getElementById('certModalCapTitle').textContent = c.title;
      document.getElementById('certModalCapIssuer').textContent = c.issuer;
      modal.style.display = 'flex';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { modal.classList.add('open'); });
      });
      document.body.style.overflow = 'hidden';
    }

    function closeCertModal() {
      var modal = document.getElementById('certModal');
      if (!modal) return;
      modal.classList.remove('open');
      setTimeout(function () {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }, 350);
    }

    (function () {
      var modal = document.getElementById('certModal');
      var closeBtn = document.getElementById('certModalClose');
      if (closeBtn) closeBtn.addEventListener('click', closeCertModal);
      if (modal) {
        modal.addEventListener('click', function (e) {
          if (e.target === modal) closeCertModal();
        });
      }
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeCertModal();
      });
    })();


    /* ══════════════════════════════════════════════
       SCROLL PROGRESS + ACTIVE NAV
    ══════════════════════════════════════════════ */
    window.addEventListener('scroll', function () {
      var pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      document.getElementById('scroll-bar').style.width = pct + '%';
      document.getElementById('navbar').style.padding = window.scrollY > 50 ? '.75rem 5%' : '1.2rem 5%';
      var sections = ['home', 'skills', 'projects', 'experience', 'certificates', 'contact'];
      var cur = 'home';
      sections.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 120) cur = id;
      });
      document.querySelectorAll('.nav-links a').forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
      });
    });

    /* ══════════════════════════════════════════════
       TYPED TEXT
    ══════════════════════════════════════════════ */
    var roles = ['Full Stack Dev \uD83D\uDCBB', 'MERN Developer \uD83D\uDEE0\uFE0F', 'ML Explorer \uD83E\uDD16', 'UI Craftsperson \uD83C\uDFA8', 'Problem Solver \u26A1'];
    var ri = 0, ci = 0, del = false;
    var typedEl = document.getElementById('typed');
    function typeLoop() {
      var word = roles[ri];
      if (!del) { typedEl.textContent = word.slice(0, ++ci); if (ci === word.length) { del = true; setTimeout(typeLoop, 1800); return; } }
      else { typedEl.textContent = word.slice(0, --ci); if (ci === 0) { del = false; ri = (ri + 1) % roles.length; } }
      setTimeout(typeLoop, del ? 45 : 85);
    }
    setTimeout(typeLoop, 2200);

    /* ══════════════════════════════════════════════
       3D IMAGE TILT
    ══════════════════════════════════════════════ */
    var scene3d = document.getElementById('scene3d');
    var card3d = document.getElementById('card3d');
    if (scene3d) {
      scene3d.addEventListener('mousemove', function (e) {
        var r = scene3d.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card3d.style.transform = 'rotateY(' + (x * 22) + 'deg) rotateX(' + (-y * 22) + 'deg) translateZ(22px)';
      });
      scene3d.addEventListener('mouseleave', function () {
        card3d.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
      });
    }

    /* ══════════════════════════════════════════════
       HAMBURGER MENU
    ══════════════════════════════════════════════ */
    function closeMob() { document.getElementById('mobMenu').classList.remove('open'); }
    document.getElementById('ham').addEventListener('click', function () {
      document.getElementById('mobMenu').classList.toggle('open');
    });

    /* ══════════════════════════════════════════════
       SCROLL REVEAL (IntersectionObserver)
    ══════════════════════════════════════════════ */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          if (e.target.classList.contains('sk-card')) {
            var i = Array.prototype.indexOf.call(document.querySelectorAll('.sk-card'), e.target);
            e.target.style.animationDelay = (i * 0.06) + 's';
          }
        }
      });
    }, { threshold: .15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.rev,.rev-l,.rev-r,.sk-card,.proj-card,.tl-item,.exp-card').forEach(function (el) {
      io.observe(el);
    });

    /* ══════════════════════════════════════════════
       BACKGROUND PARTICLES
    ══════════════════════════════════════════════ */
    var pc = document.getElementById('particles');
    for (var pi = 0; pi < 28; pi++) {
      var p2 = document.createElement('div');
      p2.className = 'ptcl';
      var pSz = Math.random() * 4 + 1;
      var pColors = ['rgba(167,139,250,.55)', 'rgba(240,171,252,.45)', 'rgba(56,189,248,.38)'];
      var pOp = Math.random() * .35 + .1;
      var pDrift = ((Math.random() - .5) * 180).toFixed(1);
      var pDur = (Math.random() * 14 + 10).toFixed(1);
      var pDel = (Math.random() * 12).toFixed(1);
      p2.style.cssText = 'width:' + pSz + 'px;height:' + pSz + 'px;background:' + pColors[Math.floor(Math.random() * 3)]
        + ';left:' + (Math.random() * 100) + 'vw;--drift:' + pDrift + 'px;--op:' + pOp
        + ';animation-duration:' + pDur + 's;animation-delay:' + pDel + 's;';
      pc.appendChild(p2);
    }

    /* ══════════════════════════════════════════════
       CV DOWNLOAD
    ══════════════════════════════════════════════ */
    document.querySelectorAll('.cv-btn').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); alert('\uD83D\uDCC4 CV download coming soon!'); });
    });

    /* ══════════════════════════════════════════════
       3D / MOTION CAPABILITY FLAGS
    ══════════════════════════════════════════════ */
    var REDUCE_MOTION = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var IS_MOBILE_3D = window.innerWidth < 760;
    var IS_FINE_POINTER = !!(window.matchMedia && window.matchMedia('(pointer: fine)').matches);

    /* ══════════════════════════════════════════════
       AMBIENT 3D WEBGL BACKGROUND (full page)
       Continuous starfield + floating wireframe shapes
       that drift with scroll and parallax with the cursor.
    ══════════════════════════════════════════════ */
    function initBgScene3D() {
      if (REDUCE_MOTION || typeof THREE === 'undefined') return;
      var canvas = document.getElementById('bgCanvas3D');
      if (!canvas) return;

      try {
        var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        var scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x060611, 0.05);

        var camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 16);

        var mainGroup = new THREE.Group();
        scene.add(mainGroup);

        /* — starfield — */
        var starCount = IS_MOBILE_3D ? 600 : 1600;
        var starGeo = new THREE.BufferGeometry();
        var starPos = new Float32Array(starCount * 3);
        for (var i = 0; i < starCount; i++) {
          starPos[i * 3] = (Math.random() - 0.5) * 60;
          starPos[i * 3 + 1] = (Math.random() - 0.5) * 42;
          starPos[i * 3 + 2] = (Math.random() - 0.5) * 46 - 8;
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        var starMat = new THREE.PointsMaterial({ color: 0xcdd6ff, size: 0.09, transparent: true, opacity: 0.55, sizeAttenuation: true });
        var stars = new THREE.Points(starGeo, starMat);
        mainGroup.add(stars);

        /* — floating low-poly wireframe shapes — */
        var palette = [0xa78bfa, 0xf0abfc, 0x38bdf8, 0xfbbf24];
        var shapeCount = IS_MOBILE_3D ? 4 : 7;
        var geoMakers = [
          function (s) { return new THREE.IcosahedronGeometry(s, 0); },
          function (s) { return new THREE.TorusGeometry(s * 0.7, s * 0.22, 8, 24); },
          function (s) { return new THREE.OctahedronGeometry(s, 0); }
        ];
        var shapes = [];
        for (var j = 0; j < shapeCount; j++) {
          var size = 0.9 + Math.random() * 1.6;
          var geo = geoMakers[j % geoMakers.length](size);
          var mat = new THREE.MeshBasicMaterial({ color: palette[j % palette.length], wireframe: true, transparent: true, opacity: 0.36 });
          var mesh = new THREE.Mesh(geo, mat);
          mesh.position.set((Math.random() - 0.5) * 26, (Math.random() - 0.5) * 22 - 2, (Math.random() - 0.5) * 18 - 6);
          mesh.userData.rotX = (Math.random() - 0.5) * 0.006;
          mesh.userData.rotY = (Math.random() - 0.5) * 0.008;
          mesh.userData.bobSp = 0.4 + Math.random() * 0.5;
          mesh.userData.bobAm = 0.5 + Math.random() * 0.8;
          mesh.userData.baseY = mesh.position.y;
          mesh.userData.phase = Math.random() * Math.PI * 2;
          mainGroup.add(mesh);
          shapes.push(mesh);
        }

        /* — cursor parallax — */
        var mouseX = 0, mouseY = 0, curRotX = 0, curRotY = 0;
        window.addEventListener('mousemove', function (e) {
          mouseX = (e.clientX / window.innerWidth) * 2 - 1;
          mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        }, { passive: true });

        /* — scroll-tied depth travel — */
        var scrollFrac = 0;
        function updateScrollFrac() {
          var max = document.body.scrollHeight - window.innerHeight;
          scrollFrac = max > 0 ? window.scrollY / max : 0;
        }
        window.addEventListener('scroll', updateScrollFrac, { passive: true });
        updateScrollFrac();

        var clock = new THREE.Clock();
        var rafId = null;
        function animate() {
          rafId = requestAnimationFrame(animate);
          var t = clock.getElapsedTime();
          shapes.forEach(function (m) {
            m.rotation.x += m.userData.rotX;
            m.rotation.y += m.userData.rotY;
            m.position.y = m.userData.baseY + Math.sin(t * m.userData.bobSp + m.userData.phase) * m.userData.bobAm;
          });
          curRotY += (mouseX * 0.18 - curRotY) * 0.03;
          curRotX += (mouseY * 0.12 - curRotX) * 0.03;
          mainGroup.rotation.y = curRotY + scrollFrac * 1.1;
          mainGroup.rotation.x = -curRotX;
          mainGroup.position.y = scrollFrac * 4.5;
          stars.rotation.y += 0.0006;
          camera.position.z = 16 - scrollFrac * 3;
          renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', function () {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });

        document.addEventListener('visibilitychange', function () {
          if (document.hidden) { if (rafId) cancelAnimationFrame(rafId); rafId = null; }
          else if (!rafId) { animate(); }
        });
      } catch (err) { /* WebGL unavailable — page still works without the 3D layer */ }
    }

    /* ══════════════════════════════════════════════
       HERO 3D ORB — orbiting centerpiece behind the photo
    ══════════════════════════════════════════════ */
    function initHeroOrb() {
      if (REDUCE_MOTION || typeof THREE === 'undefined') return;
      var canvas = document.getElementById('heroOrbCanvas');
      var wrap = document.getElementById('scene3d');
      if (!canvas || !wrap) return;

      try {
        var w = wrap.clientWidth || 320, h = wrap.clientHeight || 400;
        var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(w, h);

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 50);
        camera.position.set(0, 0, 7);

        var core = new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.55, 1),
          new THREE.MeshBasicMaterial({ color: 0xa78bfa, wireframe: true, transparent: true, opacity: 0.5 })
        );
        scene.add(core);

        var glow = new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.18, 1),
          new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.07 })
        );
        scene.add(glow);

        var ring = new THREE.Mesh(
          new THREE.TorusGeometry(2.5, 0.012, 8, 80),
          new THREE.MeshBasicMaterial({ color: 0xf0abfc, transparent: true, opacity: 0.45 })
        );
        ring.rotation.x = Math.PI / 2.4;
        scene.add(ring);

        var orbColors = [0xa78bfa, 0xf0abfc, 0x38bdf8];
        var orbiters = [];
        for (var i = 0; i < 3; i++) {
          var sp = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), new THREE.MeshBasicMaterial({ color: orbColors[i] }));
          sp.userData.r = 2.5;
          sp.userData.speed = 0.5 + i * 0.18;
          sp.userData.phase = (i / 3) * Math.PI * 2;
          scene.add(sp);
          orbiters.push(sp);
        }
        var tilt = ring.rotation.x;

        var mx = 0, my = 0;
        wrap.addEventListener('mousemove', function (e) {
          var r = wrap.getBoundingClientRect();
          mx = (e.clientX - r.left) / r.width - 0.5;
          my = (e.clientY - r.top) / r.height - 0.5;
        });
        wrap.addEventListener('mouseleave', function () { mx = 0; my = 0; });

        var clock = new THREE.Clock();
        var rafId = null;
        function animate() {
          rafId = requestAnimationFrame(animate);
          var t = clock.getElapsedTime();
          core.rotation.x += 0.0035;
          core.rotation.y += 0.005;
          glow.rotation.y -= 0.003;
          ring.rotation.z += 0.004;
          orbiters.forEach(function (o) {
            var a = t * o.userData.speed + o.userData.phase;
            var yy = Math.sin(a) * o.userData.r;
            o.position.x = Math.cos(a) * o.userData.r;
            o.position.y = yy * Math.cos(tilt);
            o.position.z = yy * Math.sin(tilt);
          });
          scene.rotation.y += (mx * 0.6 - scene.rotation.y) * 0.04;
          scene.rotation.x += (-my * 0.5 - scene.rotation.x) * 0.04;
          renderer.render(scene, camera);
        }
        animate();

        document.addEventListener('visibilitychange', function () {
          if (document.hidden) { if (rafId) cancelAnimationFrame(rafId); rafId = null; }
          else if (!rafId) { animate(); }
        });

        window.addEventListener('resize', function () {
          var nw = wrap.clientWidth || w, nh = wrap.clientHeight || h;
          camera.aspect = nw / nh; camera.updateProjectionMatrix();
          renderer.setSize(nw, nh);
        });
      } catch (err) { /* WebGL unavailable — hero still shows the photo card fine */ }
    }

    /* ══════════════════════════════════════════════
       3D TILT + GLARE FOR CARDS (mouse-follow, desktop only)
    ══════════════════════════════════════════════ */
    function attachTiltEffect() {
      if (REDUCE_MOTION || !IS_FINE_POINTER) return;
      var extras = { 'sk-card': 'translateY(-8px) scale(1.03)', 'proj-card': 'translateY(-10px)', 'c-soc-card': 'translateX(5px)', 'tl-body': 'translateY(-3px)' };
      document.querySelectorAll('.sk-card, .proj-card, .exp-card, .tl-body, .c-soc-card').forEach(function (el) {
        var glare = document.createElement('div');
        glare.className = 'tilt-glare';
        el.appendChild(glare);
        var extra = '';
        for (var key in extras) { if (el.classList.contains(key)) { extra = extras[key]; break; } }

        el.addEventListener('mouseenter', function () {
          el.style.transition = 'transform .12s ease-out';
        });
        el.addEventListener('mousemove', function (e) {
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width;
          var py = (e.clientY - r.top) / r.height;
          var rx = (0.5 - py) * 8;
          var ry = (px - 0.5) * 8;
          el.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) ' + extra;
          glare.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          glare.style.setProperty('--my', (py * 100).toFixed(1) + '%');
          glare.style.opacity = '1';
        });
        el.addEventListener('mouseleave', function () {
          el.style.transition = '';
          el.style.transform = '';
          glare.style.opacity = '0';
        });
      });
    }

    /* ══════════════════════════════════════════════
       CONTACT FORM — AJAX SUBMIT (Formspree)
    ══════════════════════════════════════════════ */
    (function () {
      var form = document.getElementById('contactForm');
      if (!form) return;
      var btn = document.getElementById('contactSubmitBtn');
      var note = document.getElementById('contactFormNote');
      var btnDefaultHTML = btn.innerHTML;
      var noteDefaultText = note.textContent;

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        note.style.color = '';
        note.textContent = noteDefaultText;

        fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        }).then(function (response) {
          if (response.ok) {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent';
            note.textContent = "Thanks! I'll get back to you within 24–48 hours.";
            note.style.color = '#10b981';
            form.reset();
            setTimeout(function () {
              btn.disabled = false;
              btn.innerHTML = btnDefaultHTML;
              note.style.color = '';
              note.textContent = noteDefaultText;
            }, 4000);
          } else {
            return response.json().then(function (data) {
              throw new Error((data && data.errors && data.errors.map(function (er) { return er.message; }).join(', ')) || 'Submission failed');
            });
          }
        }).catch(function () {
          btn.disabled = false;
          btn.innerHTML = btnDefaultHTML;
          note.textContent = 'Something went wrong — please email me directly instead.';
          note.style.color = '#f87171';
        });
      });
    })();

    /* ══════════════════════════════════════════════
       INIT 3D + ANIMATION LAYER
    ══════════════════════════════════════════════ */
    initBgScene3D();
    initHeroOrb();
    attachTiltEffect();
