"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function initPagination(_ref) {
  var section = _ref.section,
    itemsSelector = _ref.itemsSelector,
    _ref$itemsPerPage = _ref.itemsPerPage,
    itemsPerPage = _ref$itemsPerPage === void 0 ? 2 : _ref$itemsPerPage;
  var items = Array.from(section.querySelectorAll(itemsSelector));
  var pagerList = section.querySelector('.pager__list');
  var pagerDisplay = section.querySelector('.pager__display');
  if (!items.length || !pagerList || !pagerDisplay) {
    return;
  }
  var totalPages = Math.ceil(items.length / itemsPerPage);
  var currentPage = 1;
  var createPager = function createPager() {
    pagerList.innerHTML = '';
    var _loop = function _loop(i) {
      var pagerItem = document.createElement('li');
      pagerItem.classList.add('pager__item');
      if (i === currentPage) {
        pagerItem.classList.add('pager__item--active');
      }
      var pagerLink = document.createElement('a');
      pagerLink.href = '#';
      pagerLink.classList.add('pager__link');
      pagerLink.textContent = String(i);
      pagerLink.addEventListener('click', function (event) {
        event.preventDefault();
        showPage(i);
      });
      pagerItem.appendChild(pagerLink);
      pagerList.appendChild(pagerItem);
    };
    for (var i = 1; i <= totalPages; i++) {
      _loop(i);
    }
  };
  var showPage = function showPage(page) {
    var start = (page - 1) * itemsPerPage;
    var end = start + itemsPerPage;
    items.forEach(function (item, index) {
      item.style.display = index >= start && index < end ? '' : 'none';
    });
    currentPage = page;
    pagerDisplay.textContent = "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ".concat(currentPage, " \u0438\u0437 ").concat(totalPages);
    createPager();
  };
  showPage(currentPage);
}
var newsSection = document.querySelector('.section.news');
if (newsSection) {
  initPagination({
    section: newsSection,
    itemsSelector: '.news__list .news__item',
    itemsPerPage: 2
  });
}
var servicesSection = document.querySelector('.services-section');
if (servicesSection) {
  initPagination({
    section: servicesSection,
    itemsSelector: '.services__list .services__item',
    itemsPerPage: 2
  });
}
var reviewsSection = document.querySelector('.reviews-section');
if (reviewsSection) {
  initPagination({
    section: reviewsSection,
    itemsSelector: '.reviews__list .reviews__item',
    itemsPerPage: 4
  });
}