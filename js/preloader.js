

GameStates.Preloader = {

    
    preload: function() {
        this.load.image('background', 'assets/background.jpg');
        this.load.image('gameover', 'assets/gameover.png');
        this.load.image('gamewin', 'assets/gamewin.png');
        this.load.image('taptoplay', 'assets/taptoplay.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('block', 'assets/block.png');

    },
    create: function(){
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        if(!this.game.device.desktop && !this.isFirefoxOS) {
            this.scale.forceOrientation(true, false, 'screenRotate');
        }
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        this.state.start('Game');
    },
    isFirefoxOS: function(){
        return (!!"mozApps" in navigator && navigator.userAgent.search("Mobile")) != -1;
    }
};