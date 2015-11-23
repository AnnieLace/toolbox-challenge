var player;
var platforms;
var cursors;
var stars;
var score = 0;
var scoreText;
var timeText;
var gameTime;
var gameEnd;
var playState =
{
    create: function() {
        scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#FFF'});
        timeText = game.add.text(16, 50, 'Time: 1:00', {fontSize: '32px', fill: '#FFF'});

        platforms = game.add.group();
        platforms.enableBody = true;

        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.body.immovable = true;

        ground.scale.setTo(2, 2);

        // The player and its settings
        player = game.add.sprite(32, game.world.height - 110, 'dude');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        cursors = game.input.keyboard.createCursorKeys();

        stars = game.add.group();
        stars.enableBody = true;
        stars.createMultiple(40, 'star');

        this.timer = game.time.events.loop(600, spawnStars);

        gameTime = game.time.create();

        gameEnd = gameTime.add(Phaser.Timer.MINUTE * 1, this.Win, this);
        gameTime.start();

        function spawnStars() {
            var star = stars.getFirstDead();
            star.checkWorldBounds = true;
            star.outOfBoundsKill = true;
            var xCoord = Math.floor((Math.random() * game.world.width) + 1);
            star.reset(xCoord, 0);
            star.body.velocity.y = 100 + (score / 5);
        }
    },

    update: function() {
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        timeText.text = "Time: " + this.formatTime(Math.round((gameEnd.delay - gameTime.ms) / 1000));


        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else {
            //  Stand still
            player.animations.stop();
            player.frame = 4;
        }

        function collectStar(player, star) {
            star.kill();
            score += 10;
            scoreText.text = 'Score: ' + score;
        }
    },

    Win: function() {
        game.state.start('win');
    },

    formatTime: function(s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }
};