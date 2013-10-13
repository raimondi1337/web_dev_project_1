"use strict";

	window.onload = init;

//Globals
	var ctx;	
	var cloud;  	
	var cloud2; 
	var cloud3;
	var counter = 0;	
	var CANVAS_WIDTH = 640;
	var CANVAS_HEIGHT = 480;
	
	//Function to redraw the screen with requestAnimationfRame
	function redraw() {
	
		ctx.clearRect(0, 0, 640, 480);
		var canvas = document.querySelector("#canvas");

		var current = Math.floor(counter / 7);
		var frameNumber  = current % cloud.frameCount;

		cloud.offsetX = frameNumber * cloud.frameX;
		cloud.offsetY = 0;
	
		if(frameNumber >= 4) {
			cloud.offsetX = (frameNumber - 4) * cloud.frameX;
			cloud.offsetY = cloud.frameY;
		}
		ctx.drawImage(cloud, cloud.offsetX, cloud.offsetY, cloud.frameX, cloud.frameY, cloud.xLoc, cloud.yLoc, cloud.frameX, cloud.frameY);
		
		cloud.xLoc -= 4;
		
		if(cloud.xLoc < -315) {
			cloud.xLoc = 640;
		}
		window.requestAnimationFrame(redraw);
	}
		
	function init() {
		var canvas = document.querySelector("#canvas");
		
		ctx = canvas.getContext("2d");
		
		cloud = new Image();
		cloud.src = "images/cloud.png";  //src image
		cloud.xLoc = 640;		  //Starting x coordinate
		cloud.yLoc = 0;		  //Starting y coordinate
		cloud.frameX = 390; 	  //Width of a sprite
		cloud.frameY = 243;	  //Height of a sprite
		cloud.frameCount = 7;   //Number of sprites
		cloud.offsetY = 0;      //Sprite sheet x clipping offset
		cloud.offsetX = 0;      //Sprite sheet y clipping offset

		cloud.onload = function() {
			redraw();
		};
	}		