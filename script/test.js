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
			dy=Math.floor(Math.random()*11)*2
		
		var circle = new Circle(ctx, 10)
		
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
			dy+=1
			
			//circle.draw(300-x, 300-y)
			
		}, 25)
		
		var handleKeypress = function(event) {
  			console.log("Keypress:")
  			/*if (event.keyCode == '13') {
				event.preventDefault();
			}*/
			
			switch(event.keyCode) {
				case 37: 
					dx=dx-2
					console.log("left");
					event.preventDefault();
					break;
				case 38:
					dy=dy-2
					console.log("up");
					event.preventDefault();
					break;
				case 39:
					dx=dx+2
					console.log("right");
					event.preventDefault();
					break;
				case 40:
					dy=dy+2
					console.log("down");
					event.preventDefault();
					break;
			}
			
		};
		
		//TODO have sniff browser and only perform one of these actions.. or find cross browser method
		
		//for chrome
		$(document).keydown(handleKeypress);
		//for ff
		$(document).keypress(handleKeypress);
	
	})
	
	var Circle = function(ctx, radius){
		this.ctx = ctx
		this.radius = radius
	
	}

	Circle.prototype = {
		draw: function(x,y) {
		  var ctx = this.ctx;
		  ctx.beginPath();
		  ctx.arc(x, y, this.radius, 0, Math.PI*2, true);
		  ctx.closePath();
		  ctx.fill();
		}
	}
	
}(jQuery));

