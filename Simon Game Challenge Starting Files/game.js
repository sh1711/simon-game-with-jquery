//jshint esversion:6

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gamePlayingStatus = false;
var level = 0;
const redAudio = new Audio("sounds/red.mp3");
const blueAudio = new Audio("sounds/blue.mp3");
const greenAudio = new Audio("sounds/green.mp3");
const yellowAudio = new Audio("sounds/yellow.mp3");
const wrongAudio = new Audio("sounds/wrong.mp3");

$(document).keypress(function () {
    if (!gamePlayingStatus) {
        nextSequence();
        gamePlayingStatus = true;
    }
});

$(".btn").click(function () {
    let userChosenColour = this.getAttribute("id");
    buttonClickedEffect(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    buttonClickedEffect(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function buttonClickedEffect(button) {
    $("#" + button).fadeOut(200).fadeIn(200);
    switch (button) {
        case "red":
            redAudio.play();
            break;
        case "blue":
            blueAudio.play();
            break;
        case "green":
            greenAudio.play();
            break;
        case "yellow":
            yellowAudio.play();
            break;
        default:
            break;
    }
}

function gameOver() {
    $("body").toggleClass("game-over");
    setTimeout(() => {
    $("body").toggleClass("game-over");
    }, 200);
    wrongAudio.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    gamePlayingStatus = false;
    gamePattern = [];
    level = 0;
}