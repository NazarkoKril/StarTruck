// scroll 

document.getElementById('scroll-arrow').addEventListener('click', function () {
    document.getElementById('serv').scrollIntoView({ behavior: 'smooth' });
});


// swiper rev

const swiper1 = new Swiper(".review__swiper", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,

    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    slidesPerView: 4,
    spaceBetween: 25,

    speed: 1000,
    breakpoints: {
        320: {
            slidesPerView: 1.2,
            spaceBetween: 10
        },
        520: {
            slidesPerView: 2,
            spaceBetween: 20
        },

        800: {
            slidesPerView: 3,
            spaceBetween: 25
        },

        1080: {
            slidesPerView: 4,
            spaceBetween: 25
        }
    }
});

