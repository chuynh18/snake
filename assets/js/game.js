"use strict";

const game = {
    speed: 420,
    direction: 0, // 0 is up, 1 is right, 2 is down, 3 is left
    highScore: 0,
    snake: [[8,12]],
    oldSnake: null,
    fruit: [null, null],
    collided: false,
    gameStarted: false,
    setDirection: function(input) {
        if (input === 0) {
            if (this.direction !== 2) {
                this.direction = 0;
            } else if (this.snake.length < 3) {
                this.direction = 0;
            }
        } else if (input === 1) {
            if (this.direction !== 3) {
                this.direction = 1;
            } else if (this.snake.length < 3) {
                this.direction = 1;
            }
        } else if (input === 2) {
            if (this.direction !== 0) {
                this.direction = 2;
            } else if (this.snake.length < 3) {
                this.direction = 2;
            }
        } else if (input === 3) {
            if (this.direction !== 1) {
                this.direction = 3;
            } else if (this.snake.length < 3) {
                this.direction = 3;
            }
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

        for (let i = 0; i < this.snake.length; i++) {
            if (this.fruit[0] === this.snake[i][0] && this.fruit[1] === this.snake[i][1]) {
                this.generateFruit();
            }
        }
    },
    reset: function() {
        this.collided = false;
        this.speed = 420;
        this.direction = 0;
        this.snake.length = 1;
        this.snake[0][0] = 8;
        this.snake[0][1] = 12;
        this.fruit[0] = null;
        this.fruit[1] = null;
        document.getElementById("openDevPanel").textContent = "Snake";
    },
    render: function() {
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 15; j++) {
                document.getElementById(`${i}-${j}`).classList.remove("snake-head", "snake-body", "fruit", "moveUp", "moveRight", "moveDown", "moveLeft");
            }
        }

        document.getElementById(`${this.fruit[0]}-${this.fruit[1]}`).classList.add("fruit");
        document.getElementById(`${this.snake[0][0]}-${this.snake[0][1]}`).classList.add("snake-head");

        if (this.direction === 0) {
            document.getElementById(`${this.snake[0][0]}-${this.snake[0][1]}`).classList.add("moveUp");
            document.getElementById(`${this.snake[0][0]}-${this.snake[0][1]}`).style.animationDuration = `${this.speed}ms`;
        } else if (this.direction === 1) {
            document.getElementById(`${this.snake[0][0]}-${this.snake[0][1]}`).classList.add("moveRight");
            document.getElementById(`${this.snake[0][0]}-${this.snake[0][1]}`).style.animationDuration = `${this.speed}ms`;
        } else if (this.direction === 2) {
            document.getElementById(`${this.snake[0][0]}-${this.snake[0][1]}`).classList.add("moveDown");
            document.getElementById(`${this.snake[0][0]}-${this.snake[0][1]}`).style.animationDuration = `${this.speed}ms`;
        } else if (this.direction === 3) {
            document.getElementById(`${this.snake[0][0]}-${this.snake[0][1]}`).classList.add("moveLeft");
            document.getElementById(`${this.snake[0][0]}-${this.snake[0][1]}`).style.animationDuration = `${this.speed}ms`;
        }

        if (this.snake.length > 1) {
            for (let k = 1; k < this.snake.length; k++) {
                document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).classList.add("snake-body");
            }

            for (let k = 1; k < this.oldSnake.length; k++) {
                if (this.oldSnake[k][0] - this.snake[k][0] === -1) {
                    document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).classList.remove("moveRight", "moveLeft", "moveUp", "moveDown");
                    void document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).offsetWidth;
                    document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).classList.add("moveRight");
                    document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).style.animationDuration = `${this.speed}ms`;
                } else if (this.oldSnake[k][0] - this.snake[k][0] === 1) {
                    document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).classList.remove("moveRight", "moveLeft", "moveUp", "moveDown");
                    void document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).offsetWidth;
                    document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).classList.add("moveLeft");
                    document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).style.animationDuration = `${this.speed}ms`;
                } else if (this.oldSnake[k][1] - this.snake[k][1] === -1) {
                    document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).classList.remove("moveRight", "moveLeft", "moveUp", "moveDown");
                    void document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).offsetWidth;
                    document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).classList.add("moveDown");
                    document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).style.animationDuration = `${this.speed}ms`;
                } else if (this.oldSnake[k][1] - this.snake[k][1] === 1) {
                    document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).classList.remove("moveRight", "moveLeft", "moveUp", "moveDown");
                    void document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).offsetWidth;
                    document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).classList.add("moveUp");
                    document.getElementById(`${this.snake[k][0]}-${this.snake[k][1]}`).style.animationDuration = `${this.speed}ms`;
                } 
            }
        }

        if (this.collided) {
            document.getElementById("openDevPanel").textContent = "You lose.";
        }
    },
    move: function() {
        let lastLocation;

        this.oldSnake = [...this.snake];

        if (this.direction === 0) {
            if (this.snake[0][1] === 0) {
                console.log("You collided with the wall!");
                this.collided = true;
                this.gameStarted = false;
                this.renderButton();
            } else {
                this.snake.unshift([this.snake[0][0], this.snake[0][1] - 1]);
            lastLocation = this.snake.pop();
            }
        } else if (this.direction === 1) {
            if (this.snake[0][0] === 16) {
                console.log("You collided with the wall!");
                this.collided = true;
                this.gameStarted = false;
                this.renderButton();
            } else {
                this.snake.unshift([this.snake[0][0] + 1, this.snake[0][1]]);
                lastLocation = this.snake.pop();
            }
        } else if (this.direction === 2) {
            if (this.snake[0][1] === 14) {
                console.log("You collided with the wall!");
                this.collided = true;
                this.gameStarted = false;
                this.renderButton();
            } else {
                this.snake.unshift([this.snake[0][0], this.snake[0][1] + 1]);
                lastLocation = this.snake.pop();
            }
        } else if (this.direction === 3) {
            if (this.snake[0][0] === 0) {
                console.log("You collided with the wall!");
                this.collided = true;
                this.gameStarted = false;
                this.renderButton();
            } else {
                this.snake.unshift([this.snake[0][0] - 1, this.snake[0][1]]);
                lastLocation = this.snake.pop();
            }
        }

        if (this.checkSelfCollision()) {
            console.log("You collided with yourself!");
            this.collided = true;
            this.gameStarted = false;
            this.renderButton();
        }
        
        // upon eating fruit
        if (this.snake[0][0] === this.fruit[0] && this.snake[0][1] === this.fruit[1]) {
            this.snake.push(lastLocation);
            this.generateFruit();
            this.newHighScore();
            if (this.speed > 110) {
                this.speed -= 15;
            } else {
                this.speed = 100;
            }
            

            document.getElementById("currentScore").textContent = `${this.snake.length - 1}`;
        }

        this.render();

        if (!this.collided) {
            setTimeout(function() {
                game.move();
            }, this.speed);
        } else {
            console.log("Game over.");
        }
    },
    newHighScore: function() {
        if (this.snake.length - 1 > this.highScore) {
            this.highScore = this.snake.length - 1;
            console.log(`New high score: ${this.highScore}`);
        }

        document.getElementById("highScore").textContent = this.highScore;
    },
    start: function() {
        this.generateFruit();
        this.render();
        this.move();
        this.gameStarted = true;
        this.renderButton();
        document.getElementById("board").focus();
    },
    renderButton: function() {
        const startButton = document.getElementById("startButton");

        if (this.collided) {
            startButton.setAttribute("onclick", "game.reset();game.start();")
        } else if (!this.gameStarted) {
            startButton.setAttribute("onclick", "game.start();");
        } else if (this.gameStarted) {
            startButton.setAttribute("onclick", "");
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

document.onkeydown = checkKey;

document.getElementById("touchUp").setAttribute("onclick", "game.setDirection(0);");
document.getElementById("touchRight").setAttribute("onclick", "game.setDirection(1);");
document.getElementById("touchDown").setAttribute("onclick", "game.setDirection(2);");
document.getElementById("touchLeft").setAttribute("onclick", "game.setDirection(3);");

game.renderButton();