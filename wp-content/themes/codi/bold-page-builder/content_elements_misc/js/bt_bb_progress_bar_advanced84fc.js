
(function( $ ) {

	$( document ).scroll(function() {

		bt_bb_animate_elements_adv_progressbar();

	});


	$( document ).ready(function () {

		bt_bb_animate_elements_adv_progressbar();

	});


	function bt_bb_animate_elements_adv_progressbar( ) {
	
		var $elems = $( '.bt_bb_progress_bar_advanced.animate-adv_progressbar:not(.animated-adv_progressbar)' );
		$elems.each(function() {
			var $elm = $( this );
			if ( $elm.isOnScreen_adv_progressbar() ) {
				$elm.addClass( 'animated-adv_progressbar' );
				bt_bb_animate_progress_advanced( $elm );
			}
		});
	}


	$.fn.isOnScreen_adv_progressbar = function(){

		var element = this.get(0);

		var bounds = element.getBoundingClientRect();

		return bounds.top + 75 < window.innerHeight && bounds.bottom > 0;

	}

	function bt_bb_animate_progress_advanced( elm ) {

		var container = elm.data( 'container' );
		var pbid = elm.data( 'container-pbid' );
		var container_type = elm.data( 'container-type' );
		var container_percentage = elm.data( 'container-percentage' );
		var container_text_color = elm.data( 'container-text-color' ); 
		var container_stroke_width = elm.data( 'container-stroke-width' );
		var container_trail_color = elm.data( 'container-trail-color' ); 
		var container_trail_width = elm.data( 'container-trail-width' ); 
		var container_easing = elm.data( 'container-easing' ); 
		var container_color_from = elm.data( 'container-color-from' ); 
		var container_depth_from = elm.data( 'container-depth-from' ); 
		var container_color_to = elm.data( 'container-color-to' ); 
		var container_depth_to = elm.data( 'container-depth-to' ); 
		var container_fill = elm.data( 'container-fill' ); 
		var container_text = elm.data( 'container-text' );
		var container_duration = elm.data( 'container-duration' );

		var container_gradient_color_from = elm.data( 'container-gradient-color-from' ); 
		var container_gradient_color_to = elm.data( 'container-gradient-color-to' ); 

		
		if ( container_type == 'circle') {

			bt_bb_progressbar_circle_init( 
				container,
				container_percentage, 
				container_text_color, 
				container_stroke_width, 
				container_trail_color, 
				container_trail_width, 
				container_easing, 
				container_color_from, 
				container_depth_from, 
				container_color_to, 
				container_depth_to, 
				container_fill, 
				container_text, 
				container_duration,
				pbid,
				container_gradient_color_from, 
				container_gradient_color_to
				);

		} else {

			bt_bb_progressbar_semicircle_init( 
				container,
				container_percentage, 
				container_text_color, 
				container_stroke_width, 
				container_trail_color, 
				container_trail_width, 
				container_easing, 
				container_color_from, 
				container_depth_from, 
				container_color_to, 
				container_depth_to, 
				container_fill, 
				container_text, 
				container_duration,
				pbid,
				container_gradient_color_from, 
				container_gradient_color_to
				);
			}

		//elm.addClass( 'animated' );

		return false;

	}

})( jQuery );



function bt_bb_progressbar_circle_init( container, container_percentage, container_text_color, container_stroke_width, 
	container_trail_color, container_trail_width, container_easing, container_color_from, container_depth_from, container_color_to, container_depth_to, container_fill, container_text, container_duration, pbid,
	container_gradient_color_from, container_gradient_color_to) {

	
	if ( pbid > 0 )	{
		container = "#container_" + pbid;
	}

        
	var circle = new ProgressBar.Circle(container, {
	  color: container_text_color,
	  strokeWidth: container_stroke_width,
	  trailColor: container_trail_color,
	  trailWidth: container_trail_width,
	  easing: container_easing,
	  duration: container_duration,
	  text: {
		value: '', 
		autoStyleContainer: false,
		style: {
			color: container_text_color,
			transform: {

				prefix: true,

			}
		},

		autoStyleContainer: false

	  },

	  from: { color: container_color_from, width: container_depth_from },
	  to: { color: container_color_to, width: container_depth_to },
	  fill: container_fill,
	  step: function(state, circle) {
		    
			circle.path.setAttribute('stroke', state.color);
			circle.path.setAttribute('stroke-width', state.width);			
			console.log(circle.path.style);
			// add id to path and stroke to path style
			if ( container_gradient_color_from != '' && container_gradient_color_to != '' && container_gradient_color_from != '#eee' && container_gradient_color_to != '#eee' ) 
			{			
				circle.path.setAttribute('id', "path_" + pbid);
				var path_style = circle.path.getAttribute('style');
				path_style += 'stroke: url(#linearGradient' + pbid + ');';
				circle.path.setAttribute('style', '');
				circle.path.setAttribute('style', path_style);				
			}
			// /add id to path and stroke to path style
			
			var value = Math.round(circle.value() * 100);
		}

		
	});
	
	// add gradient defs
	if ( container_gradient_color_from != '' && container_gradient_color_to != '' && container_gradient_color_from != '#eee' && container_gradient_color_to != '#eee' ) {

		var container_gradient_color_from_array = bt_bb_progressbar_rgb_to_array(container_gradient_color_from);		
		var container_gradient_color_from = bt_bb_progressbar_rgbToHex( parseInt(container_gradient_color_from_array[0]), parseInt(container_gradient_color_from_array[1]), parseInt(container_gradient_color_from_array[2]));		

		var container_gradient_color_to_array = bt_bb_progressbar_rgb_to_array(container_gradient_color_to);		
		var container_gradient_color_to = bt_bb_progressbar_rgbToHex( parseInt(container_gradient_color_to_array[0]), parseInt(container_gradient_color_to_array[1]), parseInt(container_gradient_color_to_array[2]));
		
		var defs = '<defs><linearGradient id="linearGradient' + pbid + '" gradientUnits="userSpaceOnUse"><stop stop-color="' + container_gradient_color_from + '"></stop><stop offset="1" stop-color="' + container_gradient_color_to + '"></stop></linearGradient></defs>';
		const _svgPath = document.querySelector("#path_" + pbid);	
		_svgPath.insertAdjacentHTML('afterend', defs);	
	}
	// add gradient defs

	circle.animate(container_percentage);
}



