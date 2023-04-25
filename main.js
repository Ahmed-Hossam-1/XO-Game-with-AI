var board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
var cells = document.getElementsByTagName('td');
var has_winner = false;
var player = 'X';

function drowBoard() {
    for (var i = 0; i < cells.length; i++) {
        var row = Math.floor(i / 3);
        var col = i % 3;
        cells[i].innerHTML = board[row][col];
    }
}

function checkWinner() {
    // 2: X winner
    // -2: O winner
    // 0: Tie
    // 1: No winner

    // For rows
    for (var i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' ') {
            return board[i][0] == 'X' ? 2 : -2;
        }
    }

    // For cols
    for (var i = 0; i < 3; i++) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ' ') {
            return board[0][i] == 'X' ? 2 : -2;
        }
    }

    // Diameter 1
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') {
        return board[0][0] == 'X' ? 2 : -2;
    }

    // Diameter 2
    if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== ' ') {
        return board[2][0] == 'X' ? 2 : -2;
    }

    // For Tie Case
    var tie = true;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == ' ') {
                tie = false;
            }
        }
    }
    if (tie) return 0;

    // Else
    return 1;
}

function minimax(depth, isMaximizing, firstTime = true) {
    var result = checkWinner();
    if (depth === 0 || result !== 1) {
        return result;
    }

    if (isMaximizing) {
        var finalScore = -10;
        var finalI, finalJ;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === ' ') {
                    board[i][j] = 'X';
                    var score = minimax(depth - 1, false, false);
                    board[i][j] = ' ';
                    if (score > finalScore) {
                        finalScore = score;
                        finalI = i;
                        finalJ = j;
                    }
                    if (firstTime) {
                        console.log("score," + i + "," + j + ": " + score);
                    }
                }
            }
        }
        if (firstTime) {
            board[finalI][finalJ] = 'O';
            drowBoard();
        }
        return finalScore;
    } else {
        var finalScore = 10;
        var finalI, finalJ;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === ' ') {
                    board[i][j] = 'O';
                    var score = minimax(depth - 1, true, false);
                    board[i][j] = ' ';
                    if (score < finalScore) {
                        finalScore = score;
                        finalI = i;
                        finalJ = j;
                    }
                    if (firstTime) {
                        console.log("score," + i + "," + j + ": " + score);
                    }
                }
            }
        }
        if (firstTime) {
            board[finalI][finalJ] = 'O';
            drowBoard();
        }
        return finalScore;
    }
}

function play(cell) {
    var cellId = parseInt(cell.getAttribute('id').split('-')[1]);
    var row = Math.floor(cellId / 3);
    var col = cellId % 3;

    if (board[row][col] === ' ' && !has_winner) {
        board[row][col] = player;
        drowBoard();
        var result = checkWinner();
        if (result !== 1) {
            has_winner = true;
            if (result === 0) {
                alert("Tie");
            } else {
                alert((result === 2 ? "X" : "O") + " player wins");
            }
        } else {
            minimax(100, false);
            result = checkWinner();
            if (result !== 1) {
                has_winner = true;
                if (result === 0) {
                    alert("Tie");
                } else {
                    alert((result === 2 ? "X" : "O") + " player wins");
                }
            }
        }
    }
}

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function () {
        play(this);
    });
}