var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var a=0;return function(b){return $jscomp.SYMBOL_PREFIX+(b||"")+a++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.asyncIterator;a||(a=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();$jscomp.initSymbol();$jscomp.initSymbolIterator();var b=a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.arrayFromIterator=function(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};
var game={speed:420,direction:0,highScore:0,snake:[[8,12]],oldSnake:[[8,12]],fruit:[null,null],collided:!1,ate:!1,gameStarted:!1,setDirection:function(a){0===a?2!==this.direction?this.direction=0:3>this.snake.length&&(this.direction=0):1===a?3!==this.direction?this.direction=1:3>this.snake.length&&(this.direction=1):2===a?0!==this.direction?this.direction=2:3>this.snake.length&&(this.direction=2):3===a&&(1!==this.direction?this.direction=3:3>this.snake.length&&(this.direction=3))},checkSelfCollision:function(){var a=
!1;if(1<this.snake.length){for(var b=1;b<this.snake.length;b++)if(this.snake[0][0]===this.snake[b][0]&&this.snake[0][1]===this.snake[b][1]){a=!0;break}return a}return!1},generateFruit:function(){this.fruit[0]=Math.floor(17*Math.random());this.fruit[1]=Math.floor(15*Math.random());for(var a=0;a<this.snake.length;a++)this.fruit[0]===this.snake[a][0]&&this.fruit[1]===this.snake[a][1]&&this.generateFruit()},reset:function(){document.getElementById(this.fruit[0]+"-"+this.fruit[1]).classList.remove("fruit");
for(var a=0;a<this.snake.length;a++)document.getElementById(this.snake[a][0]+"-"+this.snake[a][1]).classList.remove("snake-head","snake-body","fruit","moveEatRight","moveEatLeft","moveEatDown","moveEatUp","moveUp","moveRight","moveDown","moveLeft");this.collided=!1;this.speed=420;this.direction=0;this.snake.length=1;this.snake[0][0]=8;this.snake[0][1]=12;this.oldSnake=[].concat($jscomp.arrayFromIterable(this.snake));this.fruit[0]=null;this.fruit[1]=null;document.getElementById("currentScore").textContent=
""+(this.snake.length-1);document.getElementById("snakeTitle").textContent="Snake";document.getElementsByTagName("html")[0].style.backgroundColor="#778899"},render:function(){this.collided?(document.getElementById("snakeTitle").textContent="You lose.",document.getElementsByTagName("html")[0].style.backgroundColor="#aa8484"):(document.getElementById(this.oldSnake[this.oldSnake.length-1][0]+"-"+this.oldSnake[this.oldSnake.length-1][1]).classList.remove("snake-head","snake-body","moveUp","moveRight",
"moveDown","moveLeft"),1<this.snake.length&&document.getElementById(this.snake[1][0]+"-"+this.snake[1][1]).classList.remove("moveEatRight","moveEatLeft","moveEatDown","moveEatUp"),document.getElementById(this.fruit[0]+"-"+this.fruit[1]).classList.add("fruit"),document.getElementById(this.fruit[0]+"-"+this.fruit[1]).style.animationIterationCount=1,document.getElementById(this.snake[0][0]+"-"+this.snake[0][1]).classList.add("snake-head"),0===this.direction?(this.ate?(document.getElementById(this.snake[0][0]+
"-"+this.snake[0][1]).classList.add("moveEatUp"),this.ate=!1):document.getElementById(this.snake[0][0]+"-"+this.snake[0][1]).classList.add("moveUp"),document.getElementById(this.snake[0][0]+"-"+this.snake[0][1]).style.animationDuration=this.speed+"ms"):1===this.direction?(this.ate?(document.getElementById(this.snake[0][0]+"-"+this.snake[0][1]).classList.add("moveEatRight"),this.ate=!1):document.getElementById(this.snake[0][0]+"-"+this.snake[0][1]).classList.add("moveRight"),document.getElementById(this.snake[0][0]+
"-"+this.snake[0][1]).style.animationDuration=this.speed+"ms"):2===this.direction?(this.ate?(document.getElementById(this.snake[0][0]+"-"+this.snake[0][1]).classList.add("moveEatDown"),this.ate=!1):document.getElementById(this.snake[0][0]+"-"+this.snake[0][1]).classList.add("moveDown"),document.getElementById(this.snake[0][0]+"-"+this.snake[0][1]).style.animationDuration=this.speed+"ms"):3===this.direction&&(this.ate?(document.getElementById(this.snake[0][0]+"-"+this.snake[0][1]).classList.add("moveEatLeft"),
this.ate=!1):document.getElementById(this.snake[0][0]+"-"+this.snake[0][1]).classList.add("moveLeft"),document.getElementById(this.snake[0][0]+"-"+this.snake[0][1]).style.animationDuration=this.speed+"ms"),1<this.snake.length&&(document.getElementById(this.snake[1][0]+"-"+this.snake[1][1]).classList.add("snake-body"),1<this.oldSnake.length&&(-1===this.oldSnake[1][0]-this.snake[1][0]?(document.getElementById(this.snake[1][0]+"-"+this.snake[1][1]).classList.add("moveRight"),document.getElementById(this.snake[1][0]+
"-"+this.snake[1][1]).style.animationDuration=this.speed+"ms",document.getElementById(this.snake[1][0]+"-"+this.snake[1][1]).style.animationIterationCount=this.snake.length):1===this.oldSnake[1][0]-this.snake[1][0]?(document.getElementById(this.snake[1][0]+"-"+this.snake[1][1]).classList.add("moveLeft"),document.getElementById(this.snake[1][0]+"-"+this.snake[1][1]).style.animationDuration=this.speed+"ms",document.getElementById(this.snake[1][0]+"-"+this.snake[1][1]).style.animationIterationCount=
this.snake.length):-1===this.oldSnake[1][1]-this.snake[1][1]?(document.getElementById(this.snake[1][0]+"-"+this.snake[1][1]).classList.add("moveDown"),document.getElementById(this.snake[1][0]+"-"+this.snake[1][1]).style.animationDuration=this.speed+"ms",document.getElementById(this.snake[1][0]+"-"+this.snake[1][1]).style.animationIterationCount=this.snake.length):1===this.oldSnake[1][1]-this.snake[1][1]&&(document.getElementById(this.snake[1][0]+"-"+this.snake[1][1]).classList.add("moveUp"),document.getElementById(this.snake[1][0]+
"-"+this.snake[1][1]).style.animationDuration=this.speed+"ms",document.getElementById(this.snake[1][0]+"-"+this.snake[1][1]).style.animationIterationCount=this.snake.length))))},move:function(){this.oldSnake=[].concat($jscomp.arrayFromIterable(this.snake));if(0===this.direction)if(0===this.snake[0][1])console.log("You collided with the wall!"),this.collided=!0,this.gameStarted=!1,this.renderButton();else{this.snake.unshift([this.snake[0][0],this.snake[0][1]-1]);var a=this.snake.pop()}else 1===this.direction?
16===this.snake[0][0]?(console.log("You collided with the wall!"),this.collided=!0,this.gameStarted=!1,this.renderButton()):(this.snake.unshift([this.snake[0][0]+1,this.snake[0][1]]),a=this.snake.pop()):2===this.direction?14===this.snake[0][1]?(console.log("You collided with the wall!"),this.collided=!0,this.gameStarted=!1,this.renderButton()):(this.snake.unshift([this.snake[0][0],this.snake[0][1]+1]),a=this.snake.pop()):3===this.direction&&(0===this.snake[0][0]?(console.log("You collided with the wall!"),
this.collided=!0,this.gameStarted=!1,this.renderButton()):(this.snake.unshift([this.snake[0][0]-1,this.snake[0][1]]),a=this.snake.pop()));this.checkSelfCollision()&&(console.log("You collided with yourself!"),this.collided=!0,this.gameStarted=!1,this.renderButton());this.snake[0][0]===this.fruit[0]&&this.snake[0][1]===this.fruit[1]&&(this.snake.push(a),document.getElementById(this.fruit[0]+"-"+this.fruit[1]).classList.remove("fruit"),this.generateFruit(),this.newHighScore(),this.speed=110<this.speed?
this.speed-15:100,this.ate=!0,document.getElementById("currentScore").textContent=""+(this.snake.length-1));this.render();this.collided?console.log("Game over."):setTimeout(function(){game.move()},this.speed)},newHighScore:function(){this.snake.length-1>this.highScore&&(this.highScore=this.snake.length-1,console.log("New high score: "+this.highScore));document.getElementById("highScore").textContent=this.highScore},start:function(){this.generateFruit();this.render();this.move();this.gameStarted=!0;
this.renderButton();document.getElementById("board").focus()},renderButton:function(){var a=document.getElementById("startButton");this.collided?a.setAttribute("onclick","game.reset();game.start();"):this.gameStarted?this.gameStarted&&a.setAttribute("onclick",""):a.setAttribute("onclick","game.start();")}},checkKey=function(a){a=a||window.event;"38"==a.keyCode?game.setDirection(0):"40"==a.keyCode?game.setDirection(2):"37"==a.keyCode?game.setDirection(3):"39"==a.keyCode&&game.setDirection(1)},generateGameBoard=
function(){for(var a=document.getElementById("board"),b=0;17>b;b++){var c=document.createElement("div");c.classList.add("grid-item","game-column");c.id=b;for(var d=0;15>d;d++){var e=document.createElement("div"),f=document.createElement("div");e.classList.add("game-cell");f.classList.add("snake-segment");f.id=b+"-"+d;e.appendChild(f);c.appendChild(e)}a.appendChild(c)}};generateGameBoard();document.onkeydown=checkKey;document.getElementById("touchUp").setAttribute("onclick","game.setDirection(0);");
document.getElementById("touchRight").setAttribute("onclick","game.setDirection(1);");document.getElementById("touchDown").setAttribute("onclick","game.setDirection(2);");document.getElementById("touchLeft").setAttribute("onclick","game.setDirection(3);");game.renderButton();