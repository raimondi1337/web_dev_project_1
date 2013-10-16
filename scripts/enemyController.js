"use strict";
window.enemyController = (function(){
	var difficulty=1;
	function enemyController(){
	};
	
	enemyController.prototype.update = function(ctx){
		enemies.forEach(function(enemy){
			enemy.update(dt);
		});
		
		enemies = enemies.filter(function(enemy){
			return enemy.active;
		});
		
		if(Math.random() < difficulty/60){
			enemies.push(new Tornado());
			enemies.push(new Rain());
			enemies.push(new Hail());
		}
	};
		
	return enemyController;
})();