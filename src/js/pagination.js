"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _excluded = ["section"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function initPagination(_ref) {
  var section = _ref.section,
    itemsSelector = _ref.itemsSelector,
    _ref$itemsPerPage = _ref.itemsPerPage,
    itemsPerPage = _ref$itemsPerPage === void 0 ? 2 : _ref$itemsPerPage;
  var items = section.querySelectorAll(itemsSelector);
  var pagerList = section.querySelector('.pager__list');
  var pagerDisplay = section.querySelector('.pager__display');

  ///==== Проверяем наличие элементов пагинации ====
  if (!items.length || !pagerList || !pagerDisplay) {
    console.warn('Пагинация не инициализирована:', {
      items: items.length,
      pagerList: pagerList,
      pagerDisplay: pagerDisplay
    });
    return;
  }

  ///==== Проверяем корректно ли задано количество элементов списка на страницу ====
  if (itemsPerPage < 1) {
    console.error('Элементов списка должно быть больше 0');
    return;
  }

  ///==== Вычисляем общее количество страниц в пагинации ====
  var totalPages = Math.ceil(items.length / itemsPerPage);

  ///==== Отображаем активную страницу ====
  var showPage = function showPage(page) {
    var start = (page - 1) * itemsPerPage;
    var end = start + itemsPerPage;
    items.forEach(function (item, index) {
      item.style.display = index >= start && index < end ? '' : 'none';
    });
    pagerDisplay.textContent = "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ".concat(page, " \u0438\u0437 ").concat(totalPages);

    ///==== Создаем ссылки в пагинации (кнопки страниц)====
    pagerList.innerHTML = Array.from({
      length: totalPages
    }, function (_, i) {
      var number = i + 1;
      var active = number === page ? ' pager__item--active' : '';
      return "\n          <li class=\"pager__item".concat(active, "\">\n            <a href=\"#\" class=\"pager__link\" data-page=\"").concat(number, "\">\n              ").concat(number, "\n            </a>\n          </li>\n        ");
    }).join('');
  };
  pagerList.addEventListener('click', function (event) {
    var target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    var link = target.closest('.pager__link');
    if (!link || !pagerList.contains(link)) {
      return;
    }
    event.preventDefault();
    var page = Number(link.dataset.page);
    if (Number.isInteger(page) && page >= 1 && page <= totalPages) {
      showPage(page);
    }
  });
  showPage(1);
}
var paginations = [{
  section: '.section.news',
  itemsSelector: '.news__list .news__item',
  itemsPerPage: 2
}, {
  section: '.services-section',
  itemsSelector: '.services__list .services__item',
  itemsPerPage: 2
}, {
  section: '.reviews-section',
  itemsSelector: '.reviews__list .reviews__item',
  itemsPerPage: 4
}];
paginations.forEach(function (_ref2) {
  var sectionSelector = _ref2.section,
    options = _objectWithoutProperties(_ref2, _excluded);
  var section = document.querySelector(sectionSelector);
  if (section) {
    initPagination(_objectSpread({
      section: section
    }, options));
  }
});