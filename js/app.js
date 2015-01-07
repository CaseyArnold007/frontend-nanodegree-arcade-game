// Enemies our player must avoid. 

var Enemy = function(x, y) {

// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {

    BugMove = dt * 120 * this.speed;
    this.x = this.x + BugMove;

//Enemy moves back to start after leaving screen

    if (this.x > 500) {
        this.x = -150;
    }

//If player collides with enemy, the player moves back to start: 200,380
//Using Axis-Aligned Bounding Box

        if (player.x < this.x + 85 && player.x + 45 > this.x && player.y < this.y + 45 && 45 + player.y > this.y) {
            
            player.x = 200;
            player.y = 380;
    }
}

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Speeds of Enemy Bugs

var SlowBug = function (x, y) {
    Enemy.call(this,x, y);
};
SlowBug.prototype = Object.create(Enemy.prototype);
SlowBug.prototype.constructor = SlowBug;
SlowBug.prototype.speed = 1.25;

var MedBug = function (x, y) {
    Enemy.call(this, x, y);
};
MedBug.prototype = Object.create(Enemy.prototype);
MedBug.prototype.constructor = MedBug;
MedBug.prototype.speed = 1.5;

var FastBug = function(x, y) {
    Enemy.call(this, x, y);
};
FastBug.prototype = Object.create(Enemy.prototype);
FastBug.prototype.constructor = FastBug;
FastBug.prototype.speed = 2;


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = 'images/char-boy.png';

    // Players Start Location
    this.x = 200;
    this.y = 380;
}
Player.prototype.update = function() {
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Makes sure player does not move off of grid

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            this.x = this.x - 101;
            if (this.x < 0) {
                this.x = 0;
            }
            break;
        case 'up':
            this.y = this.y - 85;
            if (this.y < -35){
                this.y = -35;
            }
            break;
        case 'right':
            this.x = this.x + 101;
                if (this.x > 404) {
                this.x = 404;
            }
           break;
        case 'down':
            this.y = this.y + 85;
            if (this.y > 380) {
                this.y = 380;
            }
        default:
            break;
    }
    console.log(this.x, this.y)
}

// Now instantiate your objects.
// Each enemy has a variable starting location. The variation in x axis starting locations creates
// the enemy asynchrony. 

var t1 = new FastBug (-125, 58);
var t2 = new FastBug (-405, 58);
var m1 = new MedBug (-210, 142);
var m2 = new MedBug (-520, 142);
var b1 = new SlowBug (-125, 225);
var b2 = new SlowBug (-425, 225);

// Place all enemy objects in an array called allEnemies

var allEnemies = [t1, t2, m1, m2, b1, b2];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
            var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
    
        player.handleInput(allowedKeys[e.keyCode]);
});

