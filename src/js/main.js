// Яндекс карта

document.querySelector('.map-btn').addEventListener('click', function () {
  document.getElementById('map-adress').style = "display: none;"
})


ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.765628, 37.622538],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 14
  });




  var myPlacemark = new ymaps.Placemark([55.769383, 37.638521], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'addons/Ellipse 2.svg',
    iconImageSize: [12, 12],
    iconImageOffset: [0, 0]
  });

  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myPlacemark);
  myMap.controls.remove('zoomControl');
  myMap.controls.remove('geolocationControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('typeSelector');
  myMap.controls.remove('fullscreenControl');
  myMap.controls.remove('rulerControl');
  myMap.controls.remove('SearchControl');

}

// поиск по клику 

document.querySelector(".header-btn").addEventListener("click", function () {
  document.querySelector(".header__form").classList.add("header__form__active");
});


document.querySelector(".header-btn-close").addEventListener("click", function () {
  document.querySelector(".header__form").classList.remove("header__form__active");
});

document.querySelector(".header-btn-close-2").addEventListener("click", function () {
  document.querySelector(".header__form").classList.remove("header__form__active");
});


// валидация

const validation = new JustValidate('.form', {

  errorLabelStyle: {
    color: '#FF3030',

  },

});


validation

  .addField('.input-name', [
    {
      rule: 'required',
      errorMessage: 'Вы невели свое Имя',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Минимальное кол-во символов 2',
    },
    {
      rule: 'maxLength',
      value: 20,
      errorMessage: 'Максимальное кол-во символов 20',

    },

  ])

  .addField('.input-email', [
    {
      rule: 'required',
      errorMessage: 'Вы невели свою почту',
    },
    {
      rule: 'email',
      errorMessage: 'Почта введена неверно',
    },
  ])

  .addField('.input-textarea', [
    {
      rule: 'required',
      errorMessage: 'Вы невели своё сообщение',
    },
    {
      rule: 'minLength',
      value: 5,
      errorMessage: 'Минимальное кол-во символов 5',
    },
    {
      rule: 'maxLength',
      value: 400,
      errorMessage: 'Максимальное кол-во символов 400',
    },
  ]).onSuccess((event) => {
    console.log('Validation passes and form submitted', event);

  });


const burger = document.querySelector('.burger');
const burgerClose = document.querySelector('.burger-btn-close');
const nav = document.querySelector('.nav-burger');
// const menuLinks = nav.querySelectorAll('.nav__link');

burger.addEventListener('click', () => {
  nav.classList.toggle('visibility-burger');
})

burgerClose.addEventListener('click', () => {
  nav.classList.remove('visibility-burger');
})

