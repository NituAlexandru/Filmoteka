
export function addToQueue(filmData) {
  const filmObject = {
    html: filmData.cardHtml,
    data: filmData,
  };
  localStorage.setItem(filmData.id.toString(), JSON.stringify(filmObject));
}






// // De exemplu, într-o funcție care se declanșează când un utilizator apasă "Add to Queue"
// import { addToQueue } from './queueManager'; // Asigurați-vă că calea este corectă

// // Presupunând că aveți filmData și filmHtml disponibile
// addToQueue({
//   id: filmData.id,
//   cardHtml: filmHtml,
//   data: filmData,
// });
