"use strict";

var hamburger = document.querySelector('.hamburger');
var mobileMenu = document.querySelector('.mobile-menu');
var closeMobileMenu = document.querySelector('.mobile-menu__close');
if (hamburger && mobileMenu && closeMobileMenu) {
  hamburger.addEventListener('click', function () {
    mobileMenu.classList.add('active');
  });
  closeMobileMenu.addEventListener('click', function () {
    mobileMenu.classList.remove('active');
  });
}