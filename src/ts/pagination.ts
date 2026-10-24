interface PaginationOptions {
  section: HTMLElement;
  itemsSelector: string;
  itemsPerPage?: number;
}

function initPagination({ section, itemsSelector, itemsPerPage = 2 }: PaginationOptions): void {
  const items = section.querySelectorAll<HTMLElement>(itemsSelector);
  const pagerList = section.querySelector<HTMLElement>('.pager__list');
  const pagerDisplay = section.querySelector<HTMLElement>('.pager__display');

  ///==== Проверяем наличие элементов пагинации ====
  if (!items.length || !pagerList || !pagerDisplay) {
    console.warn('Пагинация не инициализирована:', {
      items: items.length,
      pagerList,
      pagerDisplay,
    });
    return;
  }

  ///==== Проверяем корректно ли задано количество элементов списка на страницу ====
  if (itemsPerPage < 1) {
    console.error('Элементов списка должно быть больше 0');
    return;
  }

  ///==== Вычисляем общее количество страниц в пагинации ====
  const totalPages = Math.ceil(items.length / itemsPerPage);

  ///==== Отображаем активную страницу ====
  const showPage = (page: number): void => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
      item.style.display = index >= start && index < end ? '' : 'none';
    });

    pagerDisplay.textContent = `Страница ${page} из ${totalPages}`;

    ///==== Создаем ссылки в пагинации (кнопки страниц)====
    pagerList.innerHTML = Array.from({ length: totalPages }, (_, i) => {
      const number = i + 1;
      const active = number === page ? ' pager__item--active' : '';

      return `
          <li class="pager__item${active}">
            <a href="#" class="pager__link" data-page="${number}">
              ${number}
            </a>
          </li>
        `;
    }).join('');
  };

  pagerList.addEventListener('click', (event: MouseEvent) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const link = target.closest<HTMLAnchorElement>('.pager__link');

    if (!link || !pagerList.contains(link)) {
      return;
    }

    event.preventDefault();

    const page = Number(link.dataset.page);

    if (Number.isInteger(page) && page >= 1 && page <= totalPages) {
      showPage(page);
    }
  });

  showPage(1);
}

const paginations = [
  {
    section: '.section.news',
    itemsSelector: '.news__list .news__item',
    itemsPerPage: 2,
  },
  {
    section: '.services-section',
    itemsSelector: '.services__list .services__item',
    itemsPerPage: 2,
  },
  {
    section: '.reviews-section',
    itemsSelector: '.reviews__list .reviews__item',
    itemsPerPage: 4,
  },
];

paginations.forEach(({ section: sectionSelector, ...options }) => {
  const section = document.querySelector<HTMLElement>(sectionSelector);

  if (section) {
    initPagination({ section, ...options });
  }
});

export {};
