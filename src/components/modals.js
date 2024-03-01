// обработчик закрытия на esc
function escapeHandler(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
  return;
}
// закрытие модального окна
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapeHandler);
}
// открытие модального окна
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", escapeHandler);
}
// обработчик клика по оверлею и кнопке закрытия

function overlayAndBtnHandler(e) {
  if (
    e.target.classList.contains("popup") ||
    e.target.classList.contains("popup__close")
  ) {
    closeModal(e.currentTarget);
  }
}

export { closeModal, openModal, overlayAndBtnHandler };
