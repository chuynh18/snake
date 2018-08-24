[Snake](https://chuynh18.github.io/snake/)
=====

__Note:  "game tick" means one discrete step of time in the game; in other words, one complete execution of all the game's logic__

This is a game that has been implemented and reimplemented who knows how many times.  Now it's my turn.

Click start, then use the arrow keys (on the keyboard) to move.  On a mobile device?  There (should be) virtual "buttons" for you to use.  That being said, I only have a Nexus 6P and Nexus 7 to test against.  Got a larger tablet or a smaller phone?  Let me know if something's amiss.

When you collect the fruit, your snake grows by one segment, and also slithers more quickly.

I wrote this mainly because I wanted to make a "real-time" game.  Turns out it was considerably easier than [Tic-tac-toe](https://github.com/chuynh18/tictactoe/) and [Four-in-a-row](https://github.com/chuynh18/fourinarow/).

Note that `style-min.css` and `game-min.js` are obviously minified, but `index.html` is also minified.  See `index-full.html` for the original file.

~~`index-full.html` + `style.css` + `game.js` together are 76.4 KB (non-gzipped).~~<br>
~~`index.html` + `style-min.css` + `game-min.js` together are 48.4 KB (also non-gzipped).~~

__Update__:  There was a lot of repetitive HTML that was responsible for drawing the game board.  That HTML is now dynamically generated with JavaScript.  The filesizes are now as follows:

`index-full.html` + `style.css` + `game.js` together are 36.5 KB (non-gzipped).<br>
`index.html` + `style-min.css` + `game-min.js` together are 26.5 KB (also non-gzipped).

Optimization
------------

__Before optimization__

Originally, I did a poor job of adding CSS animations in.  All the top search engine results for "replay CSS animation" led to hacks that caused the page to reflow, which I already knew was nowhere near ideal.  However, it's a solution that in most cases would lead to imperceptible performance penalties.  Unfortunately, that's not true for me, as Snake is a real time game.

I was removing and adding the animation class to each snake segment as the snake moved along.  On my laptop running Chrome, this was approximately a half millisecond penalty per page reflow.  In other words, I was paying a linear time penalty (0.5 ms * `snake.length`), in addition to the cost of the game logic.  On lower-powered mobile devices, this is even worse; on my phone, it resulted in the performance noticeably suffering when `snake.length > 8`.

![unoptimized animations](assets/img/unoptimized.png)

Note that these page redraws were in addition to other required page redraws, __and that the total time taken by the function calls above is just over 9 milliseconds__.

Here's a sample of 5 seconds of the unoptimized version of snake running:

![unoptimized time graph](assets/img/timespentunoptimized.png)

__After optimization__

While the work is incomplete, I've refactored the code to apply the animation to the snake's body only once, but to repeat it `snake.length` number of times.  Further refactoring will be required to eliminate the flickering.  That being said, I'm already reaping the performance improvements.  Executing the game's core logic no longer kicks off page redrawing.  The page is only rerendered as needed, which only takes under 3 milliseconds.

![optimized animations](assets/img/optimized.png)

Processing game ticks only take 0.4 milliseconds:  (Actually, after further optimization, they're now less than 0.4 ms; evaluating keypresses takes significantly longer at slightly over 1 ms.  This is because keypresses seem to trigger page reflows; I'm not entirely sure why.  Something to look into!)

![optimized game code](assets/img/optimized2.png)

Here's a sample of 5 seconds of the optimized version of snake running, so you can compare that to the unoptimized build:

![unoptimized time graph](assets/img/timespentoptimized.png)

While it's true that this doesn't seem impressive (idle time in the unoptimized version is about 3.9 seconds, whereas idle time is now almost 4.3 seconds), the game runs considerably more smoothly now, especially on mobile devices.  The unoptimized version would hitch every game tick (which is every 100 ms when the snake is moving its fastest).  The optimized version does not hitch anymore, even on my 2013 Nexus 7 tablet (an older mobile device).

Addressing a pain point:  unintended self-collisions
----------------------------------------------------

First, a quick intro to how I architected the game and some comments about the "real-time-ness" of Snake.

The CSS animations I use in this version of Snake give the illusion of the snake moving in continuous steps over the game board.  However, the game board is made up of discrete coordinates (15 rows, 17 columns) and the snake can only move in discrete steps.  The snake moves on the game board by having its head change coordinates by 1 unit per game tick, and the snake appears to move more quickly over time because the move method recurses after a shorter delay.

The snake "knows" which direction to move by looking at the value of the variable `game.direction`.  0 is up, 1 is right, 2 is down, and 3 is left.  `game.direction` gets set by an event listener that listens for keyboard input on the arrow keys (or, on mobile devices, when the directional buttons are tapped).  In other words, setting the Snake's direction is "more real-time" than the snake's game logic, which occurs in discrete steps.  When I was working to get Snake up and running initially, I did not have any code at all to prevent self-collisions.  However, when I got a working version stood up, I realized how annoying it was to accidentally lose by pressing a key corresponding to the opposite of the snake's current direction of motion.  My first pass to prevent this pain point was simply to not change the snake's direction if the user's input matched this criterion (e.g. pressing the down key when the snake was currently moving up).  This greatly alleviated the annoyance, but obviously did not eliminate the problem.

As I mentioned, the snake moves via the `game.move()` method recursively calling itself after a delay.  The naïve fix described above will not address the case where the user makes 2 or more inputs within one game tick that results in the snake's direction reversing itself.

Naïve fix will NOT handle:
1. Game tick
1. `game.direction`:  `0` (up)
1. User input:  down
1. Game ignores input _Yay!  Our code is working, right?_
1. User input:  right
1. `game.direction`:  `1` (right)
1. User input:  down
1. `game.direction`:  `2` (down) _Oh, no!_
1. Game tick
1. Snake collides with itself!  Game over.

My real fix is to check the coordinates of the snake head versus the coordinates of the segment immediately behind the head.  If the snake head is above the next segment, do not accept a down input.  If the snake head is to the right of the next segment, do not accept a left input.  And so on.  This solves the problem more generally, and so the snake can no longer collide with itself by reversing into itself over the period of one game tick.