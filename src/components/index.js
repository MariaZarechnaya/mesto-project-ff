// инпорты
import "../pages/index.css";
import { initialCards } from "./cards.js";
import { deleteCard, createCard, likeBtnHandler } from "./card.js";
import { closeModal, openModal } from "./modals.js";
//элементы

const cardList = document.querySelector(".places__list"); // место вставки карточек
const editBtn = document.querySelector(".profile__edit-button"); // кнопка редактировать
const addModalButton = document.querySelector(".profile__add-button"); // кнопка +
const editPopup = document.querySelector(".popup_type_edit"); // попап редактирования
const imagePopUp = document.querySelector(".popup_type_image"); // попап картинок (при клике на картинку)
const imageDescription = imagePopUp.querySelector(".popup__caption"); // описание под картинкой
const modalImage = imagePopUp.querySelector(".popup__image"); // попап формы добавления нового места
const allPopups = document.querySelectorAll(".popup"); // взяли все попапы для общего навешивания
const newCardPopup = document.querySelector(".popup_type_new-card"); // попап добавления нового места
const formEdit = document.forms["edit-profile"]; // форма редактироания
const formNewCard = document.forms["new-place"]; // форма добавления нового места
const profileNameInput = formEdit.name; // инпут где имя
const profileDescInput = formEdit.description; // инпут описания
const profileTitleElement = document.querySelector(".profile__title"); // элемент заголовка  профиля
const profileDescription = document.querySelector(".profile__description"); // элемент описания  профиля

// инициализация существующих карточек при загрузке страницы
for (let elem of initialCards) {
  cardList.append(createCard(elem, deleteCard, likeBtnHandler, imageHandler));
}
// анимирование открытия всех модалок
for (let popup of allPopups) {
  popup.classList.add("popup_is-animated");
 
}
// обработчики

// клика по картинке
function imageHandler(e) {
  modalImage.alt = e.target.alt;
  modalImage.src = e.target.src;
  imageDescription.textContent = e.target.alt;
  openModal(imagePopUp);
}
// отправки формы редактивроания профиля
function editFormSubmitHandler(e) {
  e.preventDefault();
  profileTitleElement.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescInput.value;
  closeModal(editPopup);
}
// добавления новой карточки
function formSubmitPlace(e) {
  e.preventDefault();
  const data = {
    name: e.target["place-name"].value,
    link: e.target.link.value,
  };
  cardList.prepend(createCard(data, deleteCard, likeBtnHandler, imageHandler));
  e.target.reset(); // сброс формы
  closeModal(newCardPopup);
}

// добавление слушателей
//  на кнопку +
addModalButton.addEventListener("click", function () {
  openModal(newCardPopup);
});
// обработчик отправки формы для добавления нового места
formNewCard.addEventListener("submit", formSubmitPlace);
// для кнопки 'редактировать'
editBtn.addEventListener("click", function () {
  openModal(editPopup);
  profileNameInput.value = profileTitleElement.textContent;
  profileDescInput.value = profileDescription.textContent;
});
// по сабмиту новой карточки и редактирования
formEdit.addEventListener("submit", editFormSubmitHandler);
// formNewCard.addEventListener('submit', formSubmitPlace)
