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
  for (let elem of inputList) {
    if (!elem.validity.valid) {
      return true;
    }
    return false;
  }
}
// очистка валидации
function clearValidation(form) {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  inputList.forEach((input) => {
    // input.value=''
    input.classList.remove("popup__input_type_error");
    form.querySelector(`.${input.id}-error-message`).textContent = "";
    form
      .querySelector(`.${input.id}-error-message`)
      .classList.remove("popup__error_visible");
  });
}

// навешивание на все инпуты в форме
function profileSetHandler(form, options) {
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
function enableValidation(forms, options) {
  Array.from(forms).forEach((form) => {
    profileSetHandler(form, options);
  });
}

export { enableValidation, clearValidation };
