;(function() {
  document.addEventListener('DOMContentLoaded', function() {
    //choose color and size - toggle radio-buttons
    const sizesBlock = document.body.querySelector('.item-info').querySelector('.sizes');
    const colorBlock = document.body.querySelector('.item-info').querySelector('.colors');
    let size;
    let color;

    sizesBlock.addEventListener('click', checkSizeColor);
    colorBlock.addEventListener('click', checkSizeColor);

    function checkSizeColor(event) {
      const target = event.target;

      if (target.tagName !== 'SPAN') {
        return;
      }

      let block;

      if (target.closest('.sizes')) {
        block = sizesBlock;
        size = target.innerHTML;
      } else {
        block = colorBlock;
        color = target.innerHTML;
      }

      const radioBox = block.querySelectorAll('input[type="radio"]');
      const spanCheckedRadioBox = block.querySelectorAll('span');

      let checkedSpan = Array.prototype.slice.call(spanCheckedRadioBox).filter((elem) => elem.classList.contains('checked') ? elem : false)[0];
      const checkedRadioBox = Array.prototype.slice.call(radioBox).filter((elem) => elem.hasAttribute('checked') ? elem : false)[0];

      checkedSpan.classList.remove('checked');

      if (checkedSpan.previousElementSibling.matches('input[type="radio"]')) {
        checkedSpan.previousElementSibling.removeAttribute('checked');
      }
      checkedSpan = target;
      checkedSpan.classList.add('checked');

      checkedSpan.previousElementSibling.setAttribute('checked', '1');
    }

    function findCheckedElem(collection) {
      return Array.prototype.slice.call(collection).filter((elem) => elem.hasAttribute('checked') ? elem : false);
    }

    //bag
    const bag = new Bag();

    const buttonAddToBag = document.body.querySelector('.item-info button');
    const headerBagSum = document.body.querySelector('.bag-short-info').children[0];
    const headerProductNumber = document.body.querySelector('.bag-sum-productAmount');

    buttonAddToBag.addEventListener('click', addItemToBag);

    function updateWidget() {
      const amount = bag.getAmount();
      const sum = bag.getSum();
      headerProductNumber.innerHTML = `(${amount})`;
      if (sum === 0) {
        headerBagSum.innerHTML = 'Bag&nbsp;';
        return;
      }
      headerBagSum.innerHTML = `Bag&nbsp;&pound;${new Intl.NumberFormat('ru').format(sum.toFixed(2)).replace(',', '.')}&nbsp;`;
    }

    function addItemToBag() {
      size = findCheckedElem(sizesBlock.querySelectorAll('input[type="radio"]'));
      color = findCheckedElem(colorBlock.querySelectorAll('input[type="radio"]'));

      console.log(size[0].value);
      console.log(color[0].value);
      const item = {
        name: document.body.querySelector('.name').innerHTML,
        description: 'Featuring fine Italian wool, this elegant suit has pick-stitch edging, cascade buttons at the cuffs',
        size: size[0].value,
        color: color[0].value,
        price: +document.body.querySelector('.item-price').innerHTML.slice(1),
        number: 1,
        img: document.querySelector('.main-photo').getAttribute('src'),
      };
      bag.addItem(item);
      updateWidget();
    }

    updateWidget();
  });
})();

