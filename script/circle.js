(function($){
		
	var Circle = window.Circle = function(ctx, radius){
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
	
	var Rectangle = window.Rectangle = function(ctx, width, height){
		this.ctx = ctx
		this.width = width
		this.height = height
	}
	
	Rectangle.prototype = {
		draw: function(x,y) {
		  this.ctx.beginPath();
		  this.ctx.rect(x,y,this.width,this.height);
		  this.ctx.closePath();
		  this.ctx.fill();
		}
	}
	
}(jQuery));

