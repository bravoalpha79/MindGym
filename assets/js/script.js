const tileSets = {
    Beginner: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    Intermediate: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    Expert: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
};

//Shuffle algorithm obtained from Stack Overflow
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//Create gameBoard object to handle game tile management 
var gameBoard = {
    gameSet: [],
    selectedTileOne: null,
    selectedTileTwo: null,

    generateBoard: function(difficultyLevel) {
        let shuffledSet = shuffle(tileSets.difficultyLevel);
        let tilePair;
        for (tileNumber of shuffledSet) {
            if (tileNumber % 2 === 0) {
                tilePair = tileNumber / 2;
            } else {
                tilePair = (tilenumber + 1) / 2;
            }
            this.gameSet.push ({
                position: shuffledSet.IndexOf(tileNumber),
                pairID: tilePair,
                selected: false,
                completed: false
            })
        }
    }
}
