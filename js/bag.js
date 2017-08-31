class BagParent {

  constructor() {
    this.productList = [];
    this.productsAmount = 0;
    this.totalSum = 0;
    this.deserialize();
  }

  addItem(product) {
    if (!this.productList.length) {
      this.productList.push(product);
    } else {
      const result = this.productList.some((elem) => {
        if (!(product.name).localeCompare(elem.name) && !(product.color).localeCompare(elem.color) && !(product.size).localeCompare(elem.size)) {
          elem.number++;
        }
      });
    }


    this.productsAmount++;
    this.totalSum += +product.price;
    this.serialize();
  }

  removeItem(product) {
    this.productList.forEach((elem, i) => {
      if (!(product.name).localeCompare(elem.name) && !(product.color).localeCompare(elem.color) && !(product.size).localeCompare(elem.size)) {
        this.totalSum -= product.price;
        if (elem.number === 1) {
          this.productList.splice(i, 1);
        } else {
          elem.number--;
        }
      }
    });
    this.serialize();
  }

  clear() {
    this.productList = 0;
    this.totalSum = 0;
    this.productsAmount = 0;
    this.serialize();
  }

  serialize() {
    const out = {
      productList: this.productList,
      productsAmount: this.productsAmount,
      totalSum: this.totalSum };
    const serialOut = JSON.stringify(out);
    localStorage.setItem('bag', serialOut);
  }

  deserialize() {
    const data = JSON.parse(localStorage.getItem('bag'));
    this.productsAmount = data.productsAmount;
    this.productList = data.productList;
    this.totalSum = data.totalSum;
  }

  getSum() {
    return this.totalSum;
  }

  getAmount() {
    return this.productsAmount;
  }
}


class Bag extends BagParent {
  constructor(){
    super();
  }
}


/*
    function Bag() {
      let product;
      this.productList = [];
      this.bagNumber = 0;
      this.totalSum = 0;

      const name = document.body.querySelector('.name').innerHTML;

      this.createProduct = function() {
        const sizeInputs = document.body.querySelector('.sizes').querySelectorAll('input[type="radio"]');
        const colorInputs = document.body.querySelector('.colors').querySelectorAll('input[type="radio"]');
        const size = +findCheckedElem(sizeInputs);
        const color = findCheckedElem(colorInputs);

        const price = (250 + Math.random() * (400 + 1 - 250)).toFixed(2);
        const description = document.body.querySelector('.description').innerHTML;
        product = new CreateProduct(name, description, size, color, price);
      };


      this.addToBag = function() {
        const result = this.productList.some((elem) => {
          if (!(product.name).localeCompare(elem.name)) {
            elem.number++;
          }
        });
        if (!result) {
          this.productList.push(product);
        }

        this.bagNumber++;
        this.totalSum += +product.price;

        localStorage.setItem('bag', JSON.stringify('bag'));
      };

      this.removeItem = function(item) {
        this.productList.map(function(elem, i) {
          if (!(product.name).localeCompare(elem.name)) {
            this.totalSum -= product.price;
            if (elem.number === 1) {
              this.productList.splice(i, 1);
            } else {
              elem.number--;
            }
          }
        });

        localStorage.setItem('bag', JSON.stringify(bag));
      };

      this.clearBag = function() {
        this.productList = 0;
        this.totalSum = 0;
        this.bagNumber = 0;
        localStorage.setItem('bag', JSON.stringify(bag));
      };

      this.updateOnPage = function() {
        const headerProductNumber = document.body.querySelector('.bag-sum-productAmount');
        const headerBagSum = document.body.querySelector('.totalSum');

        const bag = JSON.parse(localStorage.getItem('bag'));

        headerProductNumber.innerHTML = '(' + bag.bagNumber + ')';
        headerBagSum.innerHTML = 'Bag&nbsp;&pound;' + (new Intl.NumberFormat("ru").format(bag.totalSum.toFixed(2))) + '&nbsp;';
      };
    }


    const bag = new Bag();
    /*bag.createProduct();
    bag.addToBag();
    bag.addToBag();
    bag.addToBag();

    bag.removeItem( {name: 'Dark classic fit suit'} );
    bag.clearBag();





  function CreateProduct(name, description, size, color, price) {
    this.name = name;
    this.description = description;
    this.size = size;
    this.color = color;
    this.price = price;
    this.number = 1;
  }

    function findCheckedElem(collection) {
      return Array.prototype.slice.call(collection).filter((elem) => elem.hasAttribute('checked') ? elem : false)[0].value;
    }

    const buttonAddToBag = document.body.querySelector('.item-info button');
    buttonAddToBag.addEventListener('click', function(){
      bag.createProduct();
      bag.addToBag();
      bag.updateOnPage();
    });
*/






/*
const headerProductNumber = document.body.querySelector('.bag-sum-productAmount');
const headerBagSum = document.body.querySelector('.totalSum');

headerProductNumber.innerHTML = '(' + data.productsAmount + ')';
headerBagSum.innerHTML = 'Bag&nbsp;&pound;' + (new Intl.NumberFormat("ru").format(data.totalSum.toFixed(2))) + '&nbsp;';

*/



