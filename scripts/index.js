const card = document.querySelector("#card-template").content; // темплейт
const list = document.querySelector(".places__list"); // место вставки карточек

// создание карточек из массива
const createCard = function (array) {
  array.forEach((item) => {
    const cardElement = card.querySelector(".card").cloneNode(true); // для каждого элемента создаем шаблон карточки и наполняем его
    const title = cardElement.querySelector(".card__title");
    const image = cardElement.querySelector(".card__image");
    title.textContent = item.name;
    image.src = item.link;
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", deleteCard); // навешиваем на каждую кнопку событие клика
    list.append(cardElement);
  });
};

// удаление по кнопке
function deleteCard(event) {
  event.target.parentElement.remove();
}

createCard(initialCards);
