/**
 * Initializes the interactive background canvas animation (EQ bars, fog, disco balls, lasers).
 * Returns a cleanup function that cancels the animation loop and removes listeners.
 */
export function initBackgroundAnimation(canvas) {
  if (!canvas) return () => {};

  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return () => {};

  const CONFIG = {
    SHOW_LASERS: false,
    SHOW_BALLS: true,
    SHOW_EQ: true,
    SHOW_FOG: true,
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width = window.innerWidth;
  let height = window.innerHeight;
  let lasers = [];
  let discoBalls = [];
  let smokeParticles = [];
  let graphicEQ;
  const mouse = { x: null, y: null, active: false };
  const lastMouse = { x: null, y: null };
  let interactionIntensity = 0;
  let animationFrameId = null;

  let lastTime = performance.now();
  let frames = 0;
  let lowFpsCount = 0;

  function throttlePerformance() {
    if (CONFIG.SHOW_FOG) {
      CONFIG.SHOW_FOG = false;
      smokeParticles = [];
    } else if (CONFIG.SHOW_LASERS) {
      CONFIG.SHOW_LASERS = false;
      lasers = [];
    } else if (discoBalls.length > 2) {
      discoBalls.splice(2);
    }
  }

  function getLogoCenter() {
    const logoElement = document.getElementById("hero-logo");
    if (!logoElement) return { x: width / 2, y: 100 };
    const rect = logoElement.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  class GraphicEqualizer {
    constructor() {
      this.numBands = window.innerWidth < 768 ? 32 : 64;
      this.bands = new Array(this.numBands).fill(0);
      this.targetBands = new Array(this.numBands).fill(0);
      this.maxHeight = height * 0.3;
    }

    update() {
      const time = Date.now() * 0.003;
      for (let i = 0; i < this.numBands; i++) {
        const wave = (Math.sin(i * 0.3 + time) + Math.cos(i * 0.1 - time)) * 0.5 + 0.5;
        if (Math.random() > 0.95) this.targetBands[i] = Math.random() * this.maxHeight;
        this.targetBands[i] *= 0.92;
        const combined = this.targetBands[i] * 0.6 + wave * this.maxHeight * 0.4;
        this.bands[i] += (combined - this.bands[i]) * 0.1;
      }
    }

    draw() {
      const barWidth = width / this.numBands;
      const gap = barWidth * 0.3;
      ctx.save();
      ctx.globalAlpha = 0.25;
      for (let i = 0; i < this.numBands; i++) {
        const h = this.bands[i];
        const x = i * barWidth + gap / 2;
        const grad = ctx.createLinearGradient(x, height - h, x, height);
        grad.addColorStop(0, "rgba(227, 49, 111, 0.85)");
        grad.addColorStop(0.5, "rgba(227, 49, 111, 0.35)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(x, height - h, barWidth - gap, h);
      }
      ctx.restore();
    }
  }

  class SmokeParticle {
    constructor() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 200;
      this.radius = Math.random() * 300 + 150;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = Math.random() * -0.4 - 0.1;
      this.life = 0;
      this.maxLife = Math.random() * 800 + 400;
    }

    update() {
      this.life++;
      this.x += this.vx;
      this.y += this.vy;
    }

    draw() {
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.04;
      if (alpha <= 0) return;
      ctx.save();
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class LaserBeam {
    constructor(index, total) {
      this.index = index;
      this.total = total;
      this.reset();
    }

    reset() {
      const origin = getLogoCenter();
      this.originX = origin.x;
      this.originY = origin.y;
      this.baseAngle = (Math.PI / this.total) * this.index + Math.PI / 2;
      this.angle = this.baseAngle;
      this.sweepSpeed = (Math.random() - 0.5) * 0.008;
      this.thickness = Math.random() * 1.5 + 1;
      this.colorRGB = Math.random() > 0.7 ? "227, 49, 111" : "220, 220, 220";
      this.baseAlpha = Math.random() * 0.3 + 0.15;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      const origin = getLogoCenter();
      this.originX = origin.x;
      this.originY = origin.y;
      this.angle += this.sweepSpeed;
      if (this.angle < Math.PI * 0.1 || this.angle > Math.PI * 1.9) this.sweepSpeed *= -1;
      this.pulse += 0.03;

      if (mouse.active && interactionIntensity > 0.1) {
        const target = Math.atan2(mouse.y - this.originY, mouse.x - this.originX);
        let diff = target - this.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        this.angle += diff * 0.02 * interactionIntensity;
      }
    }

    draw() {
      const alpha = Math.sin(this.pulse) * 0.1 + 0.15 + interactionIntensity * 0.05;
      const len = Math.max(width, height) * 1.2;
      const ex = this.originX + Math.cos(this.angle) * len;
      const ey = this.originY + Math.sin(this.angle) * len;
      ctx.save();
      const grad = ctx.createLinearGradient(this.originX, this.originY, ex, ey);
      grad.addColorStop(0, `rgba(${this.colorRGB}, ${alpha})`);
      grad.addColorStop(0.5, `rgba(${this.colorRGB}, 0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = this.thickness;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(this.originX, this.originY);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      ctx.restore();
    }
  }

  class DiscoBall {
    constructor(isTopFold) {
      this.isTopFold = isTopFold;
      const isMobile = window.innerWidth < 768;
      this.baseRadius = isMobile ? Math.random() * 20 + 15 : Math.random() * 50 + 20;
      this.radius = this.baseRadius;
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;
      this.baseSpin = (Math.random() - 0.5) * 0.01;
      this.spinSpeed = this.baseSpin;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.rows = 14;
      this.cols = 24;
      this.facets = [];

      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols; c++) {
          this.facets.push({
            randomTilt: Math.random() * 0.6 - 0.3,
            sparkleOffset: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    update() {
      let targetRadius = this.baseRadius;
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250 && dist > 0) {
          const force = (250 - dist) / 250;
          this.vx -= (dx / dist) * force * 0.8;
          this.vy -= (dy / dist) * force * 0.8;
          this.spinSpeed += (Math.sign(this.baseSpin) || 1) * 0.005;
          targetRadius = this.baseRadius + (250 - dist) * 0.2;
        }
      }

      const centerDistX = this.x - width / 2;
      const keepOutZone = window.innerWidth < 768 ? window.innerWidth * 0.35 : 450;
      if (Math.abs(centerDistX) < keepOutZone) {
        const pushForce = (keepOutZone - Math.abs(centerDistX)) / keepOutZone;
        this.vx += Math.sign(centerDistX) * pushForce * 0.15;
      }

      const edgeBuffer = this.radius;
      if (this.x < edgeBuffer) this.vx += (edgeBuffer - this.x) * 0.05;
      else if (this.x > width - edgeBuffer) this.vx -= (this.x - (width - edgeBuffer)) * 0.05;

      if (this.isTopFold) {
        const targetY = height * 0.25;
        this.vy += (targetY - this.y) * 0.0005;
        if (this.y < edgeBuffer) this.vy += (edgeBuffer - this.y) * 0.05;
      } else {
        const targetY = height * 0.75;
        this.vy += (targetY - this.y) * 0.0005;
        if (this.y > height - edgeBuffer) this.vy -= (this.y - (height - edgeBuffer)) * 0.05;
      }

      this.vx *= 0.98;
      this.vy *= 0.98;
      if (Math.abs(this.vx) < 0.4) this.vx += (Math.random() - 0.5) * 0.1;
      if (Math.abs(this.vy) < 0.4) this.vy += (Math.random() - 0.5) * 0.1;

      const maxSpeed = 12;
      const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (currentSpeed > maxSpeed) {
        this.vx = (this.vx / currentSpeed) * maxSpeed;
        this.vy = (this.vy / currentSpeed) * maxSpeed;
      }

      this.radius += (targetRadius - this.radius) * 0.1;
      this.spinSpeed += (this.baseSpin - this.spinSpeed) * 0.05;
      this.x += this.vx;
      this.y += this.vy;
      this.rotX -= this.vy * 0.015;
      this.rotY += this.vx * 0.015;
      this.rotZ += this.spinSpeed;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.globalAlpha = 0.25;
      const r = this.radius;
      ctx.beginPath();
      ctx.arc(0, 0, r - 0.5, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.fill();

      const rotate3D = (x, y, z) => {
        const cx = Math.cos(this.rotX);
        const sx = Math.sin(this.rotX);
        const cy = Math.cos(this.rotY);
        const sy = Math.sin(this.rotY);
        const cz = Math.cos(this.rotZ);
        const sz = Math.sin(this.rotZ);
        const y1 = y * cx - z * sx;
        const z1 = y * sx + z * cx;
        const x2 = x * cy + z1 * sy;
        const z2 = -x * sy + z1 * cy;
        return { x: x2 * cz - y1 * sz, y: x2 * sz + y1 * cz, z: z2 };
      };

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          const facet = this.facets[i * this.cols + j];
          const phi1 = (i / this.rows) * Math.PI;
          const phi2 = ((i + 1) / this.rows) * Math.PI;
          const theta1 = (j / this.cols) * Math.PI * 2;
          const theta2 = ((j + 1) / this.cols) * Math.PI * 2;
          const getRaw = (p, t) => ({
            x: r * Math.sin(p) * Math.cos(t),
            y: r * Math.cos(p),
            z: r * Math.sin(p) * Math.sin(t),
          });
          const p1 = rotate3D(getRaw(phi1, theta1).x, getRaw(phi1, theta1).y, getRaw(phi1, theta1).z);
          const p2 = rotate3D(getRaw(phi1, theta2).x, getRaw(phi1, theta2).y, getRaw(phi1, theta2).z);
          const p3 = rotate3D(getRaw(phi2, theta2).x, getRaw(phi2, theta2).y, getRaw(phi2, theta2).z);
          const p4 = rotate3D(getRaw(phi2, theta1).x, getRaw(phi2, theta1).y, getRaw(phi2, theta1).z);
          const rawC = getRaw((phi1 + phi2) / 2, (theta1 + theta2) / 2);
          const pc = rotate3D(rawC.x, rawC.y, rawC.z);
          if (pc.z < 0) continue;
          const intensity = Math.max(0, pc.z / r + facet.randomTilt);
          let lightness = 30 + Math.pow(intensity, 6) * 150;
          if (Math.sin(Date.now() / 200 + facet.sparkleOffset) > 0.95) lightness += 50;
          const hue = facet.randomTilt > 0.1 ? 339 : 0;
          const sat = facet.randomTilt > 0.1 ? 65 : 0;
          const color = `hsl(${hue}, ${sat}%, ${Math.min(100, lightness)}%)`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();
          ctx.fillStyle = color;
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      ctx.restore();
    }
  }

  function initElements() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = canvas.width;
    height = canvas.height;

    lasers = [];
    discoBalls = [];
    smokeParticles = [];

    if (CONFIG.SHOW_EQ) graphicEQ = new GraphicEqualizer();

    if (CONFIG.SHOW_LASERS) {
      const count = window.innerWidth < 768 ? 10 : 18;
      for (let i = 0; i < count; i++) lasers.push(new LaserBeam(i, count));
    }

    if (CONFIG.SHOW_BALLS) {
      const count = window.innerWidth < 768 ? 4 : 8;
      const topFoldCount = window.innerWidth < 768 ? 2 : 4;
      const minDistance = window.innerWidth < 768 ? 150 : 300;
      const centerZone = window.innerWidth < 768 ? width * 0.35 : 450;

      for (let i = 0; i < count; i++) {
        const isTopFold = i < topFoldCount;
        let newBall;
        let attempts = 0;
        let valid = false;

        while (!valid && attempts < 100) {
          newBall = new DiscoBall(isTopFold);
          if (Math.random() > 0.5) {
            newBall.x = newBall.radius + Math.random() * (width / 2 - centerZone - newBall.radius);
          } else {
            newBall.x = width / 2 + centerZone + Math.random() * (width / 2 - centerZone - newBall.radius);
          }

          if (Number.isNaN(newBall.x) || newBall.x < newBall.radius || newBall.x > width - newBall.radius) {
            newBall.x = newBall.radius + Math.random() * (width - newBall.radius * 2);
          }

          if (isTopFold) {
            newBall.y = newBall.radius + Math.random() * (height * 0.35);
          } else {
            newBall.y = height * 0.6 + Math.random() * (height * 0.35 - newBall.radius);
          }

          valid = true;
          for (let j = 0; j < discoBalls.length; j++) {
            const dx = newBall.x - discoBalls[j].x;
            const dy = newBall.y - discoBalls[j].y;
            if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
              valid = false;
              break;
            }
          }
          attempts++;
        }
        discoBalls.push(newBall);
      }
    }
  }

  function animate(currentTime) {
    frames++;
    if (currentTime - lastTime >= 1000) {
      const currentFps = frames;
      frames = 0;
      lastTime = currentTime;
      if (currentFps < 30) {
        lowFpsCount++;
        if (lowFpsCount >= 2) {
          throttlePerformance();
          lowFpsCount = 0;
        }
      } else {
        lowFpsCount = 0;
      }
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    interactionIntensity *= 0.95;

    if (CONFIG.SHOW_EQ && graphicEQ) {
      graphicEQ.update();
      graphicEQ.draw();
    }

    if (CONFIG.SHOW_FOG) {
      if (smokeParticles.length < 12 && Math.random() > 0.98) {
        smokeParticles.push(new SmokeParticle());
      }
      smokeParticles = smokeParticles.filter((p) => p.life < p.maxLife);
      smokeParticles.forEach((p) => {
        p.update();
        p.draw();
      });
    }

    if (CONFIG.SHOW_LASERS) {
      lasers.forEach((l) => {
        l.update();
        l.draw();
      });
    }

    if (CONFIG.SHOW_BALLS) {
      for (let i = 0; i < discoBalls.length; i++) {
        for (let j = i + 1; j < discoBalls.length; j++) {
          const dx = discoBalls[i].x - discoBalls[j].x;
          const dy = discoBalls[i].y - discoBalls[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const targetDist = window.innerWidth < 768 ? 200 : 400;
          if (dist < targetDist && dist > 0) {
            const force = (targetDist - dist) / targetDist;
            const pushX = (dx / dist) * force * 0.03;
            const pushY = (dy / dist) * force * 0.03;
            discoBalls[i].vx += pushX;
            discoBalls[i].vy += pushY;
            discoBalls[j].vx -= pushX;
            discoBalls[j].vy -= pushY;
          }
        }
      }
      discoBalls.forEach((b) => {
        b.update();
        b.draw();
      });
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  if (prefersReducedMotion) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return () => {};
  }

  const handleMouseMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
    if (lastMouse.x !== null) {
      const dx = mouse.x - lastMouse.x;
      const dy = mouse.y - lastMouse.y;
      interactionIntensity = Math.min(1.0, interactionIntensity + Math.sqrt(dx * dx + dy * dy) * 0.005);
    }
    lastMouse.x = mouse.x;
    lastMouse.y = mouse.y;
  };

  const handleMouseLeave = () => {
    mouse.active = false;
  };

  let lastWidth = window.innerWidth;
  const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = canvas.width;
    height = canvas.height;
    if (graphicEQ) graphicEQ.maxHeight = height * 0.3;

    if (Math.abs(window.innerWidth - lastWidth) > 50) {
      lastWidth = window.innerWidth;
      initElements();
    }
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseleave", handleMouseLeave);
  window.addEventListener("resize", handleResize);

  initElements();
  animationFrameId = requestAnimationFrame(animate);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseleave", handleMouseLeave);
    window.removeEventListener("resize", handleResize);
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
  };
}
