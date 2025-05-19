gsap.registerPlugin(ScrollTrigger, SplitText);

$(".split-text").each(function () {
  let $el = $(this);
  let split = new SplitText($el, {
    type: "chars,words,lines",
    charsClass: "split-chars",
    wordsClass: "split-words",
    linesClass: "split-lines"
  });
});

function createScrollAnim(type, selector, yValue, staggerAmt) {
  $(selector).each(function () {
    let trigger = $(this);
    let target = trigger.find(`.split-${type}`);

    gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "restart none none none"
      }
    }).from(target, {
      y: yValue,
      rotationX: -90,
      opacity: 0,
      ease: "power1.inOut",
      stagger: { amount: staggerAmt, from: "0" }
    });
  });
}

createScrollAnim("lines", ".line-animation", "150%", 0.4);
createScrollAnim("words", ".word-animation", "80%", 0.9);
createScrollAnim("chars", ".letter-animation", "60%", 0.7);
