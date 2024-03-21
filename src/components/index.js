// инпорты
import "../pages/index.css";
import { deleteCard, createCard, likeBtnHandler } from "./card.js";
import { closeModal, openModal, overlayAndBtnHandler } from "./modals.js";
import {
  enableValidation,
  clearValidation,
  turnOnValidationBeforeOpened,
} from "./validation.js";

import {
  sendNewCardRequest,
  deleteCardRequest,
  deleteLikeRequest,
  sendLikeRequest,
  sendProfileInfo,
  sendNewAvatar,
  awaitResponse,
  checkResponse,
} from "./api.js";
//элементы
const profileAvatar = document.querySelector(".profile__image"); // аватарка
const cardList = document.querySelector(".places__list"); // место вставки карточек
const editBtn = document.querySelector(".profile__edit-button"); // кнопка редактировать
const addModalButton = document.querySelector(".profile__add-button"); // кнопка +
const editPopup = document.querySelector(".popup_type_edit"); // попап редактирования
const imagePopUp = document.querySelector(".popup_type_image"); // попап картинок (при клике на картинку)
const avatarPopUp = document.querySelector(".popup_type_new-avatar");
const imageDescription = imagePopUp.querySelector(".popup__caption"); // описание под картинкой
const modalImage = imagePopUp.querySelector(".popup__image"); //
const allPopups = document.querySelectorAll(".popup"); // взяли все попапы для общего навешивания
const newCardPopup = document.querySelector(".popup_type_new-card"); // попап добавления нового места
const formEdit = document.forms["edit-profile"]; // форма редактироания
const formNewCard = document.forms["new-place"]; // форма добавления нового места
const formNewAvatar = document.forms["new-avatar"]; // форма добавления нового аватара
const profileNameInput = formEdit.name; // инпут где имя
const profileDescInput = formEdit.description; // инпут описания
const profileTitleElement = document.querySelector(".profile__title"); // элемент заголовка  профиля
const profileDescription = document.querySelector(".profile__description"); // элемент описания  профиля

// анимирование открытия всех модалок, навешивание слушателя закрытия по оверлею и кнопке
for (let popup of allPopups) {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", overlayAndBtnHandler);
}
// запрос данных профайла и карточек
let userId; // айди который получим от сервера
awaitResponse()
  .then((res) => {
    userId = res[0]._id;
    setProfileInfo(res[0]); // устанавливаем личные  данные с сервера
    getCards(res[1]); // отрисовка карточек
  })
  .catch((err) => {
    console.log(err);
  });

// реализация карточек при загрузки страницы
function getCards(array) {
  array.forEach((elem) => {
    cardList.append(
      createCard(
        elem,
        userId,
        deleteCard,
        likeBtnHandler,
        imageHandler,
        deleteCardRequest,
        sendLikeRequest,
        deleteLikeRequest
      )
    );
  });
}
// функция для заполнения профайла
function setProfileInfo(obj) {
  profileTitleElement.textContent = obj.name;
  profileDescription.textContent = obj.about;
  profileAvatar.style.backgroundImage = `url(${obj.avatar})`;
}
// показать загрузку данных (прелоадер)
function displayLoading(e) {
  e.target.querySelector(".popup__button").textContent = "Сохранение...";
}
// скрыть, данные загрузились
function hideLoading(e) {
  e.target.querySelector(".popup__button").textContent = "Сохранить";
}

// обработчики
// обработчикй клика по картинке, открываем модалку
function imageHandler(e) {
  modalImage.alt = e.target.alt;
  modalImage.src = e.target.src;
  imageDescription.textContent = e.target.alt;
  openModal(imagePopUp);
}

// ф отправки формы редактивроания профиля
function editFormSubmitHandler(e) {
  displayLoading(e);
  e.preventDefault();
  // отправка на сервер
  sendProfileInfo(profileNameInput.value, profileDescInput.value)
    .then((resp) => {
      profileTitleElement.textContent = resp.name;
      profileDescription.textContent = resp.about;
      closeModal(editPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => hideLoading(e));
}
// ф добавления новой карточки/
function formSubmitPlace(e) {
  e.preventDefault();
  displayLoading(e);
  const data = {
    name: e.target["place-name"].value,
    link: e.target.link.value,
  };
  // отправка на сервер
  sendNewCardRequest(data)
    .then((res) => {
      cardList.prepend(
        createCard(
          res,
          userId,
          deleteCard,
          likeBtnHandler,
          imageHandler,
          deleteCardRequest,
          sendLikeRequest,
          deleteLikeRequest
        )
      );
      closeModal(newCardPopup);
      e.target.reset(); // сброс формы
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => hideLoading(e));
}

// обработчик отправки нового аватара
function newAvatarSubmitHandler(e) {
  e.preventDefault();
  displayLoading(e);
  sendNewAvatar(e.target["avatar-link"].value)
    .then((resp) => {
      profileAvatar.style.backgroundImage = `url(${resp.avatar})`; // когда загрузилось меняем стили аватарки
      closeModal(avatarPopUp);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => hideLoading(e));
}

// добавление слушателей
//  на кнопку +
addModalButton.addEventListener("click", function () {
  turnOnValidationBeforeOpened(formNewCard);
  openModal(newCardPopup);
});
// обработчик отправки формы для добавления нового места
formNewCard.addEventListener("submit", formSubmitPlace);
// для кнопки 'редактировать'
editBtn.addEventListener("click", function () {
  // устанавливаем значения
  turnOnValidationBeforeOpened(formEdit);
  profileNameInput.value = profileTitleElement.textContent;
  profileDescInput.value = profileDescription.textContent;
  openModal(editPopup);
});
// по сабмиту новой карточки и редактирования
formEdit.addEventListener("submit", editFormSubmitHandler);
//клик по аватарке
profileAvatar.addEventListener("click", function () {
  turnOnValidationBeforeOpened(formNewAvatar);
  openModal(avatarPopUp);
});
// отправка формы новой аватарки
formNewAvatar.addEventListener("submit", newAvatarSubmitHandler);

// // валидация форм, вызов валидации всех  форм
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
