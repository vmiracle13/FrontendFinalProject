;(function() {
  document.addEventListener('DOMContentLoaded', () => {
    function findCheckedElem(collection) {
      return Array.prototype.slice.call(collection).filter((elem) => elem.hasAttribute('checked') ? elem : false)[0].value;
    }

    //bag
    const bag = new Bag();

    const buttonAddToBag = document.body.querySelector('.item-info button');
    const headerBagSum = document.body.querySelector('.bag-short-info').children[0];
    const headerProductNumber = document.body.querySelector('.bag-sum-productAmount');

    buttonAddToBag.addEventListener('click', addItemToBag);

    function updateWidget() {
      const amount = bag.getAmount();
      const sum = bag.getSum();
      if (!amount || !sum) return;

      headerProductNumber.innerHTML = `(${amount})`;
      headerBagSum.innerHTML = `Bag&nbsp;&pound;${new Intl.NumberFormat('ru').format(sum.toFixed(2)).replace(',', '.')}&nbsp;`;
    }

    function addItemToBag() {
      bag.addItem(item);
      updateWidget();
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
  });
})();

