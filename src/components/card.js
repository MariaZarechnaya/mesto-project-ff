// удаление карточки
function deleteCard(event) {
  event.target.closest(".card").remove();
  console.log(event.target);
}
// лайк карточки
function likeBtnHandler(e) {
  e.target.classList.toggle("card__like-button_is-active");
  console.log("лайк поставлен");
}
// создание карточки
const createCard = function (
  cardData,
  deleteCallback,
  likeBtnCallback,
  imageHandler
) {
  const card = document.querySelector("#card-template").content; // темплейт
  const cardElement = card.querySelector(".card").cloneNode(true);
  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", likeBtnCallback);
  const title = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  image.addEventListener("click", imageHandler);
  title.textContent = cardData.name;
  image.src = cardData.link;
  image.alt = "фото " + cardData.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCallback);
  return cardElement;
};

export { deleteCard, createCard, likeBtnHandler };
