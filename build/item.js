'use strict';

;(function () {
  document.addEventListener('DOMContentLoaded', function () {

    //choose color and size - toggle radio-buttons
    var sizesBlock = document.body.querySelector('.item-info').querySelector('.sizes');
    var colorBlock = document.body.querySelector('.item-info').querySelector('.colors');
    var size = void 0;
    var color = void 0;

    sizesBlock.addEventListener('click', checkSizeColor);
    colorBlock.addEventListener('click', checkSizeColor);

    function checkSizeColor(event) {
      var target = event.target;

      if (target.tagName !== 'SPAN') {
        return;
      }

      var block = void 0;

      if (target.closest('.sizes')) {
        block = sizesBlock;
        size = target.innerHTML;
      } else {
        block = colorBlock;
        color = target.innerHTML;
      }

      var radioBox = block.querySelectorAll('input[type="radio"]');
      var spanCheckedRadioBox = block.querySelectorAll('span');

      var checkedSpan = Array.prototype.slice.call(spanCheckedRadioBox).filter(function (elem) {
        return elem.classList.contains('checked') ? elem : false;
      })[0];
      var checkedRadioBox = Array.prototype.slice.call(radioBox).filter(function (elem) {
        return elem.hasAttribute('checked') ? elem : false;
      })[0];

      checkedSpan.classList.remove('checked');

      if (checkedSpan.previousElementSibling.matches('input[type="radio"]')) {
        checkedSpan.previousElementSibling.removeAttribute('checked');
      }
      checkedSpan = target;
      checkedSpan.classList.add('checked');

      checkedSpan.previousElementSibling.setAttribute('checked', '1');
    }

    function findCheckedElem(collection) {
      return Array.prototype.slice.call(collection).filter(function (elem) {
        return elem.hasAttribute('checked') ? elem : false;
      })[0].value;
    }

    //bag
    var bag = new Bag();

    var buttonAddToBag = document.body.querySelector('.item-info button');
    var headerBagSum = document.body.querySelector('.bag-short-info').children[0];
    var headerProductNumber = document.body.querySelector('.bag-sum-productAmount');

    buttonAddToBag.addEventListener('click', addItemToBag);

    function updateWidget() {
      var amount = bag.getAmount();
      var sum = bag.getSum();
      if (!amount || !sum) return;

      headerProductNumber.innerHTML = '(' + amount + ')';
      headerBagSum.innerHTML = 'Bag&nbsp;&pound;' + new Intl.NumberFormat('ru').format(sum.toFixed(2)).replace(',', '.') + '&nbsp;';
    }

    function addItemToBag() {
      bag.addItem(item);
      updateWidget();
    }

    updateWidget();

    var item = {
      name: 'Dark classic fit suit',
      description: 'Featuring fine Italian wool, this elegant suit has pick-stitch edging, cascade buttons at the cuffs',
      size: '20S',
      color: 'Blue',
      price: (250 + Math.random() * (400 + 1 - 250)).toFixed(2),
      number: 1
    };
  });
})();