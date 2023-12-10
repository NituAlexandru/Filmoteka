// FT - 23 Creează o fereastră modală(mobile, tablet, desktop) cu
// informații despre membrii echipei tale, care se va deschide la click
// pe textul "GoIT Students" din footer.

var modal = document.getElementById('myFooterModal');

var btn = document.getElementById('openFooterModal');

var span = document.getElementsByClassName('close-button-member')[0];

btn.onclick = function () {
  modal.style.display = 'block';
};

span.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

document
  .querySelectorAll('.member-links .social-links')
  .forEach(function (link) {
    link.addEventListener('click', function () {
      var svg = this.querySelector('svg');
      svg.style.fill = 'white';
    });

    link.addEventListener('click', function (event) {
      var link = this.querySelector('a').getAttribute('href');
      window.location.href = link;
    });
  });
