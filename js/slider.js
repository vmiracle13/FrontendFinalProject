;(function() {
  document.addEventListener('DOMContentLoaded', function() {

    const slider = document.body.querySelector('.promo-block');
    const sliderBlock = document.body.querySelector('.slider-images');
    const prevArrow = slider.querySelector('.prev');
    const nextArrow = slider.querySelector('.next');
    let activeImage = sliderBlock.querySelector('a.active');
    const divMiddle = document.body.querySelector('.middle');

    let timerId = null;
    let animatedStop = false;
    let animated = false;

    generateHref(sliderBlock);
    generateDots(sliderBlock);

    let activeRadio = divMiddle.querySelector('a.active-radio');


    sliderBlock.addEventListener('click', function(){
      animatedStop = true;
      clearInterval(timerId);
      runSlide();
    });

    function runSlide(event) {

      if (animated) return;
      animated = true;

      if (event !== undefined && (event.target.classList.contains('fa-chevron-left') || event.target.contains(slider.querySelector('.fa-chevron-left')))) {
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
        timerId = setInterval(runSlide, 5000);
        animatedStop = false;
      }
      animated = false;
    }

    timerId = setInterval(runSlide, 5000);

    prevArrow.addEventListener('click', function(event) {
      event.preventDefault();
      animatedStop = true;
      clearInterval(timerId);
      runSlide(event);
    });

    nextArrow.addEventListener('click', function(event) {
      event.preventDefault();
      animatedStop = true;
      clearInterval(timerId);
      runSlide(event);
    });

    divMiddle.addEventListener('click', function(event){
      if (event.target.tagName !== 'A') return;
      animatedStop = true;
      clearInterval(timerId);
      runSlide(event);
    });




/*
    function runSlide(event) {
      if (animated) return;
      animated = true;
      if (!activeImage.nextElementSibling) {
        activeImage.classList.remove('active');
        activeImage = sliderBlock.firstElementChild;
      } else {
        activeImage.classList.remove('active');
        activeImage = activeImage.nextElementSibling;
      }

      activeImage.classList.add('active');
      changeActiveRadio(activeImage);

      if (animatedStop) {
        timerId = setInterval(runSlide, 2000);
        animatedStop = false;
      }
      animated = false;
    }

    timerId = setInterval(runSlide, 2000);


    prevArrow.addEventListener('click', function(event) {
      if (event.target.classList.contains('fa-chevron-left') || event.target.contains(slider.querySelector('.fa-chevron-left'))) {
        if (animated) return;
        animated = true;
        animatedStop = true;
        clearInterval(timerId);

        if (!activeImage.previousElementSibling) {
          activeImage.classList.remove('active');
          activeImage = sliderBlock.lastElementChild;
        } else {
          activeImage.classList.remove('active');
          activeImage = activeImage.previousElementSibling;
        }
        timerId = setInterval(runSlide, 2000);
        animatedStop = false;
      }

      activeImage.classList.add('active');
      changeActiveRadio(activeImage);

      if (animatedStop) {
        timerId = setInterval(runSlide, 10000);
        animatedStop = false;
      }
      animated = false;
    });

    nextArrow.addEventListener('click', function(event) {
      if (animated) return;
      animated = true;
      animatedStop = true;
      clearInterval(timerId);
      if (!activeImage.nextElementSibling) {
        activeImage.classList.remove('active');
        activeImage = sliderBlock.firstElementChild;
      } else {
        activeImage.classList.remove('active');
        activeImage = activeImage.nextElementSibling;
      }

      activeImage.classList.add('active');
      changeActiveRadio(activeImage);

      if (animatedStop) {
        timerId = setInterval(runSlide, 10000);
        animatedStop = false;
      }
      animated = false;
    });

    divMiddle.addEventListener('click', function(event){
      console.log("event target = ");
      console.log(event.target);
      if (event.target.tagName !== 'A') return;
      if (animated) return;
      animated = true;
      animatedStop = true;
      clearInterval(timerId);

      activeImage.classList.remove('active');
      activeImage = slider.children[+event.target.dataset.number];

      activeImage.classList.add('active');
      changeActiveRadio(activeImage);

      if (animatedStop) {
        timerId = setInterval(runSlide, 10000);
        animatedStop = false;
      }
      animated = false;
    });
*/


    // generate the same amount of radio buttons as image amount
    function generateDots(sB) {
      let fragment = document.createDocumentFragment();

      for (let i = 0; i < sB.childElementCount; i++) {
        const radio = document.createElement('a');
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
      for (let i = 0; i < sliderBlock.childElementCount; i++) {
        sB.children[i].setAttribute('data-number', i);
        if (i % 2) {
          sB.children[i].setAttribute('href', 'catalog.html');
        } else {
          sB.children[i].setAttribute('href', 'item.html');
        }
      }
    }

    // change a colour of a radio button under slider
    function changeActiveRadio(actImage) {
      for (let i = 0; i < divMiddle.childElementCount; i++) {
        if (divMiddle.children[i].dataset.number === actImage.dataset.number) {
          activeRadio.classList.remove('active-radio');
          activeRadio = divMiddle.children[i];
          activeRadio.classList.add('active-radio');
        }
      }
    }
  });
})();
