//variables to keep track of various game elements
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
        //add displays for the current score and time remaining in the game
        scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#FFF'});
        timeText = game.add.text(16, 50, 'Time: 01:00', {fontSize: '32px', fill: '#FFF'});

        //add a group to keep track of the ground
        platforms = game.add.group();
        //enable physics on the group of platforms
        platforms.enableBody = true;

        //add the ground to the game as part of the platforms group
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        //sets the ground as immovable so it doesn't fall away when the player collides with it
        ground.body.immovable = true;

        //set the ground to go all the way across the bottom of the screen
        //(the ground image isn't large enough without this)
        ground.scale.setTo(2, 2);

        //The player and its settings
        player = game.add.sprite(32, game.world.height - 110, 'dude');

        //Enable physics on the player
        game.physics.arcade.enable(player);

        //Player physics properties
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //animations for walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        //add the arrow keys to the game so you can tell when they are being pressed
        //(this is a build in function of phaser)
        cursors = game.input.keyboard.createCursorKeys();

        //add a star group to the game to keep track of stars
        stars = game.add.group();
        //enable physics on the stars
        stars.enableBody = true;
        //create an initial 'pool' of stars to pull from for spawning
        stars.createMultiple(40, 'star');

        //spawn a new star every .6 seconds
        this.timer = game.time.events.loop(600, spawnStars);

        //keep track of the time the game has been running
        gameTime = game.time.create();

        //set the game to end after a minute, move to the next state of the game
        gameEnd = gameTime.add(Phaser.Timer.MINUTE * 1, this.Win, this);
        //start the game clock
        gameTime.start();

        function spawnStars() {
            //grabs a dead star object from the pool
            var star = stars.getFirstDead();
            //check if the star is still on the game screen
            //and destroy it if it isn't
            star.checkWorldBounds = true;
            star.outOfBoundsKill = true;
            //reset the star to a random x position at the top of the screen
            var xCoord = Math.floor((Math.random() * game.world.width) + 1);
            star.reset(xCoord, 0);
            //make the stars fall faster as the score increases
            star.body.velocity.y = 100 + (score / 5);
        }
    },

    update: function() {
        //make the player collide with the ground so it doesn't fall to the bottom of the screen
        game.physics.arcade.collide(player, platforms);
        //check if the player is overlapping with any of the stars
        //call the collect star function if it is
        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        //update the time remaining in the game, display in a nicely formatted string
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

        //remove the star and update the score and score text
        //if the player is overlapping with a star
        function collectStar(player, star) {
            star.kill();
            score += 10;
            scoreText.text = 'Score: ' + score;
        }
    },

    //move to the next state of the game
    Win: function() {
        game.state.start('win');
    },

    //format the game clock countdown nicely
    //for display to the user
    formatTime: function(s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }
};