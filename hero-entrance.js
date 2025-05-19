window.runHeroEntrance = function () {
  const FONT_WEIGHT_FROM = 430;
  const FONT_WEIGHT_TO = 600;

  const heroWrapper = document.querySelector(".hero_wrapper");
  const greenBlock = document.querySelector(".g-block");
  const jTitle = document.querySelector(".j_title");
  if (!heroWrapper || !greenBlock || !jTitle) return;

  const finalHeight = window.getComputedStyle(heroWrapper).height;

  const deform = {
    to:      { skewX: 30,  skewY: 50, rotateZ: 30, scale: 1.8, y: "6em" },
    from:    { skewX: 0,   skewY: 0,  rotateZ: 0,  scale: 1,   y: 0  },
    hover:   { skewX: 15,  skewY: 25, rotateZ: 13,  scale: 1.6, y: "3em"  }
  };

  gsap.set(heroWrapper, { height: "0px" });
  gsap.set(".top_wrapper", { opacity: 0, y: -30 });
  gsap.set(".hero_bottom", { opacity: 0, y: 20 });
  gsap.set(greenBlock, { opacity: 0, y: -10 });
  gsap.set(jTitle, { opacity: 0, y: 10 });

  const split = new SplitText(jTitle, { type: "chars", charsClass: "char" });
  const chars = split.chars;

  const transformStates = new WeakMap();
  let allowHover = true;

  chars.forEach(el => {
    const state = {
      from: { ...deform.from, weight: FONT_WEIGHT_FROM },
      to: {
        skewX: gsap.utils.random(-deform.to.skewX, deform.to.skewX),
        skewY: gsap.utils.random(-deform.to.skewY, deform.to.skewY),
        rotateZ: gsap.utils.random(-deform.to.rotateZ, deform.to.rotateZ),
        scale: gsap.utils.random(1.2, deform.to.scale),
        y: gsap.utils.random(-60, 60),
        weight: FONT_WEIGHT_TO
      },
      current: { ...deform.from, weight: FONT_WEIGHT_FROM },
      hoverTimeline: null,
      isHovering: false
    };
    transformStates.set(el, state);
    el.style.fontVariationSettings = `'wght' ${state.current.weight}`;
  });

  function applyState(el, s) {
    el.style.fontVariationSettings = `'wght' ${s.weight.toFixed(0)}`;
    gsap.set(el, {
      skewX: s.skewX,
      skewY: s.skewY,
      rotateZ: s.rotateZ,
      scale: s.scale,
      y: s.y
    });
  }

  function attachTitleHover() {
    chars.forEach((el) => {
      const state = transformStates.get(el);
      const s = state.current;

      el.addEventListener("mouseenter", () => {
        if (!allowHover || state.isHovering) return;
        state.isHovering = true;
        if (state.hoverTimeline) state.hoverTimeline.kill();

        state.hoverTimeline = gsap.timeline({
          overwrite: "auto",
          onComplete: () => {
            state.isHovering = false;
            state.hoverTimeline = null;
          }
        });

        state.hoverTimeline.to(s, {
          skewX: gsap.utils.random(-deform.hover.skewX, deform.hover.skewX),
          skewY: gsap.utils.random(-deform.hover.skewY, deform.hover.skewY),
          rotateZ: gsap.utils.random(-deform.hover.rotateZ, deform.hover.rotateZ),
          scale: deform.hover.scale,
          y: gsap.utils.random(-deform.hover.y, deform.hover.y),
          weight: FONT_WEIGHT_TO,
          duration: 0.4,
          onUpdate: () => applyState(el, s)
        });

        state.hoverTimeline.to(s, {
          skewX: 0, skewY: 0, rotateZ: 0, scale: 1, y: 0,
          weight: FONT_WEIGHT_FROM,
          duration: 0.8,
          ease: "expo.out",
          onUpdate: () => applyState(el, s)
        }, ">+0.3");
      });
    });
  }

  function initScrollDeform() {
    let greenOn = false;

    chars.forEach((char, idx) => {
      const state = transformStates.get(char);
      const from = state.from;
      const to = state.to;
      const current = state.current;

      ScrollTrigger.create({
        trigger: ".hero_wrapper",
        start: "top top",
        end: "bottom top",
        scrub: 0.3,
        onUpdate: self => {
          if (idx === 0) {
            if (self.progress >= 0.2 && !greenOn) {
              greenOn = true;
              gsap.to(".g-block", { backgroundColor: "transparent", duration: 0.5 });
              gsap.to(".g-block *", { opacity: 0.5, duration: 0.5 });
            } else if (self.progress < 0.2 && greenOn) {
              greenOn = false;
              gsap.to(".g-block", { backgroundColor: "#08965c", duration: 0.5 });
              gsap.to(".g-block *", { opacity: 1, duration: 0.5 });
            }
          }

          let percent = self.progress;
          if (percent < 0.2) {
            percent = 0;
          } else {
            percent = (percent - 0.2) / 0.8;
            percent = Math.min(Math.max(percent, 0), 1);
          }

          if (state.isHovering) return;

          current.skewX = gsap.utils.interpolate(from.skewX, to.skewX, percent);
          current.skewY = gsap.utils.interpolate(from.skewY, to.skewY, percent);
          current.rotateZ = gsap.utils.interpolate(from.rotateZ, to.rotateZ, percent);
          current.scale = gsap.utils.interpolate(from.scale, to.scale, percent);
          current.y = gsap.utils.interpolate(from.y, to.y, percent);
          current.weight = gsap.utils.interpolate(from.weight, to.weight, percent);
          applyState(char, current);

          allowHover = self.progress < 0.01;
        }
      });
    });
  }

  function createParallax(speedArr, scrubTime) {
    gsap.utils.toArray(".column").forEach((col, i) => {
      gsap.fromTo(col, { yPercent: 0 }, {
        yPercent: speedArr[i],
        ease: "none",
        scrollTrigger: {
          trigger: ".v-gallery",
          start: "top 50%",
          end: "bottom 50%",
          scrub: scrubTime
        }
      });
    });
  }

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.to(heroWrapper, { height: finalHeight, duration: 0.8, ease: "power4.out" });
  tl.to(".top_wrapper", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
  tl.to(".hero_bottom", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
  tl.to(greenBlock, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
  tl.to(jTitle, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

  tl.add(() => {
    attachTitleHover();
    initScrollDeform();
    createParallax([-20, -40, -10, -30], 0.5);
    gsap.delayedCall(0.05, () => ScrollTrigger.refresh());
  });
};
