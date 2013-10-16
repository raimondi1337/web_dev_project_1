"use strict";
window.enemyController = (function(){
	var difficulty=.1;
	function enemyController(){
	};
	
	enemyController.prototype.update = function(ctx){
		enemies.forEach(function(enemy){
			enemy.update(dt);
		});
		
		enemies = enemies.filter(function(enemy){
			return enemy.active;
		});
		
		if(Math.random()<difficulty){
			this.generateEnemies();
		}
	};
	
	enemyController.prototype.generateEnemies = function(){	
		var rand=Math.random();	
		
		if(rand < .1){
			enemies.push(new Tornado());
		} else if(rand < .66){
			enemies.push(new Rain());
		} else {
			enemies.push(new Hail());
		}
	};
		
	return enemyController;
})();