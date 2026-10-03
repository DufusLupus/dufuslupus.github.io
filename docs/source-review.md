# Particle Life source review

Inspected local repository: `C:/Documents/MEGA/Coding/Javascript-Particle-Sim`.

Committed revision: `3011df54cb6e0d4b2b210ba6ca87b3fdc6b770a5`. The working tree contained pre-existing modifications, including seeded RNG and test changes. Portfolio claims rely on the committed implementation; unpublished test work is not presented as published evidence. The Particle Sim repository was read only.

All paths below are relative to `particle-system/` in [the inspected revision](https://github.com/DufusLupus/Javascript-Particle-Sim/tree/3011df54cb6e0d4b2b210ba6ca87b3fdc6b770a5).

| Claim | Source | What was verified |
| --- | --- | --- |
| TypeScript engine | `src/sim/simulation.ts`, `package.json` | Typed simulator implementation and TypeScript build tooling. |
| Parallel simulation | `src/sim/simulation.ts`, `src/sim/workers/worker.ts` | Worker pool, calculated particle slices, shared state passed during setup, force calculation and integration per slice. Grid binning itself runs on the main thread. |
| SharedArrayBuffer and typed arrays | `src/sim/simulation.ts` | Float64Array positions, velocities, forces and rules; Uint8Array particle types; Int32Array control signals backed by shared memory. |
| Atomics coordination | `src/sim/simulation.ts`, `src/sim/workers/worker.ts` | Frame increment/notify, worker wait, completion add/notify and main-thread waitAsync completion loop. |
| Double buffering | `src/sim/simulation.ts`, `src/sim/workers/worker.ts` | Separate read/write position arrays switched by frame; disjoint worker output slices. |
| Spatial partitioning | `src/sim/spatialPartition/modules/grid.ts` | Uniform grid, count/prefix-sum/scatter construction, Uint32Array cell offsets and grouped particle indices, radius-based candidate batches. Does not establish a universal speedup or complexity guarantee for all distributions. |
| Reproducibility foundations | `src/core/seededrng.ts`, `src/sim/simulation.ts`, `src/app/app.ts` | Seeded Mulberry32 initialisation and an awaited `update(1)` in the application loop. Seeded initialisation is verified; full-engine determinism across environments/worker counts is not. |
| Pixi.js rendering | `src/render/render.ts` | ParticleContainer, shared generated texture, additive blending, dynamic positions, sync after simulation. No measured GPU-performance claim. |
| Benchmark instrumentation | `tests/benchmark/benchmark.ts`, `src/sim/simulation.ts`, `tests/headlessSimRunner.ts` | Named timing probes, percentile aggregation, JSON export and worker-count sweep tooling. Source review only; no benchmark results were reproduced. |

## Limits that affect published content

- `BenchmarkingTool.benchmarkRun()` calls asynchronous `sim.update(1)` without awaiting worker readiness or each frame; this prevents treating its output as validated performance evidence. The headless sweep runner does await updates, but was not executed for this review and contains unfinished references. No numeric performance claims are published.
- A seeded generator and fixed step do not by themselves prove complete simulation determinism. Floating-point order and runtime differences require explicit verification. The site states this boundary.
- Local differential tests compare grid and brute-force candidate enumeration through the same force kernel. They are useful for partitioner testing, not independent proof of the entire physics engine. They are omitted from portfolio claims because the local test layout differs from the committed tree and no tests were run here.
- Independent authorship is supplied by Killian's brief; source inspection verifies implementation mechanisms, not attribution history.
- No live demo URL was established. The portfolio links the repository and source instead of guessing a deployment URL.
