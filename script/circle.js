(function($){
    
    var Circle = window.Circle = function(ctx, radius, canvasWidth, canvasHeight){
	this.ctx = ctx;
	this.radius = radius;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    Circle.prototype = {
        calculateVelocity: function(objects) {
            
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

            this.multiplier=1;
            

            for(var i=0;i<objects.length;i++) {
                var otherObj = objects[i];
                if(otherObj!==this) {
                    var self = this;

                    var distance = Math.sqrt(Math.pow(self.x-otherObj.x, 2) + Math.pow(self.y-otherObj.y, 2))
                    console.log("distance: " + distance)

                    console.log("position: ("+ x + "," + y + ")")
                    console.log("velocity: ("+ dx + "," + dy + ")")

                    var adjustVelocity = function() {
                        console.log("HIT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                        console.log("multiplier:" + self.multiplier)

                        dx = dx+otherObj.dx;
                        dy = dy+otherObj.dy;
                    }

                    var a = Math.pow(dx-otherObj.dx, 2) + Math.pow(dy-otherObj.dy, 2),
                    b = 2*(x-otherObj.x)*(dx-otherObj.dx) + 2*(y-otherObj.y)*(dy-otherObj.dy),
                    c = Math.pow(x-otherObj.x, 2) + Math.pow(y-otherObj.y, 2) - Math.pow(this.radius+otherObj.radius, 2);

                    var discriminant = b*b-4*a*c;
                    if(discriminant>0) {
                        var t1 = (-b + Math.sqrt(discriminant))/(2*a);
                        var t2 = (-b - Math.sqrt(discriminant))/(2*a);

                        if(t1<=1 && t1>=0 && t2<=1 && t2>=0) {
                            this.multiplier = Math.min(t1, t2)
                            adjustVelocity()
                        }
                        else if(t1<=1 && t1>=0) {
                            this.multiplier = t1;
                            adjustVelocity()
                        }
                        else if(t2<=1 && t2>=0) {
                            this.multiplier = t2;
                            adjustVelocity()
                        }
                        else console.log("points not valid")
                    }
                    else console.log("discriminant invalid")
                }
                
            }

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

