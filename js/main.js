const pageSlider = document.querySelector('.page-slider');
const pagination = document.querySelector('.pagination');
const wrapper = document.querySelector('.wrapper');
const toMainBtn = document.querySelector('.to-main-btn');

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
    allowTouchMove: false,
    speed: 600
  });

  slider.on('slideChangeTransitionEnd', () => {
    /**  @type {HTMLElement} */
    const activeSlide = slider.slides[slider.activeIndex];
    /**  @type {HTMLElement} */
    const prevSlide = slider.slides[slider.previousIndex];

    pagination.addEventListener('click', ev => {
      prevSlide.scrollTop = 0;
    });

    toMainBtn.addEventListener('click', () => {
      activeSlide.scrollTop = 0;
      slider.slideTo(0);
    });

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

    if (slider.activeIndex !== 0) {
      toMainBtn.classList.add('_visible');
    } else {
      toMainBtn.classList.remove('_visible');
    }
  });

  let prevTouchY = 0;
  let prevScroll = 0;
  let stopTouchMove = true;
  pageSlider.addEventListener('touchstart', function (e) {
    prevTouchY = e.touches[0].clientY;
    prevScroll = slider.slides[slider.activeIndex].scrollTop;
    stopTouchMove = false;
  })
  pageSlider.addEventListener('touchmove', function (e) {
    const activeSlide = slider.slides[slider.activeIndex];

    let currentTouchY = e.touches[0].clientY;
    let currentScroll = activeSlide.scrollTop;

    let scrollDiff = currentScroll - prevScroll;
    let touchDiff = currentTouchY - prevTouchY;

    console.log(touchDiff, scrollDiff);

    if (touchDiff < 0 && (activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight) && !stopTouchMove) {
      slider.slideNext();
      stopTouchMove = true;
    } else if (touchDiff > 0 && activeSlide.scrollTop === 0 && !stopTouchMove) {
      slider.slidePrev();
      stopTouchMove = true;
    }
  });

  let mousewheelToSlide = true;
  
  slider.on('transitionStart', () => {
    mousewheelToSlide = false;
  });

  slider.on('transitionEnd', () => {
    mousewheelToSlide = true;
  })

  pageSlider.addEventListener('wheel', function (e) {
    const activeSlide = slider.slides[slider.activeIndex];

    if (mousewheelToSlide && e.deltaY > 0 && (activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight)) {
      slider.slideNext();
      mousewheelToSlide = false;
    } else if (mousewheelToSlide && e.deltaY < 0 && activeSlide.scrollTop === 0) {
      slider.slidePrev();
      mousewheelToSlide = false;
    }
  });
}