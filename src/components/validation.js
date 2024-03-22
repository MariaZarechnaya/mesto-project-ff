// ф проверка валидности полей
function isValid(form, inputElement, errorInputClass, errorBlockClass) {
  const errorBlock = form.querySelector(`.${inputElement.id}-error-message`);
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      errorBlock,
      inputElement,
      inputElement.validationMessage,
      errorInputClass,
      errorBlockClass
    );
  } else {
    hideInputError(errorBlock, inputElement, errorInputClass);
  }
}
// показать ошибку
function showInputError(
  errorBlock,
  elem,
  errorMessage,
  errorInputClass,
  errorBlockClass
) {
  elem.classList.add(errorInputClass);
  errorBlock.textContent = errorMessage;
  errorBlock.classList.add(errorBlockClass);
}
//скрыть ошибку //
function hideInputError(errorBlock, elem, errorInputClass, errorBlockClass) {
  elem.classList.remove(errorInputClass);
  errorBlock.textContent = "";
  errorBlock.classList.remove(errorBlockClass);
  //класс для спана errorBlockClass
}

// неактивность кнопки
// навесить на кнопку класс , если одно из полей не валидно
function disabledButton(inputList, button, className) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(className);
  } else {
    button.disabled = false;
    button.classList.remove(className);
  }
}
// проверка если хоть одно поле не валидно
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
// очистка валидации
function clearValidation(form, options) {
  const inputList = Array.from(form.querySelectorAll(options.inputSelector));
  const button = form.querySelector(options.submitButtonSelector);
  disabledButton(inputList, button, options.inactiveButtonClass);
  inputList.forEach((input) => {
    hideInputError(
      form.querySelector(`.${input.id}-error-message`),
      input,
      options.inputErrorClass,
      options.errorClass
    );
  });
}
//
// включение очистки валидации
function turnOnClearValidationBeforeOpened(form, options) {
  clearValidation(form, options);
}

// навешивание на все инпуты в форме
function setValidationForAllInputs(form, options) {
  const inputList = Array.from(form.querySelectorAll(options.inputSelector));
  const button = form.querySelector(options.submitButtonSelector);
  disabledButton(inputList, button, options.inactiveButtonClass);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(form, input, options.inputErrorClass, options.errorClass);
      disabledButton(inputList, button, options.inactiveButtonClass);
    });
  });
}

// ф включения всех валидаций
function enableValidation(options) {
  const forms = document.querySelectorAll(options.formSelector);
  forms.forEach((form) => {
    setValidationForAllInputs(form, options);
  });
}

export { enableValidation, clearValidation, turnOnClearValidationBeforeOpened };
