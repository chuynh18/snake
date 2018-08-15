"use strict";

const game = {
    board: [
    //   0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 6
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 7
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 8
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 9
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 12
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 13
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 14
    ],
    speed: 500,
    direction: 0, // 0 is up, 1 is right, 2 is down, 3 is left
    highScore: 1,
    snake: [[8,12]],
    fruit: [null, null],
    ateFruit: false,
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
            for (let i = 1; i < snake.length; i ++) {
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
        this.fruit[0] = Math.floor(Math.random() * 15);
        this.fruit[1] = Math.floor(Math.random() * 17);
    },
    reset: function() {
        this.speed = 500;
        this.direction = 0;
        this.snake.length = 1;
        this.snake[0][0] = 8;
        this.snake[0][1] = 12;
        this.fruit[0] = null;
        this.fruit[1] = null;

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                this.board[i][j] = 0;
            }
        }
    },
    render: function() {
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 15; j++) {
                document.getElementById(`${i}-${j}`).classList.remove("snake-head", "snake-body", "fruit");
            }
        }

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
            this.snake.unshift([this.snake[0][0], this.snake[0][1] - 1]);
            lastLocation = this.snake.pop();
        } else if (this.direction === 1) {
            this.snake.unshift([this.snake[0][0] + 1, this.snake[0][1]]);
            lastLocation = this.snake.pop();
        } else if (this.direction === 2) {
            this.snake.unshift([this.snake[0][0], this.snake[0][1] + 1]);
            lastLocation = this.snake.pop();
        } else if (this.direction === 3) {
            this.snake.unshift([this.snake[0][0] - 1, this.snake[0][1]]);
            lastLocation = this.snake.pop();
        }

        if (this.ateFruit) {
            this.ateFruit = false;
            this.snake.push(lastLocation);
        }

        this.eatFruit();
        this.render();
    },
    eatFruit: function() {
        if (this.snake[0][0] === this.fruit[0] && this.snake[0][1] === this.fruit[1]) {
            this.ateFruit = true;
            this.generateFruit();
        }
    }
};

const start = function() {
    game.generateFruit();
    game.render();
}

start();