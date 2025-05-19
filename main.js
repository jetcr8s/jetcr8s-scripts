import './smooth-scroll.js';
import './hero-entrance.js';
import './img-frame-hover.js';
import './scroll-animations.js';
import './footer-scramble.js';
import './swiper-init.js';
import './gallery-hover-toggle.js';

window.addEventListener("load", () => {
  if (window.matchMedia("(min-width: 1024px)").matches) {
    window.runHeroEntrance?.();
    window.toggleHoverSection?.();
  }
});
