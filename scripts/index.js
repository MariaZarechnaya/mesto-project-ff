const card = document.querySelector("#card-template").content; // темплейт
const list = document.querySelector(".places__list"); // место вставки карточек

function deleteCard(event) {
  event.target.closest(".card").remove();
}
const createCard = function (cardData, deleteCallback) {
  const cardElement = card.querySelector(".card").cloneNode(true);
  const title = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  title.textContent = cardData.name;
  image.src = cardData.link;
  image.alt = 'фото ' + cardData.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCallback);
  return cardElement;
};

for (let elem of initialCards) {
  list.append(createCard(elem, deleteCard));
}
