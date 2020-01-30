/** 
 * Generate tile set with number of tiles corresponding to difficulty level. 
 * In order to avoid manual creation of arrays with 16, 24 and 36 elements,
 * generation function created (adapted) from the one provided by Eventyret_mentor.
 **/

var tileSets = {
    beginner: createSet(16),
    intermediate: createSet(24),
    expert: createSet(36)
};

function createSet(amount) {
  return Array.from(Array(amount+1).keys()).slice(1);
}


// Shuffle algorithm obtained from Stack Overflow
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


/** 
 * Use localStorage to store input from levelselection.html before opening gameplay.html.
 * Solution obtained from Stack Overflow & W3Schools.
 **/
function levelSelect(selection) {
    localStorage.setItem("difficultyLevel", selection);
    window.open("gameplay.html", "_self", false);
}




// The gameBoard object handles tile management logic.
var gameBoard = {

    gameSet: [],

    /** 
     * Shuffle the original tileSet (based on difficultyLevel selection) and assign a "pairID" property to each shuffled tile, 
     * based on its number (position) in the original tileSet. The "position" property of the tile 
     * equals its position in the new (shuffled) array. 
     * The resulting array is the gameSet array of tile objects.  
     **/ 
    generateBoard: function (difficultyLevel) {
        var difficultyLevel = localStorage.getItem("difficultyLevel");
        let shuffledSet = shuffle(tileSets[difficultyLevel]);
        let tilePair;
        for (tileNumber of shuffledSet) {
            if (tileNumber % 2 === 0) {
                tilePair = tileNumber / 2;
            } else {
                tilePair = (tileNumber + 1) / 2;
            }
            this.gameSet.push({
                position: shuffledSet.indexOf(tileNumber),
                pairID: tilePair,
            });
        }
        view.displayBoard(this.gameSet);
        view.displayMessage("Good luck!");
        handlers.clickExpect();

    }, 

    // check if two tiles have been selected
    isPair: function () {
        var selectedTiles = $(".tile").not(".faceDown");

        if (selectedTiles.length === 2) {
            handlers.disableClick();
            this.checkMatch(selectedTiles);
        }
    },

    // check if the two selected tiles match
    checkMatch: function (selectedTiles) {
        let tileOne = selectedTiles[0];
        let tileTwo = selectedTiles[1];

        if (tileOne.className !== tileTwo.className) {
            view.displayFailureMessage();
            setTimeout(function () {
                view.unflipTiles(tileOne, tileTwo);
            }, 1500);
            setTimeout(function () {
                handlers.clickExpect();
            }, 1600);
        } else {
            view.displaySuccessMessage();
            setTimeout(function () {
                view.removeMatchedTiles(tileOne, tileTwo);
                gameBoard.checkBoardCleared();
            }, 1500);
        }
    },

    // check if all tiles have been cleared from the board
    checkBoardCleared: function () {
        if ($(".tile.completed").length === gameBoard.gameSet.length) {
            view.displayMessage("Congratulations!!! Game completed!");
        } else {
            handlers.clickExpect();
        }
    }
}

// Object for managing tile click enabling and disabling.
var handlers = {

/** 
 * clickExpect function set up based on a video by Watch and Code
 * and a post on Stack Overflow.
 **/
    clickExpect: function () {
        $("#gameArea").children().not(".completed").on("click", function (event) {
            let clicked = event.target;
            if (clicked.className.includes("tile")) {
                let position = Number.parseInt(clicked.id);
                view.selectTile(position);
            }
        });
    },

    disableClick: function () {
        $("#gameArea").children().not(".completed").off();
    }
}


// Object for managing the display of tiles and game messages.
var view = {

    displayBoard: function (set) {
        let difficulty = localStorage.getItem("difficultyLevel")
        let gameArea = $("#gameArea");
        for (tile of set) {
            let tileDiv = document.createElement("div");
            tileDiv.id = `${tile.position}`;
            tileDiv.className = `tile ${difficulty}Pair${tile.pairID} faceDown`
            gameArea.append(tileDiv);
        }
    },

    selectTile: function (position) {
        $(`#${position}`).removeClass("faceDown");
        gameBoard.isPair();
    },

    unflipTiles: function (tileOne, tileTwo) {
        tileOne.classList.add("faceDown");
        tileTwo.classList.add("faceDown");
    },

    removeMatchedTiles: function (tileOne, tileTwo) {
        tileOne.classList.add("faceDown", "completed");
        tileTwo.classList.add("faceDown", "completed");
    },

    displayMessage: function (messageText) {
        $("#messageArea").text(messageText);
    },

    displaySuccessMessage: function () {
        var messages = ["Nice!", "Good job!", "Got it!", "Super!"];
        let messageChoice = messages[Math.round(Math.random() * 3)];
        this.displayMessage(messageChoice);
    },

    displayFailureMessage: function () {
        var messages = ["Close... but no. :)", "Nope. Try again.", "Almost... but not quite. :)"];
        let messageChoice = messages[Math.round(Math.random() * 2)];
        this.displayMessage(messageChoice);
    }
}