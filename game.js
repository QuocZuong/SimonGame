const red = $(".red")
const blue = $(".blue")
const green = $(".green")
const yellow = $(".yellow")
let title = $("#level-title")

let randomNumber; // storage a random number
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = []; // storage game random sequence
let playerAnswer = []; // storage what user input
let level = 0; // set level
let numberOfInput = 0; // storage number of time user input

startGame();


function startGame() {
    if (level === 0) {
        level++;
        $(document).one("keypress", function() { // play audio just one time
            $("#level-title").text(`Level ${level}`);
            gamePattern.push(buttonColors[nextSequence()]); // add random color to game pattern
            addEffect(gamePattern.at(0))
        })
    }
}

function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    return randomNumber
}

function addEffect(color) {
    $(`#${color}`).animate({ opacity: 0.5 }).animate({ opacity: 1 })
    const audio = new Audio(`./sounds/${color}.mp3`)
    audio.play()
}



$(".btn").click(function() {
    numberOfInput++;

    const tempBtn = $(this)
    const colorClass = tempBtn.attr("class").split(" ").pop(); // take the last element class of tempBtn

    const audio = new Audio(`./sounds/${colorClass}.mp3`)
    audio.play();

    playerAnswer.push(colorClass) // storage color user just input
    $(tempBtn).addClass("pressed"); // add animation press

    setTimeout(function() {
        $(tempBtn).removeClass("pressed");
    }, 50); // remove after 50ms

    // Check for wrong answer
    const partialGamePattern = gamePattern.slice(0, playerAnswer.length); // depend on player input time then cut temp pattern equal to that and compare
    const isWrongAnswer = !playerAnswer.every((color, index) => color === partialGamePattern[index]);

    if (isWrongAnswer) {
        $("body").addClass("game-over")

        const loseAudio = new Audio("./sounds/wrong.mp3")
        loseAudio.play()

        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 500)

        gamePattern = []
        playerAnswer = []
        level = 0;
        numberOfInput = 0;

        $("#level-title").html("Game over!<br> Press a key to play again ");

        startGame();
    } else if (numberOfInput === gamePattern.length) {
        level++;
        playerAnswer = []
        $("#level-title").text(`Level ${level}`);
        setTimeout(() => {
            const newRandomColor = buttonColors[nextSequence()]
            gamePattern.push(newRandomColor); // add new color for new level
            addEffect(gamePattern.at(-1)) // add effect for the latest game pattern
        }, 2000);
        numberOfInput = 0;
    }
});