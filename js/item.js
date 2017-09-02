;(function() {
  document.addEventListener('DOMContentLoaded', () => {

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
      return Array.prototype.slice.call(collection).filter((elem) => elem.hasAttribute('checked') ? elem : false)[0].value;
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
      if (!amount || !sum) return;

      headerProductNumber.innerHTML = `(${amount})`;
      headerBagSum.innerHTML = `Bag&nbsp;&pound;${new Intl.NumberFormat('ru').format(sum.toFixed(2)).replace(',', '.')}&nbsp;`;
    }

    function addItemToBag() {
      bag.addItem(item);
      updateWidget();
    }

    updateWidget();

    const item = {
      name: 'Dark classic fit suit',
      description: 'Featuring fine Italian wool, this elegant suit has pick-stitch edging, cascade buttons at the cuffs',
      size: '20S',
      color: 'Blue',
      price: (250 + Math.random() * (400 + 1 - 250)).toFixed(2),
      number: 1,
    };
  });
})();

