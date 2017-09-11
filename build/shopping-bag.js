'use strict';

;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var bag = new Bag();

    var headerBagSum = document.body.querySelector('.bag-short-info').children[0];
    var headerProductNumber = document.body.querySelector('.bag-sum-productAmount');
    var totalSumInput = document.body.querySelector('.total-sum').querySelector('span:nth-of-type(2)');
    var removeButton = document.body.querySelector('.product-info').querySelector('button');
    var clear = document.body.querySelector('.clear');
    var productListBlock = document.body.querySelector('.product-list');
    var couponCode = document.body.querySelector('.coupon-code');
    var bottomInfo = document.body.querySelector('.bottom-info');
    var buyButton = bottomInfo.children[1];

    function updateWidget() {
      var amount = bag.getAmount();
      var sum = bag.getSum();
      headerProductNumber.innerHTML = '(' + amount + ')';
      if (sum === 0) {
        headerBagSum.innerHTML = 'Bag&nbsp;';
        totalSumInput.innerHTML = '&pound;0';
        return;
      }
      headerBagSum.innerHTML = 'Bag&nbsp;&pound;' + new Intl.NumberFormat('ru').format(sum.toFixed(2)).replace(',', '.') + '&nbsp;';
      totalSumInput.innerHTML = '&pound;' + new Intl.NumberFormat('ru').format(sum.toFixed(2)).replace(',', '.');
    }

    updateWidget();

    var item = {
      name: 'Dark classic fit suit',
      description: 'Featuring fine Italian wool, this elegant suit has pick-stitch edging, cascade buttons at the cuffs',
      size: '20S',
      color: 'Blue',
      price: (250 + Math.random() * (400 + 1 - 250)).toFixed(2)
    };

    function clearBag() {
      bag.clear();
      productListBlock.innerHTML = '';
      couponCode.remove();
      bottomInfo.remove();
      var message = document.createElement('span');
      message.innerHTML = 'Your shopping bag is empty. Use Catalog to add new items';
      message.classList.add('message');
      productListBlock.appendChild(message);
      updateWidget();
    }

    function buy() {
      productListBlock.innerHTML = '';
      couponCode.remove();
      bottomInfo.remove();
      var message = document.createElement('span');
      message.innerHTML = 'Thank You for your purchase!';
      message.classList.add('message');
      productListBlock.appendChild(message);
      if (bag.totalSum > 1000) {
        message.classList.add('changeColor');
      }
      bag.clear();
      updateWidget();
    }
    function remove() {
      bag.removeItem(item);
      updateWidget();
    }
    removeButton.addEventListener('click', remove);
    clear.addEventListener('click', clearBag);
    buyButton.addEventListener('click', buy);
  });
})();