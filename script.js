////
////Слайдер-пагинация для новостей////
////
const newsSection = document.querySelector('.section.news');

if (newsSection) {
  const newsItems = Array.from(newsSection.querySelectorAll('.news__list .news__item'));
  const pagerList = newsSection.querySelector('.pager__list');
  const pagerDisplay = newsSection.querySelector('.pager__display');

  const itemsPerPage = 2;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  let currentPage = 1;

  // Создаем кнопки пагинации
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

  // Показываем новости выбранной страницы
  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    newsItems.forEach((item, index) => {
      item.style.display = index >= start && index < end ? '' : 'none';
    });

    currentPage = page;

    pagerDisplay.textContent = `Страница ${currentPage} из ${totalPages}`;

    createPager();
  }

  showPage(currentPage);
}

////
////Слайдер-пагинация для услуг////
////
const servicesSection = document.querySelector('.services-section');

if (servicesSection) {
  const servicesItems = Array.from(
    servicesSection.querySelectorAll('.services__list .services__item'),
  );
  const pagerList = servicesSection.querySelector('.pager__list');
  const pagerDisplay = servicesSection.querySelector('.pager__display');

  const itemsPerPage = 2;
  const totalPages = Math.ceil(servicesItems.length / itemsPerPage);

  let currentPage = 1;

  // Создаем кнопки пагинации
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

  // Показываем услуги выбранной страницы
  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    servicesItems.forEach((item, index) => {
      item.style.display = index >= start && index < end ? '' : 'none';
    });

    currentPage = page;

    pagerDisplay.textContent = `Страница ${currentPage} из ${totalPages}`;

    createPager();
  }

  showPage(currentPage);
}

////
////Слайдер-пагинация для отзывов////
////
const reviewsSection = document.querySelector('.reviews-section');

if (reviewsSection) {
  const reviewsItems = Array.from(reviewsSection.querySelectorAll('.reviews__list .reviews__item'));
  const pagerList = reviewsSection.querySelector('.pager__list');
  const pagerDisplay = reviewsSection.querySelector('.pager__display');

  const itemsPerPage = 4;
  const totalPages = Math.ceil(reviewsItems.length / itemsPerPage);

  let currentPage = 1;

  // Создаем кнопки пагинации
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

  // Показываем отзывы выбранной страницы
  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    reviewsItems.forEach((item, index) => {
      item.style.display = index >= start && index < end ? '' : 'none';
    });

    currentPage = page;

    pagerDisplay.textContent = `Страница ${currentPage} из ${totalPages}`;

    createPager();
  }

  showPage(currentPage);
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

//======Поля ввода======
function showError(input) {
  input.nextElementSibling.style.display = 'block';
  input.classList.add('input-error');
}

function hideError(input) {
  input.nextElementSibling.style.display = 'none';
  input.classList.remove('input-error');
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

sendButton.addEventListener('click', (e) => {
  e.preventDefault();

  let isValid = true;

  //=====Валидация VK======
  const link = socialLink.value.trim();

  if (link !== '' && !/^https:\/\/(www\.)?vk\.ru\/id\d+$/.test(link)) {
    showError(socialLink);
    isValid = false;
  } else {
    hideError(socialLink);
  }

  //=====Валидация имени======
  const name = nameInput.value.trim();

  if (name === '' || name.length < 2) {
    showError(nameInput);
    isValid = false;
  } else {
    hideError(nameInput);
  }

  //=====Валидация отзыва======
  const message = messageInput.value.trim();

  if (message === '' || message.length < 10) {
    showError(messageInput);
    isValid = false;
  } else {
    hideError(messageInput);
  }

  //=====Валидация услуг======
  const services = myForm.querySelectorAll('input[name="used-service"]:checked');

  if (services.length === 0) {
    servicesError.style.display = 'block';
    isValid = false;
  } else {
    servicesError.style.display = 'none';
  }

  //=====Отправка формы======
  if (isValid) {
    fetch('https://formspree.io/f/xojgoeee', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: new FormData(myForm),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка отправки формы');
        }

        return response.json();
      })
      .then((data) => {
        console.log('Ваш отзыв успешно отправлен:', data);

        showModal('Ваш отзыв успешно отправлен');

        myForm.reset();
      })
      .catch((error) => {
        console.error('Ошибка отправки:', error);

        showModal('Возникла ошибка, повторите попытку');
      });
  }
});

// ===== Проверка ввода ссылки VK =====
socialLink.addEventListener('input', (e) => {
  const value = e.target.value.trim();

  if (value === '') {
    e.target.setCustomValidity('');
    e.target.classList.remove('input-error');
    return;
  }

  if (!/^https:\/\/(www\.)?vk\.ru\/id\d+$/.test(value)) {
    e.target.setCustomValidity('Введите ссылку на профиль VK');
    e.target.classList.add('input-error');
  } else {
    e.target.setCustomValidity('');
    e.target.classList.remove('input-error');
  }
});

// ===== Органичение символов ввода для имени =====
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
