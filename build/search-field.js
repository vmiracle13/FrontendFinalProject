'use strict';

;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var glassIcon = document.body.querySelector('.glass-icon');
    var searchField = document.body.querySelector('input');

    glassIcon.addEventListener('click', function () {
      if (window.innerWidth < 768 || window.innerWidth > 1024) {
        return;
      }
      searchField.classList.toggle('search-input');
      searchField.classList.toggle('activeSearch');
    });
  });
})();