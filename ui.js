/* ================================================================
   LIAM VANOUNOU — UI INTERACTIONS
   Safe to load on every page. All handlers are additive.
   ================================================================ */
(function () {

  /* ---- PROGRESS BAR ------------------------------------------------
     Creates the bar if it doesn't exist yet (program inner pages).
  ------------------------------------------------------------------- */
  var pg = document.getElementById('progress');
  if (!pg) {
    pg = document.createElement('div');
    pg.id = 'progress';
    pg.style.cssText =
      'position:fixed;top:0;left:0;height:3px;background:#e63946;' +
      'z-index:9999;width:0;transition:width 0.08s linear;pointer-events:none;';
    document.body.insertBefore(pg, document.body.firstChild);
  }
  window.addEventListener('scroll', function () {
    var h = document.documentElement;
    var pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
    pg.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });

  /* ---- NAV SCROLL EFFECT ------------------------------------------ */
  var topnav = document.querySelector('.topnav');
  if (topnav) {
    function onNavScroll() {
      topnav.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', onNavScroll, { passive: true });
    onNavScroll();
  }

  /* ---- RIPPLE ON BUTTONS ------------------------------------------ */
  function createRipple(e) {
    var btn = e.currentTarget;
    var s   = document.createElement('span');
    s.className = '_rpl';
    var r = btn.getBoundingClientRect();
    s.style.left = (e.clientX - r.left) + 'px';
    s.style.top  = (e.clientY - r.top)  + 'px';
    btn.appendChild(s);
    s.addEventListener('animationend', function () { s.remove(); });
  }

  var rippleTargets = document.querySelectorAll(
    '.btn-primary, a.btn-primary, .btn-outline, a.btn-outline,' +
    '.pricing-btn, .apply-submit, .btn-red, a.btn-red,' +
    '.buy-btn, a.buy-btn, .email-form button, .coaching-banner a'
  );
  rippleTargets.forEach(function (btn) {
    btn.addEventListener('click', createRipple);
  });

  /* ---- SCROLL REVEAL ----------------------------------------------
     The main pages have their own IntersectionObserver already.
     This one is additive — safe to run twice (class already added = no-op).
  ------------------------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      obs.observe(el);
    });

    /* staggered cascade for prog-cards (programs page) */
    var cards = document.querySelectorAll('.prog-card');
    cards.forEach(function (card, i) {
      card.style.transitionDelay = (i * 0.05) + 's';
    });
    var cardObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          cardObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07 });
    cards.forEach(function (c) { cardObs.observe(c); });
  }

})();
