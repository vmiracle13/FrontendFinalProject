'use strict';

;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var bag = new Bag();

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

    updateWidget();
  });
})();