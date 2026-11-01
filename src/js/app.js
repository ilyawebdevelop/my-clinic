import * as flsFunctions from "./modules/functions.js";
import "./modules/jquery-3.7.1.min.js";
import { Fancybox } from "./modules/fancybox.esm.js";
import "./../../node_modules/page-scroll-to-id/jquery.malihu.PageScroll2id.js";
import './components.js';

flsFunctions.isWebp();

Fancybox.bind("[data-fancybox]", {
  closeButton: false,
});

$("a[rel='m_PageScroll2id']").mPageScroll2id({
  scrollSpeed: 50,
  offset: 35,
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
    nextEl: sliderNodeDoctor?.querySelector('.navArrowNext'),
    prevEl: sliderNodeDoctor?.querySelector('.navArrowPrev'),
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
  // if (!thumbSliderElem || !mainSliderElem || !contentSliderElem) return;

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
    scrollbar: {
      el: n.closest('.swiperW')?.querySelector('.swiper-scrollbar'),
      draggable: true, // Полосу можно будет перетаскивать мышкой
    },
  });
});

// Инициализация слайдера reviewsSlider
document.querySelectorAll('.reviewsSlider').forEach(n => {
  const mySwiperReviews = new Swiper(n, {
    slidesPerView: 2,
    spaceBetween: 24,
    speed: 600,
    autoplay: false,
    scrollbar: {
      el: n.closest('.swiperW')?.querySelector('.slider-pagination-wrapper .swiper-scrollbar'),
      draggable: true, // Полосу можно будет перетаскивать мышкой
    },
    navigation: {
      nextEl: n.closest('.swiperW')?.querySelector('.navArrowNext'),
      prevEl: n.closest('.swiperW')?.querySelector('.navArrowPrev'),
    },
    pagination: {
      el: n.closest('.swiperW')?.querySelector('.slider-pagination-wrapper .swiper-pagination'),
      clickable: true,
      type: 'bullets',
      renderBullet: function (index, className) {
        return `<span class="${className}"></span>`;
      },
    },
  });
});

// Инициализация слайдера articlesSlider
document.querySelectorAll('.articlesSlider').forEach(n => {
  const mySwiperArticles = new Swiper(n, {
    slidesPerView: 3,
    spaceBetween: 24,
    speed: 600,
    autoplay: false,
    scrollbar: {
      el: n.closest('.swiperW')?.querySelector('.slider-pagination-wrapper .swiper-scrollbar'),
      draggable: true, // Полосу можно будет перетаскивать мышкой
    },
    navigation: {
      nextEl: n.closest('.swiperW')?.querySelector('.navArrowNext'),
      prevEl: n.closest('.swiperW')?.querySelector('.navArrowPrev'),
    },
    pagination: {
      el: n.closest('.swiperW')?.querySelector('.slider-pagination-wrapper .swiper-pagination'),
      clickable: true,
      type: 'bullets',
      renderBullet: function (index, className) {
        return `<span class="${className}"></span>`;
      },
    },
  });
});

let jsShowMore = document.querySelectorAll('.js-show-more');

jsShowMore.forEach(el => {
  el.addEventListener('click', () => {
    let linkText = el.textContent;
    let contentHidden = el.closest('.cardText').querySelector('.content');
    console.log(contentHidden);
    if (linkText == "Читать весь отзыв" || linkText == "Свернуть") {
      if (linkText == "Читать весь отзыв") {
        el.textContent = "Свернуть";
        contentHidden.classList.remove("content--hidden");
        contentHidden.classList.add("content--visible");
      } else {
        el.textContent = "Читать весь отзыв";
        contentHidden.classList.remove("content--visible");
        contentHidden.classList.add("content--hidden");
      }
    }

  });
});

let jsShowMoreText = document.querySelectorAll('.js-show-more-text');

