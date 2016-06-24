$(document).ready(function(){
 
      var window_height = $(window).height(),
        window_width = $(window).width(),
        navigation_height;



      /* ============== SLIDERS ============== */




  $('#header-slide').slick({
      dots: true,
      autoplay: true,
      autoplaySpeed: 8000,
      mobileFirst: true,
    });

      $(window).resize(function() {

        window_height = $(window).height();

        navigation_height = $(".navigation").height();

        $('#header-wrap').css('height', (window_height - (navigation_height / 2)) + 'px');
        $('#header-wrap .logo').css('width', $('#header-wrap .container').width() + 'px');

      }).resize();



      /* ============== MENU ============== */


  $('#menulink').click(function(event) {
    event.preventDefault();
    if($('.navigation-wrapper').hasClass('show-menu')) {
      $('.navigation-wrapper').removeClass('show-menu');
      $('.navigation').hide();
      $('.navigation li').removeClass('small-padding');
    } else {
      $('.navigation-wrapper').addClass('show-menu');
      $('.navigation').fadeIn();
      $('.navigation li').addClass('small-padding');
     }
  });
  
  
});