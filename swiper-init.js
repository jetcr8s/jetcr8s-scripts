const swiperEl = document.querySelector('.swiper.is-project');
if (swiperEl) {
  const em = parseFloat(getComputedStyle(swiperEl).fontSize);
  const halfEm = 2 * em;

  new Swiper(".swiper.is-project", {
    loop: false,
    parallax: true,
    slidesPerView: 1,
    spaceBetween: 0,
    allowTouchMove: true,
    navigation: {
      nextEl: ".swiper-btn-next",
      prevEl: ".swiper-btn-prev"
    },
    breakpoints: {
      480: { slidesPerView: 1 },
      768: { slidesPerView: 1.2, spaceBetween: 10 },
      1024: { slidesPerView: 2.535, spaceBetween: halfEm }
    }
  });
}
