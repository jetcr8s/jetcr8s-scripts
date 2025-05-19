import Lenis from "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.38/+esm";

const lenis = new Lenis({
  smooth: true,
  lerp: 0.05,
  wheelMultiplier: 1,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
