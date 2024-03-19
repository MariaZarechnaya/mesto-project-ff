// инпорты
import "../pages/index.css";
import { deleteCard, createCard, likeBtnHandler } from "./card.js";
import { closeModal, openModal, overlayAndBtnHandler } from "./modals.js";
import { enableValidation, clearValidation } from "./validation.js";

import {
  sendNewCardRequest,
  deleteCardRequest,
  deleteLikeRequest,
  sendLikeRequest,
  sendProfileInfo,
  sendNewAvatar,
  awaitResponse,
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
awaitResponse()
  .then((res) => {
    console.log(res);
    setProfileInfo(res[0]); // устанавливаем личные  данные с сервера
    initialCards(res[1]); // отрисовка карточек
  })
  .catch((err) => {
    console.log(err);
  });

// реализация карточек при загрузки страницы
function initialCards(array) {
  for (let elem of array) {
    let likedThisCard = false; // переменная, отвечающая за то, лайкнули ли мы карточку
    const allLikes = elem.likes; // все юзеры, лайкнувшие карточку
    allLikes.forEach((user) => {
      if (user._id === "c2326fb5bc89b8c2df6c9c74") {
        return (likedThisCard = true); // если мы поставили лайк
      }
    });
    const numberOfLikes = elem.likes.length; // количество лайков
    const id = elem.owner._id;
    cardList.append(
      createCard(
        elem,
        deleteCard,
        likeBtnHandler,
        imageHandler,
        numberOfLikes,
        id,
        deleteCardRequest,
        sendLikeRequest,
        deleteLikeRequest,
        likedThisCard
      )
    );
  }
}
// функция для заполнения профайла
function setProfileInfo(obj) {
  profileTitleElement.textContent = obj.name;
  profileDescription.textContent = obj.about;
  const profileImage = document.querySelector(".profile__image");
  profileImage.style.backgroundImage = `url(${obj.avatar})`;
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
  profileTitleElement.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescInput.value;
  // отправка на сервер
  sendProfileInfo(profileNameInput.value, profileDescInput.value).then(() => {
    hideLoading(e);
    closeModal(editPopup);
  });
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
    .then((res) => res.json())
    .then((res) => {
      hideLoading(e);
      cardList.prepend(
        createCard(
          res,
          deleteCard,
          likeBtnHandler,
          imageHandler,
          res.likes.length,
          res.owner._id,
          deleteCardRequest,
          sendLikeRequest,
          deleteLikeRequest
        )
      );
    })
    .catch((err) => {
      console.log(err);
    });
  e.target.reset(); // сброс формы
  closeModal(newCardPopup);
}

// обработчик отправки нового аватара
function newAvatarSubmitHandler(e) {
  e.preventDefault();
  displayLoading(e);
  sendNewAvatar(e.target["avatar-link"].value)
    .then((resp) => {
      profileAvatar.style.backgroundImage = `url(${resp.avatar})`; // когда загрузилось меняем стили аватарки
      hideLoading(e);
      closeModal(avatarPopUp);
    })
    .catch((err) => {
      console.log(err);
    });
}

// добавление слушателей
//  на кнопку +
addModalButton.addEventListener("click", function () {
  clearValidation(formNewCard);
  openModal(newCardPopup);
});
// обработчик отправки формы для добавления нового места
formNewCard.addEventListener("submit", formSubmitPlace);
// для кнопки 'редактировать'
editBtn.addEventListener("click", function () {
  profileNameInput.value = profileTitleElement.textContent;
  profileDescInput.value = profileDescription.textContent;
  clearValidation(formEdit);
  openModal(editPopup);
});
// по сабмиту новой карточки и редактирования
formEdit.addEventListener("submit", editFormSubmitHandler);
//клик по аватарке
profileAvatar.addEventListener("click", function () {
  clearValidation(formNewAvatar);
  openModal(avatarPopUp);
});
// отправка формы новой аватарки
formNewAvatar.addEventListener("submit", newAvatarSubmitHandler);

// // валидация форм, вызов валидации всех  форм
enableValidation(document.forms, {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
