;(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const sizesBlock = document.body.querySelector('.item-info').querySelector('.sizes');
    const colorBlock = document.body.querySelector('.item-info').querySelector('.colors');
    //choose color and size - toggle radio-buttons
    function findCheckedElem(collection) {
      return Array.prototype.slice.call(collection).filter((elem) => elem.checked ? elem : false);
    }
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

    function addItemToBag() {
      const size = findCheckedElem(sizesBlock.querySelectorAll('input[type="radio"]'));
      const color = findCheckedElem(colorBlock.querySelectorAll('input[type="radio"]'));
      const item = {
        name: document.body.querySelector('.name').innerHTML,
        description: 'Featuring fine Italian wool, this elegant suit has pick-stitch edging, cascade buttons at the cuffs',
        size: size[0].value,
        color: color[0].value,
        price: +document.body.querySelector('.item-price').innerHTML.slice(1),
        number: 1,
        img: document.querySelector('.main-photo').getAttribute('src'),
      };
      bag.addItem(item);
      updateWidget();
    }

    updateWidget();
    buttonAddToBag.addEventListener('click', addItemToBag);

    window.addEventListener('storage', () => {
      bag.deserialize();
      updateWidget();
    });
  });
})();

