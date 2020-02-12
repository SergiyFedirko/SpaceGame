GameStates.Game = {
	initWorld: function(){
		this.playerSpeed = 280;
		this.ballSpeed = 220;
		this.blocksPerRow = 4;
		this.blockRows = 5;
		this.playerLives = 20;
		this.currentLevel = 0;
		this.add.sprite(0, 0, 'bg');
		this.cursors = this.input.keyboard.createCursorKeys();

		this.add.sprite(0, 0, 'background');
	},
	create: function(){
		this.initWorld();
		this.addPlayer();
		this.addBall();
		this.addBlocks();
	},
	addPlayer: function(){
		this.player = this.add.sprite(160, 440, 'player');
		this.physics.arcade.enable(this.player);
		this.player.anchor.setTo(0.5, 0);
		this.player.enableBody = true;
		this.player.body.immovable = true;
		this.player.body.collideWorldBounds = true;
		this.livesDisplay = this.add.text(10, 5, "Lives: " + this.playerLives, {
			fill: "white",
			fontSize: 16
		});
		
		this.currentLevelText = this.add.text(150, 5, "Levels: " + this.currentLevel, {
			fill: "white",
			fontSize: 16
		});
	
	},
	addBall: function(){
		this.ball = this.add.sprite(160, 240, 'ball');
		this.physics.arcade.enable(this.ball);
		this.ball.anchor.setTo(0.5, null);
		this.ball.enableBody = true;
		this.ball.body.bounce.setTo(1, 1);
		this.ball.body.velocity.x = this.ballSpeed;
		this.ball.body.velocity.y = this.ballSpeed;
		this.ball.body.collideWorldBounds = true;
	},
	addBlocks: function(){
		var level = levels[this.currentLevel];
		var blockNum = 0;
		this.ballSpeed += 50;
		this.playerSpeed += 50;
		if(!this.blocks){
			this.blocks = this.game.add.group();
		}
		for(var line = 0; line <= this.blockRows; line++){
			for(var row = 0; row <= this.blocksPerRow; row++){
				var posY = (line * 30) + 40;
				var posX = (row * 50) + 40;
				if(level[blockNum] === 1){
					var temp = this.add.sprite(posX, posY, 'block');
					this.physics.arcade.enable(temp);
					temp.enableBody = true;
					temp.body.immovable = true;
					this.blocks.add(temp);
				}
				blockNum += 1;
			}
		}
	},
	checkHitWithBlocks: function(){
		var dest = this.game.add.audio('dest');
		
		if(this.game.physics.arcade.collide(this.ball, this.blocks, this.blockCollidesWithBlock)){
			dest.play();
			
		}
		
	},
	blockCollidesWithBlock: function(sprite, block){
		block.kill();
	},
	checkHitWithPlayer: function(){
		var bounce = this.game.add.audio('bounce');
		if(this.game.physics.arcade.collide(this.ball, this.player)){
			bounce.play();
		}
	},
	resetBall: function(){
		this.ball.reset(160, 240);
		this.ball.body.velocity.x = this.ballSpeed;
		this.ball.body.velocity.y = this.ballSpeed;
	},
	ballCollidesWithGround: function(){
		var dest = this.game.add.audio('dest');
		if(this.ball.y >= 470){
			this.playerLives -= 1;
			this.resetBall();
			dest.play();
		}
		this.livesDisplay.setText("Lives: " + this.playerLives);
		if(this.playerLives === 0){
			this.state.start("GameOver");
		}
	},
	handleData: function(){
		this.player.body.velocity.x = 0;
		if(this.cursors.left.isDown){
			this.player.body.velocity.x = -1 * this.playerSpeed; 
		} else if(this.cursors.right.isDown){
			this.player.body.velocity.x = this.playerSpeed;
		}
	},
	checkGameWin: function(){
		if(this.blocks.countLiving() === 0){
			if(this.currentLevel === levels.length - 1){
				this.state.start("GameWin"); 
			} else { 
				this.currentLevel++;
				this.addBlocks();
				this.resetBall();
				this.currentLevelText.setText("Levels: " + this.currentLevel);
				
			}
		}	
	},
	update: function(){
		this.handleData();
		this.checkHitWithBlocks();
		this.checkHitWithPlayer();
		this.ballCollidesWithGround();
		this.checkGameWin();
	}
};