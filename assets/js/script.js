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
// before opening gameplay.html.
// Solution obtained from Stack Overflow & W3Schools
function levelSelect(selection) {
    localStorage.setItem("difficultyLevel", selection);
    window.open("gameplay.html", "_self", false);
}


//Create gameBoard object to handle game tile management 
var gameBoard = {
    
    gameSet: [],
    
    selectedTileOne: null,
    selectedTileTwo: null,

    generateBoard: function(difficultyLevel) {
        var difficultyLevel = localStorage.getItem("difficultyLevel");
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
        view.displayBoard(this.gameSet);
        view.displayMessage("Good luck!");     
        handlers.clickExpect();
        //handlers.startClock();   // startClock function to be completed
    },

    // selectTile: function(clickedTileID) {
    //     let selectedTile = this.gameSet[clickedTileID];
    //     if (selectedTile.completed === false) {
    //         if (selectedTile.selected === true) {
    //             view.displayMessage("Tile already selected.");  
    //         } else {
    //             if (this.selectedTileOne) {
    //                 selectedTile.selected = true;
    //                 this.selectedTileTwo = clickedTileID;
    //                 this.checkMatch(this.selectedTileOne, this.selectedTileTwo); 
    //             } else {    
    //                 selectedTile.selected = true;
    //                 this.selectedTileOne = clickedTileID;
    //             }
    //             view.flipTile(clickedTileID);
    //         }
    //     } else {
    //         view.displayMessage("No tile here. :)")  
    //     }
    // },

    // unselectAll: function() {
    //     for (tile of this.gameSet) {
    //         tile.selected = false;
    //     }
    //     this.selectedTileOne = null;
    //     this.selectedTileTwo = null;
    // },

    // checkMatch: function(selectedTileOne, selectedTileTwo) {
    //     handlers.disableClick();
    //     if (this.gameSet[selectedTileOne].pairID === this.gameSet[selectedTileTwo].pairID) {
    //         this.gameSet[selectedTileOne].completed === true;
    //         this.gameSet[selectedTileOne].completed === true;
    //         view.displaySuccessMessage();  
    //         view.removeMatchedTiles();     // to be defined
    //         this.unselectAll();  
    //     } else {
    //         view.displayFailureMessage(); 
    //         view.unflipTiles(); 
    //         this.unselectAll();
    //     }
    //     handlers.clickExpect();
    // }    
}


var handlers = {
    // clickExpect function set up based on a video by Watch and Code
    // and a post on Stack Overflow
    clickExpect: function() {
        $("#gameArea").click(function(event) {
            let clicked = event.target;
            if (clicked.className.includes("tile")) {
                if (clicked.className.indexOf("completed") === -1)) {
                let position = Number.parseInt(clicked.id);
                view.selectTile(position);
                }
            }
        });
    },

    disableClick: function() {
        $("#gameArea").off("click");
    }
}


var view = {
    displayBoard: function(set) {
        let gameArea = $("#gameArea");
        for (tile of set) {
            let tileDiv = document.createElement("div");
            tileDiv.id = `${tile.position}`;
            tileDiv.className = `tile pair${tile.pairID} faceDown`
            gameArea.append(tileDiv);
        }
    },

    selectTile: function(position) {
        let selectedTiles = $(".tile").not(".faceDown");
        
        while (selectedTiles.length < 2) {
            $(`#${position}`).removeClass("faceDown");
            this.flipTile(position);
        }
        if (selectedTiles.length = 2) {
            handlers.disableClick();
            this.checkMatch(selectedTiles);
        }
    },

    flipTile: function(selectedTile) {
        $(`#${selectedTile}`).removeClass("faceDown");
    },

    unflipTiles: function() {
        $(".tile").not(".faceDown").addClass("faceDown");
    },

    checkMatch: function(selectedTiles) {
        let tileOne = selectedTiles[0];
        let tileTwo = selectedTiles[1];

        if (tileOne.className !== tileTwo.className) {
            this.displayFailureMessage();
            this.unflipTiles();
            handlers.clickExpect();
        } else {
            this.displaySuccessMessage();
            this.removeMatchedTiles(tileOne, tileTwo);
            handlers.clickExpect();
        }
    },

    removeMatchedTiles: function(tileOne, tileTwo) {
        tileOne.addClass("completed");
        tileTwo.addClass("completed");
    },

    displayMessage: function(messageText) {
        $("#messageArea").text(messageText);
    },

    displaySuccessMessage: function() {
        var messages = ["Nice!", "Good job!", "Got it!", "Super!"];
        let messageChoice = messages[Math.round(Math.random()*3)];
        this.displayMessage(messageChoice);
    },

    displayFailureMessage: function() {
        var messages = ["Close... but no. :)", "Nope. Try again.", "Almost... but not quite. :)"];
        let messageChoice = messages[Math.round(Math.random()*2)];
        this.displayMessage(messageChoice);
    }
}