document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', function () {
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !calm) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Cassette: click / Enter / Space toggles the reels
  var tape = document.getElementById('cassette');
  if (tape) {
    var state = tape.querySelector('.state');
    var toggle = function () {
      var on = tape.getAttribute('aria-pressed') !== 'true';
      tape.setAttribute('aria-pressed', on);
      state.textContent = on ? 'Play' : 'Pause';
    };
    tape.addEventListener('click', toggle);
    tape.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    if (calm) { tape.setAttribute('aria-pressed', 'false'); state.textContent = 'Pause'; }
  }

  // Gentle pointer parallax on the hero objects
  var hero = document.querySelector('.hero');
  if (hero && !calm && window.matchMedia('(hover: hover) and (min-width: 1001px)').matches) {
    var items = hero.querySelectorAll('[data-depth]'), raf;
    hero.addEventListener('mousemove', function (e) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5;
        items.forEach(function (el) {
          var d = parseFloat(el.dataset.depth);
          el.style.setProperty('--px', (x * d).toFixed(1) + 'px');
          el.style.setProperty('--py', (y * d).toFixed(1) + 'px');
        });
      });
    });
    hero.addEventListener('mouseleave', function () {
      items.forEach(function (el) { el.style.setProperty('--px', '0px'); el.style.setProperty('--py', '0px'); });
    });
  }
});
