let burgerMenu = document.querySelector('.burger');
let nav = document.querySelector('.nav');
let body = document.querySelector('body');

burgerMenu.addEventListener('click', () => {

    if( burgerMenu.classList.contains('menu-on') ) {
        document.body.removeEventListener('touchmove', preventDefault, { passive: false });
    } else {
        document.body.addEventListener('touchmove', preventDefault, { passive: false })
    }

    burgerMenu.classList.toggle('menu-on');
    nav.classList.toggle('--menu-open');
    body.classList.toggle('no-scroll');    
})


nav.querySelectorAll('a')
.forEach(link => {

    link.addEventListener('click', (e) => {

        if( burgerMenu.classList.contains('menu-on') ) {
            document.body.removeEventListener('touchmove', preventDefault, { passive: false });

            burgerMenu.classList.toggle('menu-on');
            nav.classList.toggle('--menu-open');
            body.classList.toggle('no-scroll');
        }
    });
});


function preventDefault(e) {
    e.preventDefault();
}