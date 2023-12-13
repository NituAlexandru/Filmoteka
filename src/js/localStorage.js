//salvarea in local storage a listelor
const searchInput = document.qetElementbyId('searchInput');

searchInput.addEventListener('change', function () {
  const query = searchInput.value;

  localStorage.setItem('lastSearchQuery', query);
});

const lastSearchQuery = localStorage.getItem('lastSearchQuery');

if (lastSearchQuery) {
  searchInput.value = lastSearchQuery;
}