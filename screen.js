jQuery.extend({
	screenOpen: function() {
		jQuery('<div></div>').attr({id: '__screen'}).css({
			 width: '100%'
			,height: $(document).height() + 'px'
			,position: 'absolute'
			,top: 0
			,left: 0
			,zIndex: 199
			,opacity: 0.8
			,background: '#000'
		}).appendTo(document.body).click(function(e) {
			e.preventDefault();
			$.closeWindow();
		});
		
		if($.browser.msie && $.browser.version < 7){
			jQuery("select").css({visibility:"hidden"});
		}
		
		document.onkeydown = function(e){
			if (e == null) { // ie
				keycode = event.keyCode;
			} else { // mozilla
				keycode = e.which;
			}
			if(keycode == 27){
				jQuery.closeWindow();
			} 
		};
	},
	
	screenClose: function() {
		if($.browser.msie && $.browser.version < 7){
			jQuery("select").css({visibility:"visible"});
		}
		jQuery('#__screen').remove();
		clearInterval(screen_time_out);
	},
	
	screenResize: function(obj){
		obj.show();
		var width = obj.width();
		var height = obj.height();
		obj.hide();
		
		var top = (((jQuery(window).height()/2 - height/2)) + jQuery(window).scrollTop());
		top = 30 + jQuery(window).scrollTop();
		
		$("#TB_window").css({
			top: top,
			left: (jQuery(window).width()/2 - width/2),
			width: width + 'px',
			height: height + 'px'
		});
		obj.fadeIn(800);
	},
	
	openWindow: function(width, height, title, content){
		jQuery.screenOpen();
		jQuery('<div></div>').attr({id: 'TB_window'}).css({
			position: 'absolute'
			,top: (((jQuery(window).height()/2 - height/2)) + jQuery(window).scrollTop()) + "px"
			,left: (jQuery(window).width()/2 - width/2) + "px"
			,width: width + 'px'
			,height: height + 'px'
			,zIndex: 99999
		}).appendTo(document.body).html(content);
	},
	
	closeWindow: function(){
		jQuery('#TB_window').remove();
		jQuery.screenClose();
	}
});
var screen_time_out;
jQuery.fn.scrollTop = function() {
	if ( this[0] == window || this[0] == document ){
		return self.pageYOffset ||
			jQuery.boxModel && document.documentElement.scrollTop ||
			document.body.scrollTop;
	}
	return this[0].scrollTop;
};
