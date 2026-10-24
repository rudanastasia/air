interface PaginationOptions {
  section: HTMLElement;
  itemsSelector: string;
  itemsPerPage?: number;
}

function initPagination({ section, itemsSelector, itemsPerPage = 2 }: PaginationOptions): void {
  const items = Array.from(section.querySelectorAll<HTMLElement>(itemsSelector));
  const pagerList = section.querySelector<HTMLElement>('.pager__list');
  const pagerDisplay = section.querySelector<HTMLElement>('.pager__display');

  if (!items.length || !pagerList || !pagerDisplay) {
    return;
  }

  const totalPages = Math.ceil(items.length / itemsPerPage);
  let currentPage = 1;

  const createPager = (): void => {
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
      pagerLink.textContent = String(i);

      pagerLink.addEventListener('click', (event) => {
        event.preventDefault();
        showPage(i);
      });

      pagerItem.appendChild(pagerLink);
      pagerList.appendChild(pagerItem);
    }
  };

  const showPage = (page: number): void => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
      item.style.display = index >= start && index < end ? '' : 'none';
    });

    currentPage = page;

    pagerDisplay.textContent = `Страница ${currentPage} из ${totalPages}`;

    createPager();
  };

  showPage(currentPage);
}

const newsSection = document.querySelector<HTMLElement>('.section.news');

if (newsSection) {
  initPagination({
    section: newsSection,
    itemsSelector: '.news__list .news__item',
    itemsPerPage: 2,
  });
}

const servicesSection = document.querySelector<HTMLElement>('.services-section');

if (servicesSection) {
  initPagination({
    section: servicesSection,
    itemsSelector: '.services__list .services__item',
    itemsPerPage: 2,
  });
}

const reviewsSection = document.querySelector<HTMLElement>('.reviews-section');

if (reviewsSection) {
  initPagination({
    section: reviewsSection,
    itemsSelector: '.reviews__list .reviews__item',
    itemsPerPage: 4,
  });
}

export {};
