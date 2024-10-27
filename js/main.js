"use strict"


// menu burger
const menuButton = document.querySelector('.menu__button');
const menuBody = document.querySelector('.menu__body');

if (menuButton) {
  menuButton.addEventListener('click', function (e) {
    document.body.classList.toggle('_lock');
    menuButton.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  })
}

// Прокрутка при кліку

const menuLinks = document.querySelectorAll('.menu__list-link[data-goto]');

if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });
  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY - document.querySelector('header').offsetHeight;

      if (menuButton.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        menuButton.classList.remove('_active');
        menuBody.classList.remove('_active');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth'
      });
      e.preventDefault();
    }
  }
}

// Масив з мовами
const languages = ['PL', 'UA', 'EN'];

// Функція для зміни тексту на сторінці відповідно до вибраної мови
function changeLanguage(lang) {
  const elements = document.querySelectorAll('[data-lang-' + lang.toLowerCase() + ']');

  elements.forEach(function (element) {
    const text = element.getAttribute('data-lang-' + lang.toLowerCase());
    if (text) {
      element.textContent = text;
    }
  });
}

// Обробляємо кліки для відкриття/закриття випадаючого меню
document.querySelector('.selected-lang').addEventListener('click', function () {
  const currentLang = document.getElementById('selected-lang').textContent;

  // Фільтруємо інші мови, щоб показати тільки ті, що не вибрані
  const dropdown = document.getElementById('lang-dropdown');
  dropdown.innerHTML = '';

  languages.forEach(function (lang) {
    if (lang !== currentLang) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.setAttribute('data-lang', lang);
      a.textContent = lang;
      li.appendChild(a);
      dropdown.appendChild(li);
    }
  });

  document.querySelector('.lang-menu').classList.toggle('open');
});

// Обробляємо вибір мови і змінюємо відображувану мову
document.querySelector('#lang-dropdown').addEventListener('click', function (e) {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    const selectedLang = e.target.getAttribute('data-lang');

    // Змінюємо текст на панелі з вибраною мовою
    document.getElementById('selected-lang').textContent = selectedLang;

    // Змінюємо текст на всіх елементах відповідно до вибраної мови
    changeLanguage(selectedLang);

    // Закриваємо випадаюче меню після вибору
    document.querySelector('.lang-menu').classList.remove('open');
  }
});

// Виклик функції для зміни мови при завантаженні сторінки
const initialLang = document.getElementById('selected-lang').textContent;
changeLanguage(initialLang);



// Паралакс для зображень
const parallaxImages = document.querySelectorAll('.main-screen-images');

window.addEventListener('scroll', function() {
  let scrollPosition = window.pageYOffset;

  parallaxImages.forEach(image => {
    let imageOffsetTop = image.offsetTop;
    let speed = -0.2; // Це швидкість. Можеш змінювати це значення для різної швидкості

    // Рухаємо зображення вгору швидше, ніж звичайний скрол
    let translateY = (scrollPosition - imageOffsetTop) * speed;

    // Застосовуємо трансформацію до зображення
    image.style.transform = `translateY(${translateY}px)`;
  });
});

// slider

new Swiper('.swiper', {
  slidesPerView: 6,
  loop: true,
  loopedSlides: 1,
  autoplay: {
    delay: 2000,
  },
  speed: 600,

  breakpoints: {
    320: { // якщо ширина екрану більше 320px
      slidesPerView: 1.2,
    },
    400: { // якщо ширина екрану більше 320px
      slidesPerView: 1.5,
    },
    600: { // якщо ширина екрану більше 600px
      slidesPerView: 3.5,
    },
    900: { // якщо ширина екрану більше 900px
      slidesPerView: 4.5,
    },
    1200: { // якщо ширина екрану більше 1200px
      slidesPerView: 6.4,
    },
    1500: { // якщо ширина екрану більше 1200px
      slidesPerView: 8,
    },
  }
  
});

// products

const productsItem = document.querySelectorAll('.products__item');
const tabContentItem = document.querySelectorAll('.tab__content-item');

for (let item of productsItem) {
  item.addEventListener('click', function() {
    
    for (let element of tabContentItem) {
      element.classList.add('hidden');
    }
    
    const content = document.querySelector('#' + item.dataset.tab);
    content.classList.remove('hidden')
  })
}
