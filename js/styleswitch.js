function it_option_reset_CLICK(){
    return false;
}

jQuery(document).ready(function($) {     
    it_style_switch_INIT();
    jQuery('.choose-color a.purple').addClass('active');
	jQuery('input:radio[name="it-select-layout-choice"][value="full"]').prop('checked', true);
});

function it_style_switch_INIT(){   
    
    // Color Change
	
	jQuery("a.red" ).click(function(){
        jQuery("#colors" ).attr("href", "css/colors/red.css");
        return false;
    });
	
	jQuery("a.green" ).click(function(){
        jQuery("#colors" ).attr("href", "css/colors/green.css");
        return false;
    });
	
    jQuery("a.brown" ).click(function(){
        jQuery("#colors" ).attr("href", "css/colors/brown.css");
        return false;
    });
	
	jQuery("a.yellow" ).click(function(){
        jQuery("#colors" ).attr("href", "css/colors/yellow.css");
        return false;
    });
	
	jQuery("a.blue" ).click(function(){
        jQuery("#colors" ).attr("href", "css/colors/blue.css");
        return false;
    });	
	
		
    jQuery('.choose-color a').click(function(e){
        e.preventDefault();
        jQuery(this).parent().parent().find('a').removeClass('active');
        jQuery(this).addClass('active');
    });
	
	jQuery("#it-select-boxed-layout" ).click(function(){
        jQuery("body" ).addClass('boxed');
    });
	
	jQuery("#it-select-full-layout" ).click(function(){
        jQuery("body" ).removeClass('boxed');
    });
		
		
    
jQuery(window).load(function($) {	
    // Switcher Layout
    jQuery('#theme-option').animate({
        left: '-200px'
    });
		
    jQuery('.open-close-button').click(function(e){
        e.preventDefault();
        var div = jQuery('#theme-option');
        if (div.css('left') === '-200px') {
            jQuery('#theme-option').animate({
                left: '0px'
            }); 
        } else {
            jQuery('#theme-option').animate({
                left: '-200px'
            });
        }
    });
});
		
		
    // Reset
    jQuery('a.reset').click(function(e){
        jQuery('.color.red').trigger('click');
		 jQuery('#it-select-full-layout').trigger('click');
        jQuery('.theme-opt-wrapper select[name=layout]').val('full');
    });				    
}