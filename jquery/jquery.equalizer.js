/*
 * jquery.equalizer plugin v1.0
 * made by Abdo Belk
 * for bugs reports or informations
 * contact : abdo.belk@gmail.com
 * this plugin is MIT licensed
 * plugin originally published on www.bestofjqueryplugins.com
 */

// ________________________________________________________________ settings _______________________________________________________
    
   
    var color_degrading_mode = "double";     // can be "single" or "double"
    
    
    
    
    //  __________ if color_mode is "single", these params are used ____________________
    
    var base_color_red = 80;
    var base_color_green = 234;
    var base_color_blue = 255;
   
    var color_degrading_degree = -7;   // must be an integer
    
    // ________________________________________________________________________________
    
    
    //  __________ if color_mode is "double", these params are used ____________________
    
    var first_color_red = 255;
    var first_color_green = 0;
    var first_color_blue = 0;
   
    var second_color_red = 171;//39; //171
    var second_color_green = 248;//142; //248
    var second_color_blue = 179;//39; //179
 
    // ________________________________________________________________________________
    
    

    var n_bars = 1;
    var n_components_per_bar = 8;
    
    var bar_margin = 9;
    
    var bar_component_margin = 1; 
    
    var frequency = 2;  // the frequency of the equalizer, don't set a value above 20 or you'll consume a high CPU
    var refresh_time = 80;  // the refresh time for the equalizer
    
    var music = true;  // enable / disable music
    
    // ____________________________________________________________________________________________________________________________________
    
        

function equ(id, aux) {
	
	var equalizer = $("#"+id);
	
	// ______________________ do not change this values, change the setting above instead _____________________
	
	var width = equalizer.width();
    var height = equalizer.height();
    var bar_width = (width / n_bars) - bar_margin*2;
    var bar_component_height = (height / n_components_per_bar) - bar_component_margin*2;
    
    var red_degrading_degree = 0;
    var blue_degrading_degree = 0;
    var green_degrading_degree = 0;
    
	// ________________________________________________________________________________________________________
	
	for(var i=0;i<n_bars;i++)
	{
	    equalizer.append("<div class='equalizer_bar' id='equ"+aux+"'></div>");
	    
	}
	var i = 0;
	
	$("#equ"+aux).each(function(index) {
	    
	  for( var j=0;j<n_components_per_bar;j++)
	  {
		  $(this).append("<div class='equalizer_bar_component' id='bar_"+aux+"_component_"+j+"'></div>");
	  }
	  
	  $(".equalizer_bar_component",this).reverseOrder();
	  
	  i++;
	});
	
	
	
	if(color_degrading_mode == "double")
	{
	   red_degrading_degree = (second_color_red - first_color_red)/n_components_per_bar;
	   green_degrading_degree = (second_color_green - first_color_green)/n_components_per_bar;
	   blue_degrading_degree = (second_color_blue - first_color_blue)/n_components_per_bar;
	}
	
	
	
	function apply_colors()
    {
        var i = 0;
        $(".equalizer_bar").each(function(index) {
           for( var j=0;j<n_components_per_bar;j++)
           {   
               if(color_degrading_mode == "single")         
               $("#bar_"+aux+"_component_"+j).css("backgroundColor","rgb("+(base_color_red + color_degrading_degree*(n_components_per_bar - j))+","+(base_color_green + color_degrading_degree*(n_components_per_bar - j))+","+(base_color_blue + color_degrading_degree*(n_components_per_bar - j))+")");
               else
               {
                   $("#bar_"+aux+"_component_"+j).css("backgroundColor",
                   "rgb("+Math.floor(first_color_red + red_degrading_degree*(n_components_per_bar - j))+","
                   +Math.floor(first_color_green + green_degrading_degree*(n_components_per_bar - j))+","
                   +Math.floor(first_color_blue + blue_degrading_degree*(n_components_per_bar - j))+")");
               }
           }
		   i++;
		});
    }
	
	apply_colors();
	
	$(".equalizer_bar").css("width",bar_width+"px");
	$(".equalizer_bar").css("margin","0px " + bar_margin +"px");
	
	$(".equalizer_bar_component").css("height",bar_component_height+"px");
	$(".equalizer_bar_component").css("margin",bar_component_margin+"px 0px");
	
	
	function activate_equalizer()
	{
	    if(music == true && $("#"+id+" audio").get(0).paused == false)
	    {
	        var i = Math.floor((Math.random()*n_bars)); 
	        var j = Math.floor((Math.random()*n_components_per_bar)+1); 
	    
	        for(var k=j;k<n_components_per_bar;k++)
	        $("#bar_"+aux+"_component_"+k).css("backgroundColor","transparent");
	    }
	    else
	    {
	        if(music == false)
	        {
	            var i = Math.floor((Math.random()*n_bars)); 
                var j = Math.floor((Math.random()*n_components_per_bar)+1); 
        
                for(var k=j;k<n_components_per_bar;k++)
                $("#bar_"+aux+"_component_"+k).css("backgroundColor","transparent");
	        }
	    }
	}
	
	
	for(var i=0;i<frequency;i++)
	setInterval(activate_equalizer,refresh_time);
	
	
	setInterval(apply_colors,refresh_time*(frequency+1));
	
};

