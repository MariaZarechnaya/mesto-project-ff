// обработчик закрытия на esc
function escapeHandler(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened")
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
  const closeBtn = modal.querySelector(".popup__close");
  modal.addEventListener("click", function (e) {
    console.log(e.target)
    if (e.target === closeBtn || e.target === modal) {
      closeModal(modal);
    }
  });
}


export { closeModal, openModal };