jsShowMoreText.forEach(el => {
  el.addEventListener('click', () => {
    let linkText = el.textContent;
    let contentHidden = el.closest('.action-text-wrap').querySelector('.content');
    console.log(contentHidden);
    if (linkText == "Загрузить еще" || linkText == "Свернуть") {
      if (linkText == "Загрузить еще") {
        el.textContent = "Свернуть";
        contentHidden.classList.remove("content--hidden");
        contentHidden.classList.add("content--visible");
      } else {
        el.textContent = "Загрузить еще";
        contentHidden.classList.remove("content--visible");
        contentHidden.classList.add("content--hidden");
      }
    }

  });
});


$('.accordion-header').click(function () {
  // Находим текстовый контент, который идет сразу за кликнутым заголовком
  const currentContent = $(this).next('.accordion-content');

  // Закрываем абсолютно все блоки .accordion-content на странице, кроме текущего
  $('.accordion-content').not(currentContent).slideUp(300);

  // НАХОДИМ ВСЕ заголовки на странице, убираем у них класс active (кроме текущего)
  $('.accordion-header').not(this).removeClass('active');

  // Плавно переключаем видимость текущего контента
  currentContent.slideToggle(300);

  // Переключаем (добавляем/удаляем) класс active на самом кликнутом заголовке
  $(this).toggleClass('active');
});

function map() {
  const contactsMap = document.querySelector("#map");
  let iconImageSize = [124, 124];
  if (window.matchMedia("(max-width:743px)").matches) iconImageSize = [72, 72];
  if (contactsMap) {
    function init() {
      const center = JSON.parse(contactsMap.dataset.center);
      const zoom = Number(contactsMap.dataset.zoom);
      const map = new ymaps.Map("map", {
        center,
        zoom
      });
      const placemark = new ymaps.Placemark(center, {}, {
        iconLayout: "default#image",
        iconImageHref: "./img/icons/marker.svg",
        iconImageSize
      });
      map.controls.remove("geolocationControl");
      map.controls.remove("searchControl");
      map.controls.remove("trafficControl");
      map.controls.remove("typeSelector");
      map.controls.remove("fullscreenControl");
      map.controls.remove("zoomControl");
      map.controls.remove("rulerControl");
      map.behaviors.disable(["scrollZoom"]);
      map.geoObjects.add(placemark);
    }
    ymaps.ready(init);
  }
}
map();


