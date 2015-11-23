//Create the actual instance of the game, add game states
var game;
document.addEventListener('DOMContentLoaded', function(){
    'use strict';
    //make an instance of the game and inject it into the div element on the page
    game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');
    //add all the game states for this game
    game.state.add('boot', bootState);
    game.state.add('load', loadState);
    game.state.add('menu', menuState);
    game.state.add('play', playState);
    game.state.add('win', winState);

    //proceed to the next game state
    game.state.start('boot');
});