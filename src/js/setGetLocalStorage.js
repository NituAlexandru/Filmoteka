export const addToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

// addToStorage('myKey', 'some value');
// console.log(localStorage.getItem('myKey'));

// ---------------------------------------------------------------------------
export const getFromStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error);
    return null;
  }
};
// ------------------------------------------------------------------
export const removeFromStorage = key => {
  try {
    localStorage.removeItem(key);
    console.log(`Elementul cu cheia "${key}" a fost șters din localStorage.`);
  } catch (error) {
    console.error(error);
  }
};
// Șterge elementul cu cheia ('cheieSpecifică')
// removeFromStorage();