document.addEventListener('DOMContentLoaded', () => {
  const directionSelect = document.getElementById('directionSelect');
  const doctorSelect = document.getElementById('doctorSelect');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const tagsContainer = document.getElementById('tagsContainer');
  const resultsCountEl = document.getElementById('resultsCount');
  const cards = document.querySelectorAll('.work-card');

  if (directionSelect) {
    let filters = {
      direction: { value: 'all', text: '' },
      doctor: { value: 'all', text: '', avatar: '' }
    };

    function initCustomSelect(selectElement, filterKey) {
      const trigger = selectElement?.querySelector('.select-trigger');

      trigger?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.custom-select').forEach(el => {
          if (el !== selectElement) el.classList.remove('is-open');
        });
        selectElement.classList.toggle('is-open');
      });

      selectElement?.querySelectorAll('.select-option').forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();
          const value = option.getAttribute('data-value');
          const displayName = option.getAttribute('data-name');
          const avatarUrl = option.getAttribute('data-avatar') || '';

          // Обновляем массив фильтров
          filters[filterKey].value = value;
          filters[filterKey].text = displayName;
          if (filterKey === 'doctor') filters[filterKey].avatar = avatarUrl;

          // Переключаем классы подсветки элементов
          selectElement.querySelectorAll('.select-option').forEach(opt => opt.classList.remove('is-selected'));
          option.classList.add('is-selected');

          // РЕНДЕР ШАПКИ СЕЛЕКТА ПОД ДИЗАЙН
          const triggerValueText = selectElement.querySelector('.trigger-value');
          triggerValueText.textContent = displayName;

          if (filterKey === 'doctor') {
            const avatarContainer = document.getElementById('triggerDocAvatar');
            if (avatarUrl && value !== 'all') {
              avatarContainer.innerHTML = `<img src="${avatarUrl}" alt="">`;
              avatarContainer.style.display = 'block';
            } else {
              avatarContainer.innerHTML = '';
              avatarContainer.style.display = 'none';
            }
          }

          selectElement.classList.remove('is-open');
          syncUI();
        });
      });
    }


    function syncUI() {
      // 1. Фильтрация карточек

      let visibleCount = 0;

      cards.forEach(card => {
        const matchDir = filters.direction.value === 'all' || card.getAttribute('data-direction') === filters.direction.value;
        const matchDoc = filters.doctor.value === 'all' || card.getAttribute('data-doctor').split(' ').includes(filters.doctor.value);

        if (matchDir && matchDoc) {
          card.classList.remove('is-hidden');
          visibleCount++;
        } else {
          card.classList.add('is-hidden');
        }
      });
      if (resultsCountEl) {
        resultsCountEl.textContent = `Найдено ${visibleCount} работ`;
      }

      // 2. Рендеринг тегов
      tagsContainer.innerHTML = '';
      Object.keys(filters).forEach(key => {
        if (filters[key].value !== 'all') {
          const tag = document.createElement('div');
          tag.className = 'filter-tag';
          tag.innerHTML = `<span>${filters[key].text}</span><button class="tag-remove" data-key="${key}">×</button>`;
          tagsContainer.appendChild(tag);
        }
      });
    }

    // Сброс через теги-крестики
    tagsContainer?.addEventListener('click', (e) => {
      if (e.target.classList.contains('tag-remove')) {
        const key = e.target.getAttribute('data-key');
        resetSingleSelect(key);
      }
    });

    // Кнопка полного сброса
    resetBtn?.addEventListener('click', () => {
      resetSingleSelect('direction');
      resetSingleSelect('doctor');
    });

    function resetSingleSelect(key) {
      if (key === 'direction') {
        directionSelect.querySelector('.select-option[data-value="all"]').click();
      } else if (key === 'doctor') {
        doctorSelect.querySelector('.select-option[data-value="all"]').click();
      }
    }

    window.addEventListener('click', () => {
      document.querySelectorAll('.custom-select').forEach(el => el.classList.remove('is-open'));
    });

    initCustomSelect(directionSelect, 'direction');
    initCustomSelect(doctorSelect, 'doctor');
    syncUI();
  }

});

// Находим все обертки блоков
const fileWraps = document.querySelectorAll('.fileWrap');

fileWraps.forEach(wrap => {
  // Ищем элементы только внутри текущего блока
  const input = wrap.querySelector('.fileInput');
  const output = wrap.querySelector('.fileOutput');
  const defaultText = "Прикрепить резюме";

  input.addEventListener('change', function () {
    if (this.files && this.files.length > 0) {
      // Берем имя первого выбранного файла
      output.textContent = this.files[0].name;
    } else {
      // Возвращаем текст по умолчанию, если файл не выбран
      output.textContent = defaultText;
    }
  });
});

// Инициализация слайдера article-tags-slider
document.querySelectorAll('.article-tags-slider').forEach(n => {
  const mySwiperArticleTags = new Swiper(n, {
    slidesPerView: 'auto',
    spaceBetween: 110,
    speed: 600,
    autoplay: true,
    loop: true,
  });
});

// 1. Инициализация слайдера миниатюр
const equipmentThumbsSwiper = new Swiper('.equipment-thumbs', {
  spaceBetween: 0,
  slidesPerView: 4,
  watchSlidesProgress: true,
  breakpoints: {
    320: {
      slidesPerView: 'auto',
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 'auto',
      direction: 'vertical',
    }
  }
});

