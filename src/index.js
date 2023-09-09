import './main.css';
import angleLeft from './assets/angle-left.svg';
import angleRight from './assets/angle-right.svg';
import * as Skins from './images';

const champions = Object.keys(Skins);

const slidesMarkup = champions.reduce((accumulator, element, index) => {
  const string = `<div class="slide" data-index=${index}><img src="${Skins[element]}"></div>`;
  return accumulator + string;
}, '');

const dotsMarkup = champions.reduce((accumulator, element, index) => {
  const string = `<li class="dot"><button class="dot-btn ${
    index === 0 ? 'selected' : ''
  }" data-index=${index}></button></li>`;
  return accumulator + string;
}, '');

const markup = `
<div class="carousel">
  <div class="slides" data-index="0">${slidesMarkup}</div>
  <menu class="arrows-menu">
    <li class="arrow-left"><button class="left-btn">${angleLeft}</button></li>
    <li class="arrow-right"><button class="right-btn">${angleRight}</button></li>
  </menu>
  <menu class="nav-dots">${dotsMarkup}</menu>
</div>
`;

const carousel = new DOMParser()
  .parseFromString(markup, 'text/html')
  .querySelector('.carousel');

const slides = carousel.querySelector('.slides');

const findSlide = (index) => slides.querySelector(`[data-index="${index}"]`);

const updateNavDots = (index) => {
  const dotBtns = carousel.querySelectorAll('.dot-btn');
  dotBtns.forEach((btn) => {
    if (btn.dataset.index === index.toString()) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
};

carousel.addEventListener('click', (e) => {
  if (e.target.className === 'left-btn') {
    const currentIndex = Number(slides.dataset.index);
    const newIndex = (currentIndex - 1 + champions.length) % champions.length;
    slides.dataset.index = newIndex;
    const slide = findSlide(newIndex);
    updateNavDots(newIndex);
    slide.scrollIntoView();
  }

  if (e.target.className === 'right-btn') {
    const currentIndex = Number(slides.dataset.index);
    const newIndex = (currentIndex + 1) % champions.length;
    slides.dataset.index = newIndex;
    const slide = findSlide(newIndex);
    updateNavDots(newIndex);
    slide.scrollIntoView();
  }

  if (e.target.classList.contains('dot-btn')) {
    const index = Number(e.target.dataset.index);
    slides.dataset.index = index;
    const slide = findSlide(index);
    updateNavDots(index);
    slide.scrollIntoView();
  }
});

document.body.appendChild(carousel);

const timeout = () => {
  const nextBtn = document.querySelector('.right-btn');
  nextBtn.click();
};

setInterval(timeout, 5000);
