;(function() {
  document.addEventListener('DOMContentLoaded', function() {

    const slider = document.body.querySelector('.promo-block');
    const sliderImages = slider.querySelectorAll('img');

    const prevArrow = slider.querySelector('.prev');
    const nextArrow = slider.querySelector('.next');

    let activeImage = sliderImages[0].parentElement;
    activeImage.classList.add('active');

    let divMiddle = document.body.querySelector('.middle');

    generateDots(sliderImages);
    generateHref();

    let radioCommands = divMiddle.querySelectorAll('a');
    let activeRadio = radioCommands[0];
    activeRadio.classList.add('active-radio');

    let index;

    autoSlide();

    let timerId;

    prevArrow.addEventListener('click', function(event){
      const target = event.target;
      let prevImage = activeImage.previousElementSibling;
      prevImage.classList.add('active');
      activeImage.classList.remove('active');
      activeImage = prevImage;
    });


    nextArrow.addEventListener('click', function(event){
      const target = event.target;
      let nextImage = activeImage.nextElementSibling;
      nextImage.classList.add('active');
      activeImage.classList.remove('active');
      activeImage = nextImage;
    });

    //generate the same amount of radio buttons as image amount
    function generateDots(images) {
      let fragment = document.createDocumentFragment();

      for (let i = 0; i < images.length; i++) {
        let radio = document.createElement('a');
        if (i == 0) {
          radio.classList.add('active-radio');

        }
        radio.setAttribute('data-number', i);
        fragment.appendChild(radio);
      }
      divMiddle.appendChild(fragment);
    }

    //generate correct href
    function generateHref() {
      for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].parentElement.setAttribute('data-number', i);
        if (i % 2) {
          sliderImages[i].parentElement.setAttribute('href', 'catalog.html');
        } else {
          sliderImages[i].parentElement.setAttribute('href', 'item.html');
        }
      }
    }

    function changeActiveRadio(currentRadio) {
      currentRadio.classList.add('active-radio');
      activeRadio.classList.remove('active-radio');
      activeRadio = currentRadio;
    }

    divMiddle.addEventListener('click', function(event) {
      let target = event.target;

      if (target.tagName !== 'A') {
        return;
      }

      changeActiveRadio(target);

      let number = activeRadio.dataset.number;
      slideImage(number);
    });

    function slideImage(index){
      activeImage.classList.remove('active');
      activeImage = sliderImages[index].parentElement;
      activeImage.classList.add('active');
    }

    slider.addEventListener('click', function() {
      console.log("lalalala");
      clearTimeout(timerId);
    });


    function autoSlide() {
        let i = 0;
        timerId = setTimeout(function go() {

          slideImage(i);
          changeActiveRadio(radioCommands[i]);

          if (i < 3) {
            setTimeout(go, 1000);
            i++;
          } else {
            i = 0;
            setTimeout(go, 1000);
          }

        }, 0);
    }






  });
})();