function bt_bb_progressbar_semicircle_init( container,container_percentage, container_text_color, container_stroke_width, 
	container_trail_color, container_trail_width, container_easing, container_color_from, container_depth_from, container_color_to, container_depth_to, container_fill, container_text, container_duration, pbid,
	container_gradient_color_from, container_gradient_color_to) {


	if ( pbid > 0 )	{
		container = "#container_" + pbid;
	}

	

	var semicircle = new ProgressBar.SemiCircle(container, {
	  strokeWidth: container_stroke_width,
	  easing: container_easing,
	  duration: container_duration,
	  color: container_text_color,
	  trailColor: container_trail_color,
	  trailWidth: container_trail_width,
	  svgStyle: null,
	  text: {
		value: '', 
		autoStyleContainer: false,
		style: {
			color: container_text_color,
			transform: {
				prefix: true,
			}
		},

		alignToBottom: false

	  },

	  fill: container_fill,
	  from: { color: container_color_from, width: container_depth_from },
	  to: { color: container_color_to, width: container_depth_to },

	  step: function(state, semicircle) {

		semicircle.path.setAttribute('stroke', state.color);
		semicircle.path.setAttribute('stroke-width', state.width);

		// add id to path and stroke to path style
		if ( container_gradient_color_from != '' && container_gradient_color_to != '' && container_gradient_color_from != '#eee' && container_gradient_color_to != '#eee' ) 
		{			
			circle.path.setAttribute('id', "path_" + pbid);
			var path_style = circle.path.getAttribute('style');
			path_style += 'stroke: url(#linearGradient' + pbid + ');';
			circle.path.setAttribute('style', '');
			circle.path.setAttribute('style', path_style);				
		}
		// /add id to path and stroke to path style

		var value = Math.round(semicircle.value() * 100);
	  }

	});

	// add gradient defs
	if ( container_gradient_color_from != '' && container_gradient_color_to != '' && container_gradient_color_from != '#eee' && container_gradient_color_to != '#eee' ) {

		var container_gradient_color_from_array = bt_bb_progressbar_rgb_to_array(container_gradient_color_from);		
		var container_gradient_color_from = bt_bb_progressbar_rgbToHex( parseInt(container_gradient_color_from_array[0]), parseInt(container_gradient_color_from_array[1]), parseInt(container_gradient_color_from_array[2]));		

		var container_gradient_color_to_array = bt_bb_progressbar_rgb_to_array(container_gradient_color_to);		
		var container_gradient_color_to = bt_bb_progressbar_rgbToHex( parseInt(container_gradient_color_to_array[0]), parseInt(container_gradient_color_to_array[1]), parseInt(container_gradient_color_to_array[2]));
		
		var defs = '<defs><linearGradient id="linearGradient' + pbid + '" gradientUnits="userSpaceOnUse"><stop stop-color="' + container_gradient_color_from + '"></stop><stop offset="1" stop-color="' + container_gradient_color_to + '"></stop></linearGradient></defs>';
		const _svgPath = document.querySelector("#path_" + pbid);	
		_svgPath.insertAdjacentHTML('afterend', defs);	
	}
	// add gradient defs

	semicircle.animate(container_percentage);    

}

/* rgb to hex color */
function bt_bb_progressbar_rgb_to_array(color){
	colorsOnly = color.substring(
         color.indexOf('(') + 1,
		 color.lastIndexOf(')')
    ).split(/,\s*/);   
    return colorsOnly;
}

const bt_bb_progressbar_componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const bt_bb_progressbar_rgbToHex = (r, g, b) => {
  return "#" + bt_bb_progressbar_componentToHex(r).toUpperCase() + bt_bb_progressbar_componentToHex(g).toUpperCase() + bt_bb_progressbar_componentToHex(b).toUpperCase();
}