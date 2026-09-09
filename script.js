function initPagination({ section, itemsSelector, itemsPerPage = 2 }) {
  const items = Array.from(section.querySelectorAll(itemsSelector));
  const pagerList = section.querySelector('.pager__list');
  const pagerDisplay = section.querySelector('.pager__display');

  if (!items.length || !pagerList || !pagerDisplay) {
    return;
  }

  const totalPages = Math.ceil(items.length / itemsPerPage);
  let currentPage = 1;

  function createPager() {
    pagerList.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const pagerItem = document.createElement('li');
      pagerItem.classList.add('pager__item');

      if (i === currentPage) {
        pagerItem.classList.add('pager__item--active');
      }

      const pagerLink = document.createElement('a');
      pagerLink.href = '#';
      pagerLink.classList.add('pager__link');
      pagerLink.textContent = i;

      pagerLink.addEventListener('click', (event) => {
        event.preventDefault();
        showPage(i);
      });

      pagerItem.appendChild(pagerLink);
      pagerList.appendChild(pagerItem);
    }
  }

  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
      item.style.display = index >= start && index < end ? '' : 'none';
    });

    currentPage = page;

    pagerDisplay.textContent = `Страница ${currentPage} из ${totalPages}`;

    createPager();
  }

  showPage(currentPage);
}

const newsSection = document.querySelector('.section.news');

if (newsSection) {
  initPagination({
    section: newsSection,
    itemsSelector: '.news__list .news__item',
    itemsPerPage: 2,
  });
}

const servicesSection = document.querySelector('.services-section');

if (servicesSection) {
  initPagination({
    section: servicesSection,
    itemsSelector: '.services__list .services__item',
    itemsPerPage: 2,
  });
}

const reviewsSection = document.querySelector('.reviews-section');

if (reviewsSection) {
  initPagination({
    section: reviewsSection,
    itemsSelector: '.reviews__list .reviews__item',
    itemsPerPage: 4,
  });
}

////
////Работа формы отправки отзывов////
////
const myForm = document.querySelector('#myForm');
const sendButton = document.querySelector('#sendButton');

const socialLink = document.querySelector('#social-link');
const nameInput = document.querySelector('#name');
const messageInput = document.querySelector('#message');

const servicesControls = myForm.querySelector('.form__controls');
const servicesError = servicesControls.nextElementSibling;

const myModal = document.querySelector('#myModal');
const modalText = myModal.querySelector('.modal__body p');
const modalButton = myModal.querySelector('.btn-modal');

const VK_REGEX = /^https:\/\/(www\.)?vk\.ru\/id\d+$/;
const FORMSPREE_URL = 'https://formspree.io/f/xojgoeee';

//======Обработка ошибок в полях ввода======
function showError(input) {
  input.nextElementSibling.style.display = 'block';
  input.classList.add('input-error');
}

function hideError(input) {
  input.nextElementSibling.style.display = 'none';
  input.classList.remove('input-error');
}

function validateField(input, condition) {
  if (condition) {
    showError(input);
    return false;
  }

  hideError(input);
  return true;
}

//======Модальное окно======
function showModal(message) {
  modalText.textContent = message;
  myModal.style.display = 'block';
}

function hideModal() {
  myModal.style.display = 'none';
}

//======Закрытие модального окна======
modalButton.addEventListener('click', (e) => {
  e.preventDefault();
  hideModal();
});

myModal.addEventListener('click', (e) => {
  if (e.target === myModal) {
    hideModal();
  }
});

//======Валидация формы======

function validateForm() {
  let isValid = true;

  //=====VK======
  const link = socialLink.value.trim();
  const isVkInvalid = link !== '' && !VK_REGEX.test(link);

  if (!validateField(socialLink, isVkInvalid)) {
    isValid = false;
  }

  //=====Имя======
  const name = nameInput.value.trim();

  if (!validateField(nameInput, name === '' || name.length < 2)) {
    isValid = false;
  }

  //=====Отзыв======
  const message = messageInput.value.trim();

  if (!validateField(messageInput, message === '' || message.length < 10)) {
    isValid = false;
  }

  //=====Услуги======
  const services = myForm.querySelectorAll('input[name="used-service"]:checked');
  const servicesInvalid = services.length === 0;

  servicesError.style.display = servicesInvalid ? 'block' : 'none';

  if (servicesInvalid) {
    isValid = false;
  }
  return isValid;
}

//=====Отправка формы======
myForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  sendButton.disabled = true;

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: new FormData(myForm),
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке отзыва');
    }

    const data = await response.json();

    console.log('Спасибо, ваш отзыв успешно отправлен:', data);

    showModal('Спасибо, ваш отзыв успешно отправлен!');
    myForm.reset();

    [socialLink, nameInput, messageInput].forEach(hideError);
    servicesError.style.display = 'none';
  } catch (error) {
    console.log('Возникла ошибка отправки:', error);
    showModal('Возникла ошибка, повторите отправку');
  } finally {
    sendButton.disabled = false;
  }
});

// ===== Проверка VK при вводе =====
socialLink.addEventListener('input', (e) => {
  const value = e.target.value.trim();

  if (value === '' || VK_REGEX.test(value)) {
    hideError(socialLink);
    socialLink.setCustomValidity('');
    return;
  }

  showError(socialLink);
  socialLink.setCustomValidity('Введите ссылку на профиль VK в формате https://vk.ru/id12345');
});

// =====Ограничение имени =====
nameInput.addEventListener('keydown', (event) => {
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];

  if (allowedKeys.includes(event.key)) {
    return;
  }

  if (/^[a-zA-Zа-яА-ЯёЁ ]$/.test(event.key)) {
    return;
  }

  event.preventDefault();
});
