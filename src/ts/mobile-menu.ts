const hamburger = document.querySelector<HTMLElement>('.hamburger');
const mobileMenu = document.querySelector<HTMLElement>('.mobile-menu');
const closeMobileMenu = document.querySelector<HTMLElement>('.mobile-menu__close');

if (hamburger && mobileMenu && closeMobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });

  closeMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
}
