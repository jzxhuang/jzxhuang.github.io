$(function () {

    "use strict";
    // Fading in/out of keywords
    const words = ["Developer", "Innovator", "Explorer", "Student", "Programmer", "Foodie", "Engineer", "Leader", "Adventurer"];
    let arrayIndex = 2;
    let wordIndex = 0;
    
    const navbarOffset = 50;

    const topoffset = 75; //variable for menu height
    const topoffset2 = 35; //scroll offset
    var wheight = $(window).height(); //get height of window
    $('.fullheight').css('height', wheight); //set to window height
    // get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
    var mainbottom = $('#featured').offset().top + $('#featured').height();

    //Initialize MDB scroll animations (fade in)
    new WOW().init();

    //Intialize lightbox
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
    
    // SimpleLightbox
    const lightboxOptions = {
        showCounter: false,
        animationSlide: false,
        history: false
    };
    let lightboxGallery = $('.lightbox-gallery a').simpleLightbox(lightboxOptions);

    //Smooth scroll transitions
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .not('[href="#featured"]')
        .not(".accordion")
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - topoffset2 + 2
                    }, 450, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });

    //ScrollSpy
    $('body').scrollspy({
        target: '.navbar-light',
        offset: topoffset
    });

    // changing navbar appearnce, 
    $(window).on('scroll', function () {
        // we round here to reduce a little workload
        stop = Math.round($(window).scrollTop()) + 60;
        if (stop > mainbottom) {
            $('header nav').addClass('pastcarousel hoverable navhover');
        } else {
            $('header nav').removeClass('pastcarousel hoverable navhover');
        }
    });

    //Modal
    $('#modalGame').on('hidden.bs.modal', function () {
        $('#modalGame iframe').removeAttr('src');
    });
    $('a.toggleModalGame').click(function () {
        var src = 'https://www.youtube.com/embed/GD40LZr9vpM?ecver=1';
        $('#modalGame').modal('show');
        $('#modalGame iframe').attr('src', src);
    });
    
    // toggle between 'X' and hamburger menu 
    $('#hamburgerButton').click(function () {
        let $this = $(this);
        if ($(this).children().hasClass("fa-bars")){
            $(this).children().removeClass("fa-bars").addClass("fa-times");    
        } else {
            $(this).children().removeClass("fa-times").addClass("fa-bars");
        }
    });

    //swap keyword function
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

    //randomize array order (currently unused)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }
    setInterval(swap, 3500);
});
