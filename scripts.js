$(document).ready(function(){
  // Establish Canvas
  var canvas = $('#canvas')[0]; // selects canvas
  var ctx = canvas.getContext('2d'); // sets canvas to 2d rendering, you need this
  var w = $('#canvas').width(); // gets set width (500)
  var h = $('#canvas').height(); // gets set height (500)
  var temp;
  var cw = 10; // snake width
  var d; //direction
  var doof; // snake food
  var score; //amount of doof consumed

  // Make the snake
  var snake; // this is the snake "I'm hungry!  SSSSSsssss!"

  // Fires off the game, and resets to original state
  function init() {
    d = 'right'; // starting direction
    makeSnake(); // invokes the snake
    makeDoof(); // time to make the doof
    score = 0;  // resets score

      // Moves the snake every 100ms, loops the snakePaint and redraws
      // resets the game
      if (typeof loop !== 'undefined') clearInterval(loop);
      loop = setInterval(snakePaint, 100);
    }
  init();

  // the snake is composed of an array containing objects containing the x,y coordinate values
  function makeSnake () {
    var snakeLength = 5; // staring length of the snake
    snake = [];
    for (var i = snakeLength - 1; i >= 0; i--) { // start from left to right
      snake.push({x: i, y: 0}); // starting coordinates for the snake
    }
  }

  //time to make the doof
  function makeDoof () {
    // calculated to be inside the rows and columns
    doof = {
      x: Math.round(Math.random() * (w - cw)/cw), // (500 - 10) / 10 = 49
      y: Math.round(Math.random() * (h - cw)/cw),
    };

    console.log('doof', doof)
  }
  // Style the snake
  function snakePaint() {
    // Style canvas
    // To avoid the snake trail, we repaint the background each frame
    // context.fillRect(x,y,width,height);
    ctx.fillStyle = 'black'; // canvas background color
    ctx.fillRect(0,0,w,h); // fill the rectangle
    ctx.strokeStyle = 'red'; // basically border color
    ctx.strokeRect(0,0,w,h); // outline the rectangle

    // style the doof
    ctx.fillStyle = 'yellow';
    ctx.fillRect(doof.x * cw, doof.y * cw, cw, cw);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(doof.x * cw, doof.y * cw, cw, cw);

    // Display the score on the canvas
    // fillText(text,x,y) - draws "filled" text on the canvas
    // strokeText(text,x,y) - draws text on the canvas (no fill)
    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.fillText('score: ' + score, 5, h - 5);
    ctx.strokeText('score: ' + score, 5, h - 5)

    // Time to start movin'
    // Because the snake is an array of coordinates, all we have to do
    // to emulate movement, is to pop the tail and move it into the head

    // Head of the serpant
    var headX = snake[0].x;
    var headY = snake[0].y;

    //console.log(headX)
    // now the logic according to the current d of the snake will move it each interval
    if (d === 'right') headX++;
    else if (d === 'left') headX--;
    else if (d === 'up') headY--;
    else if (d === 'down') headY++;

    //console.log(d)
    // Restart the game if the snake is out of bounds or if the snake collides with itself
    if ( headX === -1 || headX === w/cw || headY === -1 || headY === h/cw || !collision (snake)) {
      //restarts game
      init();
      // return cause the snake disappears in the beginning
      return;
    }
    //console.log(headY)

    // snake eats the food, when the head is the same as the food
    // make a new head instead of popping the tail to increase snake length
    if (headX === doof.x && headY === doof.y) {
      var tail = { // make new segment
        x: headX,
        y: headY,
      }
      score++;
      makeDoof();
    } else {
      var tail = snake.pop(); // pop the tail
      tail.x = headX; // establish new coords
      tail.y = headY;
    }
    snake.unshift(tail); // unshift as the new head

    for (var i = 0; i < snake.length; i++) {
      var c = snake[i];
      ctx.fillStyle = 'yellow'; // color the snake my fav color
      ctx.fillRect(c.x * cw, c.y * cw, cw, cw);
      ctx.strokeStyle = 'red';
      ctx.strokeRect(c.x * cw, c.y * cw, cw, cw);
    }
  }
  // snakePaint();

  // collision detection helper
  // takes the coordinates of the head and compares it with the whole snake
  function collision (array) {
    for (var i = 1; i < array.length; i++) {
      // loop through the snake array and detect if the head's coordinates are the same

      if (array[i].x == array[0].x && array[i].y == array[0].y) {
        return false;
      }
    }
    return true; // this goes on the OUTSIDE
  }
  console.log(snake);

  // keyboard commands
  $(document).keydown(function(e){
    // grabs the keycode
    var key = e.which;
    //console.log(e)
    // we must prevent the snake from going backwards
    // keystrokes each have a numerical code
    if (key === 37 && d != 'right') d = 'left';
    else if (key === 38 && d != 'down') d = 'up';
    else if (key === 39 && d != 'left') d = 'right';
    else if (key === 40 && d != 'up') d = 'down';
    temp = key;
  });
});

// Bug list
// 3. no self collision detected
