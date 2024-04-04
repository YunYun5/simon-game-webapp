var buttonCols = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    userClickedPattern = [];

    var randNum = Math.floor((Math.random() * 3) + 1);
    var randChosenCol = buttonCols[randNum];
    gamePattern.push(randChosenCol);

    $("#" + randChosenCol).fadeOut(100).fadeIn(100);

    playSound(randChosenCol);
    $("h1").text("Level " + level);
    level++;
}

function playSound(name) {
    var audio = new Audio("../sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(e) {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    console.log("a");
    console.log(gamePattern);
    console.log(userClickedPattern);
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("b");
        if (userClickedPattern.length === gamePattern.length) {
            console.log("c");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("d");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
}

$(".container").on("click", ".btn", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function() {
    if (level == 0) {
        level++;
        nextSequence();
    }
})

