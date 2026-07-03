# Mesob Reveal
## Setup

1. Install dependencies:

   ```bash
   pnpm i
   ```

2. Run the dev server:

   ```bash
   pnpm dev
   ```

3. Open <http://localhost:3000> and scroll slowly.

> The "እንብላ" text uses drei's default font, fetched at runtime. To
> self-host, drop a `.ttf`/`.woff` into `public/` and pass it to the `font`
> prop in `components/RevealText.tsx`.


## Three.js concepts used here

- **Scene** — the tree holding every 3D object. R3F's `<Canvas>` creates it;
  each JSX child becomes a node in it (`Scene.tsx`).
- **Camera** — a `PerspectiveCamera` (distant objects appear smaller, like a
  real lens). Animated along a `CatmullRomCurve3` in `CameraRig.tsx`.
- **Renderer** — the WebGL machinery drawing the scene each frame. Configured
  via `<Canvas>` props (`shadows`, `dpr`, `antialias`).
- **Mesh = Geometry + Material** — a shape plus a surface description. The
  Mesob is `LatheGeometry` (a 2D outline spun around the Y axis) with a
  `MeshStandardMaterial` (physically-based, reacts to light).
- **Group** — an invisible container; transforming it transforms its
  children. The lid sits inside a group placed at the rim's back edge, so
  rotating the group swings the lid around that hinge point.
- **Lights** — a classic three-point film setup (key/fill/rim) plus a point
  light inside the Mesob. Only the key light casts shadows (each
  shadow-casting light re-renders the scene).
- **Animation** — no React state during animation. GSAP writes one number;
  `useFrame` callbacks read it and mutate Three.js objects directly.
