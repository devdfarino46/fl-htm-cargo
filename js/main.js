const burgerBtn = document.querySelector('.burger-btn');
const menu = document.querySelector('.menu');
const passwInputs = document.querySelectorAll('.input_password');
const exchange = document.querySelector('.exchange');
const tabs = document.querySelectorAll('.tabs');
const postTabs = document.querySelectorAll('.post-tabs');
const faq = document.querySelector('.faq');
const testim = document.querySelector('.testim');

if (burgerBtn && menu) {
    burgerBtn.addEventListener('click', () => {
        menu.classList.toggle('_active');
        burgerBtn.classList.toggle('_active');
    });
}

passwInputs.forEach((input) => {
  if (input) {
    const btn = input.querySelector('button');
    const inputEl = input.querySelector('input');

    btn.addEventListener('click', () => {
      inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    })
  }
});

if (exchange) {
  const input = exchange.querySelectorAll('.exchange__input input');
  
  const INR = 31520; // 1 USD = 31520 INR

  const rounded = (value) => {
    return +value.toFixed(3);
  }

  input[0].addEventListener('input', (ev) => {
    input[1].value = rounded(input[0].value / INR);
  })
}

tabs.forEach((tab) => {
  const tabBtns = tab.querySelectorAll('.tabs__btns .btn');

  tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', ev => {
      if (!btn.classList.contains('_active')) {
        console.log(22);
        
        const activeBtn = tab.querySelector('.tabs__btns .btn._active');
        const activeContent = tab.querySelector('.tabs__content._active');
        
        activeBtn.classList.remove('_active');
        activeContent.classList.remove('_active');
  
        const attribute = btn.getAttribute('data-tab');
        const tabContent = tab.querySelector(`.tabs__content[data-tab="${attribute}"]`);
  
        btn.classList.add('_active');
        tabContent.classList.add('_active');
      }
    });
  })
});

postTabs.forEach((tab) => {
  const tabBtns = tab.querySelectorAll('.post-tabs__btn');

  tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', ev => {
      const activeBtn = tab.querySelector('.post-tabs__btn._active');
      const activeContent = tab.querySelector('.post-tabs__content._active');
      
      activeBtn.classList.remove('_active');
      activeContent.classList.remove('_active');

      const attribute = btn.getAttribute('data-tab');
      const tabContent = tab.querySelector(`.post-tabs__content[data-tab="${attribute}"]`);

      btn.classList.add('_active');
      tabContent.classList.add('_active');
    });
  })
});

if (faq) {
  const btn = faq.querySelector('.faq__btn');
  const list = faq.querySelector('.faq__list');

  btn.addEventListener('click', ev => {
    list.classList.add('_opened');
    btn.setAttribute('disabled', '');
  })
}

if (testim) {
  const sliders = testim.querySelectorAll('.testim__slider');

  sliders.forEach(sliderSelector => {
    const btns = sliderSelector.querySelectorAll('.testim__slider-btn');
    let slider = new Swiper(sliderSelector.querySelector('.swiper'), {
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: 40,
      allowTouchMove: false,
      loop: true,
  
      breakpoints: {
        1420: {
          slidesPerView: 3,
          spaceBetween: 60,
        }
      },

      navigation: {
        prevEl: btns[0],
        nextEl: btns[1]
      }
    });
  });
}