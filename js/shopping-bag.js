;(function() {
  document.addEventListener('DOMContentLoaded', function() {

    /*
      let product = new CreateProduct(name, description, +findCheckedElem(sizeInputs), +findCheckedElem(colorInputs), price);

      if (!bag.length) {
        bag.push(product);
      } else {

      }

      for (let i = 0; i < bag.length; i++) {
        for (let prop in bag[i]) {
          if (new RegExp(product.name).matches(bag[i][name])) {
            bag.push(product);
          }
        }

      }




    function CreateProduct(name, description, size, color, price) {
      this.name = name;
      this.description = description;
      this.size = size;
      this.color = color;
      this.price = price;
      this.number = 1;
    }
*/


    //remove an item from the product list
    /*const productlist = document.body.querySelector('.product-list');

    productlist.addEventListener('click', function() {
      let target = event.target;
      if (target.tagName !== 'BUTTON') return;

      const parent = target.parentElement;
      parent.parentElement.remove();

      if (productlist.childElementCount === 0) {
        clearBag();
      }
    });
    */


    const bag = new Bag();

    const headerBagSum = document.body.querySelector('.bag-short-info').children[0];
    const headerProductNumber = document.body.querySelector('.bag-sum-productAmount');
    const totalSumInput = document.body.querySelector('.total-sum').querySelector('span:nth-of-type(2)');

    function updateWidget() {

      const amount = bag.getAmount();
      const sum = bag.getSum();
      if (!amount || !sum) return;

      headerProductNumber.innerHTML = '(' + bag.getAmount() + ')';
      headerBagSum.innerHTML = `Bag&nbsp;&pound;${new Intl.NumberFormat('en').format(bag.getSum().toFixed(2))}&nbsp;`;
      totalSumInput.innerHTML = `&pound;${new Intl.NumberFormat('en').format(bag.getSum().toFixed(2))}`;
    }

    updateWidget();

    const item = {
      name: 'Dark classic fit suit',
      description: 'Featuring fine Italian wool, this elegant suit has pick-stitch edging, cascade buttons at the cuffs',
      size: '20S',
      color: 'Blue',
      price: (250 + Math.random() * (400 + 1 - 250)).toFixed(2)
    };




    const removeButton = document.body.querySelector('.product-info').querySelector('button');
    const clear = document.body.querySelector('.clear');
    const productListBlock = document.body.querySelector('.product-list');
    const couponCode = document.body.querySelector('.coupon-code');
    const bottomInfo = document.body.querySelector('.bottom-info');
    const buyButton = bottomInfo.children[1];

    clear.addEventListener('click', clearBag);
    buyButton.addEventListener('click', buy);

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

    function buy(){
      productListBlock.innerHTML = '';
      couponCode.remove();
      bottomInfo.remove();
      const message = document.createElement('span');
      message.innerHTML = 'Thank You for your purchase!';
      message.classList.add('message');
      productListBlock.appendChild(message);
    }

    removeButton.addEventListener('click', remove);

    function remove(){
      bag.removeItem(item);
    }






  });
})();
