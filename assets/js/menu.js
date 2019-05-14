let burgerMenu = document.querySelector('.burger');
let nav = document.querySelector('.nav');
let body = document.querySelector('body');

burgerMenu.addEventListener('click', () => {

    burgerMenu.classList.toggle('menu-on');
    nav.classList.toggle('--menu-open');
    body.classList.toggle('no-scroll');    
})