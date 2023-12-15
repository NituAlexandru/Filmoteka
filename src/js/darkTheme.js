// tema dark - cauta librarie pe net, citeste doc, instaleaza, do it
document.addEventListener("DOMContentLoaded", function() {
  // Funcția myFunction
  function myFunction() {
    const body = document.body;
    body.classList.toggle("dark-mode");
  }

  // Apelează myFunction atunci când butonul este apăsat
  const darkModeToggle = document.getElementById('darkModeToggle');
  darkModeToggle.addEventListener('click', myFunction);
});
