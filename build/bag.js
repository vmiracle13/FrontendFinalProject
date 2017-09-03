'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BagParent = function () {
  function BagParent() {
    _classCallCheck(this, BagParent);

    this.productList = [];
    this.productsAmount = 0;
    this.totalSum = 0;
    this.deserialize();
  }

  _createClass(BagParent, [{
    key: 'addItem',
    value: function addItem(product) {
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
  }, {
    key: 'hasProduct',
    value: function hasProduct(product) {
      var _this = this;

      if (!this.productList) return false;
      return this.productList.some(function (elem, i) {
        if (!product.name.localeCompare(elem.name) && !product.color.localeCompare(elem.color) && !product.size.localeCompare(elem.size)) {
          _this.numberProductInBag = i;
          return true;
        }
        return false;
      });
    }
  }, {
    key: 'removeItem',
    value: function removeItem(product) {
      var _this2 = this;

      this.productList.forEach(function (elem, i) {
        if (!product.name.localeCompare(elem.name) && !product.color.localeCompare(elem.color) && !product.size.localeCompare(elem.size)) {
          _this2.totalSum = _this2.totalSum - +product.price;
          if (elem.number === 1) {
            _this2.productList.splice(i, 1);
            _this2.productQuantity = 0;
          } else {
            elem.number--;
            _this2.productQuantity = elem.number;
          }
        }
      });
      this.productsAmount = this.calcProductsAmount();
      this.serialize();
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.productList = null;
      this.totalSum = 0;
      this.productsAmount = 0;
      this.serialize();
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      var serialOut = JSON.stringify(this.productList);
      localStorage.setItem('bag', serialOut);
    }
  }, {
    key: 'deserialize',
    value: function deserialize() {
      this.productList = JSON.parse(localStorage.getItem('bag'));
      this.productsAmount = this.calcProductsAmount();
      this.totalSum = this.calcOrderSum();
    }
  }, {
    key: 'getSum',
    value: function getSum() {
      return this.totalSum;
    }
  }, {
    key: 'getAmount',
    value: function getAmount() {
      return this.productsAmount;
    }
  }, {
    key: 'calcOrderSum',
    value: function calcOrderSum() {
      var _this3 = this;

      this.totalSum = 0;
      if (!this.productList) return 0;
      this.productList.forEach(function (elem) {
        _this3.totalSum += +elem.price * elem.number;
      });
      return this.totalSum;
    }
  }, {
    key: 'calcProductsAmount',
    value: function calcProductsAmount() {
      var _this4 = this;

      this.productsAmount = 0;
      if (!this.productList) return 0;
      this.productList.forEach(function (elem) {
        _this4.productsAmount += elem.number;
      });
      return this.productsAmount;
    }
  }, {
    key: 'loadProducts',
    value: function loadProducts(items) {
      localStorage.setItem('bag', JSON.stringify(items));
      this.deserialize();
    }
  }]);

  return BagParent;
}();

var Bag = function (_BagParent) {
  _inherits(Bag, _BagParent);

  function Bag() {
    _classCallCheck(this, Bag);

    return _possibleConstructorReturn(this, (Bag.__proto__ || Object.getPrototypeOf(Bag)).call(this));
  }

  return Bag;
}(BagParent);