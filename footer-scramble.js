gsap.registerPlugin(ScrambleTextPlugin);

const footerSelector = ".footer_next";
const scrambleSettingsFooter = {
  text: "Next: let's cr8",
  chars: "01zxcr8!<>:let's ",
  revealDelay: 0.3,
  speed: 0.33
};
const originalTextFooter = "Next: let's cr8";
let atBottom = false;
let scrambleTimeout = null;

window.addEventListener("scroll", () => {
  const footer = document.querySelector(footerSelector);
  if (!footer) return;
  const footerRect = footer.getBoundingClientRect();
  const reached = footerRect.top <= window.innerHeight && footerRect.bottom > 0;

  if (reached && !atBottom) {
    atBottom = true;
    if (scrambleTimeout) {
      gsap.killTweensOf(footer);
      clearTimeout(scrambleTimeout);
    }
    scrambleTimeout = setTimeout(() => {
      gsap.to(footer, {
        scrambleText: scrambleSettingsFooter,
        duration: 3,
        ease: "power2.out"
      });
    }, 1000);
  }
  if (!reached && atBottom) {
    atBottom = false;
    if (scrambleTimeout) {
      gsap.killTweensOf(footer);
      clearTimeout(scrambleTimeout);
      scrambleTimeout = null;
    }
    gsap.set(footer, { scrambleText: { text: originalTextFooter } });
  }
});

// Hover Scramble for .scramble-link
const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!<>*";
const scrambleInterval = 8000;

document.querySelectorAll(".scramble-link").forEach(el => {
  if (!el.dataset.originalText) {
    el.dataset.originalText = el.textContent;
  }
});

let scrollStopTimer = null;

function startScramble() {
  document.querySelectorAll(".scramble-link").forEach(el => {
    clearTimeout(el._scrambleTimeout);
    const original = el.dataset.originalText;
    function randomStr() {
      let str = "";
      for (let i = 0; i < original.length; i++) {
        str += (original[i] === " ") ? " " : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }
      return str;
    }
    function scrambleLoop() {
      el.textContent = randomStr();
      el._scrambleTimeout = setTimeout(scrambleLoop, scrambleInterval);
    }
    scrambleLoop();
  });
}

function stopScramble() {
  document.querySelectorAll(".scramble-link").forEach(el => {
    clearTimeout(el._scrambleTimeout);
    el.textContent = el.dataset.originalText;
  });
}

window.addEventListener("scroll", () => {
  startScramble();
  clearTimeout(scrollStopTimer);
  scrollStopTimer = setTimeout(() => {
    stopScramble();
  }, 200);
});
