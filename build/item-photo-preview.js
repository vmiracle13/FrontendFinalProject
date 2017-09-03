'use strict';

;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    //changing main photo
    var photos = document.querySelector('.preview');
    var mainPhoto = document.querySelector('.main-photo');
    var selectedPreview = photos.querySelector('img');
    var activeClass = 'shadow-img';
    selectedPreview.nextElementSibling.classList.add(activeClass);

    function choosePreview(event) {
      var target = event.target;

      if (target.tagName !== 'IMG') {
        return;
      }

      if (selectedPreview) {
        selectedPreview.nextElementSibling.classList.remove(activeClass);
      }

      target.nextElementSibling.classList.toggle(activeClass);
      mainPhoto.setAttribute('src', target.getAttribute('src'));
      selectedPreview = target;
    }
    photos.addEventListener('click', choosePreview);
  });
})();