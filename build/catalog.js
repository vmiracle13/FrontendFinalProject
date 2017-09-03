'use strict';

;(function () {
  document.addEventListener('DOMContentLoaded', function () {

    var bag = new Bag();

    var headerBagSum = document.body.querySelector('.bag-short-info').children[0];
    var headerProductNumber = document.body.querySelector('.bag-sum-productAmount');

    function updateWidget() {
      var amount = bag.getAmount();
      var sum = bag.getSum();
      if (!amount || !sum) return;

      headerProductNumber.innerHTML = '(' + amount + ')';
      headerBagSum.innerHTML = 'Bag&nbsp;&pound;' + new Intl.NumberFormat("en").format(sum.toFixed(2)).replace(",", ".") + '&nbsp;';
    }

    updateWidget();

    var item = {
      name: 'Dark classic fit suit',
      description: 'Featuring fine Italian wool, this elegant suit has pick-stitch edging, cascade buttons at the cuffs',
      size: '20S',
      color: 'Blue',
      price: (250 + Math.random() * (400 + 1 - 250)).toFixed(2)
    };
  });
})();