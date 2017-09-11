'use strict';

;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    //choose color and size - toggle radio-buttons
    var sizesBlock = document.body.querySelector('.item-info').querySelector('.sizes');
    var colorBlock = document.body.querySelector('.item-info').querySelector('.colors');
    function findCheckedElem(collection) {
      return Array.prototype.slice.call(collection).filter(function (elem) {
        return elem.checked ? elem : false;
      });
    }

    //bag
    var bag = new Bag();

    var buttonAddToBag = document.body.querySelector('.item-info button');
    var headerBagSum = document.body.querySelector('.bag-short-info').children[0];
    var headerProductNumber = document.body.querySelector('.bag-sum-productAmount');

    function updateWidget() {
      var amount = bag.getAmount();
      var sum = bag.getSum();
      headerProductNumber.innerHTML = '(' + amount + ')';
      if (sum === 0) {
        headerBagSum.innerHTML = 'Bag&nbsp;';
        return;
      }
      headerBagSum.innerHTML = 'Bag&nbsp;&pound;' + new Intl.NumberFormat('ru').format(sum.toFixed(2)).replace(',', '.') + '&nbsp;';
    }

    function addItemToBag() {
      var size = findCheckedElem(sizesBlock.querySelectorAll('input[type="radio"]'));
      var color = findCheckedElem(colorBlock.querySelectorAll('input[type="radio"]'));
      var item = {
        name: document.body.querySelector('.name').innerHTML,
        description: 'Featuring fine Italian wool, this elegant suit has pick-stitch edging, cascade buttons at the cuffs',
        size: size[0].value,
        color: color[0].value,
        price: +document.body.querySelector('.item-price').innerHTML.slice(1),
        number: 1,
        img: document.querySelector('.main-photo').getAttribute('src')
      };
      bag.addItem(item);
      updateWidget();
    }

    updateWidget();
    buttonAddToBag.addEventListener('click', addItemToBag);

    window.addEventListener('storage', function () {
      bag.deserialize();
      updateWidget();
    });
  });
})();