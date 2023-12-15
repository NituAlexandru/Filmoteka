export function setToWatchedList(movie) {
  const watchedList = JSON.parse(localStorage.getItem('watchedList')) || [];
  watchedList.push(movie);
  localStorage.setItem('watchedList', JSON.stringify(watchedList));
  console.log('Film added to Watched List:', movie);
}

