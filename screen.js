jQuery.extend({
	screenOpen: function() {
		jQuery('<div></div>').attr({id: '__screen'}).css({
			background: '#000'
			,width: jQuery(document).width() + 'px'
			,height: jQuery(document).height() + 'px'
			,position: 'absolute'
			,top: 0
			,left: 0
			,zIndex: 199
			,opacity: 0.5
		}).appendTo(document.body).click(function(e) {
			e.preventDefault();
			jQuery.closeWindow();
		});
		
		if(jQuery.browser.msie && jQuery.browser.version < 7){
			jQuery("select").css({visibility:"hidden"});
		}
		
		// press esc to close
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
		if(jQuery.browser.msie && jQuery.browser.version < 7){
			jQuery("select").css({visibility:"visible"});
		}
		jQuery('#__screen').remove();
	},
	
	openWindow: function(width, height, title, content){
		jQuery.screenOpen();
		jQuery('<div></div>').attr({id: 'TB_window'}).css({
			position: 'absolute'
			,top: (((jQuery(window).height()/2 - height/2)) + jQuery(window).scrollTop())
			,left: (jQuery(window).width()/2 - width/2)
			,width: width + 5 + 'px'
			,height: height + 30 + 'px'
			,zIndex: 200
		}).appendTo(document.body);
		
		jQuery('<div id="TB_title"><div id="TB_ajaxWindowTitle">'+title+'</div><div id="TB_closeAjaxWindow"><a href="#" id="TB_closeWindowButton">close</a> or Esc Key</div></div>').appendTo('#TB_window');
		jQuery('#TB_closeWindowButton').click(function(){jQuery.closeWindow();return false;});
		
		jQuery('<div></div>').attr({id: 'TB_ajaxContent'}).css({
			width: width + 'px'
			,height: height + 'px'
		}).html(content).appendTo('#TB_window');
	},
	
	closeWindow: function(){
		jQuery('#TB_window').remove();
		jQuery.screenClose();
	}
});
jQuery.fn.scrollTop = function() {
	if ( this[0] == window || this[0] == document ){
		return self.pageYOffset || jQuery.boxModel && document.documentElement.scrollTop || document.body.scrollTop;
	}
	return this[0].scrollTop;
};