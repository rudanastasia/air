# Air

Учебный многостраничный сайт туристической компании **Air Asia** с авторскими турами по Азии.

**Демо:** https://rudanastasia.github.io/air/welcome.html

## Возможности

- адаптивная верстка для desktop и mobile;
- мобильное навигационное меню;
- отдельные страницы приветствия, главная, услуг и отзывов;
- пагинация для новостей, услуг и отзывов;
- форма добавления отзыва с клиентской валидацией;
- отправка формы через [Formspree](https://formspree.io/);
- модальное окно после успешной отправки формы.

## Страницы

| Страница | Файл | Назначение |
| --- | --- | --- |
| Welcome | `welcome.html` | приветственная страница |
| Главная | `index.html` | основная информация о компании и турах |
| Услуги | `services.html` | список туристических услуг |
| Отзывы | `reviews.html` | отзывы клиентов и форма добавления отзыва |

## Технологии

- **HTML5** — структура страниц;
- **SCSS/CSS** — стилизация и адаптивная верстка;
- **Vanilla JavaScript** — интерактивность без фреймворков;
- **Prepros / Dart Sass** — компиляция SCSS;
- **Autoprefixer** — добавление CSS-префиксов;
- **ESLint** — проверка JavaScript;
- **Prettier** — форматирование кода;
- **Formspree** — обработка формы отзывов.

## Структура проекта

```text
.
├── css/
│   ├── _variables.scss
│   ├── about.scss
│   ├── banner.scss
│   ├── base.scss
│   ├── breadcrumbs.scss
│   ├── btn.scss
│   ├── footer.scss
│   ├── form.scss
│   ├── hamburger.scss
│   ├── header.scss
│   ├── hero.scss
│   ├── layout.scss
│   ├── main.scss
│   ├── media.scss
│   ├── mobile-menu.scss
│   ├── modal.scss
│   ├── news.scss
│   ├── pagination.scss
│   ├── reviews.scss
│   ├── section.scss
│   ├── services.scss
│   ├── tours.scss
│   ├── welcome.scss
│   └── main.css
├── img/
│   ├── avatars/
│   ├── backgrounds/
│   ├── icons/
│   ├── illustrations/
│   └── logos/
├── js/
│   ├── form.js
│   ├── mobile-menu.js
│   ├── pagination.js
│   └── script.js
├── index.html
├── welcome.html
├── services.html
├── reviews.html
├── eslint.config.mjs
├── prepros.config
├── package.json
├── package-lock.json
└── README.md
```

## JavaScript

Точкой входа является `js/script.js`:

```js
import './mobile-menu.js';
import './pagination.js';
import './form.js';
```

Логика разделена по задачам:

- `mobile-menu.js` — открытие и закрытие мобильного меню;
- `pagination.js` — пагинация новостей, услуг и отзывов;
- `form.js` — валидация и отправка формы отзывов.

JavaScript подключается как ES module:

```html
<script type="module" src="./js/script.js"></script>
```

## Мобильное меню

На небольших экранах основная навигация заменяется на hamburger-меню. Логика его работы находится в `js/mobile-menu.js`, а стили — в `css/mobile-menu.scss` и `css/hamburger.scss`.

## Пагинация

Пагинация реализована на стороне клиента в `js/pagination.js`. Она используется для нескольких разделов сайта, включая услуги и отзывы.

## Форма отзывов

На странице `reviews.html` расположена форма добавления отзыва.

Форма включает:

- имя пользователя;
- ссылку на VK;
- текст отзыва;
- выбор услуг;
- валидацию введённых данных;
- отправку данных через Formspree;
- отображение модального окна после успешной отправки.

Endpoint Formspree хранится непосредственно в разметке формы, поэтому при переносе проекта на другой endpoint его необходимо изменить в `reviews.html`.

## Стили

SCSS разбит на отдельные модули по компонентам и разделам сайта. Итоговые стили собираются в `css/main.css`.

Конфигурация компиляции находится в `prepros.config`. Для сборки используются Dart Sass и Autoprefixer.

## Установка

Клонируйте репозиторий и установите зависимости:

```bash
git clone https://github.com/rudanastasia/air.git
cd air
npm install
```

## Локальная разработка

Проект является статическим сайтом и не содержит отдельного backend-сервера.

Для запуска локального HTTP-сервера можно использовать, например:

```bash
npx serve .
```

После запуска откройте адрес, который выведет `serve`, и перейдите на `welcome.html`.

Использование HTTP-сервера важно, потому что JavaScript подключается через ES modules; открытие HTML-файлов напрямую через `file://` может привести к проблемам с импортами.

## Проверка кода

Проверка JavaScript:

```bash
npm run lint
```

Автоматическое исправление ESLint:

```bash
npm run lint:fix
```

Проверка форматирования:

```bash
npm run format:check
```

Форматирование проекта:

```bash
npm run format
```

## npm-скрипты

| Команда | Назначение |
| --- | --- |
| `npm run lint` | проверить JavaScript через ESLint |
| `npm run lint:fix` | автоматически исправить исправимые ошибки ESLint |
| `npm run format` | отформатировать проект через Prettier |
| `npm run format:check` | проверить форматирование без внесения изменений |

Отдельных `build` или `dev` npm-скриптов в проекте нет: сборка SCSS настроена через Prepros.

## Деплой

Проект состоит из статических HTML, CSS, JavaScript и изображений, поэтому для публикации достаточно статического хостинга.

В репозитории нет отдельного GitHub Actions workflow для деплоя. Демо проекта доступно по адресу:

https://rudanastasia.github.io/air/welcome.html

## Лицензия

Проект распространяется под лицензией **ISC**, указанной в `package.json`.
