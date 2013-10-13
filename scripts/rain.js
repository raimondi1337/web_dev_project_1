"use strict";
window.Rain = (function(){
	
	function Rain(screenWidth, screenHeight){
		//ivars
		this.active = true;   
		this.age = Math.floor(Math.random() * 128); 
		this.color = "#A2B"; 
		
		this.canvasWidth = 640;
		this.canvasHeight = 480
		
		this.x = this.canvasWidth / 4 + Math.random() * this.canvasWidth / 2;   
		this.y = 0;   
		this.xVelocity = 0;  
		this.yVelocity = 200;   
		this.amplitude = .5;  
		this.width = 14;   
		this.height = 30;
	};
	
	//Rain methods
	Rain.prototype.inBounds = function() {
		return this.x >= 0 && this.x <= this.canvasWidth &&      
		this.y >= 0 && this.y <= this.canvasHeight;  
	};
	
	Rain.prototype.draw = function(ctx){
		var halfW = this.width/2;
		var halfH = this.height/2;
		ctx.drawImage(
			images["rainImage"], //
			//882, 525, 55, 52, //source coords and with and height
			this.x - halfW, this.y - halfH, this.width, this.height
			);
		};	
		
	Rain.prototype.update = function(dt){
		this.xVelocity = this.amplitude * Math.sin(this.age * Math.PI * dt);
		this.x += this.xVelocity;
		this.y += this.yVelocity * dt;
		this.age++;
		this.active = this.active && this.inBounds();
	};	
		
		Rain.prototype.explode = function(){
			this.active = false;
		};
		
		return Rain;
})();