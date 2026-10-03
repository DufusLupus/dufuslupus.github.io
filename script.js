'use strict';

const stages = [
  { label: 'PARTICLES PER CELL', values: ['A: 3', 'B: 2', 'C: 1', 'D: 2'], description: 'Count each particle’s cell. Here, eight particles occupy four cells.' },
  { label: 'CELL START OFFSETS + END SENTINEL', values: ['0', '3', '5', '6', '8'], description: 'Accumulate counts into offsets. Cell B starts at index 3; the final offset marks the end of all eight particles.' },
  { label: 'PARTICLE INDICES GROUPED BY CELL', values: ['A: 0, 3, 7', 'B: 1, 5', 'C: 4', 'D: 2, 6'], description: 'Scatter particle indices into their cell ranges. The index is grouped by cell; the position buffers stay in particle order.' }
];
const output = document.getElementById('step-output');
document.querySelectorAll('[data-step]').forEach(button => {
  button.addEventListener('click', () => {
    const stage = stages[Number(button.dataset.step)];
    document.querySelectorAll('[data-step]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    output.querySelector('.array-label').textContent = stage.label;
    const values = output.querySelector('.array-values');
    values.replaceChildren(...stage.values.map(value => {
      const span = document.createElement('span');
      span.textContent = value;
      return span;
    }));
    output.querySelector('.step-description').textContent = stage.description;
  });
});

// A static, seeded illustration, not a copy of the Particle Life engine.
// Redrawn only on resize: no animation loop, workers, or shared-memory requirement.
const canvas = document.getElementById('particle-canvas');
const context = canvas.getContext('2d');
function drawParticles() {
  if (!context) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (!width || !height) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  let seed = 271828;
  function random() {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  }
  const colours = ['#c4f58a', '#82d7c8', '#d3a6e9', '#e8cc84'];
  for (let i = 0; i < 1700; i++) {
    const group = i % 4;
    const angle = random() * Math.PI * 2;
    const radius = Math.sqrt(random());
    const twist = angle + radius * 2.7;
    const centerX = [.39, .67, .34, .65][group];
    const centerY = [.39, .5, .67, .29][group];
    const x = width * (centerX + Math.cos(twist) * radius * .21 + (random() - .5) * .035);
    const y = height * (centerY + Math.sin(twist) * radius * .18 + (random() - .5) * .03);
    context.globalAlpha = .3 + random() * .7;
    context.fillStyle = colours[group];
    context.beginPath();
    context.arc(x, y, .65 + random() * .85, 0, Math.PI * 2);
    context.fill();
  }
  context.globalAlpha = 1;
}
drawParticles();
if ('ResizeObserver' in window) new ResizeObserver(drawParticles).observe(canvas);
else window.addEventListener('resize', drawParticles);
