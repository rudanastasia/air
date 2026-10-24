const hamburger = document.querySelector<HTMLElement>('.hamburger');
const mobileMenu = document.querySelector<HTMLElement>('.mobile-menu');
const closeMobileMenu = document.querySelector<HTMLElement>('.mobile-menu__close');

if (hamburger && mobileMenu && closeMobileMenu) {
  const toggleMenu = (isOpen: boolean) => {
    mobileMenu.classList.toggle('active', isOpen);
  };

  hamburger.addEventListener('click', () => toggleMenu(true));
  closeMobileMenu.addEventListener('click', () => toggleMenu(false));
}
