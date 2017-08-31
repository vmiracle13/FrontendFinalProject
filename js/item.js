;(function() {
  document.addEventListener('DOMContentLoaded', function() {

    //choose color and size - toggle radio-buttons
    const sizesBlock = document.body.querySelector('.item-info').querySelector('.sizes');
    const colorBlock = document.body.querySelector('.item-info').querySelector('.colors');
    let size;
    let color;

    sizesBlock.addEventListener('click', checkSizeColor);
    colorBlock.addEventListener('click', checkSizeColor);

    function checkSizeColor(event) {
      const target = event.target;

      if (target.tagName !== 'SPAN') {
        return;
      }

      let block;

      if (target.closest('.sizes')) {
        block = sizesBlock;
        size = target.innerHTML;
      } else {
        block = colorBlock;
        color = target.innerHTML;
      }

      const radioBox = block.querySelectorAll('input[type="radio"]');
      const spanCheckedRadioBox = block.querySelectorAll('span');

      let checkedSpan = Array.prototype.slice.call(spanCheckedRadioBox).filter((elem) => elem.classList.contains('checked') ? elem : false)[0];
      const checkedRadioBox = Array.prototype.slice.call(radioBox).filter((elem) => elem.hasAttribute('checked') ? elem : false)[0];

      checkedSpan.classList.remove('checked');

      if (checkedSpan.previousElementSibling.matches('input[type="radio"]')) {
        checkedSpan.previousElementSibling.removeAttribute('checked');
      }
      checkedSpan = target;
      checkedSpan.classList.add('checked');

      checkedSpan.previousElementSibling.setAttribute('checked', '1');
    }

    function findCheckedElem(collection) {
      return Array.prototype.slice.call(collection).filter((elem) => elem.hasAttribute('checked') ? elem : false)[0].value;
    }
/*
    const addToBagButton = document.body.querySelector('.item-info').querySelector('button');
    const headerBagSum = document.body.querySelector('.bag-short-info').children[0];
    const headerProductNumber = document.body.querySelector('.bag-sum-productAmount');

    const sizeInputs = document.body.querySelector('.sizes').querySelectorAll('input[type="radio"]');
    const colorInputs = document.body.querySelector('.colors').querySelectorAll('input[type="radio"]');
    size = +findCheckedElem(sizeInputs);
    color = +findCheckedElem(colorInputs);
    const name = document.body.querySelector('.name').innerHTML;
    const description = document.body.querySelector('.description').innerHTML;
    let price;
    let number;

    addToBagButton.addEventListener('click', addItemToBag);


    function addItemToBag() {
      price = (250 + Math.random() * (400 + 1 - 250)).toFixed(2);

      const product = new CreateProduct(name, description, size, color, price);

      number = headerProductNumber.innerHTML.slice(1, headerProductNumber.innerHTML.length - 1);
      headerProductNumber.innerHTML = '(' + ++number + ')';
      sessionStorage.setItem('product', JSON.stringify(product));
      //let productViewPrice = JSON.parse(sessionStorage.getItem('products')).price;




      headerBagSum.innerHTML = 'Bag&nbsp;&pound;' + price + '&nbsp;';
    }





    function CreateProduct(name, description, size, color, price) {
      this.name = name;
      this.description = description;
      this.size = size;
      this.color = color;
      this.price = price;
      this.number = 1;
    }

    /*
let addToBag = document.body.querySelector('.item-info button');
addToBag.addEventListener('click', putItemToBag);
let bag = [];
let size;
let color;
function putItemToBag() {
  const sizeInputs = document.body.querySelector('.sizes').querySelectorAll('input[type="radio"]');
  const colorInputs = document.body.querySelector('.colors').querySelectorAll('input[type="radio"]');
  const name = document.body.querySelector('.name').innerHTML;
  const description = document.body.querySelector('.description').innerHTML;
  const price = document.body.querySelector('.item-price').innerHTML.slice(1);
}*/


    const bag = new Bag();

    const buttonAddToBag = document.body.querySelector('.item-info button');
    const headerBagSum = document.body.querySelector('.bag-short-info').children[0];
    const headerProductNumber = document.body.querySelector('.bag-sum-productAmount');

    buttonAddToBag.addEventListener('click', addItemToBag);

    function addItemToBag() {
      bag.addItem(item);
      updateWidget();
    }

    function updateWidget() {
      const amount = bag.getAmount();
      const sum = bag.getSum();
      if (!amount || !sum) return;

      headerProductNumber.innerHTML = '(' + amount + ')';
      headerBagSum.innerHTML = 'Bag&nbsp;&pound;' + (new Intl.NumberFormat("en").format(bag.getSum().toFixed(2))) + '&nbsp;';
    }

    const item = {
      name: 'Dark classic fit suit',
      description: 'Featuring fine Italian wool, this elegant suit has pick-stitch edging, cascade buttons at the cuffs',
      size: '20S',
      color: 'Blue',
      price: (250 + Math.random() * (400 + 1 - 250)).toFixed(2)
    };

  });
})();

