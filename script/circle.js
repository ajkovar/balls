(function($){
    
    var Circle = window.Circle = function(ctx, radius, canvasWidth, canvasHeight){
	this.ctx = ctx;
	this.radius = radius;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    Circle.prototype = {
        calculateVelocity: function() {
            
            var x = this.x,
            y = this.y,
            dx = this.dx,
            dy = this.dy;

	    if(x<=10 || x>=this.canvasWidth-10){
		dx = -dx/2;
	    }

	    if(y<=10 || y>=this.canvasHeight-10){
		dy = -dy/2;
	    }
	    
	    dx=dx/1.02
	    
	    if(Math.abs(dx)<.2)
		dx=0
	    
	    dx+=this.ax
	    dy+=this.ay

            this.dx = dx;
            this.dy = dy;
        },
        calculatePosition: function() {
            var x = this.x;
            var y = this.y
            
	    x+=this.dx;
	    y+=this.dy;
	    
	    if(x<10)
		x=10;
	    else if(x>this.canvasWidth-10)
		x=this.canvasWidth-10
	    
	    if(y<10)
		y=10
	    else if(y>this.canvasHeight-10)
		y=this.canvasHeight-10

            this.x=x;
            this.y=y;
        },
	draw: function(x,y) {
	    var ctx = this.ctx;
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
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

