"use strict";
window.Hail = (function(){
	function Hail(screenWidth, screenHeight){
		//ivars
		this.active = true;   
		this.age = Math.floor(Math.random() * 50); 
		this.color = "#A2B"; 
		
		this.canvasWidth = 640;
		this.canvasHeight = 480
		
		this.x = this.canvasWidth / 5 + Math.random() * this.canvasWidth / 3;   
		this.y = 0;   
		this.xVelocity = 0;  
		this.yVelocity = 250;   
		this.amplitude = .5;  
		this.width = 35;   
		this.height = 35;
	};
	
	//Hail methods
	Hail.prototype.inBounds = function() {
		return this.x >= 0 && this.x <= this.canvasWidth &&      
		this.y >= 0 && this.y <= this.canvasHeight;  
	};
	
	Hail.prototype.draw = function(ctx){
		var halfW = this.width/2;
		var halfH = this.height/2;
		ctx.drawImage(
			images["hailImage"], //
			this.x - halfW, this.y - halfH, this.width, this.height
			);
		};	
		
	Hail.prototype.update = function(dt){
		this.xVelocity = this.amplitude * Math.sin(this.age * Math.PI * dt);
		this.x += this.xVelocity;
		this.y += this.yVelocity * dt;
		this.age++;
		this.active = this.active && this.inBounds();
	};	
		
		Hail.prototype.explode = function(){
			this.active = false;
		};
		
		return Hail;
})();