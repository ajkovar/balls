(function($){
    
    var log = log4javascript.getDefaultLogger();

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
            dy = this.dy,
            radius = this.radius;

	    dx+=this.ax

	    if(x<=radius || x>=this.canvasWidth-radius){
		dx = -dx/2;
	    }

	    if(y<=radius || y>=this.canvasHeight-radius){
		dy = -dy/2;
	    }
            else dy+=this.ay

	    
	    dx=dx/1.02
	    
	    if(Math.abs(dx)<.2)
		dx=0

            this.dx = dx;
            this.dy = dy;
        },
        handleCollisions: function(objects) {
            var x = this.x,
            y = this.y,
            dx = this.dx,
            dy = this.dy;

            this.multiplier=1;

            for(var i=0;i<objects.length;i++) {
                var otherObj = objects[i];
                if(otherObj!==this) {
                    var self = this;

                    var distance = Math.sqrt(Math.pow(self.x-otherObj.x, 2) + Math.pow(self.y-otherObj.y, 2))
                    log.info("distance: " + distance)

                    log.info("position: ("+ x + "," + y + ")")
                    log.info("velocity: ("+ dx + "," + dy + ")")
                    log.info("position: ("+ otherObj.x + "," + otherObj.y + ")")
                    log.info("velocity: ("+ otherObj.dx + "," + otherObj.dy + ")")

                    var adjustVelocity = function() {
                        log.info("HIT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                        log.info("multiplier:" + self.multiplier)

                        var towardsOtherX = otherObj.x-x, towardsOtherY = otherObj.y-y;

                        var distance = Math.sqrt(towardsOtherX*towardsOtherX+towardsOtherY*towardsOtherY);

                        // Unit vector in the direction of the collision
                        var ax=towardsOtherX /distance, ay=towardsOtherY/distance; 

                        // Projection of the velocities in these axes
                        var va1=(dx*ax+dy*ay), vb1=(-dx*ay+dy*ax); 
                        var va2=(otherObj.dx*ax+otherObj.dy*ay);

                        // new velocity towards other ball (for elastic objecs of equal mass)
                        var vaP1=va2;

                        // Undo the projections
                        dx=vaP1*ax-vb1*ay;  
                        dy=vaP1*ay+vb1*ax;

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
                        else {
                            log.info("points not valid")
                            log.info(t1)
                            log.info(t2)
                            if(distance<this.radius+otherObj.radius) {
                                adjustVelocity()
                            }
                        }
                            
                    }
                    else log.info("discriminant invalid")
                }
                
            }
            this.newDx=dx;
            this.newDy=dy;
        },
        calculatePosition: function() {
            var x = this.x;
            var y = this.y
	    x+=this.dx;
	    y+=this.dy,
            radius = this.radius;
	    
	    if(x<radius)
		x=radius;
	    else if(x>this.canvasWidth-radius)
		x=this.canvasWidth-radius;
	    
	    if(y<radius)
		y=radius
	    else if(y>this.canvasHeight-radius)
		y=this.canvasHeight-radius

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