// 2. Инициализация основного слайдера оборудования
const equipmentMainSwiper = new Swiper('.equipment-main', {
  spaceBetween: 0,
  thumbs: {
    swiper: equipmentThumbsSwiper, // Привязка
  },
  navigation: {
    nextEl: document.querySelector('.equipment-main .navArrowNext'),
    prevEl: document.querySelector('.equipment-main .navArrowPrev'),
  },
});


const certSliderBlock = document.querySelector('.certSlider');
const certSliderContentBlock = document.querySelector('.certSliderContent');

const certSlider = new Swiper(certSliderBlock, {
  spaceBetween: 10,
  allowTouchMove: false,
  effect: 'fade', // Рекомендуется для текста, чтобы он плавно менялся, а не ехал вбок (опционально)
  slidesPerView: 1,
});

const certSliderContent = new Swiper(certSliderContentBlock, {
  spaceBetween: 20, // Задайте нужный отступ для текста
  allowTouchMove: true, // Позволяем скроллить текст свапом, если нужно
  effect: 'fade', // Рекомендуется для текста, чтобы он плавно менялся, а не ехал вбок (опционально)
  navigation: {
    nextEl: document.querySelector('.certSliderContent .navArrowNext'),
    prevEl: document.querySelector('.certSliderContent .navArrowPrev'),
  },
  fadeEffect: { crossFade: true }
});

// 4. Связываем основной слайдер и контентный слайдер через Controller в обе стороны
certSlider.controller.control = certSliderContent;
certSliderContent.controller.control = certSlider;

// Находим контейнер слайдера
const studySlider = document.querySelector('.studySlider');
if (studySlider) {
  // Собираем данные из всех слайдов
  const slidesData = Array.from(studySlider.querySelectorAll('.studySlide')).map(slide => {
    return {
      year: slide.getAttribute('data-year') || '',
      label: slide.getAttribute('data-label') || ''
    };
  });

  // Инициализируем studySwiper
  const studySwiper = new Swiper('.studySlider', {

    spaceBetween: 20, // Задайте нужный отступ для текста
    allowTouchMove: true, // Позволяем скроллить текст свапом, если нужно
    navigation: {
      nextEl: document.querySelector('.studySlider .navArrowNext'),
      prevEl: document.querySelector('.studySlider .navArrowPrev'),
    },
    pagination: {
      el: '.studyPagination .swiper-pagination',
      clickable: true,
      bulletClass: 'study-timeline-bullet',
      bulletActiveClass: 'study-timeline-bullet-active',

      // Функция рендера
      renderBullet: function (index, className) {
        // Если включен loop, Swiper может запросить индекс, которого нет в массиве
        // Используем остаток от деления для защиты
        const dataIndex = index % slidesData.length;
        const data = slidesData[dataIndex];

        return `<span class="${className}">
                <span class="bullet-year">${data.year}</span>
                <span class="bullet-label">${data.label}</span>
              </span>`;
      },
    },
  });


}




// Инициализация слайдера article-tags-slider
document.querySelectorAll('.implant-slider-wrap').forEach(n => {
  const swiper = new Swiper(n.querySelector('.implant-slider'), {
    slidesPerView: 1,
    spaceBetween: 20,
    effect: 'fade', // Раскомментируйте, если хотите плавное затухание вместо свайпа
    fadeEffect: { crossFade: true },
    // loop: true, // Если включите loop, нужно будет чуть поправить логику индексов (см. ниже)

    // Если используете кастомную пагинацию "01 / 03" (как на макете)
    pagination: {
      el: n.querySelector('.implant-slider-pagination .current'),
      type: 'fraction', // Показывает "1 / 3"
      formatFractionCurrent: function (number) {
        return number.toString().padStart(2, '0'); // Делает "01", "02"
      },
      formatFractionTotal: function (number) {
        return number.toString().padStart(2, '0');
      }
    },
  });
});


