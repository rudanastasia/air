"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
///Вспомогательная функция для проверки элементов на null///
function queryRequired(selector) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var element = root.querySelector(selector);
  if (!element) {
    throw new Error("\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D: ".concat(selector));
  }
  return element;
}
///

document.addEventListener('DOMContentLoaded', function () {
  var myForm = document.querySelector('#myForm');
  if (!myForm) return;
  var sendButton = queryRequired('#sendButton');
  var socialLink = queryRequired('#social-link');
  var nameInput = queryRequired('#name');
  var messageInput = queryRequired('#message');
  var servicesControls = queryRequired('.form__controls', myForm);
  var servicesError = servicesControls.nextElementSibling;
  var myModal = queryRequired('#myModal');
  var modalText = queryRequired('.modal__body p', myModal);
  var modalButton = queryRequired('.btn-modal', myModal);
  var VK_REGEX = /^https:\/\/(www\.)?vk\.ru\/id\d+$/;
  var FORMSPREE_URL = 'https://formspree.io/f/xojgoeee';

  ///==========================================
  ///======Обработка ошибок в полях ввода======
  ///==========================================
  function getErrorElement(input) {
    return input.nextElementSibling;
  }
  function showError(input) {
    getErrorElement(input).style.display = 'block';
    input.classList.add('input-error');
  }
  function hideError(input) {
    getErrorElement(input).style.display = 'none';
    input.classList.remove('input-error');
  }
  function validateField(input, hasError) {
    if (hasError) {
      showError(input);
      return false;
    }
    hideError(input);
    return true;
  }

  //==========================
  //======Модальное окно======
  //==========================
  function showModal(message) {
    modalText.textContent = message;
    myModal.style.display = 'block';
  }
  function hideModal() {
    myModal.style.display = 'none';
  }

  //======Закрытие модального окна======
  modalButton.addEventListener('click', function (e) {
    e.preventDefault();
    hideModal();
  });
  myModal.addEventListener('click', function (e) {
    if (e.target === myModal) {
      hideModal();
    }
  });

  // =========================
  // ===== Проверка полей ====
  // =========================

  // =====Валидация имени =====
  function isValidName(value) {
    var name = value.trim();
    return name.length >= 2 && /^[a-zA-Zа-яА-ЯёЁ ]+$/.test(name);
  }

  // Проверка итогового значения имени
  nameInput.addEventListener('input', function () {
    nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-ЯёЁ ]/g, '');
    var invalid = !isValidName(nameInput.value);
    if (invalid) {
      showError(nameInput);
    } else {
      hideError(nameInput);
    }
  });

  // ===== Проверка VK =====
  function isVkInvalid(value) {
    var link = value.trim();
    return link !== '' && !VK_REGEX.test(link);
  }

  //  Проверка введенной ссылки VK
  socialLink.addEventListener('input', function () {
    var invalid = isVkInvalid(socialLink.value);
    if (!invalid) {
      hideError(socialLink);
      socialLink.setCustomValidity('');
      return;
    }
    showError(socialLink);
    socialLink.setCustomValidity('Введите ссылку на профиль VK в формате https://vk.ru/id12345');
  });

  // ===== Проверка отзыва =====
  function isInvalidMessage(value) {
    var message = value.trim();
    return message === '' || message.length < 10;
  }
  messageInput.addEventListener('input', function () {
    if (isInvalidMessage(messageInput.value)) {
      showError(messageInput);
    } else {
      hideError(messageInput);
    }
  });

  // ===== Проверка услуг =====
  function areServicesInvalid() {
    if (!myForm) {
      return true;
    }
    var services = myForm.querySelectorAll('input[name="used-service"]:checked');
    console.log('Выбрано услуг:', services.length);
    var invalid = services.length === 0;
    servicesError.style.display = invalid ? 'block' : 'none';
    return invalid;
  }
  if (myForm) {
    var serviceInputs = myForm.querySelectorAll('input[name="used-service"]');
    serviceInputs.forEach(function (service) {
      service.addEventListener('change', function () {
        areServicesInvalid();
      });
    });
  }

  //===========================
  //======Валидация формы======
  //===========================
  var validateForm = function validateForm() {
    var isValid = true;

    //=====VK======
    if (!validateField(socialLink, isVkInvalid(socialLink.value))) {
      isValid = false;
    }

    //=====Имя======
    if (!validateField(nameInput, !isValidName(nameInput.value))) {
      isValid = false;
    }

    //=====Отзыв======
    if (!validateField(messageInput, isInvalidMessage(messageInput.value))) {
      isValid = false;
    }

    //=====Услуги======
    if (areServicesInvalid()) {
      isValid = false;
    }
    return isValid;
  };

  //=========================
  //=====Отправка формы======
  //=========================
  myForm.addEventListener('submit', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var response, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            e.preventDefault();
            if (validateForm()) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            sendButton.disabled = true;
            _context.p = 2;
            _context.n = 3;
            return fetch(FORMSPREE_URL, {
              method: 'POST',
              headers: {
                Accept: 'application/json'
              },
              body: new FormData(myForm)
            });
          case 3:
            response = _context.v;
            if (response.ok) {
              _context.n = 4;
              break;
            }
            throw new Error('Ошибка при отправке отзыва');
          case 4:
            _context.n = 5;
            return response.json();
          case 5:
            data = _context.v;
            console.log('Спасибо, ваш отзыв успешно отправлен:', data);
            showModal('Спасибо, ваш отзыв успешно отправлен!');
            myForm.reset();
            [socialLink, nameInput, messageInput].forEach(hideError);
            servicesError.style.display = 'none';
            _context.n = 7;
            break;
          case 6:
            _context.p = 6;
            _t = _context.v;
            console.log('Возникла ошибка отправки:', _t);
            showModal('Возникла ошибка, повторите отправку');
          case 7:
            _context.p = 7;
            sendButton.disabled = false;
            return _context.f(7);
          case 8:
            return _context.a(2);
        }
      }, _callee, null, [[2, 6, 7, 8]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
});