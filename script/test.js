(function($){
    $(document).ready(function(){
	
	var canvasHeight = $(window).height() - $("#header").outerHeight() -30,
	canvasWidth = $(window).width();
	
	$('body').append("<canvas id=\"canvas\" width='" + canvasWidth + "' height='" + canvasHeight + "'></canvas>")
	
	console.log(canvasHeight)
	console.log(canvasWidth)
	


	var canvas = $('#canvas'),
	ctx = canvas[0].getContext("2d"),

	circle = new Circle(ctx, 10, canvasWidth, canvasHeight)

	circle.x=10,
	circle.y=10,
	circle.dx=Math.floor(Math.random()*11)*2,
	circle.dy=Math.floor(Math.random()*11)*2,
	circle.ax=0,
	circle.ay=.5
	
	
	setInterval(function(){
	    
	    ctx.clearRect(0,0,canvasWidth,canvasHeight);
	    
            circle.calculateVelocity();
            circle.calculatePosition();
	    circle.draw();
	    
	    
	}, 25)
	
	
	var keypressHandler = new KeypressHandler(document)
	
	//left
	keypressHandler.press(37, function(){
	    circle.ax-=1
	})
	keypressHandler.up(37, function(){
	    circle.ax+=1
	})
	
	//up
	keypressHandler.press(38, function(){
	    circle.ay-=1
	})
	keypressHandler.up(38, function(){
	    circle.ay+=1
	})
	
	//right
	keypressHandler.press(39, function(){
	    circle.ax+=1
	})
	keypressHandler.up(39, function(){
	    circle.ax-=1
	})
	
	//down
	keypressHandler.press(40, function(){
	    circle.ay+=1
	})
	keypressHandler.up(40, function(){
	    circle.ay-=1
	})
	
    })
    
}(jQuery));

