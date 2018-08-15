"use strict";

const game = {
    speed: 300,
    direction: 0, // 0 is up, 1 is right, 2 is down, 3 is left
    highScore: 1,
    snake: [[8,12]],
    fruit: [null, null],
    ateFruit: false,
    collided: false,
    setDirection: function(input) {
        if (input === 0) {
            this.direction = 0;
        } else if (input === 1) {
            this.direction = 1;
        } else if (input === 2) {
            this.direction = 2;
        } else if (input === 3) {
            this.direction = 3;
        }
    },
    checkSelfCollision: function() {
        let collision = false;

        if (this.snake.length > 1) {
            for (let i = 1; i < this.snake.length; i ++) {
                if (this.snake[0][0] === this.snake[i][0] && this.snake[0][1] === this.snake[i][1]) {
                    collision = true;
                    break;
                }
            }

            return collision;
        } else {
            return false;
        }
    },
    generateFruit: function() {
        this.fruit[0] = Math.floor(Math.random() * 17);
        this.fruit[1] = Math.floor(Math.random() * 15);
    },
    reset: function() {
        this.speed = 500;
        this.direction = 0;
        this.snake.length = 1;
        this.snake[0][0] = 8;
        this.snake[0][1] = 12;
        this.fruit[0] = null;
        this.fruit[1] = null;
    },
    render: function() {
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 15; j++) {
                document.getElementById(`${i}-${j}`).classList.remove("snake-head", "snake-body", "fruit");
            }
        }

        console.log(`${this.fruit[0]}-${this.fruit[1]}`);
        document.getElementById(`${this.fruit[0]}-${this.fruit[1]}`).classList.add("fruit");
        document.getElementById(`${this.snake[0][0]}-${this.snake[0][1]}`).classList.add("snake-head");

        if (this.snake.length > 1) {
            for (let k = 1; k < this.snake.length; k++) {
                document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).classList.add("snake-body");
            }
        }
    },
    move: function() {
        let lastLocation;

        if (this.direction === 0) {
            if (this.snake[0][1] === 0) {
                console.log("You collided with the wall!");
                this.collided = true;
            } else {
                this.snake.unshift([this.snake[0][0], this.snake[0][1] - 1]);
            lastLocation = this.snake.pop();
            }
        } else if (this.direction === 1) {
            if (this.snake[0][0] === 16) {
                console.log("You collided with the wall!");
                this.collided = true;
            } else {
                this.snake.unshift([this.snake[0][0] + 1, this.snake[0][1]]);
                lastLocation = this.snake.pop();
            }
        } else if (this.direction === 2) {
            if (this.snake[0][1] === 14) {
                console.log("You collided with the wall!");
                this.collided = true;
            } else {
                this.snake.unshift([this.snake[0][0], this.snake[0][1] + 1]);
                lastLocation = this.snake.pop();
            }
        } else if (this.direction === 3) {
            if (this.snake[0][0] === 0) {
                console.log("You collided with the wall!");
                this.collided = true;
            } else {
                this.snake.unshift([this.snake[0][0] - 1, this.snake[0][1]]);
                lastLocation = this.snake.pop();
            }
        }

        if (this.ateFruit) {
            this.ateFruit = false;
            this.snake.push(lastLocation);
        }

        if (this.checkSelfCollision()) {
            console.log("You collided with yourself!");
            this.collided = true;
        }
        this.eatFruit();
        this.render();

        if (!this.collided) {
            setTimeout(function() {
                game.move();
            }, this.speed);
        } else {
            console.log("Game over.");
        }
    },
    eatFruit: function() {
        if (this.snake[0][0] === this.fruit[0] && this.snake[0][1] === this.fruit[1]) {
            this.ateFruit = true;
            this.generateFruit();
            this.newHighScore();
        }
    },
    newHighScore: function() {
        if (this.snake.length > this.highScore) {
            this.highScore = this.snake.length;
            console.log(`New high score: ${this.highScore}`);
        }
    }
};

const checkKey = function(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        game.setDirection(0);
    }
    else if (e.keyCode == '40') {
        // down arrow
        game.setDirection(2);
    }
    else if (e.keyCode == '37') {
       // left arrow
       game.setDirection(3);
    }
    else if (e.keyCode == '39') {
       // right arrow
       game.setDirection(1);
    }
}

const start = function() {
    game.generateFruit();
    game.render();
}

start();
document.onkeydown = checkKey;