import * as flsFunctions from "./modules/functions.js";
import "./modules/jquery-3.7.1.min.js";
import { Fancybox } from "./modules/fancybox.esm.js";
import './components.js';

flsFunctions.isWebp();

Fancybox.bind("[data-fancybox]", {
  closeButton: false,
});

// Import swiper
import Swiper, { Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar, Controller } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar, Controller]);

const sliderNodeDoctor = document.querySelector('.doctorsSlider');
const doctorsSlider = new Swiper(sliderNodeDoctor, {
  slidesPerView: 'auto',  /* Позволяет слайдам иметь разную ширину через CSS */
  centeredSlides: false,  /* Активный слайд прижат к левому краю */
  spaceBetween: 70,       /* Отступ между слайдами */
  loop: true,
  speed: 800,
  // loopedSlides: 5,
  // loopAdditionalSlides: 3,           /* По желанию, если нужна бесконечная прокрутка */
  watchSlidesProgress: true, // Добавьте эту строку
  // Стабилизация бесконечной ленты
  loopedSlides: 3,
  loopAdditionalSlides: 3,
  preventInteractionOnTransition: true,

  // Кнопки навигации (стрелочки справа внизу)
  navigation: {
    nextEl: sliderNodeDoctor.querySelector('.navArrowNext'),
    prevEl: sliderNodeDoctor.querySelector('.navArrowPrev'),
  },
});


// Tabs
(function () {
  // Находим все независимые блоки табов на странице
  var containers = document.querySelectorAll('.wp-tabs');

  containers.forEach(function (container) {
    var buttons = container.querySelectorAll('.wp-tabs__btn');
    var panels = container.querySelectorAll('.wp-tabs__panel');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var index = btn.getAttribute('data-index');

        buttons.forEach(function (b) { b.classList.remove('active'); });
        panels.forEach(function (p) { p.classList.remove('active'); });

        btn.classList.add('active');

        container.querySelectorAll('.wp-tabs__panel[data-index="' + index + '"]').forEach(function (panel) {
          panel.classList.add('active');
        });

      });
    });
  });
})();

// Находим все панели табов, так как в каждой из них сидит свой уникальный набор из 3-х слайдеров
const tabPanels = document.querySelectorAll('.wp-tabs__panel');

tabPanels.forEach((panel) => {
  // Получаем индекс текущего таба, чтобы найти соответствующий ему контентный слайдер справа
  const tabIndex = panel.getAttribute('data-index');

  // Ищем левые слайдеры конкретно внутри этой панели
  const thumbSliderElem = panel.querySelector('.resultThumbSlider');
  const mainSliderElem = panel.querySelector('.resultSlider');

  // Ищем правый контентный слайдер в основном документе, соответствующий этому же data-index
  const contentSliderElem = document.querySelector(`.wp-tabs-body .wp-tabs__panel[data-index="${tabIndex}"] .resultContentSlider`);

  // Если какого-то из элементов нет на странице, пропускаем итерацию во избежание ошибок
  if (!thumbSliderElem || !mainSliderElem || !contentSliderElem) return;

  // 1. Инициализируем слайдер миниатюр (левый мелкий)
  const swiperThumbs = new Swiper(thumbSliderElem, {
    spaceBetween: 50,
    freeMode: true,
    slidesPerView: 'auto',
    watchSlidesProgress: true,
    direction: 'vertical',
  });

  // 2. Инициализируем основной слайдер картинок (левый большой)
  const swiperMain = new Swiper(mainSliderElem, {
    spaceBetween: 10,
    allowTouchMove: false,
    navigation: {
      nextEl: panel.querySelector('.navArrowNext'),
      prevEl: panel.querySelector('.navArrowPrev'),
    },
    thumbs: {
      swiper: swiperThumbs, // Привязка миниатюр
    },
  });

  // 3. Инициализируем правый контентный слайдер (текстовый)
  const swiperContent = new Swiper(contentSliderElem, {
    spaceBetween: 20, // Задайте нужный отступ для текста
    allowTouchMove: true, // Позволяем скроллить текст свапом, если нужно
    effect: 'fade', // Рекомендуется для текста, чтобы он плавно менялся, а не ехал вбок (опционально)
    fadeEffect: { crossFade: true }
  });

  // 4. Связываем основной слайдер и контентный слайдер через Controller в обе стороны
  swiperMain.controller.control = swiperContent;
  swiperContent.controller.control = swiperMain;
});

document.addEventListener('click', function (e) {
  const btn = e.target.closest('.resultSlideBtn');
  if (!btn) return;

  const slide = btn.closest('.resultSlide');
  if (!slide) return;

  const isBefore = btn.classList.contains('resultSlideBeforeBtn');

  // фото: active только у нужного
  slide.querySelector('.resultSlideBefore').classList.toggle('active', isBefore);
  slide.querySelector('.resultSlideAfter').classList.toggle('active', !isBefore);

  // кнопки: active только у нажатой
  slide.querySelectorAll('.resultSlideBtn').forEach(function (b) {
    b.classList.toggle('active', b === btn);
  });
});

// Инициализация слайдера galSlider
document.querySelectorAll('.galSlider').forEach(n => {
  const mySwiperGal = new Swiper(n, {
    slidesPerView: 'auto',
    spaceBetween: 0,
    speed: 600,
    autoplay: false,
    navigation: {
      nextEl: n.closest('.swiperW')?.querySelector('.navArrowNext'),
      prevEl: n.closest('.swiperW')?.querySelector('.navArrowPrev'),
    },
  });
});