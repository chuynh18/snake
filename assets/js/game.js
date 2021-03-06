"use strict";

const getDOMCoords = function (target, index) {
    return document.getElementById(`${game[target][index][0]}-${game[target][index][1]}`);
}

const game = {
    speed: 420,
    direction: 0, // 0 is up, 1 is right, 2 is down, 3 is left
    highScore: 0,
    snake: [[8,12]],
    oldSnake: [[8,12]],
    fruit: [null, null],
    collided: false,
    ate: false,
    gameStarted: false,
    setDirection: function(input) {
        if (this.snake.length < 2) {
            this.direction = input;
        // do not accept input if the player tries to reverse into themselves (handles the naive case and multiple inputs within one game tick)
        } else if ((input === 0 && this.snake[0][1] - 1 !== this.snake[1][1]) || (input === 1 && this.snake[0][0] + 1 !== this.snake[1][0]) || (input === 2 && this.snake[0][1] + 1 !== this.snake[1][1]) || (input === 3 && this.snake[0][0] - 1 !== this.snake[1][0])) {
            this.direction = input;
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
        document.getElementById(`${this.fruit[0]}-${this.fruit[1]}`).classList.remove("fruit");

        for (let i = 0; i < this.oldSnake.length; i++) {
            getDOMCoords("oldSnake", i).classList.remove("snake-head", "snake-body", "fruit", "moveEatRight", "moveEatLeft", "moveEatDown", "moveEatUp", "moveUp", "moveRight", "moveDown", "moveLeft");
            getDOMCoords("oldSnake", i).style.animationIterationCount = 1;
        }

        this.collided = false;
        this.speed = 420;
        this.direction = 0;
        this.snake.length = 1;
        this.snake[0][0] = 8;
        this.snake[0][1] = 12;
        this.oldSnake = [...this.snake];
        this.fruit[0] = null;
        this.fruit[1] = null;
        document.getElementById("currentScore").textContent = `${this.snake.length - 1}`;
        document.getElementById("snakeTitle").textContent = "Snake";
        document.getElementsByTagName("html")[0].style.backgroundColor = "#778899";
    },
    render: function() {
        const appendClassHead = direction => {
            if (this.ate) {
                getDOMCoords("snake", 0).classList.add(`moveEat${direction}`);
                this.ate = false;
            } else {
                getDOMCoords("snake", 0).classList.add(`move${direction}`);
            }

            getDOMCoords("snake", 0).style.animationDuration = `${this.speed}ms`;
        }

        const appendClassBody = direction => {
            getDOMCoords("snake", 1).classList.add(`move${direction}`);
            getDOMCoords("snake", 1).style.animationDuration = `${this.speed}ms`;
            getDOMCoords("snake", 1).style.animationIterationCount = this.snake.length;
        }

        if (this.collided) {
            document.getElementById("snakeTitle").textContent = "You lose.";
            document.getElementsByTagName("html")[0].style.backgroundColor = "#aa8484";

            // prevent janky animation of snake upon loss
            for (let i = 0; i < this.snake.length; i++) {
                document.getElementById(`${this.snake[i][0]}-${this.snake[i][1]}`).style.animationIterationCount = 0;
            }
        } else {
            document.getElementById(`${this.oldSnake[this.oldSnake.length-1][0]}-${this.oldSnake[this.oldSnake.length-1][1]}`).classList.remove("snake-head", "snake-body", "moveUp", "moveRight", "moveDown", "moveLeft");
            if (this.snake.length > 1) {
                getDOMCoords("snake", 1).classList.remove("moveEatRight", "moveEatLeft", "moveEatDown", "moveEatUp");
            }
    
            document.getElementById(`${this.fruit[0]}-${this.fruit[1]}`).classList.add("fruit");
            document.getElementById(`${this.fruit[0]}-${this.fruit[1]}`).style.animationIterationCount = 1;
            getDOMCoords("snake", 0).classList.add("snake-head");
    
            if (this.direction === 0) {
                appendClassHead("Up");
            } else if (this.direction === 1) {
                appendClassHead("Right");
            } else if (this.direction === 2) {
                appendClassHead("Down");
            } else if (this.direction === 3) {
                appendClassHead("Left");
            }
    
            if (this.snake.length > 1) {
                getDOMCoords("snake", 1).classList.add("snake-body");

                if (this.oldSnake.length > 1) {
                    if (this.oldSnake[1][0] - this.snake[1][0] === -1) {
                        appendClassBody("Right");
                    } else if (this.oldSnake[1][0] - this.snake[1][0] === 1) {
                        appendClassBody("Left");
                    } else if (this.oldSnake[1][1] - this.snake[1][1] === -1) {
                        appendClassBody("Down");
                    } else if (this.oldSnake[1][1] - this.snake[1][1] === 1) {
                        appendClassBody("Up");
                    } 
                }
            }
        }
    },
    move: function() {
        let lastLocation;
        this.oldSnake = [...this.snake];

        const gameOver = (reason) => {
            if (reason === 0) {
                console.log("You collided with the wall!");
            } else if (reason === 1) {
                console.log("You collided with yourself!");
            }

            this.collided = true;
            this.gameStarted = false;
            this.renderButton();
        }

        if (this.direction === 0) {
            if (this.snake[0][1] === 0) {
                gameOver(0);
            } else {
                this.snake.unshift([this.snake[0][0], this.snake[0][1] - 1]);
                lastLocation = this.snake.pop();
            }
        } else if (this.direction === 1) {
            if (this.snake[0][0] === 16) {
                gameOver(0);
            } else {
                this.snake.unshift([this.snake[0][0] + 1, this.snake[0][1]]);
                lastLocation = this.snake.pop();
            }
        } else if (this.direction === 2) {
            if (this.snake[0][1] === 14) {
                gameOver(0);
            } else {
                this.snake.unshift([this.snake[0][0], this.snake[0][1] + 1]);
                lastLocation = this.snake.pop();
            }
        } else if (this.direction === 3) {
            if (this.snake[0][0] === 0) {
                gameOver(0);
            } else {
                this.snake.unshift([this.snake[0][0] - 1, this.snake[0][1]]);
                lastLocation = this.snake.pop();
            }
        }

        if (this.checkSelfCollision()) {
            gameOver(1);
        }
        
        // upon eating fruit
        if (this.snake[0][0] === this.fruit[0] && this.snake[0][1] === this.fruit[1]) {
            this.snake.push(lastLocation);
            document.getElementById(`${this.fruit[0]}-${this.fruit[1]}`).classList.remove("fruit");
            this.generateFruit();
            this.newHighScore();

            if (this.speed > 110) {
                this.speed -= 15;
            } else {
                this.speed = 100;
            }
            
            this.ate = true;
            document.getElementById("currentScore").textContent = `${this.snake.length - 1}`;

            // make it so that the snake's tail isn't missing animations upon eating a fruit
            if (this.snake.length > 2) {
                for (let i = 2; i < this.snake.length - 2; i++) {
                    getDOMCoords("snake", i).style.animationIterationCount++;
                }
            }
        }

        this.render();

        if (!this.collided) {
            setTimeout(() => {
                this.move();
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

    if (e.keyCode == '38') { // up arrow
        game.setDirection(0);
    }
    else if (e.keyCode == '40') { // down arrow
        game.setDirection(2);
    }
    else if (e.keyCode == '37') { // left arrow
       game.setDirection(3);
    }
    else if (e.keyCode == '39') { // right arrow
       game.setDirection(1);
    }
}

const generateGameBoard = function() {
    const gameBoard = document.getElementById("board");

    for (let i = 0; i < 17; i++) {
        const gameCol = document.createElement("div");
        gameCol.classList.add("grid-item", "game-column");
        gameCol.id = i;

        for (let j = 0; j < 15; j++) {
            const gameCell = document.createElement("div");
            const snakeSegment = document.createElement("div");
            gameCell.classList.add("game-cell");
            snakeSegment.classList.add("snake-segment");
            snakeSegment.id = `${i}-${j}`;

            gameCell.appendChild(snakeSegment);
            gameCol.appendChild(gameCell);
        }

        gameBoard.appendChild(gameCol);
    }
}

generateGameBoard();

document.onkeydown = checkKey;

document.getElementById("touchUp").setAttribute("onclick", "game.setDirection(0);");
document.getElementById("touchRight").setAttribute("onclick", "game.setDirection(1);");
document.getElementById("touchDown").setAttribute("onclick", "game.setDirection(2);");
document.getElementById("touchLeft").setAttribute("onclick", "game.setDirection(3);");

game.renderButton();