/* ============== MENU ============== */

$("#menulink").click(event => {
	event.preventDefault();
	$(".hamburger-wrapper").toggleClass("open");
	if ($(".navigation-wrapper").hasClass("show-menu")) {
		$(".navigation-wrapper").removeClass("show-menu");
		$(".navigation").hide();
		$(".navigation li").removeClass("small-padding");
	} else {
		$(".navigation-wrapper").addClass("show-menu");
		$(".navigation").fadeIn();
		$(".navigation li").addClass("small-padding");
	}
});

/* ---------------------------------------------
Height 100%
--------------------------------------------- */
function jsHeightInit() {
	$(".js-height-full").height($(window).height());
	$(".js-height-parent").each(function() {
		$(this).height(
			$(this)
				.parent()
				.first()
				.height()
		);
	});
}

/* ---------------------------------------------
Sections Data-Backgrounds
--------------------------------------------- */
const pageSection = $(
	".home-section, .page-section, .small-section, .split-section"
);

function setDataBackgroundImage() {
	if ($(this).attr("data-background")) {
		$(this).css("background-image", `url(${$(this).data("background")})`);
	}
}

pageSection.each(setDataBackgroundImage);

// Equal Height Plugin
function setEqualHeight() {
	$(this)
		.children(".item")
		.matchHeight({
			property: "min-height"
		});
}

function initEqualHeight() {
	$(".items-container").each(setEqualHeight);
}

/* ---------------------------------------------
Owl Carousel Sliders
--------------------------------------------- */
function initPageSliders() {
	// Fullwidth slideshow

	const sync1 = $(".fullwidth-slideshow");
	const sync2 = $(".fullwidth-slideshow-pager");

	function center(number) {
		const sync2visible = sync2.data("owlCarousel").owl.visibleItems;
		let num = number;
		let found = false;
		for (const i in sync2visible) {
			if (num === sync2visible[i]) {
				found = true;
			}
		}
		if (found === false) {
			if (num > sync2visible[sync2visible.length - 1]) {
				sync2.trigger("owl.goTo", num - sync2visible.length + 2);
			} else {
				if (num - 1 === -1) {
					num = 0;
				}
				sync2.trigger("owl.goTo", num);
			}
		} else if (num === sync2visible[sync2visible.length - 1]) {
			sync2.trigger("owl.goTo", sync2visible[1]);
		} else if (num === sync2visible[0]) {
			sync2.trigger("owl.goTo", num - 1);
		}
	}

	function syncPosition() {
		const current = this.currentItem;
		$(".fullwidth-slideshow-pager")
			.find(".owl-item")
			.removeClass("synced")
			.eq(current)
			.addClass("synced");
		if ($(".fullwidth-slideshow-pager").data("owlCarousel") !== undefined) {
			center(current);
		}
	}

	$(".fullwidth-slideshow").owlCarousel({
		autoPlay: 5000,
		stopOnHover: true,
		transitionStyle: "fade",
		slideSpeed: 350,
		singleItem: true,
		autoHeight: true,
		pagination: false,
		navigation: true,
		navigationText: [
			"<i class='fa fa-angle-left'></i>",
			"<i class='fa fa-angle-right'></i>"
		],
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
		afterInit(el) {
			el.find(".owl-item")
				.eq(0)
				.addClass("synced");
		}
	});

	$(".fullwidth-slideshow-pager").on("click", ".owl-item", function(e) {
		e.preventDefault();
		const number = $(this).data("owlItem");
		sync1.trigger("owl.goTo", number);
	});

	const owl = $(".fullwidth-slideshow").data("owlCarousel");

	$(document.documentElement).keyup(event => {
		// handle cursor keys
		if (event.keyCode === 37) {
			owl.prev();
		} else if (event.keyCode === 39) {
			owl.next();
		}
	});

	if ($(".owl-carousel").length) {
		$(".owl-carousel")
			.data("owlCarousel")
			.reinit();
	}
}

$(document).ready(() => {
	$(window).trigger("resize");
	initPageSliders();
});

$(window).resize(() => {
	jsHeightInit();
	initEqualHeight();
});

let windowHeight = $(window).height();
let navigationHeight;

$(window)
	.resize(() => {
		windowHeight = $(window).height();
		navigationHeight = $(".navigation").height();
		$("#header-wrap").css("height", `${windowHeight - navigationHeight / 2}px`);
		$("#header-wrap .logo").css(
			"width",
			`${$("#header-wrap .container").width()}px`
		);
	})
	.resize();
