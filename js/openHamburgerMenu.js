;(function() {
  document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) return;
    const menu = document.body.querySelector('.hamburger');
    const wrapNav = document.body.querySelector('.wrap-nav');
    const searchInput = wrapNav.querySelector('.search-input');

    menu.addEventListener('click', () => {

      wrapNav.classList.toggle('wrap-nav-active');
      searchInput.classList.remove('search-input');
      menu.classList.toggle('nav-exit');
      menu.classList.toggle('hamburger-active');
    });
  });
})();
