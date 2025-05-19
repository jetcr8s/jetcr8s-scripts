window.toggleHoverSection = function () {
  const gallery = document.querySelector(".v-gallery");
  const hero = document.querySelector(".hero_wrapper");
  const showreel = document.querySelector(".container-show");
  const columns = document.querySelectorAll(".column");

  let threshold = window.innerHeight * 0.2;
  window.addEventListener("resize", () => threshold = window.innerHeight * 0.2);

  window.addEventListener("scroll", () => {
    const isMobile = window.innerWidth <= 767;
    if (window.scrollY > threshold) {
      gallery?.classList.add("hover-active");
      gallery?.classList.remove("no-pointer", "disable-hover");
      hero?.classList.add("bg-white");
      showreel?.classList.add("gap-added");
      columns.forEach(col => col.classList.add("gap-added"));
      if (isMobile) gallery?.classList.add("bright");
    } else {
      gallery?.classList.remove("hover-active");
      gallery?.classList.add("no-pointer", "disable-hover");
      hero?.classList.remove("bg-white");
      showreel?.classList.remove("gap-added");
      columns.forEach(col => col.classList.remove("gap-added"));
      if (isMobile) gallery?.classList.remove("bright");
    }
  });
};
