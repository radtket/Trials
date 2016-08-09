
$(document).ready(function() {
  $(window).trigger("resize");
  initPageSliders();
});

$(window).resize(function() {
  js_height_init();
  initEqualHeight();
});


  var window_height = $(window).height();
  var window_width = $(window).width();
  var navigation_height;


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
    } 
    else {
      $('.navigation-wrapper').addClass('show-menu');
      $('.navigation').fadeIn();
      $('.navigation li').addClass('small-padding');
     }
  });





/* ---------------------------------------------
Height 100%
--------------------------------------------- */
function js_height_init() {
  (function($) {
    $(".js-height-full").height($(window).height());
    $(".js-height-parent").each(function() {
      $(this).height($(this).parent().first().height());
    });
  })(jQuery);
}



/* ---------------------------------------------
Sections Data-Backgrounds
--------------------------------------------- */
var pageSection = $(".home-section, .page-section, .small-section, .split-section");
pageSection.each(function(indx) {
  if ($(this).attr("data-background")) {
    $(this).css("background-image", "url(" + $(this).data("background") + ")");
  }
});



// Equal Height Plugin

function initEqualHeight() {
  $('.items-container').each(function() {
    $(this).children('.item').matchHeight({
    property: 'min-height'
    });
  });
}



  
/* ---------------------------------------------
Owl Carousel Sliders 
--------------------------------------------- */
function initPageSliders() {
  (function($) {
    "use strict";

    // Fullwidth slideshow

    var sync1 = $(".fullwidth-slideshow");
    var sync2 = $(".fullwidth-slideshow-pager");

    $(".fullwidth-slideshow").owlCarousel({
      autoPlay: 5000,
      stopOnHover: true,
      transitionStyle: "fade",
      slideSpeed: 350,
      singleItem: true,
      autoHeight: true,
      pagination: false,
      navigation: true,
      navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
      afterAction: syncPosition,
      responsiveRefreshRate: 200
    });

    $(".fullwidth-slideshow-pager").owlCarousel({
      autoPlay: 5000,
      stopOnHover: true,
      items: 8,
      itemsDesktop: [1199, 8],
      itemsDesktopSmall: [979, 7],
      itemsTablet: [768, 6],
      itemsMobile: [480, 4],
      autoHeight: true,
      pagination: false,
      navigation: false,
      responsiveRefreshRate: 100,
      afterInit: function(el) {
        el.find(".owl-item").eq(0).addClass("synced");
      }
    });

    function syncPosition(el) {
      var current = this.currentItem;
      $(".fullwidth-slideshow-pager").find(".owl-item").removeClass("synced").eq(current).addClass("synced")
      if ($(".fullwidth-slideshow-pager").data("owlCarousel") !== undefined) {
        center(current)
      }
    }

    $(".fullwidth-slideshow-pager").on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).data("owlItem");
      sync1.trigger("owl.goTo", number);
    });

    function center(number) {
      var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
      var num = number;
      var found = false;
      for (var i in sync2visible) {
        if (num === sync2visible[i]) {
          var found = true;
        }
      }
      if (found === false) {
        if (num > sync2visible[sync2visible.length - 1]) {
          sync2.trigger("owl.goTo", num - sync2visible.length + 2)
        } else {
          if (num - 1 === -1) {
            num = 0;
          }
          sync2.trigger("owl.goTo", num);
        }
      } else
      if (num === sync2visible[sync2visible.length - 1]) {
        sync2.trigger("owl.goTo", sync2visible[1])
      } else
      if (num === sync2visible[0]) {
        sync2.trigger("owl.goTo", num - 1)
      }
    }

    var owl = $(".fullwidth-slideshow").data("owlCarousel");

    $(document.documentElement).keyup(function(event) {
      // handle cursor keys
      if (event.keyCode == 37) {
        owl.prev();
      } else
      if (event.keyCode == 39) {
        owl.next();
      }
    });

    if ($(".owl-carousel").length) {
      var owl = $(".owl-carousel").data('owlCarousel');
      owl.reinit();
    }

  })(jQuery);
};