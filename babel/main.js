const pageSlider = document.querySelector('.page-slider');
const pagination = document.querySelector('.pagination');
const wrapper = document.querySelector('.wrapper');

wrapper.style.minHeight = window.innerHeight + 'px';
wrapper.style.height = window.innerHeight + 'px';

window.onload = function () {
  document.body.classList.add('loaded');
}

if (pageSlider) {
  const swiper = pageSlider.querySelector('.swiper');

  const slider = new Swiper(swiper, {
    direction: 'vertical',
    slidesPerView: 1,
    pagination: {
      el: pagination,
      clickable: true
    },
    mousewheel: {
      releaseOnEdges: true
    },
  });

  slider.on('slideChangeTransitionEnd', () => {
    /**
     * @type {HTMLElement}
     */
    const activeSlide = slider.slides[slider.activeIndex];
    const prevSlide = slider.slides[slider.previousIndex];

    // Dynamic pagination bullet color
    pagination.querySelectorAll('.swiper-pagination-bullet').forEach((bullet) => {
      if (activeSlide.classList.contains('_bg-white')) {
        bullet.style.borderColor = '#000';
      } else if (activeSlide.classList.contains('_bg-grey')) {
        bullet.style.borderColor = '#ccc';
      } else {
        bullet.style.borderColor = '#fff';
      }
    })

    // Disable mousewheel and touchmove on active slide
    if (activeSlide.scrollHeight > activeSlide.clientHeight) {
      slider.allowTouchMove = false;
      slider.mousewheel.disable();
      activeSlide.addEventListener('scroll', ev => {;
        if (activeSlide.scrollTop === 0) {
          slider.allowTouchMove = true;
          slider.mousewheel.enable();
          console.log(1, activeSlide.scrollHeight, activeSlide.clientHeight);
        } else if (activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight) {
          slider.allowTouchMove = true;
          slider.mousewheel.enable();
          console.log(2, activeSlide.scrollHeight, activeSlide.clientHeight);
        } else {
          slider.allowTouchMove = false;
          slider.mousewheel.disable();
          console.log(3, activeSlide.scrollHeight, activeSlide.clientHeight);
        }
      })
    } else {
      slider.allowTouchMove = true;
      slider.mousewheel.enable();
    }

    pagination.addEventListener('click', ev => {
      prevSlide.scrollTo(0, 0);
    });
  });
}