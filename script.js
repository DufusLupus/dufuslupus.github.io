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
