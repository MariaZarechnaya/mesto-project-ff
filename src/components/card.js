function deleteCard(event) {
  event.target.closest(".card").remove();
}
// лайк карточки
function likeBtnHandler(e) {
  e.target.classList.toggle("card__like-button_is-active");
}

// если карточка не моя, то скроем кнопки удаления
function isMyCard(owner, myId, deleteBtn) {
  if (owner === myId) {
    deleteBtn.disabled = false;
  } else {
    deleteBtn.disabled = true;
    deleteBtn.classList.add("card__delete-button_is_disabled");
  }
}
// создание карточки
const createCard = function (
  cardData,
  userId,
  deleteCallback,
  likeBtnCallback,
  imageHandler,
  deleteCardRequest,
  sendLikeRequest,
  deleteLikeRequest
) {
  const card = document.querySelector("#card-template").content; // темплейт
  const cardElement = card.querySelector(".card").cloneNode(true);
  const likeBtn = cardElement.querySelector(".card__like-button");
  const title = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  const likeNumberContainer = cardElement.querySelector(".card__like-number");
  const allLikes = cardData.likes; // все юзеры, лайкнувшие карточку
  const numberOfLikes = cardData.likes.length; // количество лайков
  //отрисовка наших лайков
  for (let userLike of allLikes) {
    if (userLike._id === userId) {
      likeBtn.classList.add("card__like-button_is-active");
    }
  }
  likeBtn.addEventListener("click", function (e) {
    // отправка лайка на сервер
    if (e.target.classList.contains("card__like-button_is-active")) {
      deleteLikeRequest(cardData)
        .then((res) => {
          likeNumberContainer.textContent = res.likes.length;
          likeBtnCallback(e);
        })
        .catch((err) => console.log(err));
    } else {
      //отправка
      sendLikeRequest(cardData).then((res) => {
        likeNumberContainer.textContent = res.likes.length;
        likeBtnCallback(e);
      });
    }
  });

  likeNumberContainer.textContent = numberOfLikes;
  title.textContent = cardData.name;
  image.src = cardData.link;
  image.alt = "фото " + cardData.name;
  image.addEventListener("click", imageHandler);
  // если карточка не моя, то скроем кнопки удаления
  isMyCard(
    cardData.owner._id,
    userId,
    cardElement.querySelector(".card__delete-button")
  );
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function (event) {
      deleteCardRequest(cardData._id)
        .then(() => deleteCallback(event))
        .catch((err) => console.log(err));
    });
  return cardElement;
};

export { deleteCard, createCard, likeBtnHandler };
