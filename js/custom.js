/*
	Scripts for Blink HTML - V1.0
*/

// pace preloader
Pace.on('done', function() {
	'use strict';
    jQuery('.dt-preload').fadeOut('fast');
}); 


// lazy load images
function lazyloadimg() {
	'use strict';
	var $lazy = jQuery(".lazy");
	if ( jQuery.isFunction(jQuery.fn.lazyload) ) {
		jQuery(function() {
			$lazy.lazyload({
				effect: "fadeIn",
		    threshold: 1000
			});
		});	
	}	
}


// wow animations
function wowanimations() {
	'use strict';
	if(Modernizr.cssanimations ) {
		var wow = new WOW(
		  {
		    boxClass:     'wow',      // animated element css class (default is wow)
		    animateClass: 'animated', // animation css class (default is animated)
		    offset:       0,          // distance to the element when triggering the animation (default is 0)
		    mobile:       false       // trigger animations on mobile devices (true is default)
		  }
		);
		wow.init();
	}	
}


// fullscreenmenu
function fullscreenmenu() { 
	'use strict';

	// Burger menu positioning
	var headerinheight = jQuery('.logo').height();
	jQuery('.burger-icon').css({'height': headerinheight, 'line-height': headerinheight+'px'});
	jQuery('#burger-menu').css({'padding-top': (headerinheight-28)/2 });

    var open = false;
    var animationIn = 'animated fadeInDown';
    var animationOut = 'animated fadeOutUp';

    jQuery('#burger-menu').on('click', function() {
        jQuery(this).toggleClass("active");
        if (open == false) {
            jQuery('.overlay').fadeIn(200);
            open = true;
        } else {
            jQuery('.overlay').fadeOut(200);
            open = false;
        }
    });
    jQuery('.wrap-nav a').on('click', function() {
        jQuery('.overlay').fadeOut(400);
        jQuery('#burger-menu').removeClass('active');
        open = false;
    });	

	//Scroll Nav FullScreen
	jQuery('.wrap-nav').onePageNav({
		currentClass: 'current',
		filter: ':not(.external)'
	});	    
}

function blinknav() {
	'use strict';
	
	// Menu Superfish Call //
	jQuery('ul#mainnav').superfish({
		delay: 800,
		speed: 'normal', 
		autoArrows: false,
		animation: {opacity:'show'},   
		animationOut: {opacity:'hide'}
	});
	
	jQuery("ul#mainnav li").css({ "overflow":"visible"});

	//Scroll Nav
	jQuery('#mainnav').onePageNav({
		currentClass: 'current',
		filter: ':not(.external)'
	});
	
	// Responsive Navigation 
    var nava = jQuery(".nav-btn"),
    navb = jQuery("#navigation"),
    wind = jQuery(window).width(), 
    winh;
   
    if(wind < 1007) {
             winh = jQuery(window).outerHeight()
    }
    else {
            winh = jQuery(window).outerHeight() -jQuery('#header').outerHeight()
    }

    // Add classes         
    jQuery(window).resize(function () {
        var nava = jQuery(".nav-btn"),
            navb = jQuery("#navigation"),
            wind = jQuery(window).width(),
            winh;

        if(wind < 1007) {
                 winh = jQuery(window).outerHeight()
        }
        else {
                winh = jQuery(window).outerHeight() -jQuery('#header').outerHeight()
        }
       
        if (wind > 1006) {
                navb.addClass("desktop");
                navb.removeClass("mobile")
        }
        if (wind < 1007) {
                navb.addClass("mobile");
                navb.removeClass("desktop")
        }

        // Nav CSS adjustment for mobile
        if (wind < 1007) {
        jQuery('#navigation.mobile').css({'max-height': winh-150, 'overflow-y': 'scroll'});
        }
        if (wind > 1006) {
                jQuery('#navigation.desktop').css({'overflow': 'visible'});
        }              
 
    });
                       
    if (wind > 1006) {
            navb.addClass("desktop");
            navb.removeClass("mobile")
    }
    if (wind < 1007) {
            navb.addClass("mobile");
            navb.removeClass("desktop")
    }    

    // Nav CSS adjustment for mobile
    if (wind < 1007) {
    jQuery('#navigation.mobile').css({'max-height': winh-150, 'overflow-y': 'scroll'});
    }
    if (wind > 1006) {
            jQuery('#navigation.desktop').css({'overflow': 'visible'});
    }                              
 	
	// Click Tweak	
	nava.on('click', function () {
		if (navb.is(":visible")) {
			navb.slideUp()
		} else {
			navb.slideDown()
		}
	});	
	
	jQuery("#navigation a").on('click', function () {
		if (navb.is(":visible") && navb.hasClass("mobile")) {
			navb.slideUp();
		}
	});		
		
	
	// Fixed Element Height
	var headerheight = jQuery('#header').outerHeight();
	jQuery('.menu-fixer').css({'height': headerheight});

	// Portfolio Nav vertical positioning
	var projnavheight = jQuery(".projnav").outerHeight();
	jQuery(".projnav").css({'height': projnavheight});

}

