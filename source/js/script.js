// Оживление мобильного меню
const menuMobile = document.getElementById(`menu`);
const menuMobileOpen = document.querySelector(`.header__menu-toggle`);
const menuMobileClose = menuMobile.querySelector(`.menu-mobile__close`);

menuMobileOpen.onclick = (evt) => {
  evt.preventDefault();
  menuOpen();
};

menuMobileClose.onclick = (evt) => {
  evt.preventDefault();
  menuClose();
};

// Закрытие мобильного меню клавишей ESC
window.onkeydown = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    // Проверка, открыто ли мобильного меню
    if (menuMobile.classList.contains(`menu-mobile--shown`)) {
      menuClose();
    }
  }
};

// Плавная прокрутка к якорю
const menuLinks = document.querySelectorAll(`.menu__link`);

for (let i = 0; i < menuLinks.length; i++) {
  if (menuLinks[i].getAttribute(`href`)[0] === `#`) {
    menuLinks[i].onclick = (evt) => {
      evt.preventDefault();
      document.getElementById(menuLinks[i].hash.substring(1)).scrollIntoView({behavior: `smooth`});
      history.pushState(null, null, menuLinks[i].hash);

      // Закрытие мобильного меню
      if (menuMobile.contains(menuLinks[i])) {
        menuClose();
      }
    };
  }
}

// Появление мобильного меню
function menuOpen() {
  menuMobile.classList.add(`menu-mobile--shown`);
}

// Закрытие мобильного меню
function menuClose() {
  cssAnimationReset(menuMobile, `menu-mobile--shown`);
  menuMobile.style.animationDirection = `reverse`;

  window.setTimeout(() => {
    menuMobile.classList.remove(`menu-mobile--shown`);
    menuMobile.removeAttribute(`style`);
  }, 500);
}

// Сброс CSS-анимации
function cssAnimationReset(elmnt, cls) {
  elmnt.classList.remove(cls);
  void elmnt.offsetWidth;
  elmnt.classList.add(cls);
}
