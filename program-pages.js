/* ================================================================
   PROGRAM PAGES — Shared interaction layer
   Runs on all individual program-*.html pages
   ================================================================ */
(function () {
  'use strict';

  /* ── Animated hero background ─────────────────────────────── */
  function addHeroBg() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const bg = document.createElement('div');
    bg.className = 'hero-bg-anim';
    hero.insertBefore(bg, hero.firstChild);
  }

  /* ── Wrap ex-body content so grid animation works ─────────── */
  function wrapExBodies() {
    document.querySelectorAll('.ex-body').forEach(body => {
      if (body.querySelector('.ex-body-inner')) return;
      const inner = document.createElement('div');
      inner.className = 'ex-body-inner';
      while (body.firstChild) inner.appendChild(body.firstChild);
      body.appendChild(inner);
    });
  }

  /* ── Wrap week-body content similarly ────────────────────── */
  function wrapWeekBodies() {
    document.querySelectorAll('.week-body').forEach(body => {
      if (body.querySelector('.week-body-inner')) return;
      const inner = document.createElement('div');
      inner.className = 'week-body-inner';
      while (body.firstChild) inner.appendChild(body.firstChild);
      body.appendChild(inner);
    });
  }

  /* ── Upgrade exercise card headers ───────────────────────── */
  function upgradeExCards() {
    document.querySelectorAll('.ex-card').forEach(card => {
      const header = card.querySelector('.ex-header');
      if (!header || header.querySelector('.ex-header-right')) return;

      // wrap right side
      const right = document.createElement('div');
      right.className = 'ex-header-right';

      // pulse + hint
      const hint = document.createElement('div');
      hint.className = 'ex-tap-hint';
      hint.innerHTML = '<span class="ex-pulse"></span> Tap for guide';
      right.appendChild(hint);

      // chevron
      const chev = document.createElement('div');
      chev.className = 'ex-chevron';
      chev.textContent = '›';
      // rotate 90° → down arrow via CSS, rotate 270° → up
      chev.style.display = 'inline-block';
      chev.style.transform = 'rotate(90deg)';
      right.appendChild(chev);

      // remove old toggle
      const oldToggle = header.querySelector('.ex-toggle');
      if (oldToggle) oldToggle.style.display = 'none';

      header.appendChild(right);
    });
  }

  /* ── Upgrade week headers ─────────────────────────────────── */
  function upgradeWeekHeaders() {
    document.querySelectorAll('.preview-week').forEach(week => {
      const header = week.querySelector('.week-header');
      if (!header || header.querySelector('.week-status-dot')) return;

      const left = header.querySelector('.week-header-left');
      if (!left) return;

      // status dot
      const dot = document.createElement('div');
      dot.className = 'week-status-dot';
      left.insertBefore(dot, left.firstChild);

      // exercise count
      const count = week.querySelectorAll('.ex-card').length;
      const right = header.querySelector('[style]') || createWeekRight(header);
      const badge = document.createElement('div');
      badge.className = 'week-ex-count';
      badge.textContent = count + (count === 1 ? ' exercise' : ' exercises');

      // chevron for week
      const chev = document.createElement('div');
      chev.className = 'week-chevron';
      chev.innerHTML = '&#8964;';

      const rightWrap = document.createElement('div');
      rightWrap.className = 'week-header-right';
      rightWrap.appendChild(badge);
      rightWrap.appendChild(chev);

      // remove old badge elements
      header.querySelectorAll('.lock-badge, .open-badge').forEach(el => el.remove());

      // remove old focus span
      const focusEl = header.querySelector('.focus');
      if (focusEl) focusEl.remove();

      header.appendChild(rightWrap);
    });
  }

  function createWeekRight(header) {
    const el = document.createElement('div');
    header.appendChild(el);
    return el;
  }

  /* ── Rewire exercise card toggle ──────────────────────────── */
  function rewireExToggle() {
    document.querySelectorAll('.ex-header').forEach(header => {
      // remove old onclick, replace
      header.removeAttribute('onclick');
      header.addEventListener('click', function () {
        const card = this.closest('.ex-card');
        const body = card.querySelector('.ex-body');
        const isOpen = body.classList.contains('open');

        // close all others in the same day
        const day = card.closest('.day') || card.parentElement;
        day.querySelectorAll('.ex-card').forEach(c => {
          if (c !== card) {
            c.querySelector('.ex-body').classList.remove('open');
            c.classList.remove('expanded');
          }
        });

        body.classList.toggle('open', !isOpen);
        card.classList.toggle('expanded', !isOpen);
      });
    });
  }

  /* ── Rewire week toggle ───────────────────────────────────── */
  function rewireWeekToggle() {
    document.querySelectorAll('.week-header').forEach(header => {
      header.removeAttribute('onclick');
      header.addEventListener('click', function () {
        const week = this.closest('.preview-week');
        const body = week.querySelector('.week-body');
        if (!body) return;

        // locked weeks show their locked-body but don't toggle
        if (!week.classList.contains('unlocked')) {
          // still toggle via original approach — allow to show locked message
          const locked = week.querySelector('.locked-body');
          if (locked) {
            locked.style.display = locked.style.display === 'none' ? 'block' : 'none';
          }
          return;
        }

        const isOpen = body.classList.contains('open');
        body.classList.toggle('open', !isOpen);
        week.classList.toggle('week-open', !isOpen);
      });
    });
  }

  /* ── Add trust signal to buy box ─────────────────────────── */
  function upgradeBuyBox() {
    const buyBox = document.querySelector('.buy-box');
    if (!buyBox) return;

    // trust signal
    if (!buyBox.querySelector('.buy-trust')) {
      const trust = document.createElement('p');
      trust.className = 'buy-trust';
      trust.textContent = 'One-time payment. Lifetime access. No subscription.';
      const btn = buyBox.querySelector('.buy-btn');
      if (btn && btn.nextSibling) btn.parentNode.insertBefore(trust, btn.nextSibling);
      else buyBox.appendChild(trust);
    }

    // buy button loading state
    const btn = buyBox.querySelector('.buy-btn');
    if (btn) {
      btn.addEventListener('click', function () {
        this.classList.add('loading');
        setTimeout(() => this.classList.remove('loading'), 2500);
      });
    }
  }

  /* ── Mobile bottom bar ────────────────────────────────────── */
  function addMobileBar() {
    if (document.querySelector('.mobile-buy-bar')) return;
    const buyBox = document.querySelector('.buy-box');
    if (!buyBox) return;

    const priceEl = buyBox.querySelector('.price');
    const btnEl   = buyBox.querySelector('.buy-btn');
    if (!priceEl || !btnEl) return;

    const bar = document.createElement('div');
    bar.className = 'mobile-buy-bar';
    bar.innerHTML = `
      <div class="mbb-price">${priceEl.textContent}</div>
      <a class="mbb-btn" href="${btnEl.href || '#'}">Get This Program</a>
    `;
    document.body.appendChild(bar);
  }

  /* ── Progress tracker ─────────────────────────────────────── */
  function addProgressTracker() {
    if (document.querySelector('.progress-tracker')) return;

    const weeks = document.querySelectorAll('.preview-week');
    const totalWeeks = weeks.length;
    if (totalWeeks === 0) return;

    // unique key per page
    const key = 'progress_' + location.pathname.split('/').pop().replace('.html', '');
    let done = JSON.parse(localStorage.getItem(key) || '[]');

    const motivations = [
      'Every expert was once a beginner. Keep going.',
      'Every expert was once a beginner. Keep going.',
      'Every expert was once a beginner. Keep going.',
      'You are past the halfway point. This is where it gets good.',
      'You are past the halfway point. This is where it gets good.',
      'You are past the halfway point. This is where it gets good.',
      'Almost there. Do not stop now.',
      'Almost there. Do not stop now.',
      'Program complete. You did the work. What is next?'
    ];

    function getMotivation(n) {
      if (n === totalWeeks) return 'Program complete. You did the work. What is next?';
      const pct = n / totalWeeks;
      if (pct >= 0.7) return 'Almost there. Do not stop now.';
      if (pct >= 0.35) return 'You are past the halfway point. This is where it gets good.';
      return 'Every expert was once a beginner. Keep going.';
    }

    const section = document.createElement('div');
    section.className = 'progress-tracker';

    const title = document.createElement('h2');
    title.textContent = 'Track Your Progress';
    section.appendChild(title);

    const sub = document.createElement('p');
    sub.className = 'progress-tracker-sub';
    sub.textContent = 'Click a week when you complete it. Your progress saves automatically.';
    section.appendChild(sub);

    const grid = document.createElement('div');
    grid.className = 'progress-weeks';
    section.appendChild(grid);

    const countEl = document.createElement('div');
    countEl.className = 'progress-count';
    section.appendChild(countEl);

    const motEl = document.createElement('div');
    motEl.className = 'progress-motivation';
    section.appendChild(motEl);

    function render() {
      grid.innerHTML = '';
      for (let i = 1; i <= totalWeeks; i++) {
        const circle = document.createElement('div');
        circle.className = 'pw-circle' + (done.includes(i) ? ' done' : '');
        circle.innerHTML = `<span class="pw-num">${i}</span><span class="pw-w">Wk</span>`;
        circle.addEventListener('click', () => toggleWeek(i, circle));
        grid.appendChild(circle);
      }
      countEl.innerHTML = `<strong>${done.length} of ${totalWeeks}</strong> weeks completed`;
      motEl.textContent = getMotivation(done.length);
    }

    function toggleWeek(i, circle) {
      const wasDone = done.includes(i);
      if (wasDone) {
        done = done.filter(n => n !== i);
      } else {
        done.push(i);
        // burst animation
        const burst = document.createElement('div');
        burst.className = 'pw-burst';
        circle.appendChild(burst);
        setTimeout(() => burst.remove(), 520);
      }
      localStorage.setItem(key, JSON.stringify(done));
      render();
    }

    render();

    // Insert before footer or CTA
    const cta = document.querySelector('.cta-section') || document.querySelector('footer');
    if (cta) cta.parentNode.insertBefore(section, cta);
    else document.body.appendChild(section);
  }

  /* ── Open first unlocked week by default ─────────────────── */
  function openFirstWeek() {
    const first = document.querySelector('.preview-week.unlocked');
    if (!first) return;
    const body = first.querySelector('.week-body');
    if (body) {
      body.classList.add('open');
      first.classList.add('week-open');
    }
  }

  /* ── Init ─────────────────────────────────────────────────── */
  function init() {
    addHeroBg();
    wrapExBodies();
    wrapWeekBodies();
    upgradeExCards();
    upgradeWeekHeaders();
    rewireExToggle();
    rewireWeekToggle();
    openFirstWeek();
    upgradeBuyBox();
    addMobileBar();
    addProgressTracker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
