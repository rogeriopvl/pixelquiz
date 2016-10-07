// Landing page
$(document).ready(function() {

	$('.owl-carousel').owlCarousel({
	    loop:true,
	    margin:10,
		dots: true,
	    responsiveClass:true,
	    responsive:{
	        0:{
	            items:1,
	            nav:false,
				center: true
	        },
	        768:{
	            items:2,
	            nav:false
	        },
	        1024:{
	            items:3,
	            loop:false
	        },
			1404:{
	            items:4,
	            loop:false
	        }
	    }
	});

	window.REMODAL_GLOBALS = {
	  NAMESPACE: 'modal',
	  DEFAULTS: {
	    hashTracking: false
	  }
	};

	// Click event to scroll to top
	$('#goToTopBtn').click(function(){
	    $('html, body').animate({scrollTop : 0},400);
	    return false;
	});

	$('#btnCloseUpdateBrowser').click(function(){
	    $('#outdated').addClass("hide");
	    return false;
	});

	// offcanvas
	var $btnToggle = $(".top-nav .toggle-menu"),
		$topNav = $(".top-nav");

	$btnToggle.on('click', function(e){
		$topNav.toggleClass('visible');
		e.preventDefault();
	});

});
