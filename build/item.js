'use strict';

;(function () {
  document.addEventListener('DOMContentLoaded', function () {
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