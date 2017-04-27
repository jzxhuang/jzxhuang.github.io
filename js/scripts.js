$(function() {

  "use strict";

    var topoffset = 75; //variable for menu height
    var topoffset2 = 3;
    var wheight =$(window).height();    //get height of window
    $('.fullheight').css('height', wheight);    //set to window height
    // get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
    var mainbottom = $('#featured').offset().top + $('#featured').height() + topoffset;
    
    //Initialize scroll transitions
    new WOW().init(); 
    
    //Intialize lightbox
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});
    
    //Scroll animations
    // Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
    .not('[href="#featured"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
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
          scrollTop: target.offset().top-topoffset2+2
        }, 450, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
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
    $(window).on('scroll',function(){
        // we round here to reduce a little workload
        stop = Math.round($(window).scrollTop());
        if (stop > mainbottom) {
            $('header nav').addClass('pastcarousel hoverable navhover');
        } else {
            $('header nav').removeClass('pastcarousel hoverable navhover');
       }
    });
});