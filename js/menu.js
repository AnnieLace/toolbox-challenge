//
var menuState = {
    create: function() {
        //some text to display the name of the game and give the user instructions
        //takes x and y coordinates (with 0,0 being top left corner of the game)
        //the text to display, and an object where you can specify desired attributes of the text
        var nameLabel = game.add.text(80, 80, 'Star Catcher', {fontSize: '50px', fill: '#FFF'});
        var startLabel = game.add.text(80, game.world.height - 80, 'press space bar to start', {fontSize: '25px', fill: '#FFF'});

        //get the space bar so it can detect when the user presses it
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //call the start function when the space bar is pressed
        spaceKey.onDown.addOnce(this.start, this);
    },

    //proceed to the play state of the game
    start: function() {
        game.state.start('play');
    }
};