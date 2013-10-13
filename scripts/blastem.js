"use strict";

window.addEventListener("load",loadImages);

//CONSTANTS
var CANVAS_WIDTH = window.innerWidth-30;
var CANVAS_HEIGHT = window.innerHeight-30;
var KEYBOARD = {"KEY_LEFT":37,"KEY_UP":38,"KEY_RIGHT":39,"KEY_DOWN":40,"KEY_SPACE":32};

//GLOBALS
var ctx;
var player;
var paused;
var lastTime = 0;
var keydown =[];
var val = player;
var min = 0;
var max = 640;
var images={};
var cooldown = 0;
var enemies = [];
var score = 0;
var ENEMY_PROBABILITY_PER_SECOND = 1.0;
var backgroundCount = CANVAS_WIDTH;
var backgroundSpeed = 2;
var IMAGE_SOURCES = {playerImage: "images/plane.png", 
						tornadoImage: "images/tornado.png", 
						rainImage: "images/rain.png", 
						hailImage: "images/hail.png", 
						backgroundImage: "images/background.png"
					};	



function init(){
	var canvasElement = document.querySelector("canvas");
	canvasElement.width = CANVAS_WIDTH;
	canvasElement.height = CANVAS_HEIGHT;
	
	ctx = canvasElement.getContext("2d");
	
	
	
	//create player
	player = {
		color: "yellow",
		x: 320,
		y: 420,
		width: 140,
		height: 75,
		speed: 350,
		draw: function(){
			var halfW=this.width/2;
			var halfH=this.height/2;

			this.showExhaust();
			ctx.drawImage(images["playerImage"],this.x-halfW,this.y-halfH,this.width,this.height);
		},
		
		initParticle: function(p){
			var halfW = this.width/2;
			// getRandom(min, max) from utils.js
			p.x = 0;
			p.y = -this.height/2;
			p.r = getRandom(2, 4); // radius
			p.ySpeed = getRandom(-0.5,0.5);
			p.xSpeed = getRandom(-8,-10);
			return p;
		},
		
		createParticles: function(){
			this.particles = [];
			for(var i=0;i<100;i++){
				var p = {};
				p.age = getRandomInt(0,99);
				this.particles.push(this.initParticle(p));
			}
		},
		
		showExhaust: function showExhaust(){
			var halfW = this.width/2;
			var halfH = this.height/2;
			// if necessary - create particles 
			if (! this.particles) this.createParticles();
			
			for(var i=0;i<this.particles.length;i++){
				var p = this.particles[i];
				p.age += 2.5;
				p.r += 0.30
				p.x += p.xSpeed
				p.y += p.ySpeed 
				var alpha = 1 - p.age/100;
				ctx.fillStyle = "rgba(255,255,255," + alpha + ")";
				ctx.beginPath();
				ctx.arc(p.x-55 + this.x, p.y+15 + this.y + halfH, p.r, Math.PI * 2, false);
				ctx.closePath();
				ctx.fill();
				// if the particle is too old, recycle it
				if(p.age >=100){
					p.age = 0;
					this.initParticle(p);
				}
			} 
		} 
	};
	
	window.addEventListener("keydown",function(e){
		keydown[e.keyCode]=true;
	});
	
	window.addEventListener("keyup",function(e){
		keydown[e.keyCode]=false;
	});
	
	//enemy = {
		// color: "yellow",
		// x: 320,
		// y: 420,
		// width: 152,
		// height: 180,
		// speed: 100,
		// draw: function(){
			// var halfW=this.width/2;
			// var halfH=this.height/2;
			// ctx.drawImage(images["tornadoImage"],this.x-halfW,this.y-halfH,this.width,this.height);
		// },
	
	// };
	
	//start game
	animate();
}

function animate(){
	var dt = calculateDeltaTime();
	
	if(!paused){
		update(dt);
		drawBackground();
		drawSprites();
	}
	
	window.requestAnimFrame(animate);
}

function update(dt){
	if(keydown[KEYBOARD.KEY_LEFT] && player.x > 0){
		player.x -= player.speed * dt;
	}
	
	if(keydown[KEYBOARD.KEY_RIGHT] && player.x < CANVAS_WIDTH){
		player.x += player.speed * dt;
	}
	
	if(keydown[KEYBOARD.KEY_UP] && player.y>0){
		player.y -= player.speed * dt;
	}
	
	if(keydown[KEYBOARD.KEY_DOWN] && player.y<CANVAS_HEIGHT){
		player.y += player.speed * dt;
	}
	
	//keep within bounds
	player.x = (clamp(player.x, 0 + player.width/2, CANVAS_WIDTH - player.width/2));
	player.y = (clamp(player.y, 0 + player.height/2, CANVAS_HEIGHT - player.height/2));
				
	//enemies
	enemies.forEach(function(enemy){
		enemy.update(dt);
	});
	
	enemies = enemies.filter(function(enemy){
		return enemy.active;
	});
	
	if(Math.random() < ENEMY_PROBABILITY_PER_SECOND/60){
		enemies.push(new Tornado());
		enemies.push(new Rain());
		enemies.push(new Hail());
		console.log("new enemy created. enemies.length = " + enemies.length);
	}
}

function drawSprites(){
	player.draw();
	enemies.forEach(function(enemy){
				enemy.draw(ctx);
			});
}
		
function drawBackground(){
	ctx.drawImage(images["backgroundImage"],backgroundCount,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	ctx.drawImage(images["backgroundImage"],backgroundCount-CANVAS_WIDTH,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	backgroundCount-=backgroundSpeed;
	if(backgroundCount<0) backgroundCount=CANVAS_WIDTH;
}

function loadImages() {
	var numLoadedImages = 0;
	var numImages = 0;
	// get num of sources
	for(var imageName in IMAGE_SOURCES) {
		numImages++;
	} // end for
	// load images
	for(var imageName in IMAGE_SOURCES) {
		images[imageName] = new Image(); // Image is a class
		images[imageName].src = IMAGE_SOURCES[imageName];
		images[imageName].onload = function() {
			if(++numLoadedImages >= numImages){
			init(); // start the game!
			}
		}; // end onload
	} // end for
} // end loadImages