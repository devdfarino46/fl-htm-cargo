const toMainBtn = document.querySelector('.to-main-btn');
const sections = document.querySelectorAll('.section');

function setActiveSection() {
  sections.forEach((section) => {
    if (
      section.getBoundingClientRect().top <= window.innerHeight - 40 && section.getBoundingClientRect().bottom >= 40
    ) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
}

window.onload = function () {
  document.body.classList.add('loaded');
  setActiveSection();
}

window.addEventListener('scroll', ev => {
  setActiveSection();
});