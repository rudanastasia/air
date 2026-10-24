///Вспомогательная функция для проверки элементов на null///
function queryRequired<T extends Element>(selector: string, root: ParentNode = document): T {
  const element = root.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Элемент не найден: ${selector}`);
  }

  return element;
}
///

document.addEventListener('DOMContentLoaded', () => {
  const myForm = document.querySelector<HTMLFormElement>('#myForm');

  if (!myForm) return;

  const sendButton = queryRequired<HTMLButtonElement>('#sendButton');

  const socialLink = queryRequired<HTMLInputElement>('#social-link');
  const nameInput = queryRequired<HTMLInputElement>('#name');
  const messageInput = queryRequired<HTMLInputElement>('#message');

  const servicesControls = queryRequired<HTMLElement>('.form__controls', myForm);
  const servicesError = servicesControls.nextElementSibling as HTMLElement;

  const myModal = queryRequired<HTMLElement>('#myModal');
  const modalText = queryRequired<HTMLElement>('.modal__body p', myModal);
  const modalButton = queryRequired<HTMLElement>('.btn-modal', myModal);

  const VK_REGEX = /^https:\/\/(www\.)?vk\.ru\/id\d+$/;
  const FORMSPREE_URL = 'https://formspree.io/f/xojgoeee';

  ///==========================================
  ///======Обработка ошибок в полях ввода======
  ///==========================================
  function getErrorElement(input: HTMLElement): HTMLElement {
    return input.nextElementSibling as HTMLElement;
  }

  function showError(input: HTMLElement): void {
    getErrorElement(input).style.display = 'block';
    input.classList.add('input-error');
  }

  function hideError(input: HTMLElement): void {
    getErrorElement(input).style.display = 'none';
    input.classList.remove('input-error');
  }

  function validateField(input: HTMLElement, hasError: boolean): boolean {
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
  function showModal(message: string): void {
    modalText.textContent = message;
    myModal.style.display = 'block';
  }

  function hideModal(): void {
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

  // =========================
  // ===== Проверка полей ====
  // =========================

  // =====Валидация имени =====
  function isValidName(value: string): boolean {
    const name = value.trim();

    return name.length >= 2 && /^[a-zA-Zа-яА-ЯёЁ ]+$/.test(name);
  }

  // Проверка итогового значения имени
  nameInput.addEventListener('input', () => {
    nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-ЯёЁ ]/g, '');

    const invalid = !isValidName(nameInput.value);

    if (invalid) {
      showError(nameInput);
    } else {
      hideError(nameInput);
    }
  });

  // ===== Проверка VK =====
  function isVkInvalid(value: string): boolean {
    const link = value.trim();

    return link !== '' && !VK_REGEX.test(link);
  }

  //  Проверка введенной ссылки VK
  socialLink.addEventListener('input', () => {
    const invalid = isVkInvalid(socialLink.value);

    if (!invalid) {
      hideError(socialLink);
      socialLink.setCustomValidity('');
      return;
    }

    showError(socialLink);
    socialLink.setCustomValidity('Введите ссылку на профиль VK в формате https://vk.ru/id12345');
  });

  // ===== Проверка отзыва =====
  function isInvalidMessage(value: string): boolean {
    const message = value.trim();

    return message === '' || message.length < 10;
  }

  messageInput.addEventListener('input', () => {
    if (isInvalidMessage(messageInput.value)) {
      showError(messageInput);
    } else {
      hideError(messageInput);
    }
  });

  // ===== Проверка услуг =====
  function areServicesInvalid(): boolean {
    if (!myForm) {
      return true;
    }

    const services = myForm.querySelectorAll<HTMLElement>('input[name="used-service"]:checked');

    console.log('Выбрано услуг:', services.length);
    const invalid = services.length === 0;

    servicesError.style.display = invalid ? 'block' : 'none';

    return invalid;
  }

  if (myForm) {
    const serviceInputs = myForm.querySelectorAll<HTMLElement>('input[name="used-service"]');

    serviceInputs.forEach((service) => {
      service.addEventListener('change', () => {
        areServicesInvalid();
      });
    });
  }

  //===========================
  //======Валидация формы======
  //===========================
  const validateForm = (): boolean => {
    let isValid = true;

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

      const data: unknown = await response.json();

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
});

export {};