// Counting Numbers
function counts() {
	'use strict';

	var counterWrapper = jQuery('.counter-wrapper').width(),
		$counterItem = jQuery('.counter-item'),
		counters = $counterItem.length,
		counterwp = jQuery('.counter-wrapper'),
		counterno = jQuery('.counter-number'),
		counterWidth;
		
	if (counterWrapper < 768) {
		counterWidth = counterWrapper/2;
	}
	else if (counterWrapper < 480) {
		counterWidth = counterWrapper;
	}
	else {
		counterWidth = counterWrapper/counters;
	}
		
	$counterItem.css({'width': counterWidth});


	counterwp.waypoint(function() {
		counterno.countTo();	
	}, 
	{ 
		offset: '90%',
		triggerOnce: true
	});
}


//Effect for Scrolltop Button	
function totop() {	
	'use strict';	

	//Scroll to top
	jQuery('#totop').on('click', function() {
        jQuery("html, body").animate({ scrollTop: 0 }, 700);
        return false;
    });	
}

	
// Tabs
function blinktabs() {	
	'use strict';

	jQuery('.tabs-wrapper').each(function() {
		jQuery(this).find(".tab-content").hide(); //Hide all content
		jQuery(this).find("ul.tabs li:first").addClass("active").show(); //Activate first tab
		jQuery(this).find(".tab-content:first").show(); //Show first tab content
	});
	jQuery("ul.tabs li").on('click', function(e) {
		jQuery(this).parents('.tabs-wrapper').find("ul.tabs li").removeClass("active"); //Remove any "active" class
		jQuery(this).addClass("active"); //Add "active" class to selected tab
		jQuery(this).parents('.tabs-wrapper').find(".tab-content").hide(); //Hide all tab content

		var activeTab = jQuery(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		jQuery("li.tab-item:first-child").css("background", "none" );
		jQuery(this).parents('.tabs-wrapper').find(activeTab).fadeIn(); //Fade in the active ID content
		e.preventDefault();
	});
	jQuery("ul.tabs li a").on('click', function(e) {
		e.preventDefault();
	})
	jQuery("li.tab-item:last-child").addClass('last-item');
}


// Toggles
function toggles() {
	'use strict';

	var toggleli = jQuery('#toggle-view li');
	toggleli.on('click', function () {
        var text = jQuery(this).children('div.panel');
        if (text.is(':hidden')) {
            text.slideDown('200');
            jQuery(this).children('span').addClass('toggle-minus');     
            jQuery(this).addClass('activated');     
        } else {
            text.slideUp('200');
			jQuery(this).children('span').removeClass('toggle-minus'); 
            jQuery(this).children('span').addClass('toggle-plus'); 
			jQuery(this).removeClass('activated'); 			
        }
         
    });
}


// Skills 
function blinkskills() {
	'use strict';
 
	var skillbar = jQuery('.skillbar');

	skillbar.each(function(){
		var barwidth = jQuery(this).attr('data-percent');

		jQuery(this).waypoint(function() {
		
			jQuery(this).find('.skillbar-bar').animate({
				width: barwidth
			},2000);
			jQuery(this).find('.skill-bar-percent').animate({
				'left':barwidth,
				'margin-left': '-19px',
				'opacity': 1
			}, 2000);	
		}, 
		{ 
			offset: '90%',
			triggerOnce: true
		});		
	});	
}


// Blog Gallery Slider
function gallery_slider() {
	'use strict';

	var galleryslider = jQuery(".gallery-slider");
	galleryslider.owlCarousel({
		autoHeight : true,
		items : 1,
		nav: true,
		navText: [
			  "<i class='fa fa-angle-left'></i>",
			  "<i class='fa fa-angle-right'></i>"
			  ],				
		rewind: true,	
		autoplayHoverPause: true,
		dots: true,
		smartSpeed: 800,		
	});			
}

jQuery(window).load(function() {	
	'use strict';

	// Portfolio Gallery Slider
	jQuery(".portfolio-slider").owlCarousel({
		autoHeight : true,
		items : 1,
		nav: true,
		navText: [
			  "<i class='fa fa-angle-left'></i>",
			  "<i class='fa fa-angle-right'></i>"
			  ],				
		rewind: true,
		autoplay: true,
		autoplayTimeout: 8000,		
		smartSpeed: 1000,	
		dots: true,
		smartSpeed: 800,
		onInitialized: portfolio_callback,
		onChanged: portfolio_callback
	});		

	function portfolio_callback(event){
	    var items     = event.item.count;     // Number of items
	    var item      = event.item.index;     // Position of the current item
		jQuery('.slider-nav').html("<span class='no-1'>"+(item+1)+"</span><svg class='svgline' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><line transform='rotate(-45 50 50)' x1='4' y1='4' x2='86' y2='4'/></svg><span class='no-2'>" + items+"</span>");
	}		
	

	// Testimonials Slider
	jQuery("#owl-testimonials").owlCarousel({
		autoHeight : true,
		items : 1,
		nav: true,
		navText: [
			  "<i class='fa fa-angle-left'></i>",
			  "<i class='fa fa-angle-right'></i>"
			  ],				
		rewind: true,
		rtl: false,
		autoplay: true,
		autoplayTimeout: 8000,		
		smartSpeed: 1000,	
		autoplayHoverPause: true,
		dots: false,
		onInitialized: testimonials_owl_callback,
		onChanged: testimonials_owl_callback
	});		

	function testimonials_owl_callback(event){
	    var items     = event.item.count;     // Number of items
	    var item      = event.item.index;     // Position of the current item
	    jQuery('.testimonials-slider-no').text(""+(item+1)+"/" + items+"");

	}	
	
	// Clients Slider
	jQuery("#owl-clients").owlCarousel({
		autoHeight : true,
	    responsive:{
	        0:{
	            items:1
	        },
	        480:{
	            items:2
	        },
	        768:{
	            items:3
	        },
	        1024:{
	            items: 4
	        }		
	    },
		nav: false,
		rewind: true,
		rtl: false,
		autoplay: true,
		autoplayTimeout: 8000,
		dots: true,
		smartSpeed: 800		
	});
	
	// Twitter Slider
	jQuery("#owl-twitter").owlCarousel({
		autoHeight : true,
		items : 1,
		nav: false,
		autoplay: false,
		dots: true,
		smartSpeed: 800	
	});		

	// Parallax Backgrounds
	if(!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {	
		jQuery('#quote').parallax("50%", 0.4);
		jQuery('.testimonials-parallax').parallax("50%", 0.4);
		jQuery('#twitter').parallax("50%", 0.4);
		jQuery('#blogtwitter').parallax("50%", 0.4);
		jQuery('#contact').parallax("50%", 0.4);
		jQuery('#projectbg').parallax("50%", 0.4);
		jQuery('#blogbg').parallax("50%", 0.4);
		jQuery('#portfolio1').parallax("50%", 0.4);
		jQuery('#singlepost').parallax("50%", 0.4);

	}
	
	// Parallax Fix for Mobile Devices
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		jQuery('.parallax-section, .testimonials-parallax').css({'background-attachment': 'scroll'});
	}

	// Fixes some Waypoint issues
	jQuery('body').waypoint(function() {
		console.log('ready to go');
	}, 
	{ 
		triggerOnce: true
	});
		
});

	
jQuery(document).ready(function() {
	'use strict';

	//Run Functions
	blinknav();
	fullscreenmenu();
	wowanimations();
	lazyloadimg();
	counts();
	totop();	
	blinktabs();
	toggles();
	blinkskills();

	// team popup scroll position
	jQuery('.popup-scroll').css({'max-height': 0.9*(window.innerHeight)-70 });

	// Header Effect on Scroll
	jQuery(window).scroll( function() {
			var value = jQuery(this).scrollTop();
			if ( value > 120 )	{
				jQuery("#header").removeClass("initial-state").addClass("scrolled-state").css({"padding-top": "17px", "padding-bottom": "17px"});
				jQuery(".scrolled-state").css({"background":"rgba(255,255,255,0.95)", "box-shadow": "0px 0px 3px rgba(0, 0, 0, 0.3)"});
				jQuery(".no-rgba .scrolled-state").css({"background": "url(images/no-rgba-white.png) repeat scroll 0 0"});
				jQuery(".logo img").css({"height": "45px", "width": "auto"});
				jQuery(".scrolled-state ul#mainnav li ul li a").css({'background': 'rgba(255,255,255,0.95)'});
				jQuery(".no-rgba .scrolled-state ul#mainnav li ul li a").css({"background": "url(images/no-rgba-white.png) repeat scroll 0 0"});
				
				jQuery("#header.no-header").addClass("show");
				
				jQuery(".no-csstransforms .no-header").css({"display": "block"});

				jQuery("#header.transparent-header.scrolled-state .logo img").attr("src","images/logo.png");

				// Burger menu positioning
				var headerinheight = jQuery('.logo').height();
				jQuery('.burger-icon').css({'height': headerinheight, 'line-height': headerinheight+'px'});
				jQuery('#burger-menu').css({'padding-top': (headerinheight-28)/2 });				
			
			}
			else {
				jQuery("#header").removeClass("scrolled-state").addClass("initial-state");
				jQuery("#header.transparent-header, #header.solid-header").css({"padding-top": "17px", "padding-bottom": "17px"});
				jQuery(".logo img").css({"height": "auto", "width": "auto"});
				jQuery("#header ul#mainnav li ul li a").css({'background': 'rgba(255,255,255, 1)'});
				
				jQuery(".transparent-header").css({"background":"rgba(255,255,255,0)", "box-shadow": "none"});
				jQuery(".no-rgba .transparent-header").css({"background":"url(images/no-rgba-white.png) repeat scroll 0 0"});
				jQuery(".solid-header").css({"background":"#fff", "box-shadow": "none"});
				
				// jQuery("#header.no-header .logo img").css({"height": "45px", "width": "auto"});
				jQuery("#header.no-header").removeClass("show");
				jQuery(".no-csstransforms .no-header").css({"display": "none"});		

				jQuery("#header.transparent-header.initial-state .logo img").attr("src","images/logo-alt.png");		

				// Burger menu positioning
				var headerinheight = jQuery('.logo').height();
				jQuery('.burger-icon').css({'height': headerinheight, 'line-height': headerinheight+'px'});
				jQuery('#burger-menu').css({'padding-top': (headerinheight-28)/2 });					
				
			}
	});		
	
	// In and Out Effect
	var itemonhover = jQuery('.item-on-hover');
	itemonhover.on({
	    mouseenter: function() {
	        jQuery(this).animate({ opacity: 1 }, 200);
	    },
	    mouseleave: function() {
	        jQuery(this).animate({ opacity: 0 }, 200);
	    }
	})	

	// media player
	if ( jQuery.isFunction(jQuery.fn.mediaelementplayer) ) {
		var videoaudio = jQuery('video,audio');
		videoaudio.mediaelementplayer();
	}
	// smoothscroll effect for custom links
	var smoothscrollbtn = jQuery('.smoothscroll');
	smoothscrollbtn.on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		  var target = jQuery(this.hash);
		  target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
		  if (target.length) {
		    jQuery('html,body').animate({
		      scrollTop: target.offset().top
		    }, 900);
		    return false;
		  }
		}
	});	
	
	
	// Portfolio Grid In and Out Effect //
	var portfoliohover = jQuery('.grid-item a');
	portfoliohover.on({
	    mouseenter: function() {
	       jQuery(this).find('.grid-item-on-hover').animate({ opacity: 1 }, 350);
	    },
	    mouseleave: function() {
	       jQuery(this).find('.grid-item-on-hover').animate({ opacity: 0 }, 350);
	    }
	})	
		
	
	// Video in Posts
	var postvideo = jQuery(".post-video");
	postvideo.fitVids();		
	
	
	// Twitter Feed
	if ( jQuery.isFunction(jQuery.fn.tweet) ) {	
		jQuery(".tweet").tweet({
			modpath: 'twitter/',
			join_text: "auto",
			username: "deliciousthemes",
			count: 3,
			template: "{time}{text}{reply_action}{retweet_action}{favorite_action}",
			auto_join_text_reply: null,
			auto_join_text_default: null,        // [string]   auto text for non verb: "i said" bullocks
			auto_join_text_ed: null,                   // [string]   auto text for past tense: "i" surfed
			auto_join_text_ing: null,               // [string]   auto tense for present tense: "i was" surfing
			auto_join_text_url: null, 
			loading_text: "loading tweets..."
		});	
	}

	
	// Flickr Widget
	jQuery('#flickr').jflickrfeed({
		limit: 12,
		qstrings: {
			id: '58842866@N08',
			tags: 'architecture'
		},
		itemTemplate: 
		'<li>' +
			'<a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a>' +
		'</li>' 
	});	

	// hero
	// Defining a function to set size for #hero 
    function fullscreen(){
        jQuery('.the-hero').css({
            width: jQuery(window).width(),
            height: jQuery(window).height() - jQuery('#header').outerHeight()
        });
    }
    fullscreen();
  // Run the function in case of window resize
  jQuery(window).resize(function() {
       fullscreen();         
    });	

	
	// Magnific Popup
	var dtlightbox = jQuery(".dt-lightbox");
	dtlightbox.magnificPopup({

	});

	jQuery('.mfp-gallery').each(function() {
	    jQuery(this).find('.dt-lightbox-gallery').magnificPopup({
	    	type: 'image',
	        gallery: {
	          enabled:true,
	          preload: [0,1]
	        }
	    });
	});	

	// Magnific member popup 
	var memberpopup = jQuery('.member-popup');
	memberpopup.magnificPopup({
		gallery:{enabled:true},
	  	removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
		beforeOpen: function() {
		  // just a hack that adds mfp-anim class to markup 
		   this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
		   this.st.mainClass = this.st.el.attr('data-effect');
		}
	  },
	  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});	

});


