;(function() {
  document.addEventListener('DOMContentLoaded', () => {
    //changing main photo
    const photos = document.querySelector('.preview');
    const mainPhoto = document.querySelector('.main-photo');
    let selectedPreview = photos.querySelector('img');
    const activeClass = 'shadow-img';
    selectedPreview.nextElementSibling.classList.add(activeClass);

    function choosePreview(event) {
      const target = event.target;

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
