(function () {
  var canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var particles = [];
  var mouse = { x: null, y: null };
  var mouseRadius = 150;
  var connectDistance = 130;
  var animId;

  function isDark() {
    return document.documentElement.classList.contains('theme-dark') ||
      (!document.documentElement.classList.contains('theme-light') &&
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  function getParticleCount() {
    var area = canvas.width * canvas.height;
    return Math.min(Math.floor(area / 14000), 100);
  }

  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 1.5 + 0.5;
  }

  Particle.prototype.update = function () {
    if (mouse.x !== null) {
      var dx = this.x - mouse.x;
      var dy = this.y - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouseRadius && dist > 0) {
        var force = (mouseRadius - dist) / mouseRadius * 0.03;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }
    }

    var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > 1.2) {
      this.vx = (this.vx / speed) * 1.2;
      this.vy = (this.vy / speed) * 1.2;
    }

    this.vx *= 0.998;
    this.vy *= 0.998;

    if (speed < 0.15) {
      this.vx += (Math.random() - 0.5) * 0.08;
      this.vy += (Math.random() - 0.5) * 0.08;
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < -10) this.x = canvas.width + 10;
    if (this.x > canvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = canvas.height + 10;
    if (this.y > canvas.height + 10) this.y = -10;
  };

  function initParticles() {
    var count = getParticleCount();
    while (particles.length > count) particles.pop();
    while (particles.length < count) particles.push(new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var dark = isDark();
    // Dark mode: bright brand green; Light mode: darker green for contrast on white
    var pr = dark ? 96 : 45;
    var pg = dark ? 193 : 120;
    var pb = dark ? 125 : 68;
    var pAlpha = dark ? 0.6 : 0.7;

    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      ctx.beginPath();
      ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + pr + ',' + pg + ',' + pb + ',' + pAlpha + ')';
      ctx.fill();
    }

    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectDistance) {
          var alpha = (1 - dist / connectDistance) * (dark ? 0.25 : 0.28);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(' + pr + ',' + pg + ',' + pb + ',' + alpha + ')';
          ctx.lineWidth = dark ? 0.8 : 1;
          ctx.stroke();
        }
      }
    }

    if (mouse.x !== null) {
      for (var k = 0; k < particles.length; k++) {
        var dx2 = mouse.x - particles[k].x;
        var dy2 = mouse.y - particles[k].y;
        var dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        if (dist2 < mouseRadius) {
          var alpha2 = (1 - dist2 / mouseRadius) * (dark ? 0.45 : 0.4);
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(particles[k].x, particles[k].y);
          ctx.strokeStyle = 'rgba(' + pr + ',' + pg + ',' + pb + ',' + alpha2 + ')';
          ctx.lineWidth = dark ? 1 : 1.2;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', function () {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('touchmove', function (e) {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', function () {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', function () {
    resize();
  });

  resize();
  draw();
})();
