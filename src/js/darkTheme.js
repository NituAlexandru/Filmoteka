export let darkMode = localStorage.getItem('darkMode'); // check for saved 'darkMode' in localStorage
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const darkModeIcon = document.querySelector('#dark-mode-icon');

const enableDarkMode = () => {
  document.body.classList.add('darkmode'); // 1. Add the class to the body
  localStorage.setItem('darkMode', 'enabled'); // 2. Update darkMode in localStorage
  darkModeIcon.classList.remove('fa-sun'); // 3. Schimbă iconița în soare
  darkModeIcon.classList.add('fa-moon');
};

const disableDarkMode = () => {
  document.body.classList.remove('darkmode'); // 1. Remove the class from the body
  localStorage.setItem('darkMode', null); // 2. Update darkMode in localStorage
   darkModeIcon.classList.remove('fa-moon');
   darkModeIcon.classList.add('fa-sun');
};

// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === 'enabled') {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode'); // get their darkMode setting

  // if it not current enabled, enable it
  if (darkMode !== 'enabled') {
    enableDarkMode();
    // if it has been enabled, turn it off
  } else {
    disableDarkMode();
  }
});
