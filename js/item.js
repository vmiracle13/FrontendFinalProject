;(function () {
  document.addEventListener('DOMContentLoaded', () => {
    /*function findCheckedElem(collection) {
      return Array.prototype.slice.call(collection).filter((elem) => elem.hasAttribute('checked') ? elem : false)[0].value;
    }*/
    const bag = new Bag();

    const buttonAddToBag = document.body.querySelector('.item-info button');
    const headerBagSum = document.body.querySelector('.bag-short-info').children[0];
    const headerProductNumber = document.body.querySelector('.bag-sum-productAmount');
    function updateWidget() {
      const amount = bag.getAmount();
      const sum = bag.getSum();
      headerProductNumber.innerHTML = `(${amount})`;
      if (sum === 0) {
        headerBagSum.innerHTML = 'Bag&nbsp;';
        return;
      }
      headerBagSum.innerHTML = `Bag&nbsp;&pound;${new Intl.NumberFormat('ru').format(sum.toFixed(2)).replace(',', '.')}&nbsp;`;
    }
    updateWidget();

    const item = {
      name: 'Dark classic fit suit',
      description: 'Featuring fine Italian wool, this elegant suit has pick-stitch edging, cascade buttons at the cuffs',
      size: '20S',
      color: 'Blue',
      price: (250 + Math.random() * (400 + 1 - 250)).toFixed(2),
      number: 1,
    };
    function addItemToBag() {
      bag.addItem(item);
      updateWidget();
    }
    buttonAddToBag.addEventListener('click', addItemToBag);

    window.addEventListener('storage', () => {
      bag.deserialize();
      updateWidget();
    });
  });
})();

