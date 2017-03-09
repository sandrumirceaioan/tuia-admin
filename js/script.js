// JavaScript Document

/* ==============================================
Fancybox - lightbox 
=============================================== */
$(document).ready(function(){
	if($('.fancybox-media').length){
		$('.fancybox-media').fancybox({
			openEffect  : 'none',
			closeEffect : 'none',
			helpers : {
				media : {}
			}
		});
	}
});

/* ==============================================
Slider 
=============================================== */
$(document).ready(function(){
	$('.wr-slider ul').bxSlider({
		pager: false,
		speed: 1000,
	});
	
	$('.wr-bestseller .products').bxSlider({
		pager: false,
		speed: 1000,
		minSlides: 1,
		maxSlides: 4,
		slideWidth: 270,
		slideMargin: 30,
		moveSlides: 1
	});
	
	
	
	$('.single-feature-product .products').bxSlider({
		pager: false,
		speed: 1000,
		minSlides: 1,
		maxSlides: 3,
		slideWidth: 270,
		slideMargin: 30,
		moveSlides: 1
	});
	
	$('.wr-wrapper-v2 .blog-slider').bxSlider({
		pager: false,
		speed: 1000,
		minSlides: 5,
		maxSlides: 5,
		moveSlides: 1,
		mode: 'vertical'
	});
	
	$('.wr-wrapper-v4 .blog-slider').bxSlider({
		pager: false,
		speed: 1000,
		minSlides: 4,
		maxSlides: 4,
		moveSlides: 1,
		mode: 'vertical'
	});
	
	$('.images-product .lager-slider').bxSlider({
	  pagerCustom: '#thumb-slider',
	  speed: 1000,
	});
	
	$('.thumb-slider li a').click(function(){
		var url_img = $(this).attr('href');
		$(this).parents('.images-product').find('#large-img').attr('href',url_img);
		$(this).parents('.images-product').find('#large-img img').fadeOut(300).attr('src', url_img).fadeIn(300);
		return false;
	});
});

/* ==============================================
OWL CAROUSEL
=============================================== */
jQuery(document).ready(function () {
	if($(".wr-wrapper-v4 .wr-feature-product .products-slider").length){
		$(".wr-wrapper-v4 .wr-feature-product .products-slider").owlCarousel({
			autoPlay : false,
			pagination: true,
			navigation: true,
			slideSpeed: 500,
			stopOnHover: true,
			itemsCustom : [
				[0, 1],
				[550, 2],
				[769, 3],
				[981, 4]
			]
		});
	}
	
	// shop detail slider
	if($('.thumb-slider').length){
		$('.thumb-slider ul').owlCarousel({
			autoPlay : false,
			pagination: true,
			navigation: true,
			slideSpeed: 500,
			stopOnHover: true,
			itemsCustom : [
				[0, 2],
				[550, 3],
			]
		});  
	}
	
	// latest post slider
	if($('.carousel-blog-list').length){
		$('.carousel-blog-list').owlCarousel({
			autoPlay : false,
			pagination: true,
			navigation: true,
			slideSpeed: 500,
			stopOnHover: true,
			itemsCustom : [
				[0, 1],
				[551, 2],
				[769, 3],
			]
		});  
	}
});

/* ==============================================
	FULLSCREEN SLIDER
=============================================== */
var revapi;
jQuery(document).ready(function() {
	if($('.fullscreen-slider').length){
	   revapi = jQuery('.tp-banner').revolution(
		{
			delay:9000,
			startwidth:1170,
			startheight:680,
			hideThumbs:10,
			forceFullWidth:"on",
			fullScreen:"on",
			navigationType:"none",
		});
		
		$('.back-to-bottom').click(function(){
			var height = $(this).parents('.fullscreen-slider').height();
			$('html, body').animate({
				scrollTop: height
			}, 500);
			return false;
		});
	}
});	//ready

/* ==============================================
Mobile Menu
=============================================== */
$(document).ready(function($) {
	$("#my-menu").mmenu({
		offCanvas: {
		   position  : "right",
		}
	 });
	$("#my-button").click(function() {
		$("#my-menu").trigger("open.mm");
	});
});

