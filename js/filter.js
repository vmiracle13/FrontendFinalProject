;(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const filterDiv = document.body.querySelector('.filter');
    const filterWrap = document.body.querySelector('.filter-wrap');
    const wrapFilterProps = document.body.querySelector('.wrap-filter-props');
    const filterSubMenu = wrapFilterProps.querySelectorAll('.sub-navigation');
    const clipAfter = document.body.querySelector('.clip-after');
    let currentTitle = null;
    let currentSubNav = null;
    const subNavigationList = filterWrap.querySelectorAll('.sub-navigation');
    const filterMenuList = wrapFilterProps.querySelectorAll('.filter-submenu');
    let number;
    function onFilter(event) {
      if (window.innerWidth < 1180) return;
      if (currentTitle) return;
      let target = event.target;

      while (target !== this) {
        if (target.classList.contains('title')) break;
        target = target.parentNode;
      }
      if (target === this) return;

      currentTitle = target;
      currentSubNav = filterSubMenu[target.dataset.number];
      filterSubMenu[target.dataset.number].style.visibility = 'visible';
    }
    function outFilter(event) {
      if (!currentSubNav || !currentTitle) return;
      let relatedTarget = event.relatedTarget;
      if (relatedTarget) {
        while (relatedTarget) {
          if (relatedTarget === currentSubNav) return;
          relatedTarget = relatedTarget.parentNode;
        }
      }
      currentSubNav.style.visibility = 'hidden';
      currentTitle = null;
      currentSubNav = null;
    }
    function openFilter() {
      if (window.innerWidth > 1024) {
        return;
      }
      wrapFilterProps.classList.toggle('flex');
      const after = filterDiv.querySelector('.after');
      after.classList.toggle('none');
      const exit = filterDiv.querySelector('.exit-icon');
      exit.classList.toggle('none');
      const mainShadow = document.body.querySelector('.main-catalog-shadow');
      mainShadow.classList.toggle('main-catalog-shadow-active');
      const footer = document.body.querySelector('.footer-shadow');
      footer.classList.toggle('footer-shadow-active');
    }

    function selectCategory(event) {
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
    }
    filterDiv.addEventListener('click', openFilter);
    clipAfter.addEventListener('click', openFilter);
    filterDiv.addEventListener('mouseover', onFilter);
    filterWrap.addEventListener('mouseout', outFilter);
    wrapFilterProps.addEventListener('click', selectCategory);
  });
})();
