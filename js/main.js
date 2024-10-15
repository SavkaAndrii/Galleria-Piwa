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

// language

// array lang
const languages = ['PL', 'UA', 'EN'];

// Обробляємо кліки для відкриття/закриття випадаючого меню
document.querySelector('.selected-lang').addEventListener('click', function() {
    const currentLang = document.getElementById('selected-lang').textContent;
    
    // Фільтруємо інші мови, щоб показати тільки ті, що не вибрані
    const dropdown = document.getElementById('lang-dropdown');
    dropdown.innerHTML = '';
    
    languages.forEach(function(lang) {
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
document.querySelector('#lang-dropdown').addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const selectedLang = e.target.getAttribute('data-lang');
        
        // Змінюємо текст на панелі з вибраною мовою
        document.getElementById('selected-lang').textContent = selectedLang;

        // Закриваємо випадаюче меню після вибору
        document.querySelector('.lang-menu').classList.remove('open');
    }
});


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
