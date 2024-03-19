// удаление карточки
// function deleteCard(event) {
//   console.log('удаление')
//   event.target.closest(".card").remove();
//   console.log(event.target);
// }


function deleteCard(event) {
  event.target.closest(".card").remove();
  console.log(event.target);
}
// лайк карточки
function likeBtnHandler(e) {
  e.target.classList.toggle("card__like-button_is-active");
}
// если карточка не моя, то скроем кнопки удаления
function isMyCard (id, cardElement) {
  if (id ==='c2326fb5bc89b8c2df6c9c74') {
    cardElement.disabled = false
    cardElement.style.display = 'block'
    console.log('моя карточка')
  
  }
  else {
    cardElement.disabled = true
    cardElement.style.display = 'none'
  }
}
// создание карточки
const createCard = function (
  cardData,
  deleteCallback,
  likeBtnCallback,
  imageHandler,
  numberOfLikes,
  id,
  deleteCardRequest, 
  sendLikeRequest,
  deleteLikeRequest,
  likedThisCard
) {
  
  const card = document.querySelector("#card-template").content; // темплейт
  const cardElement = card.querySelector(".card").cloneNode(true);
  const likeBtn = cardElement.querySelector(".card__like-button");
  const title = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  const likeNumberContainer = cardElement.querySelector(".card__like-number")
  if (likedThisCard) {
    likeBtn.classList.add('card__like-button_is-active')
  }
  likeBtn.addEventListener("click", function (e) {
    likeBtnCallback(e)
    // отправка лайка на сервер
    if (e.target.classList.contains("card__like-button_is-active")) {
      sendLikeRequest (cardData).then(res => res.json()).then((res) => {
        likeNumberContainer.textContent = res.likes.length
      })
      // удаление лайка с сервера
    } 
    else {
      deleteLikeRequest (cardData).then(res => res.json()).then((res) => {
        likeNumberContainer.textContent = res.likes.length
      })
    }

  });

  likeNumberContainer.textContent = numberOfLikes;
  image.addEventListener("click", imageHandler);
  title.textContent = cardData.name;
  image.src = cardData.link;
  image.alt = "фото " + cardData.name;
  // если карточка не моя, то скроем кнопки удаления
  isMyCard(id, cardElement.querySelector(".card__delete-button"))
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function (event) {
      deleteCallback(event);
      deleteCardRequest(cardData._id)
    } );
  return cardElement;
};

export { deleteCard, createCard, likeBtnHandler };
