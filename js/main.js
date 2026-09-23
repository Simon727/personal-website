(function () {
  "use strict";

  // --- Audio Engine (Web Audio API Retro Synthesizer) ---
  class SoundEffects {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem("snake_sound_enabled") !== "false";
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem("snake_sound_enabled", this.enabled);
      return this.enabled;
    }

    playEat() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(360, t);
      osc.frequency.exponentialRampToValueAtTime(720, t + 0.08);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.08);
    }

    playBonus() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + i * 0.045;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.08);
      });
    }

    playGameOver() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.35);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.35);
    }

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(500, t);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.02);
    }
  }

  // --- Game Engine ---
  const GRID_SIZE = 20;
  const CANVAS_LOGICAL_SIZE = 400;
  const CELL_SIZE = CANVAS_LOGICAL_SIZE / GRID_SIZE; // 20px

  const SPEED_PRESETS = {
    easy: 130,
    normal: 90,
    hard: 65,
    insane: 45,
  };

  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  // DOM Elements
  const currentScoreEl = document.getElementById("current-score");
  const highScoreEl = document.getElementById("high-score");
  const applesEatenEl = document.getElementById("apples-eaten");
  const finalScoreEl = document.getElementById("final-score");
  const finalHighScoreEl = document.getElementById("final-high-score");
  const newRecordBadge = document.getElementById("new-record-badge");

  const startOverlay = document.getElementById("start-overlay");
  const pauseOverlay = document.getElementById("pause-overlay");
  const gameoverOverlay = document.getElementById("gameover-overlay");

  const startGameBtn = document.getElementById("start-game-btn");
  const resumeGameBtn = document.getElementById("resume-game-btn");
  const restartGameBtn = document.getElementById("restart-game-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const pauseIcon = document.getElementById("pause-icon");
  const soundBtn = document.getElementById("sound-btn");
  const soundIcon = document.getElementById("sound-icon");
  const difficultySelect = document.getElementById("difficulty-select");

  const bonusBar = document.getElementById("bonus-bar");
  const bonusProgress = document.getElementById("bonus-progress");

  // Sound Engine
  const sound = new SoundEffects();

  // Retina Canvas Scaling
  function setupHiDPI() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_LOGICAL_SIZE * dpr;
    canvas.height = CANVAS_LOGICAL_SIZE * dpr;
    ctx.scale(dpr, dpr);
  }
  setupHiDPI();
  window.addEventListener("resize", setupHiDPI);

  // Game States
  let state = "READY"; // 'READY' | 'PLAYING' | 'PAUSED' | 'GAMEOVER'
  let score = 0;
  let applesCount = 0;
  let highScore = parseInt(localStorage.getItem("snake_retro_high") || "0", 10);
  let isNewRecord = false;

  let snake = [];
  let dir = { x: 1, y: 0 };
  let inputQueue = [];

  let food = { x: 15, y: 10 };
  let bonusFood = null;
  let bonusTimer = null;
  let bonusDuration = 9000; // ms
  let bonusStartTime = 0;

  let particles = [];
  let lastTickTime = 0;
  let animationFrameId = null;

  highScoreEl.textContent = highScore;
  updateSoundIcon();

  function updateSoundIcon() {
    soundIcon.textContent = sound.enabled ? "🔊" : "🔇";
  }

  // --- Reset & Initialization ---
  function resetGame() {
    snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    dir = { x: 1, y: 0 };
    inputQueue = [];
    score = 0;
    applesCount = 0;
    isNewRecord = false;
    particles = [];
    bonusFood = null;
    hideBonusBar();

    currentScoreEl.textContent = "0";
    applesEatenEl.textContent = "0";
    newRecordBadge.style.display = "none";

    spawnFood();
  }

  function spawnFood() {
    let valid = false;
    let newPos = { x: 0, y: 0 };
    while (!valid) {
      newPos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      valid = !snake.some((seg) => seg.x === newPos.x && seg.y === newPos.y);
      if (bonusFood && bonusFood.x === newPos.x && bonusFood.y === newPos.y) {
        valid = false;
      }
    }
    food = newPos;

    // Check if bonus food should spawn (every 5 apples)
    if (applesCount > 0 && applesCount % 5 === 0 && !bonusFood) {
      spawnBonusFood();
    }
  }

  function spawnBonusFood() {
    let valid = false;
    let newPos = { x: 0, y: 0 };
    while (!valid) {
      newPos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      valid = !snake.some((seg) => seg.x === newPos.x && seg.y === newPos.y) && !(food.x === newPos.x && food.y === newPos.y);
    }
    bonusFood = newPos;
    bonusStartTime = Date.now();
    showBonusBar();

    if (bonusTimer) clearTimeout(bonusTimer);
    bonusTimer = setTimeout(() => {
      bonusFood = null;
      hideBonusBar();
    }, bonusDuration);
  }

  function showBonusBar() {
    bonusBar.classList.add("active");
  }

  function hideBonusBar() {
    bonusBar.classList.remove("active");
    if (bonusTimer) {
      clearTimeout(bonusTimer);
      bonusTimer = null;
    }
  }

  // --- Particles ---
  function spawnParticles(x, y, color, count = 12) {
    const px = x * CELL_SIZE + CELL_SIZE / 2;
    const py = y * CELL_SIZE + CELL_SIZE / 2;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 1.5 + Math.random() * 3.5;
      particles.push({
        x: px,
        y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.03 + Math.random() * 0.04,
        size: 3 + Math.random() * 3,
        color: color,
      });
    }
  }

  function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  function drawParticles() {
    particles.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  // --- Rendering Functions ---
  function drawGrid() {
    ctx.fillStyle = "#070b14";
    ctx.fillRect(0, 0, CANVAS_LOGICAL_SIZE, CANVAS_LOGICAL_SIZE);

    // Subtle grid dots/lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
    ctx.lineWidth = 1;
    for (let i = 1; i < GRID_SIZE; i++) {
      const pos = i * CELL_SIZE;
      ctx.beginPath();
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, CANVAS_LOGICAL_SIZE);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, pos);
      ctx.lineTo(CANVAS_LOGICAL_SIZE, pos);
      ctx.stroke();
    }
  }

  function drawApple(apple, isBonus = false) {
    const cx = apple.x * CELL_SIZE + CELL_SIZE / 2;
    const cy = apple.y * CELL_SIZE + CELL_SIZE / 2;
    const radius = CELL_SIZE * 0.42;

    ctx.save();
    if (isBonus) {
      // Golden star apple
      const pulse = 1 + Math.sin(Date.now() / 150) * 0.12;
      ctx.shadowColor = "#f59e0b";
      ctx.shadowBlur = 14;

      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(cx, cy, radius * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Golden sparkle core
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx - 3, cy - 3, radius * 0.3 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Star emblem
      ctx.fillStyle = "#d97706";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("★", cx, cy + 1);
    } else {
      // Red shiny apple
      const pulse = 1 + Math.sin(Date.now() / 250) * 0.05;
      ctx.shadowColor = "rgba(239, 68, 68, 0.45)";
      ctx.shadowBlur = 8;

      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(cx, cy + 1, radius * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Apple shine highlight
      ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
      ctx.beginPath();
      ctx.arc(cx - 3, cy - 2, radius * 0.28 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Little green leaf
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.ellipse(cx + 3, cy - radius + 1, 4, 2, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawSnake() {
    snake.forEach((seg, index) => {
      const x = seg.x * CELL_SIZE;
      const y = seg.y * CELL_SIZE;
      const isHead = index === 0;

      ctx.save();
      if (isHead) {
        // Glowing Snake Head
        ctx.shadowColor = "rgba(16, 185, 129, 0.6)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#34d399";

        ctx.beginPath();
        ctx.roundRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2, 7);
        ctx.fill();

        // Eyes
        drawEyes(seg, dir);
      } else {
        // Body segments: slight gradient from bright green to deep teal
        const ratio = index / snake.length;
        const g = Math.floor(185 - ratio * 45);
        const b = Math.floor(129 - ratio * 35);
        ctx.fillStyle = `rgb(16, ${g}, ${b})`;

        const pad = Math.min(2.5, 1 + ratio * 2);
        ctx.beginPath();
        ctx.roundRect(x + pad, y + pad, CELL_SIZE - pad * 2, CELL_SIZE - pad * 2, 5);
        ctx.fill();
      }
      ctx.restore();
    });
  }

  function drawEyes(head, curDir) {
    const cx = head.x * CELL_SIZE + CELL_SIZE / 2;
    const cy = head.y * CELL_SIZE + CELL_SIZE / 2;

    let eye1 = { x: 0, y: 0 };
    let eye2 = { x: 0, y: 0 };
    let pupilOffset = { x: curDir.x * 1.5, y: curDir.y * 1.5 };

    if (curDir.x === 1) {
      // Moving Right
      eye1 = { x: cx + 3, y: cy - 4.5 };
      eye2 = { x: cx + 3, y: cy + 4.5 };
    } else if (curDir.x === -1) {
      // Moving Left
      eye1 = { x: cx - 3, y: cy - 4.5 };
      eye2 = { x: cx - 3, y: cy + 4.5 };
    } else if (curDir.y === -1) {
      // Moving Up
      eye1 = { x: cx - 4.5, y: cy - 3 };
      eye2 = { x: cx + 4.5, y: cy - 3 };
    } else {
      // Moving Down
      eye1 = { x: cx - 4.5, y: cy + 3 };
      eye2 = { x: cx + 4.5, y: cy + 3 };
    }

    // Whites
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(eye1.x, eye1.y, 3, 0, Math.PI * 2);
    ctx.arc(eye2.x, eye2.y, 3, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = "#0c101a";
    ctx.beginPath();
    ctx.arc(eye1.x + pupilOffset.x, eye1.y + pupilOffset.y, 1.6, 0, Math.PI * 2);
    ctx.arc(eye2.x + pupilOffset.x, eye2.y + pupilOffset.y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- Step Logic ---
  function gameTick() {
    if (state !== "PLAYING") return;

    // Apply next buffered direction
    if (inputQueue.length > 0) {
      const nextDir = inputQueue.shift();
      dir = nextDir;
    }

    const head = snake[0];
    const newHead = {
      x: head.x + dir.x,
      y: head.y + dir.y,
    };

    // Wall collision
    if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
      triggerGameOver();
      return;
    }

    // Self collision
    if (snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
      triggerGameOver();
      return;
    }

    snake.unshift(newHead);

    // Eat Normal Apple
    if (newHead.x === food.x && newHead.y === food.y) {
      score += 10;
      applesCount += 1;
      currentScoreEl.textContent = score;
      applesEatenEl.textContent = applesCount;

      sound.playEat();
      spawnParticles(food.x, food.y, "#34d399", 14);

      if (score > highScore) {
        highScore = score;
        highScoreEl.textContent = highScore;
        localStorage.setItem("snake_retro_high", highScore);
        isNewRecord = true;
      }

      spawnFood();
    } else if (bonusFood && newHead.x === bonusFood.x && newHead.y === bonusFood.y) {
      // Eat Bonus Golden Apple
      score += 50;
      currentScoreEl.textContent = score;

      sound.playBonus();
      spawnParticles(bonusFood.x, bonusFood.y, "#fbbf24", 24);

      if (score > highScore) {
        highScore = score;
        highScoreEl.textContent = highScore;
        localStorage.setItem("snake_retro_high", highScore);
        isNewRecord = true;
      }

      bonusFood = null;
      hideBonusBar();
    } else {
      // Normal step, remove tail
      snake.pop();
    }
  }

  function triggerGameOver() {
    state = "GAMEOVER";
    sound.playGameOver();
    hideBonusBar();

    const head = snake[0];
    spawnParticles(head.x, head.y, "#ef4444", 24);

    finalScoreEl.textContent = score;
    finalHighScoreEl.textContent = highScore;
    newRecordBadge.style.display = isNewRecord ? "inline-block" : "none";

    gameoverOverlay.classList.add("active");
  }

  // --- Main Animation Loop ---
  function render(time) {
    const currentSpeed = SPEED_PRESETS[difficultySelect.value] || SPEED_PRESETS.normal;

    if (state === "PLAYING") {
      if (time - lastTickTime >= currentSpeed) {
        gameTick();
        lastTickTime = time;
      }

      // Update bonus bar progress
      if (bonusFood) {
        const elapsed = Date.now() - bonusStartTime;
        const remainRatio = Math.max(0, 1 - elapsed / bonusDuration);
        bonusProgress.style.width = `${remainRatio * 100}%`;
      }
    }

    drawGrid();

    if (bonusFood) {
      drawApple(bonusFood, true);
    }
    drawApple(food, false);

    drawSnake();

    updateParticles();
    drawParticles();

    animationFrameId = requestAnimationFrame(render);
  }

  // --- Direction Input Handling ---
  function queueDirection(dx, dy) {
    // If not playing, start game
    if (state === "READY") {
      startPlaying();
    }
    if (state !== "PLAYING") return;

    const lastDir = inputQueue.length > 0 ? inputQueue[inputQueue.length - 1] : dir;

    // Disallow reverse direction
    if (dx === -lastDir.x && dy === -lastDir.y) return;
    // Disallow duplicate direction
    if (dx === lastDir.x && dy === lastDir.y) return;

    if (inputQueue.length < 2) {
      inputQueue.push({ x: dx, y: dy });
    }
  }

  function startPlaying() {
    startOverlay.classList.remove("active");
    pauseOverlay.classList.remove("active");
    gameoverOverlay.classList.remove("active");
    state = "PLAYING";
    sound.init();
    pauseIcon.textContent = "⏸";
  }

  function togglePause() {
    if (state === "PLAYING") {
      state = "PAUSED";
      pauseOverlay.classList.add("active");
      pauseIcon.textContent = "▶";
      sound.playClick();
    } else if (state === "PAUSED") {
      pauseOverlay.classList.remove("active");
      state = "PLAYING";
      pauseIcon.textContent = "⏸";
      sound.playClick();
    }
  }

  // Keyboard controls
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        e.preventDefault();
        queueDirection(0, -1);
        break;
      case "ArrowDown":
      case "s":
      case "S":
        e.preventDefault();
        queueDirection(0, 1);
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        e.preventDefault();
        queueDirection(-1, 0);
        break;
      case "ArrowRight":
      case "d":
      case "D":
        e.preventDefault();
        queueDirection(1, 0);
        break;
      case " ":
        e.preventDefault();
        if (state === "READY") {
          startPlaying();
        } else if (state === "GAMEOVER") {
          resetGame();
          startPlaying();
        } else {
          togglePause();
        }
        break;
      case "r":
      case "R":
        e.preventDefault();
        resetGame();
        startPlaying();
        break;
    }
  });

  // Touch Swipe on Canvas
  let touchStartX = 0;
  let touchStartY = 0;
  canvas.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
  }, { passive: true });

  canvas.addEventListener("touchend", (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (Math.max(absX, absY) > 24) {
      if (absX > absY) {
        queueDirection(dx > 0 ? 1 : -1, 0);
      } else {
        queueDirection(0, dy > 0 ? 1 : -1);
      }
    }
  }, { passive: true });

  // Virtual D-Pad buttons
  document.querySelectorAll(".dpad-btn").forEach((btn) => {
    const handlePress = (e) => {
      e.preventDefault();
      const dirAttr = btn.dataset.dir;
      if (dirAttr === "UP") queueDirection(0, -1);
      if (dirAttr === "DOWN") queueDirection(0, 1);
      if (dirAttr === "LEFT") queueDirection(-1, 0);
      if (dirAttr === "RIGHT") queueDirection(1, 0);
      sound.playClick();
    };
    btn.addEventListener("touchstart", handlePress, { passive: false });
    btn.addEventListener("mousedown", handlePress);
  });

  // Buttons Event Listeners
  startGameBtn.addEventListener("click", () => {
    resetGame();
    startPlaying();
    sound.playClick();
  });

  resumeGameBtn.addEventListener("click", () => {
    togglePause();
  });

  restartGameBtn.addEventListener("click", () => {
    resetGame();
    startPlaying();
    sound.playClick();
  });

  pauseBtn.addEventListener("click", () => {
    if (state === "PLAYING" || state === "PAUSED") {
      togglePause();
    }
  });

  soundBtn.addEventListener("click", () => {
    sound.init();
    sound.toggle();
    updateSoundIcon();
  });

  difficultySelect.addEventListener("change", () => {
    sound.playClick();
    difficultySelect.blur();
  });

  // Window Blur Auto-Pause
  window.addEventListener("blur", () => {
    if (state === "PLAYING") {
      togglePause();
    }
  });

  // Init
  resetGame();
  animationFrameId = requestAnimationFrame(render);
})();
