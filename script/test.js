(function($){
	$(document).ready(function(){
		
		var canvasHeight = $(window).height() - $("#header").outerHeight() -30,
			canvasWidth = $(window).width();
		
		$('body').append("<canvas id=\"canvas\" width='" + canvasWidth + "' height='" + canvasHeight + "'></canvas>")
		
		console.log(canvasHeight)
		console.log(canvasWidth)
		
		var canvas = $('#canvas'),
			ctx = canvas[0].getContext("2d"),
			x=10,
			y=10,
			dx=Math.floor(Math.random()*11)*2,
			dy=Math.floor(Math.random()*11)*2,
			ax=0,
			ay=.5
		
		var circle = new Circle(ctx, 10)
		
		var rect = new Rectangle(ctx, 20, 50)
		
		setInterval(function(){
			
			ctx.clearRect(0,0,canvasWidth,canvasHeight);
			
			x+=dx;
			y+=dy;
			
			if(x<10)
				x=10;
			else if(x>canvasWidth-10)
				x=canvasWidth-10
			
			if(y<10)
				y=10
			else if(y>canvasHeight-10)
				y=canvasHeight-10
			
			circle.draw(x, y)
			
			if(x<=10 || x>=canvasWidth-10){
				dx = -dx/2;
			}

			if(y<=10 || y>=canvasHeight-10){
				dy = -dy/2;
			}
			
			dx=dx/1.02
			
			if(Math.abs(dx)<.2)
				dx=0
			
			//dy=dy/1.02
			dx+=ax
			dy+=ay
			
			// var rectX = 150,
			// 	rectY = 150,
			// 	rectWidth = 20,
			// 	rectHeight = 50;
			
			// if(x>rectX-rectWidth/2 && x<rectX+rectWidth/2
			// 	&& y>rectY-rectHeight/2 && y<rectY+rectHeight/2) {
			// 	dx+=-dx/2
			// 	dy+=-dy/2
			// }
			
			// rect.draw(rectX, rectY)
			
		}, 25)
		
		
		var keypressHandler = new KeypressHandler(document)
		
		//left
		keypressHandler.press(37, function(){
			ax-=1
		})
		keypressHandler.up(37, function(){
			ax+=1
		})
		
		//up
		keypressHandler.press(38, function(){
			ay-=1
		})
		keypressHandler.up(38, function(){
			ay+=1
		})
		
		//right
		keypressHandler.press(39, function(){
			ax+=1
		})
		keypressHandler.up(39, function(){
			ax-=1
		})
		
		//down
		keypressHandler.press(40, function(){
			ay+=1
		})
		keypressHandler.up(40, function(){
			ay-=1
		})
	
	})
	
}(jQuery));