/*-----------------------------------------------------------------------------------*/
/*	Social Networks Block
/*-----------------------------------------------------------------------------------*/
	
	var shareoptions = jQuery('.share-options a');
	shareoptions.on('click', function(e) {
		'use strict';
		e.preventDefault();
	});
	
	// Twitter
	function twitterSharer(){
		'use strict';
		window.open( 'http://twitter.com/intent/tweet?text='+jQuery(".title-content h2").text() +' '+window.location, 
			"twitterWindow", 
			"width=650,height=350" );
		return false;
	}

	// Facebook

	function facebookSharer(){
		'use strict';
		window.open( 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href), 
			'facebookWindow', 
			'width=650,height=350');
		return false;
	}		

	// Pinterest

	function pinterestSharer(){
		'use strict';
		window.open( 'http://pinterest.com/pin/create/bookmarklet/?media='+ jQuery('.begin-content img').first().attr('src') + '&description='+jQuery('.title-content h2').text()+' '+encodeURIComponent(location.href), 
			'pinterestWindow', 
			'width=750,height=430, resizable=1');
		return false;
	}	


	// Google Plus

	function googleSharer(){
		'use strict';
		window.open( 'https://plus.google.com/share?url='+encodeURIComponent(location.href), 
			'googleWindow', 
			'width=500,height=500');
		return false;
	}	


	// Delicious

	function deliciousSharer(){
		'use strict';
		window.open( 'http://delicious.com/save?url='+encodeURIComponent(location.href)+'?title='+jQuery(".title-content h2").text(), 
			'deliciousWindow', 
			'width=550,height=550, resizable=1');
		return false;
	}

	// Linkedin

	function linkedinSharer(){
		'use strict';
		window.open( 'http://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(location.href)+'$title='+jQuery(".title-content h2").text(), 
			'linkedinWindow', 
			'width=650,height=450, resizable=1');
		return false;
	}