// Embriture — shared site script
(function(){
  'use strict';

  // ══════════════════ CUSTOM CURSOR ══════════════════
  const cur = document.getElementById('cur');
  const ring = document.getElementById('ring');
  let rx = 0, ry = 0;
  if (cur && ring && !window.matchMedia('(pointer:coarse)').matches) {
    document.addEventListener('mousemove', e => {
      cur.style.left = e.clientX + 'px';
      cur.style.top  = e.clientY + 'px';
    });
    (function animRing(){
      rx += (parseFloat(cur.style.left || 0) - rx) * 0.13;
      ry += (parseFloat(cur.style.top  || 0) - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();
    const hoverTargets = 'a,button,.why-card,.dest-card,.svc-card,.fw-card,.testi-card,.qbtn,.ins-card,.team-card,.app-card,.faq-item,.out-card,.uni-row';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => {
        cur.style.width='15px'; cur.style.height='15px';
        ring.style.width='46px'; ring.style.height='46px';
        cur.style.background='var(--sky)';
      });
      el.addEventListener('mouseleave', () => {
        cur.style.width='9px'; cur.style.height='9px';
        ring.style.width='34px'; ring.style.height='34px';
        cur.style.background='var(--blue)';
      });
    });
  }

  // ══════════════════ NAV STYLING + FLOAT BTN ══════════════════
  const nav = document.getElementById('main-nav');
  const floatBtn = document.getElementById('float-chat');
  const heroEl = document.getElementById('mainChat');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) {
      if (y > 40) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    }
    if (floatBtn) {
      if (heroEl) {
        const b = heroEl.getBoundingClientRect().bottom;
        if (b < 0) floatBtn.classList.add('show'); else floatBtn.classList.remove('show');
      } else {
        if (y > 200) floatBtn.classList.add('show'); else floatBtn.classList.remove('show');
      }
    }
  });

  // ══════════════════ MOBILE DRAWER ══════════════════
  const burger = document.getElementById('nav-burger');
  const drawer = document.getElementById('nav-drawer');
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      drawer.classList.toggle('open');
      burger.classList.toggle('open');
      document.body.classList.toggle('drawer-open');
    });
    // Close drawer when a real navigation link is clicked (not accordion toggles)
    drawer.querySelectorAll('.d-link, .d-sub-link').forEach(a => {
      a.addEventListener('click', () => {
        drawer.classList.remove('open');
        burger.classList.remove('open');
        document.body.classList.remove('drawer-open');
      });
    });
  }

  // ══════════════════ DESKTOP DROPDOWN ACCESS ══════════════════
  const navDropdowns = document.querySelectorAll('.n-links .has-drop');
  navDropdowns.forEach((item) => {
    const trigger = item.querySelector(':scope > a');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      const willOpen = !item.classList.contains('open');
      if (willOpen) e.preventDefault();
      navDropdowns.forEach((n) => n.classList.remove('open'));
      if (willOpen) item.classList.add('open');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.n-links .has-drop')) {
      navDropdowns.forEach((n) => n.classList.remove('open'));
    }
  });

  // ══════════════════ REVEAL ON SCROLL ══════════════════
  const obs = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // ══════════════════ WHO-WE-SERVE TABS ══════════════════
  document.querySelectorAll('.who-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.who-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.who;
      document.querySelectorAll('.who-panel').forEach(p => p.classList.remove('active'));
      const panel = document.querySelector(`.who-panel[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  // ══════════════════ FAQ ACCORDION ══════════════════
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (q) q.addEventListener('click', () => item.classList.toggle('open'));
  });

  // ══════════════════ STICKY CTA BAR ══════════════════
  const sticky = document.createElement('div');
  sticky.className = 'sticky-cta-bar';
  sticky.innerHTML = `
    <a class="sticky-btn whatsapp" href="https://wa.me/971543953695" target="_blank" rel="noopener">WhatsApp</a>
    <a class="sticky-btn book" href="/contact.html">Book Free Consultation</a>
  `;
  document.body.appendChild(sticky);

  // ══════════════════ EXIT INTENT POPUP ══════════════════
  const EXIT_KEY = 'embritureExitPopupSeen';
  const popupAllowedPath = !location.pathname.includes('/dashboard');
  if (popupAllowedPath && sessionStorage.getItem(EXIT_KEY) !== '1') {
    const overlay = document.createElement('div');
    overlay.className = 'exit-popup-overlay';
    overlay.id = 'exitPopup';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="exit-popup-card" role="dialog" aria-modal="true" aria-labelledby="exitPopupTitle">
        <button class="exit-popup-close" type="button" aria-label="Close popup">✕</button>
        <span class="exit-popup-tag">Before you go</span>
        <h3 id="exitPopupTitle">Confused about your future? Let's fix it in 15 mins.</h3>
        <p>Get a free strategy call with a counsellor and leave with a clear action plan.</p>
        <div class="exit-popup-actions">
          <a class="btn-p" href="/contact.html">Book My Free Call →</a>
          <a class="btn-g" href="https://wa.me/971543953695" target="_blank" rel="noopener">WhatsApp Now</a>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const closePopup = () => {
      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden', 'true');
      sessionStorage.setItem(EXIT_KEY, '1');
    };
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePopup();
    });
    const closeBtn = overlay.querySelector('.exit-popup-close');
    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('show')) closePopup();
    });
    document.addEventListener('mouseout', (e) => {
      if (e.clientY <= 0 && !overlay.classList.contains('show')) {
        overlay.classList.add('show');
        overlay.setAttribute('aria-hidden', 'false');
      }
    }, { passive: true });
  }

  // ══════════════════ ACTIVE NAV LINK (by pathname) ══════════════════
  const path = location.pathname.replace(/\/+$/, '') || '/';
  document.querySelectorAll('.n-links a, .drawer-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    const clean = href.replace(/\/+$/, '') || '/';
    if (clean === path || (clean !== '/' && path.startsWith(clean))) {
      a.classList.add('active');
    }
  });

})();

// ══════════════════ GLOBAL helpers used from onclick= ══════════════════
function closeDrawer() {
  const d = document.getElementById('nav-drawer');
  const b = document.getElementById('nav-burger');
  if (d) d.classList.remove('open');
  if (b) b.classList.remove('open');
  document.body.classList.remove('drawer-open');
}

function toggleDrawerGroup(btn) {
  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  // Close all other groups
  document.querySelectorAll('.d-group-toggle').forEach(t => {
    if (t !== btn) {
      t.setAttribute('aria-expanded', 'false');
      const sub = t.nextElementSibling;
      if (sub) sub.classList.remove('open');
    }
  });
  // Toggle this one
  btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  const sub = btn.nextElementSibling;
  if (sub) sub.classList.toggle('open', !isOpen);
}

function scrollToChat() {
  const chat = document.getElementById('mainChat');
  if (chat) {
    chat.scrollIntoView({ behavior:'smooth', block:'center' });
    setTimeout(() => {
      const i = document.getElementById('chatInput');
      if (i) i.focus();
    }, 600);
  } else {
    location.href = '/#hero';
  }
}

async function submitContact(e) {
  if (e && e.preventDefault) e.preventDefault();
  const f = document.getElementById('contactForm');
  if (!f) return false;
  const status = document.getElementById('formStatus');
  const data = {
    name: ((f.first ? f.first.value : '') + ' ' + (f.last ? f.last.value : '')).trim(),
    email: f.email ? f.email.value.trim() : '',
    phone: f.phone ? f.phone.value.trim() : '',
    role: f.role ? f.role.value.toLowerCase() : '',
    meetingPref: f.time ? f.time.value : '',
    referralCode: f.referralCode ? f.referralCode.value.trim() : '',
    subjectRaw: (f.message ? f.message.value.trim() : '') || 'Website contact form'
  };
  if (status) {
    status.className = 'form-status';
    status.textContent = 'Sending…';
    status.style.display = 'block';
  }
  try {
    const r = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'X-API-Key':'emb-api-key-2025' },
      body: JSON.stringify(data)
    });
    if (!r.ok) throw new Error('bad');
    if (status) {
      status.className = 'form-status ok';
      status.textContent = '✓ Thanks! A counsellor will reach out within 24 hours.';
    }
    f.reset();
  } catch (err) {
    if (status) {
      status.className = 'form-status err';
      status.textContent = 'Something went wrong. Please WhatsApp (+971) 543 953 695.';
    }
  }
  return false;
}

async function subscribeNewsletter(e) {
  if (e && e.preventDefault) e.preventDefault();
  const form = e.target;
  const email = form.querySelector('input[type=email]').value.trim();
  if (!email) return false;
  try {
    await fetch('/api/leads', {
      method:'POST',
      headers:{'Content-Type':'application/json','X-API-Key':'emb-api-key-2025'},
      body: JSON.stringify({ name:'Newsletter signup', email, subjectRaw:'Newsletter subscription', role:'newsletter' })
    });
  } catch(_) {}
  form.innerHTML = '<p style="color:var(--gold);margin:0">✓ Subscribed. Watch your inbox monthly.</p>';
  return false;
}
