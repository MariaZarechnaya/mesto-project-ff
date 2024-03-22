const config = {
  groupId: "wff-cohort-9",
  url: "https://mesto.nomoreparties.co",
  token: "99b9a286-1183-4ca0-bcb1-f92e59405a3b",
  headerGet: { authorization: "99b9a286-1183-4ca0-bcb1-f92e59405a3b" },
  headers: {
    authorization: "99b9a286-1183-4ca0-bcb1-f92e59405a3b",
    "Content-Type": "application/json",
  },
};

// общий серверный запрос

//общий запрос
function serverRequest(url, options) {
  return fetch(url, options).then((res) => {
    return checkResponse(res);
  });
}

// проверка корректности ответа
function checkResponse(response) {
  if (response.ok) {
    console.log(response.status);
    return response.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
// ф отправки  своей новой карточки на сервер
function sendNewCardRequest(obj) {
  return fetch(`${config.url}/v1/${config.groupId}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name: obj.name, link: obj.link }),
  }).then((res) => checkResponse(res));
}

// запрос удаления карточки
function deleteCardRequest(cardId) {
  return fetch(
    `${config.url}/v1/${config.groupId}/cards/${cardId}`,
    {
      method: "DELETE",
      headers:config.headers,
    }
  ).then((res) => checkResponse(res));
}
// запрос удаления лайка
function deleteLikeRequest(cardData) {
  return fetch(
    `${config.url}/v1/${config.groupId}/cards/likes/${cardData._id}`,
    {
      method: "DELETE",
      headers:config.headers,
    }
  ).then((res) => checkResponse(res));
}
// постановка лайка
function sendLikeRequest(cardData) {
  return fetch(
    `${config.url}/v1/${config.groupId}/cards/likes/${cardData._id}`,
    {
      method: "PUT",
      headers:config.headers,
    }
  ).then((res) => checkResponse(res));
}

// отправка информации о пользователе
function sendProfileInfo(name, about) {
  return serverRequest(`${config.url}/v1/${config.groupId}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
}
// отправка новой аватарки
function sendNewAvatar(link) {
  return serverRequest(`${config.url}/v1/${config.groupId}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  });
}
// запрос данных профайла и карточек
const getCardsInfoPromise = serverRequest(`${config.url}/v1/${config.groupId}/cards`, {
  headers: config.headerGet,
});
const getProfileInfoPromise = serverRequest(
  `${config.url}/v1/${config.groupId}/users/me`,
  {
    headers: config.headerGet,
  }
);
//ждем ответов
function awaitResponse() {
  return Promise.all([getProfileInfoPromise, getCardsInfoPromise]);
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
  checkResponse,
};
