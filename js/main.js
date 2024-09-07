const pageSlider = document.querySelector('.page-slider');
const pagination = document.querySelector('.pagination');
const wrapper = document.querySelector('.wrapper');

wrapper.style.minHeight = window.innerHeight + 'px';
wrapper.style.height = window.innerHeight + 'px';


if (pageSlider) {
  const swiper = pageSlider.querySelector('.swiper');

  const slider = new Swiper(swiper, {
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
        } else {
          slider.allowTouchMove = false;
        }
      });

      pagination.addEventListener('click', ev => {
        prevSlide.scrollTo(0, 0);
      });
    } else {
      slider.allowTouchMove = true;
    }
  });
}