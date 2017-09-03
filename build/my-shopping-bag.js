'use strict';

;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var bag = new Bag();

    var headerBagSum = document.body.querySelector('.bag-short-info').children[0];
    var headerProductNumber = document.body.querySelector('.bag-sum-productAmount');
    var totalSumInput = document.body.querySelector('.total-sum').querySelector('span:nth-of-type(2)');
    var clear = document.body.querySelector('.clear');
    var productListBlock = document.body.querySelector('.product-list');
    var couponCode = document.body.querySelector('.coupon-code');
    var bottomInfo = document.body.querySelector('.bottom-info');
    var buyButton = bottomInfo.children[1];

    function createHTMLPage() {
      for (var i = 0; i < bag.productList.length; i++) {
        var productBlock = document.createElement('div');
        productBlock.classList.add('product');

        var wrapBlock = document.createElement('div');
        wrapBlock.classList.add('wrap');
        productBlock.appendChild(wrapBlock);

        var img = document.createElement('img');
        img.setAttribute('src', bag.productList[i].img);
        img.setAttribute('alt', bag.productList[i].name);
        img.style.width = '144px';
        img.style.height = 'auto';
        wrapBlock.appendChild(img);

        var a = document.createElement('a');
        a.setAttribute('href', 'item.html');
        a.classList.add('shadow');
        wrapBlock.appendChild(a);

        var span = document.createElement('span');
        span.innerHTML = 'View item';
        a.appendChild(span);

        var productInfoBlock = document.createElement('div');
        productInfoBlock.classList.add('product-info');
        productBlock.appendChild(productInfoBlock);

        var name = document.createElement('p');
        name.classList.add('name');
        name.innerHTML = bag.productList[i].name;
        productInfoBlock.appendChild(name);

        var price = document.createElement('span');
        price.classList.add('price');
        price.innerHTML = '&pound;' + bag.productList[i].price;
        productInfoBlock.appendChild(price);

        var color = document.createElement('span');
        color.classList.add('color');
        color.innerHTML = 'Color: ' + bag.productList[i].color;
        productInfoBlock.appendChild(color);

        var size = document.createElement('span');
        size.classList.add('size');
        size.innerHTML = 'Size: UK ' + bag.productList[i].size;
        productInfoBlock.appendChild(size);

        var amount = document.createElement('span');
        amount.classList.add('amount');
        amount.innerHTML = 'Quantity: ' + bag.productList[i].number;
        productInfoBlock.appendChild(amount);

        var button = document.createElement('button');
        button.innerHTML = 'Remove item';
        productInfoBlock.appendChild(button);

        productListBlock.appendChild(productBlock);
      }
    }
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
      bag.clear();
      updateWidget();
    }
    function remove(event) {
      var target = event.target;
      if (target.tagName !== 'BUTTON') return;

      var parent = target.parentElement;
      var quantityField = parent.querySelector('.amount');

      var obj = { name: parent.querySelector('.name').innerHTML,
        color: parent.querySelector('.color').innerHTML.slice(7),
        size: parent.querySelector('.size').innerHTML.slice(9),
        number: +quantityField.innerHTML.slice(10),
        price: parent.querySelector('.price').innerHTML.slice(1) };
      bag.removeItem(obj);

      if (bag.productQuantity === 0) {
        if (bag.productList.length === 0) {
          parent.parentElement.remove();
          couponCode.remove();
          bottomInfo.remove();
          var message = document.createElement('span');
          message.innerHTML = 'Your shopping bag is empty. Use Catalog to add new items';
          message.classList.add('message');
          productListBlock.appendChild(message);
        } else {
          parent.parentElement.remove();
        }
      } else {
        quantityField.innerHTML = parent.querySelector('.amount').innerHTML.slice(0, 10) + bag.productQuantity;
      }
      updateWidget();
    }

    createHTMLPage();
    updateWidget();
    productListBlock.addEventListener('click', remove);
    clear.addEventListener('click', clearBag);
    buyButton.addEventListener('click', buy);
  });
})();