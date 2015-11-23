var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80, 15, 'loading...', {fontSize: '32px', fill: '#FFF'});

        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },

    create: function() {
        game.state.start('menu');
    }
};