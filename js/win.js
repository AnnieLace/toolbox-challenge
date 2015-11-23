var winState = {
    create: function() {
        var winLabel = game.add.text(80, 80, 'TIME\x27S UP!', {fontSize: '50px', fill: '#FFF'});
        var scoreLabel = game.add.text(80, 150, 'Your Score: ' + score, {fontSize: '40px', fill: '#FFF'});
        var restartLabel = game.add.text(80, game.world.height - 80, 'Press space bar to restart', {fontSize: '25px', fill: '#FFF'});

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.restart, this);
    },

    restart: function() {
        game.state.start('menu');
    }
}