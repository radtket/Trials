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
    $('.hamburger-wrapper').toggleClass('open');
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

(function() {

  /* matchHeight example */

  $(function() {
    // apply your matchHeight on DOM ready (they will be automatically re-applied on load or resize)



    // apply matchHeight to each item container's items
    $('.items-container').each(function() {
      $(this).children('.item').matchHeight();
    });

    // test property
    $('.property-items .item').matchHeight({
      property: 'min-height'
    });

    // test target
    $('.target-items').each(function() {
      $(this).children('.item-0, .item-2, .item-3').matchHeight({
        target: $(this).find('.item-1')
      });
    });

    // example of update callbacks (uncomment to test)
    $.fn.matchHeight._beforeUpdate = function(event, groups) {
      //var eventType = event ? event.type + ' event, ' : '';
      //console.log("beforeUpdate, " + eventType + groups.length + " groups");
    }

    $.fn.matchHeight._afterUpdate = function(event, groups) {
      //var eventType = event ? event.type + ' event, ' : '';
      //console.log("afterUpdate, " + eventType + groups.length + " groups");
    }
  });

})();
  
  
});