//boot state adds physics
var bootState =  {
    //phaser looks for the create function and calls it automatically
    create: function() {
        //add arcade style physics to the game
        //(this includes collisions and gravity)
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //proceed to next game state
        game.state.start('load');
    }
};