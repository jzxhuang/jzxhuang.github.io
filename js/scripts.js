$(function () {
    "use strict";
    // Initialize MDB scroll animations (fade in)
    new WOW().init();
    
    // Fading in/out of keywords
    const words = ["Leader", "Innovator", "Explorer", "Student", "Programmer", "Foodie", "Engineer", "Developer", "Adventurer"];
    let arrayIndex = 2;
    let wordIndex = 0;

    let $root = $('html, body');
    const topoffset = 75; // scrollspy navbar offset
    const smoothScrollOffset = 33; // smoothscroll offset
    const wheight = $(window).height(); //get height of window
    $('.fullheight').css('height', wheight); //set to window height
    // Get the value of the bottom of the #main element by adding the offset of that element plus its height
    let mainbottom = $('#featured').offset().top + $('#featured').height();

    // Initialize lazy load
    let myLazyLoad = new LazyLoad({
        elements_selector: "iframe, img"
    });
    
    // SimpleLightbox
    const lightboxOptions = {
        showCounter: false,
        animationSlide: false,
        history: false
    };
    let lightboxGallery = $('.lightbox-gallery a').simpleLightbox(lightboxOptions);
    let aboutLightbox = $('.lightbox-about a').simpleLightbox(lightboxOptions);
    
    // Smooth scroll transitions
    // Select all links with hashes, ignoring select links
    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .not('[href="#featured"]')
        .not(".accordion")
        .click(function (event) {
            // jQuery smooth scroll, prevent changing of URL
            event.preventDefault();
            $root.animate({scrollTop: $($.attr(this, 'href')).offset().top - smoothScrollOffset}, 500);
        return false;
        });

    // ScrollSpy
    $('body').scrollspy({
        target: '.navbar-light',
        offset: topoffset
    });

    // Changing navbar appearnce, 
    $(window).on('scroll', function () {
        // we round here to reduce a little workload
        stop = Math.round($(window).scrollTop()) + 60;
        if (stop > mainbottom) {
            $('header nav').addClass('pastcarousel hoverable navhover');
        } else {
            $('header nav').removeClass('pastcarousel hoverable navhover');
        }
    });

    // Modal
    $('#modalGame').on('hidden.bs.modal', function () {
        $('#modalGame iframe').removeAttr('src');
    });
    $('a.toggleModalGame').click(function () {
        let src = 'https://www.youtube.com/embed/GD40LZr9vpM?ecver=1';
        $('#modalGame').modal('show');
        $('#modalGame iframe').attr('src', src);
    });
    
    // Toggle between 'X' and hamburger menu 
    $('#hamburgerButton').click(function () {
        let $this = $(this);
        if ($(this).children().hasClass("fa-bars")){
            $(this).children().removeClass("fa-bars").addClass("fa-times");    
        } else {
            $(this).children().removeClass("fa-times").addClass("fa-bars");
        }
    });

    // Swap keyword function
    function swap() {
        let wordSelect;
        if (wordIndex === 0) {
            wordSelect = "#wordOne";
        } else {
            wordSelect = "#wordTwo";
        }
        $(wordSelect).fadeOut(600, function () {
            $(this).text(words[arrayIndex]).fadeIn(600);
        });

        arrayIndex = (arrayIndex + 1) % words.length;
        wordIndex = (wordIndex + 1) % 2;
    }

    // Randomize array order (currently unused)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }
    setInterval(swap, 3250);
    
    //Slick Card Carousel, responsive, 3 slides on lg & up
    $('.slick-test').slick({
        dots: true,
        centerMode: true,
        slidesToShow: 3,
        lazyload: 'ondemand',
        responsive:[
            {
                breakpoint: 992,
                settings: {
                    centerMode: true,
                    slidesToShow: 1
                }
            }
        ]
    });
});
