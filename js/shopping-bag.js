;(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const bag = new Bag();

    const headerBagSum = document.body.querySelector('.bag-short-info').children[0];
    const headerProductNumber = document.body.querySelector('.bag-sum-productAmount');
    const totalSumInput = document.body.querySelector('.total-sum').querySelector('span:nth-of-type(2)');
    const removeButton = document.body.querySelector('.product-info').querySelector('button');
    const clear = document.body.querySelector('.clear');
    const productListBlock = document.body.querySelector('.product-list');
    const couponCode = document.body.querySelector('.coupon-code');
    const bottomInfo = document.body.querySelector('.bottom-info');
    const buyButton = bottomInfo.children[1];

    function updateWidget() {
      const amount = bag.getAmount();
      const sum = bag.getSum();
      headerProductNumber.innerHTML = `(${amount})`;
      if (sum === 0) {
        console.log(sum);
        headerBagSum.innerHTML = 'Bag&nbsp;';
        totalSumInput.innerHTML = '&pound;0';
        return;
      }
      headerBagSum.innerHTML = `Bag&nbsp;&pound;${new Intl.NumberFormat('en').format(sum.toFixed(2)).replace(',', '.')}&nbsp;`;
      totalSumInput.innerHTML = `&pound;${new Intl.NumberFormat('en').format(sum.toFixed(2)).replace(',', '.')}`;
    }

    updateWidget();

    const item = {
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
      const message = document.createElement('span');
      message.innerHTML = 'Your shopping bag is empty. Use Catalog to add new items';
      message.classList.add('message');
      productListBlock.appendChild(message);
      updateWidget();
    }

    function buy() {
      productListBlock.innerHTML = '';
      couponCode.remove();
      bottomInfo.remove();
      const message = document.createElement('span');
      message.innerHTML = 'Thank You for your purchase!';
      message.classList.add('message');
      productListBlock.appendChild(message);
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
