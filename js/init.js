var GameStates = {}; // <-- Object to hold all our game states.

document.addEventListener("DOMContentLoaded", function()  {
    var width = 320;
    var height = 480;

    var game = new Phaser.Game(width, height, Phaser.CANVAS, "game");

    game.state.add('Preloader', GameStates.Preloader);   // <-- Loads the assets.
    game.state.add('Game', GameStates.Game);             // <-- Game loop (a.k.a the actual game).
    game.state.add('GameOver', GameStates.GameOver);     // <-- Game Over state.
    game.state.add('GameWin', GameStates.GameWin);       // <-- Game Win state.


    game.state.start('Preloader');

});