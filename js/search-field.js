;(function() {
  document.addEventListener('DOMContentLoaded', function() {

    const glassIcon = document.body.querySelector('.glass-icon');
    const searchField = document.body.querySelector('input');

    glassIcon.addEventListener('click', () => {
      if (window.innerWidth < 768 || window.innerWidth > 1024) {
        return;
      }
      searchField.classList.toggle('search-input');
      searchField.classList.toggle('activeSearch');
    });
  });
})();