const howThumbSlider = new Swiper('.howThumbSlider', {
  spaceBetween: 60,
  slidesPerView: 4,
  watchSlidesProgress: true,
  breakpoints: {
    320: {
      slidesPerView: 'auto',
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 'auto',
      direction: 'vertical',
    }
  }
});

// 2. Инициализация основного слайдера оборудования
const howSlider = new Swiper('.howSlider', {
  spaceBetween: 0,
  thumbs: {
    swiper: howThumbSlider, // Привязка
  },
  pagination: {
    el: '.service-how .swiper-pagination',
    type: 'fraction', // Включаем тип «дробь»
    formatFractionCurrent: function (number) {
      return String(number).padStart(2, '0');
    },
    // Форматирование общего количества слайдов
    formatFractionTotal: function (number) {
      return String(number).padStart(2, '0');
    },
  },
  navigation: {
    nextEl: document.querySelector('.service-how .navArrowNext'),
    prevEl: document.querySelector('.service-how .navArrowPrev'),
  },
});


// 1. Сначала собираем все Thumb-слайдеры в объект, где ключ - это data-index
const thumbsMap = {};

const thumbPanels = document.querySelectorAll('.serv-doctor-tabs-thumb-wrap .wp-tabs__panel');
thumbPanels.forEach((panel) => {
  const index = panel.getAttribute('data-index'); // Получаем "1", "2" и т.д.
  const thumbEl = panel.querySelector('.serv-doctor-thumb-slider');

  if (thumbEl && index) {
    thumbsMap[index] = new Swiper(thumbEl, {
      spaceBetween: 0,
      slidesPerView: 4,
      watchSlidesProgress: true,
      breakpoints: {
        320: { slidesPerView: 'auto', spaceBetween: 0 },
        1024: { slidesPerView: 'auto', direction: 'vertical' }
      }
    });
  }
});

// 2. Теперь проходимся по основным панелям и связываем их с Thumb по data-index
const mainPanels = document.querySelectorAll('.serv-doctor-tabs-wrap .wp-tabs__panel');
mainPanels.forEach((panel) => {
  const index = panel.getAttribute('data-index');
  const mainEl = panel.querySelector('.serv-doctor-slider');

  // Находим стрелки внутри этой конкретной панели
  const nextEl = panel.querySelector('.navArrowNext');
  const prevEl = panel.querySelector('.navArrowPrev');

  if (mainEl && index) {
    // Берем нужный Thumb-слайдер из нашего словаря по data-index
    const relatedThumb = thumbsMap[index];

    new Swiper(mainEl, {
      spaceBetween: 0,
      // Привязываем найденный Thumb (если он есть)
      thumbs: {
        swiper: relatedThumb
      },
      navigation: {
        nextEl: nextEl,
        prevEl: prevEl,
      },
    });
  }
});


