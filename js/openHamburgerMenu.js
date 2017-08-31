;(function() {
  document.addEventListener('DOMContentLoaded', function() {

    const menu = document.body.querySelector('.fa-bars');
    const searchBlock = document.body.querySelector('.search');
    const wrapNav = document.body.querySelector('.wrap-nav');
    const searchInput = wrapNav.querySelector('.search-input');

    menu.addEventListener('click', function() {
      wrapNav.classList.toggle('wrap-nav-active');
      searchInput.classList.remove('search-input');
      menu.classList.toggle('fa-bars');
      menu.classList.toggle('nav-exit');
      menu.classList.toggle('fa-times');
    });
});
})();
