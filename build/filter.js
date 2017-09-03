'use strict';

;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var filterDiv = document.body.querySelector('.filter');
    var filterWrap = document.body.querySelector('.filter-wrap');
    var wrapFilterProps = document.body.querySelector('.wrap-filter-props');
    var filterSubMenu = wrapFilterProps.querySelectorAll('.sub-navigation');
    var n = void 0;

    function showDropDown(event) {
      if (window.innerWidth > 1024) return;
      var target = event.target;
      var titleList = filterDiv.querySelectorAll('.title');
      Array.prototype.slice.call(titleList).some(function (elem, i) {
        if (elem.contains(target)) {
          n = i;
        }
      });
      filterSubMenu[n].style.visibility = 'visible';
    }
    filterDiv.addEventListener('mouseover', showDropDown(event));
    filterWrap.addEventListener('mouseout', function (event) {
      if (event.target.tagName === 'LI' && event.target.parentElement.classList.contains('sub-navigation') && event.relatedTarget.tagName !== 'LI' && !event.relatedTarget.classList.contains('sub-navigation') && !event.relatedTarget.classList.contains('title') && !event.target.classList.contains('nav-item') && event.relatedTarget.tagName !== 'SPAN') {
        filterSubMenu[n].style.visibility = 'hidden';
      }
    });

    filterDiv.addEventListener('click', function () {
      if (window.innerWidth > 1024) {
        return;
      }
      wrapFilterProps.classList.toggle('flex');
      var spans = filterDiv.querySelectorAll('span');
      spans[spans.length - 2].classList.toggle('after');
      spans[spans.length - 1].classList.toggle('none');
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