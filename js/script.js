// burger 
document.addEventListener('DOMContentLoaded', () => {
    const burgerIcon = document.querySelector('.burger__icon');
    const burgerMenu = document.querySelector('.burger__menu');
    const burgerMenuLinks = document.querySelectorAll('.burger__menu .header__link');

    if (burgerIcon && burgerMenu) {
        burgerIcon.addEventListener('click', () => {
            burgerIcon.classList.toggle('active');
            burgerMenu.classList.toggle('active');
            document.body.style.overflow = burgerMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.addEventListener('click', (event) => {
            if (!burgerMenu.contains(event.target) && !burgerIcon.contains(event.target)) {
                burgerIcon.classList.remove('active');
                burgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });


        burgerMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerIcon.classList.remove('active');
                burgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});



// lang

const langSelector = document.querySelector('.language-selector');
const dropdown = document.querySelector('.language-dropdown');

langSelector.addEventListener('click', (event) => {
    event.stopPropagation();
    langSelector.parentElement.classList.toggle('active1');
    dropdown.classList.toggle('active1');
});

document.querySelectorAll('.language-option').forEach(item => {
    item.addEventListener('click', (event) => {
        event.stopPropagation();
        const selectedLang = item.getAttribute('data-lang');
        const currentLang = langSelector.textContent;
        langSelector.textContent = selectedLang;
        item.textContent = currentLang;
        item.setAttribute('data-lang', currentLang);
        langSelector.parentElement.classList.remove('active1');
        dropdown.classList.remove('active1');
    });
});

document.addEventListener('click', (event) => {
    const isClickInside = langSelector.parentElement.contains(event.target);
    if (!isClickInside) {
        langSelector.parentElement.classList.remove('active1');
        dropdown.classList.remove('active1');
    }
});

// header 

window.addEventListener('scroll', function () {
    var header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