/* ==============================================
HEADER STICKY MENU
=============================================== */
$(document).ready(function($) {
	var nav_container = $("#wr-header");
	var nav = $(".wr-bot-header");
	
	var top_spacing = 0;
	var waypoint_offset = $("#wr-header").height();
	nav_container.waypoint({
		handler: function (event, direction) {
			if (direction == 'down') {					
				nav_container.css({
					'height': nav_container.outerHeight()
				});
				nav.stop().addClass("on-top").css("top", -nav.outerHeight()).animate({
					"top": top_spacing
				});
			} else {
				nav_container.css({
					'height': 'auto'
				});
				nav.stop().removeClass("on-top").css("top", nav.outerHeight() + waypoint_offset).animate({
					"top": ""
				});
			}
		},
		offset: function () {
			return -nav.outerHeight() - waypoint_offset;
		}
	});
});


/* ==============================================
ELEMENTS
=============================================== */
$(document).ready(function() {
	
	// Products
	$('.product-item').each(function(index, element) {
		$(this).find('.product-info').css('bottom', -($('.product-info').height()));
    });
	
	$('.list-btn').click(function(){
		$(this).parents('#content').find('ul.products').removeClass('products-grid').addClass('products-list');
	});
	
	$('.grid-btn').click(function(){
		$(this).parents('#content').find('ul.products').removeClass('products-list').addClass('products-grid');
	});
	
	// Portfolio
	$('.portfolio li').each(function(index, element) {		
		$(this).find('.post-info').css('bottom', -($('.post-info').height()));
    });
	
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});
	
	$('.sidebar-menu > ul > li').click(function(){
		$(this).parent().find('.sub-menu').not($(this).find('.sub-menu')).slideUp(300);
		$(this).find('.sub-menu').toggle(300);
		$(this).toggleClass("opend");
		$(this).parent().find('li').not($(this)).removeClass('opend');
	});
	
	if($('select').length){
		$('select').selectmenu();
	}
	
	
	$('.quantity .minus').click(function(){
		var qty = $(this).parent().find('.qty');
		qty.val(qty.val() - 1);
		if(qty.val() <= 1){
			qty.val(1);	
		}
	});
	$('.quantity .plus').click(function(){
		var qty = $(this).parent().find('.qty');
		qty_val = parseFloat(qty.val());
		qty.val(qty_val + 1);
	});
	
	$('.cart-page .remove').click(function(){
		$(this).parents('.cart-item').fadeOut(500).delay(10).queue(function(){$(this).remove();});
		return false;
	});
	
	// accordion
	$('#accordion .action').click(function(){
		$(this).parents('.panel-group').find('.panel-content').not($(this).parent().find('.panel-content')).slideUp(300);
		$(this).parent().find('.panel-content').toggle(300);
		$(this).parent().toggleClass("opend");
		$(this).parent().parent().find('li').not($(this).parent()).removeClass('opend');
		return false;
	});
	
	// toggle
	$('#toggle .action').click(function(){
		$(this).parent().find('.panel-content').toggle(300);
		$(this).parent().toggleClass("opend");
		return false;
	});
	
	// tabs
	$('.tab-control a').click(function(){
		var selector = $(this).attr('href');
		$(this).parent().find('a').not(this).removeClass('active');
		$(this).addClass('active');
		
		$(this).parents('.tab-box').find('.tabs-content').not(selector).slideUp(300);
		$(this).parents('.tab-box').find(selector).slideDown(300);
		
		return false;
	});
	
	// home tabs
	function tabs(tab_control){
		var tab_control = $(tab_control);
		
		tab_control.each(function(index, element) {
			var selector = $(this);
            var active_tab = $(this).find('.active').attr('href');
			
			$(this).parent().find('.home-tabs-content').hide();
			$(this).parent().find(active_tab).show();
			
			$(this).find('a').click(function(){
				var tab_anchor = $(this).attr('href');
				selector.find('a').removeClass('active');
				$(this).addClass('active');
				selector.parent().find('.home-tabs-content').fadeOut(300);
				$(tab_anchor).fadeIn(300);
				return false;
			});
        });
	}
	tabs('.home-tabs');
	
	// flip clock
	var clock;
	if($('.flip-clock').length){
		clock = $('.flip-clock').FlipClock(3600 * 24 * 3,{
			clockFace: 'HourlyCounter',
			countdown: true,
		});
	}
	
	// progressbar
	if($('.progress-bar').length){
		$('.progress-bar').each(function(index, element) {
            $(this).css('width', $(this).attr('aria-valuetransitiongoal')+'%')
        });		
	}
		
});

