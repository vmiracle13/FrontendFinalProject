;(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const filterDiv = document.body.querySelector('.filter');
    const filterWrap = document.body.querySelector('.filter-wrap');
    const wrapFilterProps = document.body.querySelector('.wrap-filter-props');
    const filterSubMenu = wrapFilterProps.querySelectorAll('.sub-navigation');
    let n;



    function showDropDown(event) {
      if (window.innerWidth > 1024) return;
      const target = event.target;
      const titleList = filterDiv.querySelectorAll('.title');
      Array.prototype.slice.call(titleList).some((elem, i) => {
        if (elem.contains(target)) {
          n = i;
        }
      });
      filterSubMenu[n].style.visibility = 'visible';
    }
    filterDiv.addEventListener('mouseover', showDropDown(event));
    filterWrap.addEventListener('mouseout', (event) => {
      if (event.target.tagName === 'LI' && event.target.parentElement.classList.contains('sub-navigation') &&
        event.relatedTarget.tagName !== 'LI' && !event.relatedTarget.classList.contains('sub-navigation') &&
        !event.relatedTarget.classList.contains('title') && !event.target.classList.contains('nav-item') &&
      event.relatedTarget.tagName !== 'SPAN') {
        filterSubMenu[n].style.visibility = 'hidden';
      }
    });

    filterDiv.addEventListener('click', () => {
      if (window.innerWidth > 1024) {
        return;
      }
      wrapFilterProps.classList.toggle('flex');
      const spans = filterDiv.querySelectorAll('span');
      spans[spans.length - 2].classList.toggle('after');
      spans[spans.length - 1].classList.toggle('none');
      const mainShadow = document.body.querySelector('.main-catalog-shadow');
      mainShadow.classList.toggle('main-catalog-shadow-active');
      const footer = document.body.querySelector('.footer-shadow');
      footer.classList.toggle('footer-shadow-active');
      const copyright = document.body.querySelector('.copyright-shadow');
      copyright.classList.toggle('copyright-shadow-active');
    });

    const subNavigationList = filterWrap.querySelectorAll('.sub-navigation');
    const filterMenuList = wrapFilterProps.querySelectorAll('.filter-submenu');
    let number;

    wrapFilterProps.addEventListener('click', (event) => {
      if (event.target.tagName !== 'SPAN' && event.target.tagName !== 'LI') {
        return;
      }
      let selectedProp;

      if (event.target.tagName === 'SPAN') {
        selectedProp = event.target;
      } else {
        selectedProp = event.target.firstChild;
      }

      if (!selectedProp.innerHTML.localeCompare('Not selected')) return;

      //define a number of sub-navigation which has selected li
      Array.prototype.slice.call(filterMenuList).some((elem, i) => {
        if (elem.contains(selectedProp)) {
          number = i;
        }
      });
      //depending on which li is selected choose what class should be removed
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

      if (window.innerWidth > 1024 && selectedProp) {
        filterDiv.children[number].querySelector('.nav-item-small').style.display = 'block';
      }
    });
  });
})();
