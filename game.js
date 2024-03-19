// alert("hello");

let buttonColours=["red","green","blue","yellow"];

let gamePattern=[];
let userClickedPattern=[];

let level=0;
//This variable is created to track the record of game starting and ending
let started=false;


//document is used for all the buttons together
$(document).keypress(function(event){
if(!started){
    //now if the game has started then the title will change to levels
    $("#level-title").text("Level "+ level);
    //after that we will call nextsequence to go the next level and increase the level variable
    nextSequence();
    started = true;
}
})

// Now we will check for the user

$(".btn").click(function(){

    //now we will use jquery to store the id of that button which user clicked
    let userChosenColour=$(this).attr("id");

    //now we will push the user chosen colour into the empty array
    userClickedPattern.push(userChosenColour);
    

    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //to check whether the user has chosen the valid sequence we will call it
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    // now we will match game pattern and user pattern

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        // console.log("success");
        //inside this if condition we will match whether all the other patterns are also matched
        if(userClickedPattern.length===gamePattern.length){
            //then we will proceed to next stage 
            setTimeout(function(){
                nextSequence();
            },200);
        }
    }
    else{
        // console.log("failure");
        //now if a user fails to match the patter then the game will be over 
        playSound("wrong");
        
        // we will change the bg of the game if game is over
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
       
        // now we will change the title to game over
        $("#level-title").text("Game is over. Not gg.Try again");
        //now we will call the start over function
        startOver();

    }

}

function nextSequence(){
     
    //now if a user passes a level and proceeds to next one we will make the userpattern array empty
    userClickedPattern=[];
   
    //here we will increase the variable named level
    level++;

    //also here we  need to change the level value as done in above
    $("#level-title").text("Level "+ level);
    let randomNumber=Math.floor(Math.random()*4);

    //This will autogenerate a random color from the array
    let randomChosenColour=buttonColours[randomNumber];
    

    // now we will push that randomly chosen color in the game pattern to save the chosen color
    gamePattern.push(randomChosenColour);
    //now we will use jquery to select that id of button which is randomly chosen 
     //fadein and fadeout is used to apply effects for the animation for each button
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


function playSound(name){
      //here i have added sound each time a random button will be chosen 
      var sound=new Audio("sounds/"+name+".mp3")
      sound.play();
}


// Now time to add animations 
function animatePress(currentColour){
    //It will add pressed effects if users clicks a button
    $("#"+currentColour).addClass("pressed");

    //Now we need to set timeout for a button to go back to original form
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startOver(){
//here we will make all variable empty again
 level=0;
 
 gamePattern=[];
 started=false;


}
