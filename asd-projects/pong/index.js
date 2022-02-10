/* global $, sessionStorage */

/********** GAME BOARD Factory Function */

function GameBoard(){
  var gameBoard={};
  gameBoard.id="#board ";
  gameBoard.width= parseInt($("#board").css("width"));
  gameBoard.height= parseInt($("#board").css("height"));
  
  return gameBoard;

}


/********** LEFT PADDLE Factory Function */

function LeftPaddle(){

  var leftPaddle={};
  leftPaddle.id="#leftPaddle";

  leftPaddle.width= parseInt($("#leftPaddle").css("width"));
  leftPaddle.height= parseInt($("#leftPaddle").css("height"));

  leftPaddle.x= parseInt($("#leftPaddle").css("left"));
  leftPaddle.y= parseInt($("#leftPaddle").css("top"));

  leftPaddle.score=0;

  return leftPaddle;
}


/********** RIGHT PADDLE Factory Function */

function RightPaddle(){

  var rightPaddle={};
  rightPaddle.id="#rightPaddle";

  rightPaddle.width= parseInt($("#rightPaddle").css("width"));
  rightPaddle.height= parseInt($("#rightPaddle").css("height"));

  rightPaddle.x= parseInt($("#rightPaddle").css("left"));
  rightPaddle.y= parseInt($("#rightPaddle").css("top"));

  rightPaddle.score=0;

  return rightPaddle;
}


/********** BALL Factory Function */

function Ball(){

  var ball={};
  ball.id="#ball";

  ball.width= parseInt($("#ball").css("width"));
  ball.height= parseInt($("#ball").css("height"));

  ball.x= parseInt($("#ball").css("left"));
  ball.y= parseInt($("#ball").css("top"));

    /* for detecting whether the ball should move left or right/top or bottom*/
    ball.moveTowardsRight=true;
    ball.moveTowardsBottom=true;

  return ball;
}







