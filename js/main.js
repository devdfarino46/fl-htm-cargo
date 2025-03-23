"use strict";

var pageSlider = document.querySelector('.page-slider');
var pagination = document.querySelector('.pagination');
var wrapper = document.querySelector('.wrapper');
wrapper.style.minHeight = window.innerHeight + 'px';
wrapper.style.height = window.innerHeight + 'px';
window.onload = function () {
  document.body.classList.add('loaded');
};
if (pageSlider) {
  var swiper = pageSlider.querySelector('.swiper');
  var slider = new Swiper(swiper, {
    direction: 'vertical',
    slidesPerView: 1,
    pagination: {
      el: pagination,
      clickable: true
    },
    mousewheel: {
      releaseOnEdges: true
    }
  });
  slider.on('slideChangeTransitionEnd', function () {
    /**
     * @type {HTMLElement}
     */
    var activeSlide = slider.slides[slider.activeIndex];
    var prevSlide = slider.slides[slider.previousIndex];

    // Dynamic pagination bullet color
    pagination.querySelectorAll('.swiper-pagination-bullet').forEach(function (bullet) {
      if (activeSlide.classList.contains('_bg-white')) {
        bullet.style.borderColor = '#000';
      } else if (activeSlide.classList.contains('_bg-grey')) {
        bullet.style.borderColor = '#ccc';
      } else {
        bullet.style.borderColor = '#fff';
      }
    });

    // Disable mousewheel and touchmove on active slide
    if (activeSlide.scrollHeight > activeSlide.clientHeight) {
      slider.allowTouchMove = false;
      slider.mousewheel.disable();
      activeSlide.addEventListener('scroll', function (ev) {
        ;
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
      });
    } else {
      slider.allowTouchMove = true;
      slider.mousewheel.enable();
    }
    pagination.addEventListener('click', function (ev) {
      prevSlide.scrollTo(0, 0);
    });
  });
}
//# sourceMappingURL=main.js.map
