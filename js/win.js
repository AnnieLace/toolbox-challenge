//win state of the game
var winState = {
    create: function() {
        //show the user's final score and instructions for what to do next
        var winLabel = game.add.text(80, 80, 'TIME\x27S UP!', {fontSize: '50px', fill: '#FFF'});
        var scoreLabel = game.add.text(80, 150, 'Your Score: ' + score, {fontSize: '40px', fill: '#FFF'});
        var restartLabel = game.add.text(80, game.world.height - 80, 'Press space bar to restart', {fontSize: '25px', fill: '#FFF'});

        //add space bar so it can detect when it is pressed
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //add restart function to space bar to move to the next game state
        spaceKey.onDown.addOnce(this.restart, this);
    },

    //go back to the menu state so the player can begin again
    restart: function() {
        game.state.start('menu');
    }
}