$(document).ready(
    function(){

      /* create components*/
      var gameArea=GameBoard();
      var leftPaddle=LeftPaddle();
      var rightPaddle=RightPaddle();

      var ball=Ball();


      runProgram(gameArea,leftPaddle,rightPaddle,ball);


      $("#gameButton").click(

          function(){
            leftPaddle.score=0;
            rightPaddle.score=0;
            ball.x=10;
            ball.y=26;


            runProgram(gameArea,leftPaddle,rightPaddle,ball);
          }
      );

    }

); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(gameAreaParam,leftPaddleParam,rightPaddleParam,ballParam){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  var lGameBoard=gameAreaParam;
  var lLeftPaddle=leftPaddleParam;
  var lRightPaddle=rightPaddleParam;
  var lBall=ballParam;

  //create keys
  var KEYS={
     "A":65,
     "D":68,
     "J":74,
     "K":75
  };


  var leftMin=0;
  var leftMax=lGameBoard.width;
  var topMin=0;
  var topMax=lGameBoard.height;


  $("#leftScroreValue").html(lLeftPaddle.score +"");
  $("#rightScroreValue").html(lRightPaddle.score +"");

  $("#gameButton").prop("value","Restart Game");


  //register the keyboard keydown event  to work on the "body" of the html page
  $(document).on('keydown','body',function(event){
    
      var keycode=event.which  ||    event.keycode ;

      /**** left paddle movement ********/
      if(keycode==KEYS.A){
       
        if(lLeftPaddle.y-10 > 0){
          //leftPaddle=leftPaddle-10;
          lLeftPaddle.y -=10;
          $(lLeftPaddle.id).css("top",lLeftPaddle.y);
        }
      }

      if(keycode==KEYS.D){
        if(lLeftPaddle.y+lLeftPaddle.height < lGameBoard.height){
          lLeftPaddle.y +=10;
          $(lLeftPaddle.id).css("top",lLeftPaddle.y);
        }
      }

      /**** right paddle movement ********/
      if(keycode==KEYS.J){
       
        if(lRightPaddle.y-10 > 0){
          //leftPaddle=leftPaddle-10;
          lRightPaddle.y -=10;
          $(lRightPaddle.id).css("top",lRightPaddle.y);
        }
      }

      if(keycode==KEYS.K){
        if(lRightPaddle.y+lRightPaddle.height < lGameBoard.height){
          lRightPaddle.y +=10;
          $(lRightPaddle.id).css("top",lRightPaddle.y);
        }
      }



  }); 

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects



  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    /* the logic for moving the ball, chekcing collission, scores, etc */

       //console.log("Called....");

      //for checking bat collision
     // checkBatCollision();

      //for checking the ball has collided with the wall
      checkWallCollision();

    

    

  }

  /*fucntion to check collision of ball with wall but not ball*/
  function checkWallCollision(){
    if(lBall.x <= leftMin){
      lBall.moveTowardsRight=true;
    }else      if(lBall.x + lBall.width >= leftMax){
      lBall.moveTowardsRight=false;
    }

    if(lBall.y < topMin){
      lBall.moveTowardsBottom=true;
    } else  if(lBall.y+ lBall.height >= topMax){
      lBall.moveTowardsBottom=false;
    }

    if(
        (lBall.x <= lLeftPaddle.x +  lLeftPaddle.width) 
        && 
        (!(lBall.y>=lLeftPaddle.y && lBall.y<=lLeftPaddle.y + lLeftPaddle.height) )
       ){
        lBall.moveTowardsRight=true;
        lRightPaddle.score++;

    }

    if(
      (lBall.x + lBall.width >= lRightPaddle.x +  lRightPaddle.width) 
      && 
      (!(lBall.y >=lRightPaddle.y && lBall.y<=lRightPaddle.y + lRightPaddle.height) )
     ){
      lBall.moveTowardsRight=false;
      lLeftPaddle.score++;

  }



    $("#leftScroreValue").html(lLeftPaddle.score +"");
    $("#rightScroreValue").html(lRightPaddle.score +"");

  
      //check if any of the players have 11 points. If they do end tne game.
      if(lLeftPaddle.score>=11  || lRightPaddle.score>=11){
        endGame();
      }else{
        //for moving the ball
        moveBall();

      }
  
  }



  /*function to check collission of ball with bat*/
  function checkBatCollision(){

 if(lBall.x <= leftMin){
        lBall.moveTowardsRight=true;
      }else      if(lBall.x + lBall.width >= leftMax){
        lBall.moveTowardsRight=false;
      }

      if(lBall.y < topMin){
        lBall.moveTowardsBottom=true;
      } else  if(lBall.y+ lBall.height >= topMax){
        lBall.moveTowardsBottom=false;
      }

     
    if((lBall.y <= (lLeftPaddle.y + lLeftPaddle.height)) && ( lBall.x < lLeftPaddle.x )){
        lBall.moveTowardsRight=true;
        lLeftPaddle.score ++;
      }

      if((lBall.y <= (lRightPaddle.y + lRightPaddle.height)) && ( lBall.x > lRightPaddle.x )){
       lBall.moveTowardsRight=false;
        lRightPaddle.score ++;
      }

      $("#leftScroreValue").html(lLeftPaddle.score +"");
      $("#rightScroreValue").html(lRightPaddle.score +"");


  }
 
  /* function to move the ball*/
  function moveBall(){
      /* calculating the random movement of the ball on x axis and y axis */
      var randomNumX=(Math.random()*20+Math.random(1000))   * (Math.random()>0.5?1:2.5);
      var randomNumY=(Math.random()*5+Math.random(100))   * (Math.random()>0.5?.5:1);

      if(lBall.moveTowardsRight==true){
        lBall.x += randomNumX;
      }else{
        lBall.x -= randomNumX;
      }
     

    if(lBall.moveTowardsBottom==true){
      lBall.y +=randomNumY;
      }else{
        lBall.y -= randomNumY;
      }


     // console.log(lGameBoard.width + " x " + lGameBoard.height);

      //console.log(" ball : " + lBall.x + " "  + lBall.y);

     $(lBall.id).css('left',lBall.x);
     $(lBall.id).css('top',lBall.y);
      

  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
