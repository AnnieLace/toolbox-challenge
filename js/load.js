//load state gets assets for the game
var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80, 15, 'loading...', {fontSize: '32px', fill: '#FFF'});

        //images for the ground and the stars
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        //sprite sheet for animated player
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },

    //proceed to next game state when load is finished
    create: function() {
        game.state.start('menu');
    }
};