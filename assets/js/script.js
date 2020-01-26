var tileSets = {
    "Beginner": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    "Intermediate": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    "Expert": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
};

//Shuffle algorithm obtained from Stack Overflow
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Use localStorage to store input from levelselection.html
// and run generateBoard on gameplay.html.
// Solution obtained from Stack Overflow & W3Schools
function levelSelect(selection) {
    localStorage.setItem("difficultyLevel", selection);
    window.open("gameplay.html", "_self", true);
    window.onload = function () {
    difficultyLevel = localStorage.getItem("difficultyLevel");
    gameBoard.generateBoard(difficultyLevel);
    }
}


//Create gameBoard object to handle game tile management 
var gameBoard = {
    
    gameSet: [],
    
    selectedTileOne: null,
    selectedTileTwo: null,

    generateBoard: function(difficultyLevel) {
        let shuffledSet = shuffle(tileSets[difficultyLevel]);
        let tilePair;
        for (tileNumber of shuffledSet) {
            if (tileNumber % 2 === 0) {
                tilePair = tileNumber / 2;
            } else {
                tilePair = (tileNumber + 1) / 2;
            }
            this.gameSet.push ({
                position: shuffledSet.indexOf(tileNumber),
                pairID: tilePair,
                selected: false,
                completed: false
            });
        }
        view.displayBoard(gameSet);  // displayBoard function to be completed
        view.displayMessage("Good luck!");      // displayMessage function to be completed
        handlers.startClock();   // startClock function to be completed
    },

    selectTile: function(clickedTileID) {
        let selectedTile = this.gameSet[clickedTileID];
        if (selectedTile.completed === false) {
            if (selectedTile.selected === true) {
                view.displayMessage("Tile already selected.");   // displayMessage function to be completed
            } else {
                view.flipTile(clickedTileID);    // flipTile function to be completed
                if (!this.selectedTileOne) {
                    selectedTile.selected = true;
                    this.selectedTileOne = clickedTileID;
                } else {
                    selectedTile.selected = true;
                    this.selectedTileTwo = clickedTileID;
                    this.checkMatch(this.selectedTileOne, this.selectedTileTwo); 
                }
            }
        } else {
            view.displayMessage("No tile here. :)")  // displayMessage function to be completed
        }
    },

    unselectAll: function() {
        for (tile of this.gameSet) {
            tile.selected = false;
        }
        this.selectedTileOne = null;
        this.selectedTileTwo = null;
    },

    checkMatch: function(selectedTileOne, selectedTileTwo) {
        if (this.gameSet[selectedTileOne].pairID === this.gameset[selectedTileTwo].pairID) {
            this.gameSet[selectedTileOne].completed === true;
            this.gameSet[selectedTileOne].completed === true;
            view.displaySuccessMessage();  // to be defined
            view.removeMatchedTiles();     // to be defined  
        } else {
            view.displayFailureMessage();  // to be defined
            view.unflipTiles(); // to be defined
            this.unselectAll();
        }
    }
        


}
