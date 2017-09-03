'use strict';

;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var menu = document.body.querySelector('.hamburger');
    var wrapNav = document.body.querySelector('.wrap-nav');
    var searchInput = wrapNav.querySelector('.search-input');

    menu.addEventListener('click', function () {
      wrapNav.classList.toggle('wrap-nav-active');
      searchInput.classList.remove('search-input');
      menu.classList.toggle('nav-exit');
      menu.classList.toggle('hamburger-active');
    });
  });
})();