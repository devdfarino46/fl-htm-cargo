const pageSlider = document.querySelector('.page-slider');


if (pageSlider) {
  

  const slider = new Swiper(pageSlider.querySelector('.swiper'), {
    direction: 'vertical',
    slidesPerView: 1,
    pagination: {
      el: '.pagination',
      clickable: true
    },
    allowSlideNext: false,
    allowSlidePrev: false
  });

  slider.on('touchMove', () => {
    console.log('sliderMove');
  })
}