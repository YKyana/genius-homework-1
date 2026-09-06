const body = document.body;

const modal = document.querySelector('[data-modal]');
const modalOpenButtons = document.querySelectorAll('[data-modal-open]');
const modalCloseButton = document.querySelector('[data-modal-close]');

const menu = document.querySelector('[data-menu]');
const menuOpenButton = document.querySelector('[data-menu-open]');
const menuCloseButton = document.querySelector('[data-menu-close]');
const menuLinks = document.querySelectorAll('[data-menu-link]');

function lockBody() {
  body.classList.add('no-scroll');
}

function unlockBodyIfPossible() {
  const modalIsOpen = modal && !modal.classList.contains('is-hidden');
  const menuIsOpen = menu && !menu.classList.contains('is-hidden');

  if (!modalIsOpen && !menuIsOpen) {
    body.classList.remove('no-scroll');
  }
}

function openModal() {
  if (!modal) return;

  modal.classList.remove('is-hidden');
  lockBody();

  const firstInput = modal.querySelector('input');
  if (firstInput) {
    window.setTimeout(() => firstInput.focus(), 50);
  }
}

function closeModal() {
  if (!modal) return;

  modal.classList.add('is-hidden');
  unlockBodyIfPossible();
}

function openMenu() {
  if (!menu) return;

  menu.classList.remove('is-hidden');
  if (menuOpenButton) {
    menuOpenButton.setAttribute('aria-expanded', 'true');
  }
  lockBody();
}

function closeMenu() {
  if (!menu) return;

  menu.classList.add('is-hidden');
  if (menuOpenButton) {
    menuOpenButton.setAttribute('aria-expanded', 'false');
  }
  unlockBodyIfPossible();
}

modalOpenButtons.forEach((button) => {
  button.addEventListener('click', openModal);
});

if (modalCloseButton) {
  modalCloseButton.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

if (menuOpenButton) {
  menuOpenButton.addEventListener('click', openMenu);
}

if (menuCloseButton) {
  menuCloseButton.addEventListener('click', closeMenu);
}

menuLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

if (menu) {
  menu.addEventListener('click', (event) => {
    if (event.target === menu) {
      closeMenu();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;

  closeModal();
  closeMenu();
});
