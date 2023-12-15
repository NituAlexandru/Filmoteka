export function setToQueueList(movie) {
  const queueList = JSON.parse(localStorage.getItem('queueList')) || [];
  queueList.push(movie);
  localStorage.setItem('queueList', JSON.stringify(queueList));
  console.log('Film added to Queue List:', movie);
}