/* =========== Shop add to cart ==========*/
$(document).ready(function() {
	if($('.quantity').length){
		$('.quantity .minus').hover(function(){
			$(this).parents('.quantity').addClass('minus-hover');	
		}, function(){
			$(this).parents('.quantity').removeClass('minus-hover');
		});
		
		$('.quantity .plus').hover(function(){
			$(this).parents('.quantity').addClass('plus-hover');	
		}, function(){
			$(this).parents('.quantity').removeClass('plus-hover');
		});
	}
});

/* =========== Sale Popup ==========*/
$(document).ready(function() {
	if($('#sale-popup').length){
		$('.sale-popup-wrap').click(function(){
			$(this).parent().fadeOut(400);
		});
	}
});

/* =========== Newsletter ==========*/


/* =========== slider range jquery UI ==========*/
$(function() {
	$( "#cost-price-slider" ).slider({
		range: true,
		min: 0,
		max: 99,
		values: [ 0, 99 ],
		slide: function( event, ui ) {
		$('.min-price').text("$" + ui.values[ 0 ]);
		$('.max-price').text("$" + ui.values[ 1 ]);
		}
	});
	
	$('.min-price').text("$" + $( "#cost-price-slider" ).slider( "values", 0 ));
	$('.max-price').text("$" + $( "#cost-price-slider" ).slider( "values", 1 ));
	
	$('.min-price').appendTo('#cost-price-slider > span:first');
	$('.max-price').appendTo('#cost-price-slider > span:last');
});

/* =========== mansory layout ==========*/

$(document).ready(function(e) {
  if($('.masonry-blog').length){
	  var $container = $('.masonry-blog'),
		  $body = $('.container'),
		  colW = 40,
		  columns = null;
	  
	  $container.isotope({
		// disable window resizing
		resizable: false,
		masonry: {
		  columnWidth: colW
		}
	  });
	  
	  $(window).smartresize(function(){
		// check if columns has changed
		var currentColumns = Math.floor( ( $body.width() -10 ) / colW );
		if ( currentColumns !== columns ) {
		  // set new column count
		  columns = currentColumns;
		  // apply width to container manually, then trigger relayout
		  $container.width( columns * colW )
			.isotope('reLayout');
		}
		
	  }).smartresize(); // trigger resize to set container width
  }
});

/* =========== parallax ==========*/
$(document).ready(function () {
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: 40
    });
});
function parallax_element(){
	if($('.parallax-element').length){
		$('.parallax-element').each(function() {
            var pos = $(this).position().top - $( window ).height();
			var delay = 0;
			delay = $(this).attr('data-delay');
			if($(window).scrollTop()>=pos){
				if($(this).hasClass('intop')){
					$(this).addClass("outtop").delay(delay).queue(function(){
						$(this).removeClass("intop").stop().dequeue();
					});	
				}
				else if($(this).hasClass('inleft')){
					$(this).addClass("outleft").delay(delay).queue(function(){
						$(this).removeClass("inleft").stop().dequeue();
					});	
				}
				else if($(this).hasClass('inright')){
					$(this).addClass("outright").delay(delay).queue(function(){
						$(this).removeClass("inright").stop().dequeue();
					});	
				}
				else if($(this).hasClass('inbottom')){
					$(this).addClass("outbottom").delay(delay).queue(function(){
						$(this).removeClass("inbottom").stop().dequeue();
					});
				}
			}else{
				if($(this).hasClass('outtop')){
					$(this).removeClass('outtop').addClass('intop');
				}
				else if($(this).hasClass('outleft')){
					$(this).removeClass('outleft').addClass('inleft');
				}
				else if($(this).hasClass('outright')){
					$(this).removeClass('outright').addClass('inright');
				}
				else if($(this).hasClass('outbottom')){
					$(this).removeClass('outbottom').addClass('inbottom');
				}
			}
        });
	}	
}
jQuery(window).scroll(function(){
	parallax_element();
});
jQuery(document).ready(function() {
	parallax_element();
});
