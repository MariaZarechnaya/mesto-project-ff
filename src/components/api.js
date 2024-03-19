const config = {
  token: "99b9a286-1183-4ca0-bcb1-f92e59405a3b",
  headerGet: { authorization: "99b9a286-1183-4ca0-bcb1-f92e59405a3b" },
  delete: {
    method: "DELETE",
    headers: {
      authorization: "99b9a286-1183-4ca0-bcb1-f92e59405a3b",
    },
  },
  putLikes: {
    method: "PUT",
    headers: {
      authorization: "99b9a286-1183-4ca0-bcb1-f92e59405a3b",
      "Content-Type": "application/json",
    },
  },
  headerGet: { authorization: "99b9a286-1183-4ca0-bcb1-f92e59405a3b" },
};

// общий серверный запрос
const groupId = "wff-cohort-9";
const url = "https://mesto.nomoreparties.co";

//общий запрос
function serverRequest(url, options) {
  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// ф отправки  своей новой карточки на сервер
function sendNewCardRequest(obj) {
  return fetch(`${url}/v1/${groupId}/cards`, {
    method: "POST",
    headers: {
      authorization: "99b9a286-1183-4ca0-bcb1-f92e59405a3b",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: obj.name, link: obj.link }),
  });
}

// запрос удаления карточки
function deleteCardRequest(cardId) {
  fetch(`${url}/v1/${groupId}/cards/${cardId}`, config.delete);
}
// запрос удаления лайка
function deleteLikeRequest(cardData) {
  return fetch(
    `${url}/v1/${groupId}/cards/likes/${cardData._id}`,
    config.delete
  );
}
// постановка лайка
function sendLikeRequest(cardData) {
  return fetch(
    `${url}/v1/${groupId}/cards/likes/${cardData._id}`,
    config.putLikes
  );
}

// отправка информации о пользователе
function sendProfileInfo(name, about) {
  return serverRequest(`${url}/v1/${groupId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: "99b9a286-1183-4ca0-bcb1-f92e59405a3b",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
}
// отправка новой аватарки
function sendNewAvatar(link) {
  return serverRequest(`${url}/v1/${groupId}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: "99b9a286-1183-4ca0-bcb1-f92e59405a3b",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  });
}
// запрос данных профайла и карточек
const cardsPromise = serverRequest(`${url}/v1/${groupId}/cards`, {
  headers: config.headerGet,
});
const profilePromise = serverRequest(`${url}/v1/${groupId}/users/me`, {
  headers: config.headerGet,
});
//ждем ответов
function awaitResponse() {
  return Promise.all([profilePromise, cardsPromise]); 
}

export {
  serverRequest,
  sendNewCardRequest,
  deleteCardRequest,
  deleteLikeRequest,
  sendLikeRequest,
  sendProfileInfo,
  sendNewAvatar,
  awaitResponse,
};