const quizForm = document.querySelector('.quiz');
if (quizForm) {
  const steps = quizForm.querySelectorAll('.quiz__step');
  const navItems = quizForm.querySelectorAll('.quiz__nav-item');
  const nextBtn = quizForm.querySelector('.quiz__btn--next');
  const prevBtn = quizForm.querySelector('.quiz__btn--prev');

  let currentStep = 0;

  // 1. Функция обновления интерфейса
  const updateStep = () => {
    // Переключаем видимость шагов
    steps.forEach((step, index) => {
      step.classList.toggle('quiz__step--active', index === currentStep);
    });

    // Переключаем активный класс на табах (01, 02...)
    navItems.forEach((item, index) => {
      item.classList.toggle('quiz__nav-item--active', index === currentStep);

      // Визуально блокируем "будущие" шаги, на которые еще нельзя перейти
      if (index > currentStep) {
        item.classList.add('quiz__nav-item--disabled');
      } else {
        item.classList.remove('quiz__nav-item--disabled');
      }
    });

    // Кнопка "Назад" неактивна на первом шаге
    if (prevBtn) prevBtn.disabled = (currentStep === 0);

    // Меняем текст кнопки на последнем шаге
    if (nextBtn) {
      // Если это последний шаг — скрываем кнопку, иначе показываем и пишем "ДАЛЕЕ"
      if (currentStep === steps.length - 1) {
        nextBtn.style.display = 'none';
      } else {
        nextBtn.style.display = 'flex'; // Или 'inline-block', в зависимости от вашей верстки (как было изначально)
        nextBtn.querySelector('.text-btn').textContent = 'ДАЛЕЕ';
      }
    }
  };

  // 2. Функция проверки валидности текущего шага
  const isStepValid = () => {
    const currentStepEl = steps[currentStep];
    const validateType = currentStepEl.getAttribute('data-validate');

    // Если шаг с выбором картинок (радио)
    if (validateType === 'radio') {
      return !!currentStepEl.querySelector('input[type="radio"]:checked');
    }

    // Если шаг с формой (имя, телефон)
    if (validateType === 'input') {
      const inputs = currentStepEl.querySelectorAll('input[required]');
      let allFilled = true;
      inputs.forEach(input => {
        if (!input.value.trim()) allFilled = false;
      });
      return allFilled;
    }

    // Если шаг без инпутов (просто инфо) — всегда валиден
    if (validateType === 'none') return true;

    return true; // По умолчанию
  };

  // Слушаем изменения в форме, чтобы разблокировать "Далее"
  quizForm.addEventListener('change', () => {
    if (isStepValid()) nextBtn.disabled = false;
  });

  quizForm.addEventListener('input', () => {
    if (isStepValid()) nextBtn.disabled = false;
  });

  // 3. Клик по кнопке "ДАЛЕЕ"
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateStep();
      nextBtn.disabled = !isStepValid(); // Блокируем, если новый шаг не заполнен
    } else {
      // Здесь логика отправки формы (AJAX в Битрикс24)
      console.log('Отправка данных...');
      // quizForm.submit(); 
    }
  });

  // 4. Клик по кнопке "НАЗАД"
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentStep > 0) {
      currentStep--;
      updateStep();
      nextBtn.disabled = !isStepValid();
    }
  });

  // 5. КЛИКИ ПО ТАБАМ (01, 02, 03...) - ТО, ЧЕГО НЕ ХВАТАЛО
  navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      // Разрешаем клик, если:
      // 1. Это шаг назад (index < currentStep)
      // 2. Это текущий шаг
      // 3. Это шаг вперед, но ТОЛЬКО если текущий шаг заполнен (isStepValid())
      if (index < currentStep || index === currentStep || (index === currentStep + 1 && isStepValid())) {
        currentStep = index;
        updateStep();
        nextBtn.disabled = !isStepValid();
      }
    });
  });

  // Инициализация при загрузке
  updateStep();
  nextBtn.disabled = !isStepValid(); // Проверяем первый шаг
}


const menuBtn = document.querySelector('.headerMenuBtn');
const header = document.querySelector('#header');
const menu = document.querySelector('.headerMenu');
const body = document.querySelector('body');


// Запоминаем изначальное состояние хедера при загрузке страницы
const isInitiallyAbsolute = header.classList.contains('header--absolute');

menuBtn.addEventListener('click', () => {

  // 1. Логика для Хедера
  // Если изначально был absolute - всегда меняем туда-сюда
  if (isInitiallyAbsolute) {
    if (header.classList.contains('header--absolute')) {
      header.classList.remove('header--absolute');
      header.classList.add('header-standart');
      // body.classList.remove('hidden');
    } else {
      header.classList.remove('header-standart');
      header.classList.add('header--absolute');
      // body.classList.remove('hidden');
    }
  }
  // Если изначально был standart - мы вообще ничего не делаем с хедером

  // 2. Логика для Меню и Кнопки (открытие/закрытие работает всегда)
  menu.classList.toggle('active');
  menuBtn.classList.toggle('active');
  body.classList.toggle('hidden');
});