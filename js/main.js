const pageSlider = document.querySelector('.page-slider');
const pagination = document.querySelector('.pagination');


if (pageSlider) {
  const slides = pageSlider.querySelectorAll('.page-slide');

  const slider = new Swiper(pageSlider.querySelector('.swiper'), {
    direction: 'vertical',
    slidesPerView: 1,
    pagination: {
      el: pagination,
      clickable: true
    }
  });

  slider.on('slideChange', () => {
    /**
     * @type {HTMLElement}
     */
    const activeSlide = slider.slides[slider.activeIndex];
    /**
     * @type {HTMLElement}
     */
    const prevSlide = slider.slides[slider.previousIndex];

    if (activeSlide.scrollHeight > window.innerHeight) {
      slider.allowTouchMove = false;

      activeSlide.addEventListener('scroll', () => {
        if (
          activeSlide.scrollTop === 0 ||
          activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight
        ) {
          slider.allowTouchMove = true;
        }
      });

      pagination.addEventListener('click', ev => {
        prevSlide.scrollTo(0, 0);
      });
    }
  });
}