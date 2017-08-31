;(function() {
  document.addEventListener('DOMContentLoaded', function() {

    const filterDiv = document.body.querySelector('.filter');
    const filterWrap = document.body.querySelector('.filter-wrap');
    const wrapFilterProps = document.body.querySelector('.wrap-filter-props');

        filterDiv.addEventListener('mouseover', function(event) {
          const target = event.target;
          let number;

          const titleList = filterDiv.querySelectorAll('.title');

          Array.prototype.slice.call(titleList).some(function(elem, i) {
            if (elem.contains(event.target)) {
              number = i;
            }
          });

          const filterSubMenu = wrapFilterProps.querySelector('.sub-navigation');

          filterSubMenu[number].style.visibility = 'visible';







        });

        filterDiv.addEventListener('mouseout', function() {
          const target = event.target;
          //if (event.target && event.currentTarget == filterWrap.querySelector('sub-navigation'))

          //filterWrap.children[1].style.display = '';

        });








    const exitIcon = document.body.querySelector('.fa-times');

    filterDiv.addEventListener('click', function () {
      if (window.innerWidth > 1024) {
        return;
      }
      //if (window.innerWidth > 768 || window.innerWidth < 1024) {
      wrapFilterProps.classList.toggle('flex');
      exitIcon.classList.toggle('exit');
      //}
    });



    const activeSelectedProp = new Array(wrapFilterProps.childElementCount);
    const subNavigationList = filterWrap.querySelectorAll('.sub-navigation');

    const filterMenuList = wrapFilterProps.querySelectorAll('.filter-submenu');
    let number;

    wrapFilterProps.addEventListener('click', function(event) {
      if (event.target.tagName !== 'SPAN') return;

      if (!event.target.innerHTML.localeCompare('Not selected')) return;

      const selectedProp = event.target;

      //define a number of sub-navigation which has selected li
      Array.prototype.slice.call(filterMenuList).some(function(elem, i) {
        if (elem.contains(selectedProp)) {
          number = i;
        }
      });
      if (subNavigationList[number].querySelector('.selected-prop')) {
        subNavigationList[number].querySelector('.selected-prop').classList.remove('selected-prop');
      } else {
        subNavigationList[number].querySelector('.not-selected').classList.remove('not-selected');
      }
      const li = selectedProp.parentElement;
      li.classList.add('selected-prop');
      const selectedPropText = event.target.innerHTML;

      //change text in filter menu
      const title = filterDiv.children[number].querySelector('.nav-item');
      title.parentElement.classList.add('selected');
      title.innerHTML = selectedPropText;
    });
  });
})();
