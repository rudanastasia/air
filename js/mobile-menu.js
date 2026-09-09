const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMobileMeny = document.querySelector('.mobile-menu__close');

hamburger.addEventListener('click', () => {
  mobileMenu.style.display = 'flex';
});

closeMobileMeny.addEventListener('click', () => {
  mobileMenu.style.display = 'none';
});
