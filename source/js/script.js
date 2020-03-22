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

// Оживление фильтра каталога
const overlay = document.querySelector(`.overlay`);
const filter = document.querySelector(`.filter`);

if (filter) {
  const filterOpenBtn = document.querySelector(`.catalog__filter`);
  const filterCloseBtn = filter.querySelector(`.filter__close`);

  filterOpenBtn.onclick = (evt) => {
    evt.preventDefault();
    filterOpen();
  };

  filterCloseBtn.onclick = (evt) => {
    evt.preventDefault();
    filterClose();
  };
}

// Оживление выпадающего меню сортировки
const sorting = document.querySelector(`.sorting`);

if (sorting) {
  const sortingToggleBtn = sorting.querySelector(`.sorting__option--toggle`);
  const sortingOptions = sorting.querySelectorAll(`.sorting__options .sorting__option`);

  // Создание CSS-правил для анимации меню сортировки
  const sortingOptionsHeight = sortingToggleBtn.offsetHeight * sortingOptions.length;
  const styleElmnt = document.createElement(`style`);

  document.head.appendChild(styleElmnt);

  for (let i = 0, j = [`-webkit-keyframes`, `keyframes`]; i < j.length; i++) {
    styleElmnt.sheet.insertRule(`@${j[i]} sorting{from{height:0}to{height:${sortingOptionsHeight}px}}`, i);
  }

  sortingToggleBtn.onclick = (evt) => {
    evt.preventDefault();
    sortingToggle();
  };

  for (let i = 0; i < sortingOptions.length; i++) {
    sortingOptions[i].onclick = () => {
      sortingClose();
    };
  }
}

// Закрытие всплывающих окон клавишей ESC
window.onkeydown = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    // Проверка, открыто ли мобильного меню
    if (menuMobile.classList.contains(`menu-mobile--shown`)) {
      menuClose();
    }

    // Проверка, открыто ли окно фильтра
    if (filter && filter.classList.contains(`filter--shown`)) {
      filterClose();
    }

    // Проверка, открыто ли меню сортировки
    if (sorting && sorting.classList.contains(`sorting--opened`)) {
      sortingClose();
    }
  }
};

// Закрытие всплывающих окон по клику вне окна
if (overlay) {
  overlay.onclick = () => {
    // Проверка, открыто ли окно фильтра
    if (filter && filter.classList.contains(`filter--shown`)) {
      filterClose();
    }
  };
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

// Появление фильтра каталога
function filterOpen() {
  filter.classList.add(`filter--shown`);
  overlay.classList.add(`overlay--shown`);
}

// Закрытие фильтра каталога
function filterClose() {
  cssAnimationReset(filter, `filter--shown`);
  filter.style.animationDirection = `reverse`;

  cssAnimationReset(overlay, `overlay--shown`);
  overlay.style.animationDirection = `reverse`;

  window.setTimeout(() => {
    filter.classList.remove(`filter--shown`);
    filter.removeAttribute(`style`);

    overlay.classList.remove(`overlay--shown`);
    overlay.removeAttribute(`style`);
  }, 500);
}

// Появление и закрытие меню сортировки
function sortingToggle() {
  if (sorting.classList.contains(`sorting--opened`)) {
    sortingClose();
  } else {
    sortingOpen();
  }
}

// Появление меню сортировки
function sortingOpen() {
  sorting.classList.add(`sorting--opened`);

  window.addEventListener(`click`, handleSortingOutsideClick);
}

// Закрытие меню сортировки
function sortingClose() {
  cssAnimationReset(sorting, `sorting--opened`);
  sorting.lastChild.style.animationDirection = `reverse`;

  window.removeEventListener(`click`, handleSortingOutsideClick);

  window.setTimeout(() => {
    sorting.classList.remove(`sorting--opened`);
    sorting.lastChild.removeAttribute(`style`);
  }, 500);
}

// Закрытие меню сортировки по клику вне меню
function handleSortingOutsideClick(evt) {
  if (!sorting.contains(evt.target)) {
    evt.preventDefault();
    sortingClose();
  }
}

// Сброс CSS-анимации
function cssAnimationReset(elmnt, cls) {
  elmnt.classList.remove(cls);
  void elmnt.offsetWidth;
  elmnt.classList.add(cls);
}
