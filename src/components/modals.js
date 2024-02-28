// обработчик закрытия на esc
function escapeHandler(e) {
  if (e.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
    this.removeEventListener("keydown", escapeHandler);
  }
  return;
}
// закрытие модального окна
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}
// открытие модального окна
function openModal(modal) {
  const page = document.querySelector(".page");
  modal.classList.add("popup_is-opened");
  const closeBtn = modal.querySelector(".popup__close");
  modal.addEventListener("click", function (e) {
    if (e.target === closeBtn || e.target === modal) {
      closeModal(modal);
    }
  });
  if (modal) {
    page.addEventListener("keydown", escapeHandler);
  }
}

export { closeModal, openModal };
