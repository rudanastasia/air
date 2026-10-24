"use strict";

var hamburger = document.querySelector('.hamburger');
var mobileMenu = document.querySelector('.mobile-menu');
var closeMobileMenu = document.querySelector('.mobile-menu__close');
if (hamburger && mobileMenu && closeMobileMenu) {
  var toggleMenu = function toggleMenu(isOpen) {
    mobileMenu.classList.toggle('active', isOpen);
  };
  hamburger.addEventListener('click', function () {
    return toggleMenu(true);
  });
  closeMobileMenu.addEventListener('click', function () {
    return toggleMenu(false);
  });
}