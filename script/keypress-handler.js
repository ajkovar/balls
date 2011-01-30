(function($){

	var KeypressHandler = window.KeypressHandler = function(element){
		var self = this;
		var pressHandlers = self.pressHandlers = []
		var upHandlers = self.upHandlers = []
		var pressed = [];
		
		$(self.element).keydown(function(e){
			for(var i=0;i<pressHandlers.length;i++) {
				var code = pressHandlers[i].code;
				if(e.keyCode === code  && !pressed[e.keyCode]){
					pressed[e.keyCode] = true
					pressHandlers[i]()
					e.preventDefault()
				}
			}
		})
		$(self.element).keyup(function(e){
			for(var i=0;i<upHandlers.length;i++) {
				if(e.keyCode === upHandlers[i].code){
					pressed[e.keyCode] = false
					upHandlers[i]()
				}
			}
		})
	}
	KeypressHandler.prototype = {
		press: function(keyCode, callback){
			callback.code=keyCode
			this.pressHandlers.push(callback)
		},
		up: function(keyCode, callback){
			callback.code = keyCode
			this.upHandlers.push(callback)
		}
	}
	
}(jQuery));

