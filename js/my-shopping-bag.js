;(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const bag = new Bag();

    const headerBagSum = document.body.querySelector('.bag-short-info').children[0];
    const headerProductNumber = document.body.querySelector('.bag-sum-productAmount');
    const totalSumInput = document.body.querySelector('.total-sum').querySelector('span:nth-of-type(2)');
    const clear = document.body.querySelector('.clear');
    const productListBlock = document.body.querySelector('.product-list');
    const couponCode = document.body.querySelector('.coupon-code');
    const bottomInfo = document.body.querySelector('.bottom-info');
    const buyButton = bottomInfo.children[1];

    function createHTMLPage() {
      for (let i = 0; i < bag.productList.length; i++) {
        const productBlock = document.createElement('div');
        productBlock.classList.add('product');

        const wrapBlock = document.createElement('div');
        wrapBlock.classList.add('wrap');
        productBlock.appendChild(wrapBlock);

        const img = document.createElement('img');
        img.setAttribute('src', bag.productList[i].img);
        img.setAttribute('alt', bag.productList[i].name);
        img.classList.add('added-img');
        wrapBlock.appendChild(img);

        const a = document.createElement('a');
        a.setAttribute('href', 'my-item.html');
        a.classList.add('shadow');
        wrapBlock.appendChild(a);

        const span = document.createElement('span');
        span.innerHTML = 'View item';
        a.appendChild(span);

        const productInfoBlock = document.createElement('div');
        productInfoBlock.classList.add('product-info');
        productBlock.appendChild(productInfoBlock);

        const name = document.createElement('p');
        name.classList.add('name');
        name.innerHTML = bag.productList[i].name;
        productInfoBlock.appendChild(name);

        const price = document.createElement('span');
        price.classList.add('price');
        price.innerHTML = `&pound;${bag.productList[i].price}`;
        productInfoBlock.appendChild(price);

        const color = document.createElement('span');
        color.classList.add('color');
        color.innerHTML = `Color: ${bag.productList[i].color}`;
        productInfoBlock.appendChild(color);

        const size = document.createElement('span');
        size.classList.add('size');
        size.innerHTML = `Size: UK ${bag.productList[i].size}`;
        productInfoBlock.appendChild(size);

        const amount = document.createElement('span');
        amount.classList.add('amount');
        amount.innerHTML = `Quantity: ${bag.productList[i].number}`;
        productInfoBlock.appendChild(amount);

        const button = document.createElement('button');
        button.innerHTML = 'Remove item';
        button.classList.add('btn');
        productInfoBlock.appendChild(button);

        productListBlock.appendChild(productBlock);
      }
    }
    function updateWidget() {
      const amount = bag.getAmount();
      const sum = bag.getSum();
      headerProductNumber.innerHTML = `(${amount})`;
      if (sum === 0) {
        headerBagSum.innerHTML = 'Bag&nbsp;';
        totalSumInput.innerHTML = '&pound;0';
        return;
      }
      headerBagSum.innerHTML = `Bag&nbsp;&pound;${new Intl.NumberFormat('ru').format(sum.toFixed(2)).replace(',', '.')}&nbsp;`;
      totalSumInput.innerHTML = `&pound;${new Intl.NumberFormat('ru').format(sum.toFixed(2)).replace(',', '.')}`;
    }
    function clearBag() {
      bag.clear();
      productListBlock.innerHTML = '';
      couponCode.hidden = true;
      bottomInfo.hidden = true;
      const message = document.createElement('span');
      message.innerHTML = 'Your shopping bag is empty. Use Catalog to add new items';
      message.classList.add('message');
      productListBlock.appendChild(message);
      updateWidget();
    }

    function buy() {
      productListBlock.innerHTML = '';
      couponCode.hidden = true;
      bottomInfo.hidden = true;
      const message = document.createElement('span');
      message.innerHTML = 'Thank You for your purchase!';
      message.classList.add('message');
      productListBlock.appendChild(message);
      bag.clear();
      updateWidget();
    }
    function remove(event) {
      const target = event.target;
      if (target.tagName !== 'BUTTON') return;

      const parent = target.parentElement;
      const quantityField = parent.querySelector('.amount');

      const obj = { name: parent.querySelector('.name').innerHTML,
        color: parent.querySelector('.color').innerHTML.slice(7),
        size: parent.querySelector('.size').innerHTML.slice(9),
        number: +quantityField.innerHTML.slice(10),
        price: parent.querySelector('.price').innerHTML.slice(1) };
      bag.removeItem(obj);

      if (bag.productQuantity === 0) {
        if (bag.productList.length === 0) {
          parent.parentElement.remove();
          couponCode.hidden = true;
          bottomInfo.hidden = true;
          const message = document.createElement('span');
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

    window.addEventListener('storage', () => {
      bag.deserialize();
      productListBlock.innerHTML = '';
      createHTMLPage();
      couponCode.hidden = false;
      bottomInfo.hidden = false;
      updateWidget();
    });
  });
})();
