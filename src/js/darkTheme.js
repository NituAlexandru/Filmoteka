// tema dark - cauta librarie pe net, citeste doc, instaleaza, do it


function darkTheme() {
    const body = document.querySelector('body');
    const btnDark = document.querySelector('.btn-dark');
    const btnDarkImg = document.querySelector('.dark-img');
    let isSun = true;

    btnDark.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (isSun) {
            btnDarkImg.setAttribute('src', '/src/dark theme icon/sun.png');
            isSun = false;
            btnDark.style.backgroundColor = '#393646'
            btnDarkImg.style.backgroundColor = '#393646'
        } else {
            btnDarkImg.setAttribute('src', '/src/dark theme icon/moon.png');
            isSun = true;
            btnDark.style.backgroundColor = 'white'
            btnDarkImg.style.backgroundColor = 'white'
        }
    })
}

darkTheme()