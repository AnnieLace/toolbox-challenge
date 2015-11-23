var menuState = {
    create: function() {
        var nameLabel = game.add.text(80, 80, 'Star Catcher', {fontSize: '50px', fill: '#FFF'});
        var startLabel = game.add.text(80, game.world.height - 80, 'press space bar to start', {fontSize: '25px', fill: '#FFF'});

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.start, this);
    },

    start: function() {
        game.state.start('play');
    }
};