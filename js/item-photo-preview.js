;(function() {
  document.addEventListener('DOMContentLoaded', function() {

  const photos = document.querySelector('.preview');
  const mainPhoto = document.querySelector('.main-photo');
  let selectedPreview = photos.querySelector('img');
  const activeClass = 'shadow';
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











    let sizesBlock = document.body.querySelector('.item-info').querySelector('.item-sizes');
    let colorBlock = document.body.querySelector('.item-info').querySelector('.item-colors');

    let size, color;

    sizesBlock.addEventListener('click', checkSizeColor);
    colorBlock.addEventListener('click', checkSizeColor);


    function checkSizeColor(event) {
      const target = event.target;

      if (target.tagName != 'SPAN') {
        return;
      }

      let block;

      if (target.closest('.item-sizes')) {
        block = sizesBlock;
        size = target.innerHTML;
      } else {
        block = colorBlock;
        color = target.innerHTML;
      }

      let radioBox = block.querySelectorAll('input[type="radio"]');
      let spanCheckedRadioBox = block.querySelectorAll('span');

      let checkedSpan = Array.prototype.slice.call(spanCheckedRadioBox).filter((elem) => elem.classList.contains('checked')? elem: false)[0];
      let checkedRadioBox = Array.prototype.slice.call(radioBox).filter((elem) => elem.hasAttribute('checked')? elem: false)[0];

      checkedSpan.classList.remove('checked');

      if (checkedSpan.previousElementSibling.matches('input[type="radio"]')) {
        checkedSpan.previousElementSibling.removeAttribute('checked');
      }
      checkedSpan = target;
      checkedSpan.classList.add('checked');

      checkedSpan.previousElementSibling.setAttribute('checked', '1');
    }












    let addToBag = document.body.querySelector('button');
    addToBag.addEventListener('click', putItemToBag);

    function putItemToBag() {

      let name = document.body.querySelector('h2').innerHTML;
      let price = document.body.querySelector('.item-price').innerHTML;

      let product = new CreateProduct(name, size, color, price);

      //add product to bag object
    }

    function CreateProduct() {
      return {
        name: name,
        size: size,
        color: color,
        price: price,
        number: 0
      };
    }

  });
})();
