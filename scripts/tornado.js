"use strict";
window.Tornado = (function(){
	
	function Tornado(screenWidth, screenHeight){
		//ivars
		this.name="tornado";
		this.active = true;   
		this.age = Math.floor(Math.random() * 28); 
		this.color = "#A2B"; 
		
		this.canvasWidth = CANVAS_WIDTH;
		this.canvasHeight = CANVAS_HEIGHT;
		
		   
		this.xVelocity = 100;  
		this.yVelocity = 0;   
		this.amplitude = getRandom(1.5,7.0);     
		this.height = this.canvasHeight*.8*Math.random();
		this.width = this.height*.555;
		this.x = this.canvasWidth;   
		this.y = this.canvasHeight - this.height/2;
	};
	
	//Tornado methods
	Tornado.prototype.inBounds = function() {
		return this.x >= 0 && this.x <= this.canvasWidth &&      
		this.y >= 0 && this.y <= this.canvasHeight;  
	};
	
	Tornado.prototype.draw = function(ctx){
		var halfW = this.width/2;
		var halfH = this.height/2;
		ctx.drawImage(
			images["tornadoImage"], //
			//882, 525, 55, 52, //source coords and with and height
			this.x - halfW, this.y - halfH, this.width, this.height
			);
		};	
		
	Tornado.prototype.update = function(dt){
		this.xVelocity = -this.amplitude;
		this.x += this.xVelocity;
		this.y += this.yVelocity * dt;
		this.age++;
		this.active = this.active && this.inBounds();
	};	
		
		Tornado.prototype.explode = function(){
			this.active = false;
		};
		
		return Tornado;
})();