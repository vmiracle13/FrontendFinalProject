class BagParent {
  constructor() {
    this.productList = [];
    this.productsAmount = 0;
    this.totalSum = 0;
    this.deserialize();
  }

  addItem(product) {
    if (this.productList === null) {
      this.productList = [];
      this.productList.push(product);
    } else if (this.hasProduct(product)) {
      this.productList[this.numberProductInBag].number++;
    } else {
      this.productList.push(product);
    }
    this.productsAmount++;
    this.totalSum += +product.price;
    this.serialize();
  }

  hasProduct(product) {
    if (!this.productList) return false;
    return this.productList.some((elem, i) => {
      if (!(product.name).localeCompare(elem.name) && !(product.color).localeCompare(elem.color)
        && !(product.size).localeCompare(elem.size)) {
        this.numberProductInBag = i;
        return true;
      }
      return false;
    });
  }

  removeItem(product) {
    this.productList.forEach((elem, i) => {
      if (!(product.name).localeCompare(elem.name) && !(product.color).localeCompare(elem.color) &&
        !(product.size).localeCompare(elem.size)) {
        this.totalSum = this.totalSum - +product.price;
        if (elem.number === 1) {
          this.productList.splice(i, 1);
          this.productQuantity = 0;
        } else {
          elem.number--;
          this.productQuantity = elem.number;
        }
      }
    });
    this.productsAmount = this.calcProductsAmount();
    this.serialize();
  }

  clear() {
    this.productList = null;
    this.totalSum = 0;
    this.productsAmount = 0;
    this.serialize();
  }

  serialize() {
    const serialOut = JSON.stringify(this.productList);
    localStorage.setItem('bag', serialOut);
  }

  deserialize() {
    this.productList = JSON.parse(localStorage.getItem('bag'));
    this.productsAmount = this.calcProductsAmount();
    this.totalSum = this.calcOrderSum();
  }

  getSum() {
    return this.totalSum;
  }

  getAmount() {
    return this.productsAmount;
  }

  calcOrderSum() {
    this.totalSum = 0;
    if (!this.productList) return 0;
    this.productList.forEach((elem) => {
      this.totalSum += +elem.price * elem.number;
    });
    return this.totalSum;
  }

  calcProductsAmount() {
    this.productsAmount = 0;
    if (!this.productList) return 0;
    this.productList.forEach((elem) => {
      this.productsAmount += elem.number;
    });
    return this.productsAmount;
  }

  loadProducts(items) {
    localStorage.setItem('bag', JSON.stringify(items));
    this.deserialize();
  }
}
