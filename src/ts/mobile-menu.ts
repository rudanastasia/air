const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMobileMenu = document.querySelector('.mobile-menu__close');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('active');
});

closeMobileMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});
