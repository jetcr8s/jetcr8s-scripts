document.querySelectorAll('.project-img__wrapper').forEach(wrapper => {
  let timer = null;
  let index = 1;
  let prevIndex = 0;
  let hideTimeout = null;
  const frames = wrapper.querySelectorAll('.img-frame');
  if (frames.length <= 1) return;

  frames.forEach((img, i) => {
    img.style.display = i === 0 ? 'block' : 'none';
    gsap.set(img, {opacity: 1, scale: 1, filter: "blur(0px)", zIndex: i});
  });

  wrapper.addEventListener('mouseenter', () => {
    index = 1;
    showFrame(index, prevIndex);
    timer = setInterval(() => {
      prevIndex = index;
      index = (index + 1) % frames.length;
      showFrame(index, prevIndex);
    }, 1000);
  });

  wrapper.addEventListener('mouseleave', () => {
    clearInterval(timer);
    if (hideTimeout) clearTimeout(hideTimeout);
    resetFrames();
  });

  function showFrame(i, prev) {
    frames.forEach((img, idx) => {
      if (idx === i) {
        img.style.display = 'block';
        img.style.zIndex = 2;
        gsap.fromTo(img,
          {opacity: 0, scale: 1.01, filter: "blur(4px)"},
          {opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "sine.out"}
        );
      } else if (idx === prev) {
        img.style.display = 'block';
        img.style.zIndex = 1;
        gsap.to(img, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.2
        });
      } else {
        img.style.display = 'none';
        img.style.zIndex = 0;
      }
    });
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(resetFrames, 700);
  }

  function resetFrames() {
    frames.forEach((img, i) => {
      img.style.display = i === 0 ? 'block' : 'none';
      img.style.zIndex = 0;
      gsap.set(img, {opacity: 1, scale: 1, filter: "blur(0px)"});
    });
    index = 1;
    prevIndex = 0;
  }
});
