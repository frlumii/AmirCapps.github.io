/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  var KEY = {
    "Left": 37,
    "Right": 39,
    "Up": 38,
    "Down": 40,
  }
  
  

  
  

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  var positionX = 0; // the x-coordinate location for the box
  var speedX = 0; // the speed for the box along the x-axis
  var positionY = 0; // the y-coordinate location for the box
  var speedY = 0; // the speed for the box along the y-axis


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event){
    if (event.which === KEY.Right){ 
      speedX = 5;
      console.log("right pressed")
    }
    else if (event.which === KEY.Down){
      speedY = 5;
      console.log("Down pressed")
    }
    else if (event.which === KEY.Up){ 
      speedY = -5;
      console.log("Up pressed")
    }
    else if (event.which === KEY.Left){
      speedX = -5;
      console.log("Left pressed")
    }
  }


  function handleKeyUp(event){
    if (event.which === KEY.Right){ 
      speedX = 0;
      console.log("right released")
    }
    else if (event.which === KEY.Down){
      speedY = 0;
      console.log("Down released")
    }
    else if (event.which === KEY.Up){ 
      speedY = 0;
      console.log("Up released")
    }
    else if (event.which === KEY.Left){
      speedX = 0;
      console.log("Left released")
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
    positionX += speedX;
    positionY += speedY;
  }
  function redrawGameItem(){
    $("#gameItem").css("left", positionX);
    $("#gameItem").css("top", positionY);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
