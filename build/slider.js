'use strict';

;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var slider = document.body.querySelector('.promo-block');
    var sliderBlock = document.body.querySelector('.slider-images');
    var prevArrow = slider.querySelector('.prev');
    var nextArrow = slider.querySelector('.next');
    var activeImage = sliderBlock.querySelector('a.active');
    var divMiddle = document.body.querySelector('.middle');

    var timerId = null;
    var animatedStop = false;
    var animated = false;
    // generate the same amount of radio buttons as image amount
    function generateDots(sB) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < sB.childElementCount; i++) {
        var radio = document.createElement('a');
        if (i === 0) {
          radio.classList.add('active-radio');
        }
        radio.setAttribute('data-number', i);
        radio.setAttribute('href', '#' + sB.children[i].dataset.number);
        fragment.appendChild(radio);
      }
      divMiddle.appendChild(fragment);
    }

    // generate correct href for image (tag a)
    function generateHref(sB) {
      for (var i = 0; i < sliderBlock.childElementCount; i++) {
        sB.children[i].setAttribute('data-number', i);
        if (i % 2) {
          sB.children[i].setAttribute('href', 'catalog.html');
        } else {
          sB.children[i].setAttribute('href', 'item.html');
        }
      }
    }
    var activeRadio = divMiddle.querySelector('.active-radio');
    console.log(activeRadio);

    // change a colour of a radio button under slider
    function changeActiveRadio(actImage) {
      for (var i = 0; i < divMiddle.childElementCount; i++) {
        if (divMiddle.children[i].dataset.number === actImage.dataset.number) {
          activeRadio.classList.remove('active-radio');
          activeRadio = divMiddle.children[i];
          activeRadio.classList.add('active-radio');
        }
      }
    }
    generateHref(sliderBlock);
    generateDots(sliderBlock);

    function runSlide(event) {
      if (animated) return;

      if (event !== undefined && (event.target.classList.contains('left') || event.target.contains(slider.querySelector('.left')))) {
        if (!activeImage.previousElementSibling) {
          activeImage.classList.remove('active');
          activeImage = sliderBlock.lastElementChild;
        } else {
          activeImage.classList.remove('active');
          activeImage = activeImage.previousElementSibling;
        }
      } else if (event !== undefined && event.target.tagName === "A" && divMiddle.contains(event.target)) {
        activeImage.classList.remove('active');
        activeImage = sliderBlock.children[event.target.dataset.number];
      } else {
        if (!activeImage.nextElementSibling) {
          activeImage.classList.remove('active');
          activeImage = sliderBlock.firstElementChild;
        } else {
          activeImage.classList.remove('active');

          activeImage = activeImage.nextElementSibling;
        }
      }
      activeImage.classList.add('active');
      changeActiveRadio(activeImage);

      if (animatedStop) {
        timerId = setTimeout(runSlide, 2000);
        animatedStop = false;
      }
      animated = false;
    }

    timerId = setInterval(runSlide, 10000);

    sliderBlock.addEventListener('click', function () {
      animatedStop = true;
      clearInterval(timerId);
      runSlide();
    });
    prevArrow.addEventListener('click', function (event) {
      event.preventDefault();
      animatedStop = true;
      clearInterval(timerId);
      runSlide(event);
    });

    nextArrow.addEventListener('click', function (event) {
      event.preventDefault();
      animatedStop = true;
      clearInterval(timerId);
      runSlide(event);
    });

    divMiddle.addEventListener('click', function (event) {
      if (event.target.tagName !== 'A') return;
      animatedStop = true;
      clearInterval(timerId);
      runSlide(event);
    });
  });
})();