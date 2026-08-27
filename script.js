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
