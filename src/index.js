// инпорты
import "./pages/index.css";
import { initialCards } from "./cards";
import { deleteCard, createCard } from "./components/card.js";
import { closeModal, openModal } from "./components/modals.js";
//элементы
const list = document.querySelector(".places__list"); // место вставки карточек
const editBtn = document.querySelector(".profile__edit-button"); // кнопка редактировать
const addModalButton = document.querySelector(".profile__add-button"); // кнопка +
const editPopup = document.querySelector(".popup_type_edit"); // попап редактирования
const imagePopUp = document.querySelector(".popup_type_image"); // попап картинок (при клике на картинку)
const allPopups = document.querySelectorAll(".popup"); // взяли все попапы для общего навешивания
const newCardPopup = document.querySelector(".popup_type_new-card"); // попап добавления нового места
const formEdit = document.forms["edit-profile"]; // форма редактироания
const profileName = formEdit.name; // инпут где имя
const profileDesc = formEdit.description; // инпут описания
const title = document.querySelector(".profile__title"); // элемент заголовка  профиля
const text = document.querySelector(".profile__description"); // элемент описания  профиля

// инициализация существующих карточек при загрузке страницы
for (let elem of initialCards) {
  list.append(createCard(elem, deleteCard, likeBtnHandler, imageHandler));
}
// анимирование открытия всех модалок
for (let popup of allPopups) {
  popup.classList.add("popup_is-animated");
}
// обработчики
// лайка карточки
function likeBtnHandler(e) {
  e.target.classList.toggle("card__like-button_is-active");
  console.log("лайк поставлен");
}
// клика по картинке
function imageHandler(e) {
  openModal(imagePopUp);
  const modalImage = imagePopUp.querySelector(".popup__image");
  modalImage.alt = e.target.alt;
  modalImage.src = e.target.src;
  imagePopUp.querySelector(".popup__caption").textContent = e.target.alt;
  console.log(imagePopUp.querySelector(".popup__image"));
}
// отправки формы редактивроания профиля
function formSubmitHandler(e) {
  e.preventDefault();
  title.textContent = profileName.value;
  text.textContent = profileDesc.value;
  closeModal(document.querySelector(".popup_is-opened"));
}
// добавления новой карточки
function formSubmitPlace(e) {
  e.preventDefault();
  const data = {
    name: e.target["place-name"].value,
    link: e.target.link.value,
  };
  initialCards.unshift(data);
  console.log(initialCards);
  list.prepend(createCard(data, deleteCard, likeBtnHandler, imageHandler));
  e.target.reset(); // сброс формы
  closeModal(document.querySelector(".popup_is-opened"));
}

// добавление слушателей
//  на кнопку +
addModalButton.addEventListener("click", function () {
  openModal(newCardPopup);
  const formNewCard = document.forms["new-place"];
  console.log(formNewCard);
  formNewCard.addEventListener("submit", formSubmitPlace);
});
// для кнопки 'редактировать'
editBtn.addEventListener("click", function () {
  openModal(editPopup);
  const profileName = formEdit.name; // инпут где имя
  const profileDesc = formEdit.description; // инпут описания
  profileName.value = title.textContent;
  profileDesc.value = text.textContent;
});
// по сабмиту новой карточки и редактирования
formEdit.addEventListener("submit", formSubmitHandler);
// formNewCard.addEventListener('submit', formSubmitPlace)
