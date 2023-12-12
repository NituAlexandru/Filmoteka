// FT - 23 Creează o fereastră modală(mobile, tablet, desktop) cu
// informații despre membrii echipei tale, care se va deschide la click
// pe textul "GoIT Students" din footer.

export const modal = document.getElementById('myFooterModal');
export const btn = document.getElementById('openFooterModal');
export const span = document.getElementsByClassName('close-button-member')[0];

btn.onclick = function () {
  modal.style.display = 'block';
};

span.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

document
  .querySelectorAll('.member-links .social-links')
  .forEach(function (link) {
    link.addEventListener('click', function () {
      const svg = this.querySelector('svg');
      svg.style.fill = 'red';
    });

    link.addEventListener('click', function (event) {
      const link = this.querySelector('a').getAttribute('href');
      window.location.href = link;
    });
  });
