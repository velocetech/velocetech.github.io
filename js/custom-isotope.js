jQuery(document).ready(function() {	
	"use strict";
	// Isotope
	var $container = jQuery('.grid');
	
	var colWidth = function () {
		var w = $container.width(), 
			columnNum = 1,
			columnWidth = 0;
		if (w > 1440) {
			columnNum  = 5;
		} else if (w > 1365) {
			columnNum  = 5;
		} else if (w > 1279) {
			columnNum  = 5;
		} else if (w > 1023) {
			columnNum  = 5;
		} else if (w > 767) {
			columnNum  = 3;
		} else if (w > 479) {
			columnNum  = 2;
		}
		
		columnWidth = Math.floor(w/columnNum);
		$container.find('.grid-item').each(function() {
			var $item = jQuery(this);
			
			if ($item.hasClass('item-wide')) {
				if (w < 480) {
					jQuery('.item-wide').css({
						'width'		 : ((columnWidth)-0) + 'px',
						'height' : Math.round(((columnWidth)-0) * 0.7777777) + 'px'
					});
					jQuery('.item-wide img').css({
						'width'		 : ((columnWidth)-0) + 'px',
						'height' : 'auto'
					});	
				}
				else {
					jQuery('.item-wide').css({
						'width'		 : ((columnWidth*2)-0) + 'px',
						'height' : Math.round(((columnWidth*2)-0) * 0.7777777) + 'px'
					});
					jQuery('.item-wide img').css({
						'width'		 : ((columnWidth*2)-0) + 'px',
						'height' : 'auto'
					});				
				}
			}	
			
			if ($item.hasClass('item-small')) {
				jQuery('.item-small').css({
					'width'		 : ((columnWidth)-0) + 'px',
					'height' : Math.round(((columnWidth)-0) * 0.7777777) + 'px'
				});
				jQuery('.item-small img').css({
					'width'		 : ((columnWidth)-0) + 'px',
					'height' : 'auto'
				});						
			}
				
			if ($item.hasClass('item-long')) {
				if (w < 480) {
					jQuery('.item-long').css({
						'width'		 : ((columnWidth)-0) + 'px',
						'height' : Math.round(((columnWidth)-0) * 0.7777777/2) + 'px'
					});
					jQuery('.item-long img').css({
						'width'		 : ((columnWidth)-0) + 'px',
						'height' : 'auto'
					});		
				}
				else {
					jQuery('.item-long').css({
						'width'		 : ((columnWidth*2)-0) + 'px',
						'height' : Math.round(((columnWidth)-0) * 0.7777777) + 'px'
					});
					jQuery('.item-long img').css({
						'width'		 : ((columnWidth*2)-0) + 'px',
						'height' : 'auto'
					});					
				}
			}
			
			if ($item.hasClass('item-high')) {
				jQuery('.item-high').css({
					'width'		 : ((columnWidth)-0) + 'px',
					'height' : Math.round(((columnWidth*2)-0) * 0.7777777) + 'px'
				});
				jQuery('.item-high img').css({
					'width'		 : ((columnWidth)-0) + 'px',
					'height' : 'auto'
				});				
			}				

		});
		return columnWidth;
	}
	
	// Isotope Call
	var gridIsotope = function () {
		$container.isotope({
			layoutMode : 'masonry',
			itemSelector: '.grid-item',
			animationEngine: 'jquery',	
			resizable: false,
			masonry: { columnWidth: colWidth(), gutterWidth: 0 }
		});
	};
	gridIsotope();
	jQuery(window).smartresize(gridIsotope);	
	

	// Portfolio Filtering
	var $optionSets = jQuery('#options .option-set'),
		$optionLinks = $optionSets.find('a');

	$optionLinks.click(function(){
		var $this = jQuery(this);
		// don't proceed if already selected
		if ( $this.hasClass('selected') ) {
			return false;
		}
		var $optionSet = $this.parents('.option-set');
		$optionSet.find('.selected').removeClass('selected');
		$this.addClass('selected');
  
		// make option object dynamically, i.e. { filter: '.my-filter-class' }
		var options = {},
			key = $optionSet.attr('data-option-key'),
			value = $this.attr('data-option-value');
		// parse 'false' as false boolean
		value = value === 'false' ? false : value;
		options[ key ] = value;
		if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
		  // changes in layout modes need extra logic
		  changeLayoutMode( $this, options )
		} else {
		  // otherwise, apply new options
		  $container.isotope( options );
		}
		
		return false;
	});				
	

	// modified Isotope methods for gutters in masonry
	$.Isotope.prototype._getMasonryGutterColumns = function() {
		var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
			var containerWidth = this.element.width();
  
		this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
			// or use the size of the first item
			this.$filteredAtoms.outerWidth(true) ||
			// if there's no items, use size of container
			containerWidth;

		this.masonry.columnWidth += gutter;

		this.masonry.cols = Math.floor( ( containerWidth + gutter ) / this.masonry.columnWidth );
		this.masonry.cols = Math.max( this.masonry.cols, 1 );
	};

	jQuery.Isotope.prototype._masonryReset = function() {
		// layout-specific props
		this.masonry = {};
		// FIXME shouldn't have to call this again
		this._getMasonryGutterColumns();
		var i = this.masonry.cols;
		this.masonry.colYs = [];
		while (i--) {
			this.masonry.colYs.push( 0 );
		}
	};	
  
	jQuery.Isotope.prototype._masonryResizeChanged = function() {
		var prevSegments = this.masonry.cols;
		// update cols/rows
		this._getMasonryGutterColumns();
		// return if updated cols/rows is not equal to previous
		return ( this.masonry.cols !== prevSegments );
	};  

	
	var blogisotope = function () {
		var gutterwidth,
			conwidth = jQuery('.blog-masonry').width(),
			blogmasonry = jQuery('.blog-masonry'),
			columnwidth = Math.floor(conwidth);
		
		if (blogmasonry.hasClass('on-two-columns') === true) {
			
			columnwidth = Math.floor(conwidth*0.48);
			gutterwidth = Math.floor(conwidth*0.04);
			
			if (jQuery(window).width() < 768) {
			columnwidth = Math.floor(conwidth*1);
			}
			else {
				columnwidth = Math.floor(conwidth*0.48);
			}		
			
		} else
		
		if (blogmasonry.hasClass('on-three-columns') === true) {
			columnwidth = Math.floor(conwidth*0.319);
			gutterwidth = Math.floor(conwidth*0.02);

					if (jQuery(window).width() < 1023) {
						if (jQuery(window).width() < 768) {
						columnwidth = Math.floor(conwidth*1);
						}
						else {
							columnwidth = Math.floor(conwidth*0.48);
						}
					}
					else {
						columnwidth = Math.floor(conwidth*0.319);
					}
		}	
		
		blogmasonry.find('.post-masonry').each(function() {
			jQuery(this).css({'width' : columnwidth});
		});		

		gallery_slider();			
		
		return gutterwidth;
	}	
	
	var $blog_container = jQuery('.blog-masonry');	
	
		// Blog Isotope Call
		var bloggingisotope = function() {
			$blog_container.imagesLoaded( function(){
			  $blog_container.isotope({
					itemSelector: '.post-masonry',
					animationEngine: 'jquery',
					masonry: {
						gutterWidth: blogisotope()
					}				
			  });
			});
		};
		bloggingisotope();
		jQuery(window).smartresize(bloggingisotope);	

});