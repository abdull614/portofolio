// Menu mobile
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Ganti tema terang/gelap
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// Slider otomatis pada kartu proyek
document.querySelectorAll('.slider').forEach(function (slider) {
  var slides = slider.querySelectorAll('.slide');
  var dotsBox = slider.querySelector('.slider-dots');
  var index = 0;
  var timer;

  if (slides.length < 2) { if (dotsBox) dotsBox.remove(); return; }

  var dots = [];
  slides.forEach(function (_, i) {
    var d = document.createElement('span');
    d.addEventListener('click', function () { show(i); restart(); });
    dotsBox.appendChild(d);
    dots.push(d);
  });

  function show(i) {
    slides[index].classList.remove('active');
    dots[index].classList.remove('on');
    index = i;
    slides[index].classList.add('active');
    dots[index].classList.add('on');
  }

  function next() { show((index + 1) % slides.length); }
  function start() { timer = setInterval(next, 3000); }
  function restart() { clearInterval(timer); start(); }

  dots[0].classList.add('on');
  start();

  slider.addEventListener('mouseenter', function () { clearInterval(timer); });
  slider.addEventListener('mouseleave', start);
});