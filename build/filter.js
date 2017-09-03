'use strict';

;(function () {
  var _this = this;

  document.addEventListener('DOMContentLoaded', function () {
    var filterDiv = document.body.querySelector('.filter');
    var filterWrap = document.body.querySelector('.filter-wrap');
    var wrapFilterProps = document.body.querySelector('.wrap-filter-props');
    var filterSubMenu = wrapFilterProps.querySelectorAll('.sub-navigation');
    var currentTitle = null;
    var currentSubNav = null;

    filterDiv.addEventListener('mouseover', function (event) {
      if (window.innerWidth < 1180) return;
      if (currentTitle) return;
      var target = event.target;

      while (target !== _this) {
        if (target.classList.contains('title')) break;
        target = target.parentNode;
      }
      if (target === _this) return;

      currentTitle = target;
      currentSubNav = filterSubMenu[target.dataset.number];
      filterSubMenu[target.dataset.number].style.visibility = 'visible';
    });

    filterWrap.addEventListener('mouseout', function (event) {
      if (!currentSubNav || !currentTitle) return;
      var relatedTarget = event.relatedTarget;
      if (relatedTarget) {
        while (relatedTarget) {
          if (relatedTarget === currentSubNav) return;
          relatedTarget = relatedTarget.parentNode;
        }
      }
      currentSubNav.style.visibility = 'hidden';
      currentTitle = null;
      currentSubNav = null;
    });

    filterDiv.addEventListener('click', function () {
      if (window.innerWidth > 1024) {
        return;
      }
      wrapFilterProps.classList.toggle('flex');
      var spans = filterDiv.querySelectorAll('span');

      var title = filterDiv.querySelectorAll('.title');
      var after = filterDiv.querySelector('.after');
      after.classList.toggle('none');
      var exit = filterDiv.querySelector('.exit-icon');
      exit.classList.toggle('none');
      var mainShadow = document.body.querySelector('.main-catalog-shadow');
      mainShadow.classList.toggle('main-catalog-shadow-active');
      var footer = document.body.querySelector('.footer-shadow');
      footer.classList.toggle('footer-shadow-active');
      var copyright = document.body.querySelector('.copyright-shadow');
      copyright.classList.toggle('copyright-shadow-active');
    });

    var subNavigationList = filterWrap.querySelectorAll('.sub-navigation');
    var filterMenuList = wrapFilterProps.querySelectorAll('.filter-submenu');
    var number = void 0;

    wrapFilterProps.addEventListener('click', function (event) {
      if (event.target.tagName !== 'SPAN' && event.target.tagName !== 'LI') {
        return;
      }
      var selectedProp = void 0;

      if (event.target.tagName === 'SPAN') {
        selectedProp = event.target;
      } else {
        selectedProp = event.target.firstChild;
      }

      if (!selectedProp.innerHTML.localeCompare('Not selected')) return;

      //define a number of sub-navigation which has selected li
      Array.prototype.slice.call(filterMenuList).some(function (elem, i) {
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
      var li = selectedProp.parentElement;
      li.classList.add('selected-prop');
      var selectedPropText = event.target.innerHTML;

      //change text in filter menu
      var title = filterDiv.children[number].querySelector('.nav-item');
      title.parentElement.classList.add('selected');
      title.innerHTML = selectedPropText;

      if (window.innerWidth > 1024 && selectedProp) {
        filterDiv.children[number].querySelector('.nav-item-small').style.display = 'block';
      }
    });
  });
})();