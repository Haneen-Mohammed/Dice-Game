var playerOneName = "";
var playerTwoName = "";
var playerOneTotal = 0;
var playerTwoTotal = 0;
var currentPlayer = "player1";
var currentTurnPoints = 0;
var isPlayerTurn = true;
var winningScore = 0;
       
function rollDice(player) {
    if (!isPlayerTurn || currentPlayer !== player) {
        return;
    }

    var dice = document.getElementById("dice");
    var randomNum = Math.floor(Math.random() * 6) + 1;
    dice.src = "img/dice" + randomNum + ".png";

    if (randomNum === 1) {
        currentTurnPoints = 0;
        document.getElementById(player + "Current").textContent = "0";
        switchPlayer();
    } else {
        currentTurnPoints += randomNum;
        document.getElementById(player + "Current").textContent = currentTurnPoints;
    }
}

function hold(player) {
    if (!isPlayerTurn || currentPlayer !== player) {
        return;
    }

    if (player === "player1") {
        playerOneTotal += currentTurnPoints;
        document.getElementById("player1Score").textContent = playerOneTotal;
    } else {
        playerTwoTotal += currentTurnPoints;
        document.getElementById("player2Score").textContent = playerTwoTotal;
    }

    currentTurnPoints = 0;
    document.getElementById(player + "Current").textContent = "0";

    if (playerOneTotal >= winningScore || playerTwoTotal >= winningScore) {
        playerWins(currentPlayer);

        document.getElementById(player + "Score").textContent = "فاز!";
        isPlayerTurn = false;
    } else {
        switchPlayer();
    }
}

function switchPlayer() {
    currentTurnPoints = 0;
    currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
    document.getElementById("player1").classList.toggle("active");
    document.getElementById("player2").classList.toggle("active");
}

function startNewGame() {
    document.getElementById("gameInterface").style.display = "none";
    document.getElementById("startInterface").style.display = "block";

    playerOneTotal = 0;
    playerTwoTotal = 0;

    document.getElementById("player1Current").textContent = "0";
    document.getElementById("player2Current").textContent = "0";

    document.getElementById("player1Score").textContent = "0";
    document.getElementById("player2Score").textContent = "0";

    winningScore = 0;

    currentPlayer = "player1";
    document.getElementById("player1").classList.add("active");
    document.getElementById("player2").classList.remove("active");

    isPlayerTurn = true;

    document.getElementById("startInterface").style.display = "block";
    document.getElementById("winningScoreDisplay").style.display = "none";

    document.getElementById("winningScore").value = "";
    document.getElementById("playerOneName").value = "";
    document.getElementById("playerTwoName").value = "";
}

function playerWins(playerName) {
    var winningMessage = document.getElementById("winningMessage");
    var winningEffect = document.getElementById("winningEffect");

    var playerElement = document.getElementById(playerName + "Name");

    winningMessage.textContent = playerName + " فاز! " + playerElement.textContent;
    
    winningMessage.style.display = "block";
    winningEffect.style.display = "block";

    isPlayerTurn = true;

    setTimeout(function () {
        winningMessage.style.display = "none";
        winningEffect.style.display = "none";
    }, 10000);
}


function setWinningScore() {
    var winningScoreInput = document.getElementById("winningScore");
    var winningScoreValue = parseInt(winningScoreInput.value);

    var playerOneNameInput = document.getElementById("playerOneName");
    var playerTwoNameInput = document.getElementById("playerTwoName");

    //  فحص حقل النقاط المستهدفة
    if (isNaN(winningScoreValue) || winningScoreValue <= 0) {
        document.getElementById("winningScoreError").classList.add("error-visible");
    } else {
        document.getElementById("winningScoreError").classList.remove("error-visible");
    }

    //  فحص حقل اسم اللاعب الأول
    if (playerOneNameInput.value.trim() === "") {
        document.getElementById("playerOneNameError").classList.add("error-visible");
    } else {
        document.getElementById("playerOneNameError").classList.remove("error-visible");
    }

    //  فحص حقل اسم اللاعب الثاني
    if (playerTwoNameInput.value.trim() === "") {
        document.getElementById("playerTwoNameError").classList.add("error-visible");
    } else {
        document.getElementById("playerTwoNameError").classList.remove("error-visible");
    }

    // إذا لم تكن هناك أخطاء،  إخفاء واجهة تعيين النقاط والاسماء وعرض واجهة اللعبة
    if (!document.querySelector(".error-message.error-visible")) {
        winningScore = winningScoreValue;
        document.getElementById("startInterface").style.display = "none";
        document.getElementById("gameInterface").style.display = "block";

        document.getElementById("winningScoreDisplay").style.display = "inline";
        document.getElementById("winningScoreValue").textContent = winningScore;

        document.getElementById("player1").style.display = "block";
        document.getElementById("player2").style.display = "block";

        document.getElementById("newGameButton").style.display = "block";

        playerOneName = document.getElementById("playerOneName").value;
        playerTwoName = document.getElementById("playerTwoName").value;
        document.getElementById("player1Name").textContent = " (" + playerOneName + ")";
        document.getElementById("player2Name").textContent = " (" + playerTwoName + ")";
    }
}

window.onload = function () {
    document.getElementById("setWinningScoreInterface").style.display = "block";
};
