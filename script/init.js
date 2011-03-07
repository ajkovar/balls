(function($){
    $(document).ready(function(){
    
	var log = log4javascript.getDefaultLogger(),
	canvasHeight = $(window).height(),
	canvasWidth = $(window).width();

        log.setLevel(log4javascript.Level.ERROR);	
	
	$('body').append("<canvas id=\"canvas\" width='" + canvasWidth + "' height='" + canvasHeight + "'></canvas>")

	var canvas = $('#canvas'),
	ctx = canvas[0].getContext("2d"),
	circle = new Circle(ctx, 10, canvasWidth, canvasHeight),
        circle2 = new Circle(ctx, 10, canvasWidth, canvasHeight);

	circle.x=10,
	circle.y=10,
	circle.dx=Math.floor(Math.random()*11)*2,
	circle.dy=Math.floor(Math.random()*11)*2,
	circle.ax=0,
	circle.ay=.5
	
	circle2.x=100,
	circle2.y=100,
	circle2.dx=Math.floor(Math.random()*11)*2,
	circle2.dy=Math.floor(Math.random()*11)*2,
	circle2.ax=0,
	circle2.ay=.5

        var objects = [circle, circle2];

	var timer = setInterval(function(){
            log.info("------------------------")
	    
	    ctx.clearRect(0,0,canvasWidth,canvasHeight);
            for(var i=0;i<objects.length;i++) {
                var obj = objects[i];
                obj.calculateVelocity();
            }
            for(var i=0;i<objects.length;i++) {
                var obj = objects[i];
                obj.handleCollisions(objects);
            }
            for(var i=0;i<objects.length;i++) {
                var obj = objects[i];
                //TODO refactor this smell
                obj.dx=obj.newDx;
                obj.dy=obj.newDy;
                obj.calculatePosition();
	        obj.draw();
            }
	    
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

        // q
	keypressHandler.up(81, function(){
            clearTimeout(timer)
	})

        var gravityEnabled=true;
        // g
	keypressHandler.up(71, function(){
            $.each(objects, function(i, o) {
                o.ay+= gravityEnabled ? -.5 : .5;
            })
            gravityEnabled=!gravityEnabled;
	})
	
    })
    
}(jQuery));

