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
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Eroare la parsarea datelor din localStorage:', error);
    return null; // sau returnați o valoare implicită adecvată
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
