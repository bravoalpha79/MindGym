describe("MindGym", function() {
    describe("tileSets content", function() {
        it("beginner set should contain 16 tiles numbered 1 to 16", function() {
            expect(tileSets.beginner.length).toBe(16);
            expect(tileSets.beginner[0]).toBe(1);
            expect(tileSets.beginner[15]).toBe(16);
            expect(tileSets.beginner).toEqual(jasmine.arrayContaining([9, 10, 11]));
        })
        it("intermediate set should contain 24 tiles numbered 1 to 24", function() {
            expect(tileSets.intermediate.length).toBe(24);
            expect(tileSets.intermediate[0]).toBe(1);
            expect(tileSets.intermediate[23]).toBe(24);
            expect(tileSets.intermediate).toEqual(jasmine.arrayContaining([19, 20, 21]));
        })
        it("expert set should contain 36 tiles numbered 1 to 36", function() {
            expect(tileSets.expert.length).toBe(36);
            expect(tileSets.expert[0]).toBe(1);
            expect(tileSets.expert[35]).toBe(36);
            expect(tileSets.expert).toEqual(jasmine.arrayContaining([27, 28, 29]));
        })
    })

    describe("check if two tiles have been selected", function() {
        beforeEach(function() {
            spyOn(handlers, "disableClick");
            spyOn(gameBoard, "checkMatch");
        })
        it("should do nothing if only one tile is selected", function() {
            jasmine.getFixtures().set(
                `<div id="1" class="tile beginnerPair11 faceDown"></div>
                <div id="3" class="tile beginnerPair3 faceDown"></div>
                <div id="7" class="tile beginnerPair4"></div>`);
            gameBoard.isPair();
            expect(handlers.disableClick).not.toHaveBeenCalled();
            expect(gameBoard.checkMatch).not.toHaveBeenCalled();
        })
        it("should disable clicking and run match check if two tiles are selected", function() {
            jasmine.getFixtures().set(
                `<div id="1" class="tile beginnerPair11"></div>
                <div id="3" class="tile beginnerPair3 faceDown"></div>
                <div id="7" class="tile beginnerPair4"></div>`
                );
            gameBoard.isPair();
            expect(handlers.disableClick).toHaveBeenCalled();
            expect(gameBoard.checkMatch).toHaveBeenCalled();
        })
    })

    describe("check if two tiles match", function() {
        beforeEach(function() {
            spyOn(handlers, "clickExpect");
            spyOn(gameBoard, "checkBoardCleared");
            jasmine.clock().install();
        })
        afterEach(function() {
            jasmine.clock().uninstall();
        })

        it("should enable clicking if the tiles don't match", function() {
            jasmine.getFixtures().set(
                `<div id="1" class="tile beginnerPair11"></div>
                <div id="3" class="tile beginnerPair3 faceDown"></div>
                <div id="7" class="tile beginnerPair4"></div>`
                );
            let selectedTiles = $(".tile").not(".faceDown");
            gameBoard.checkMatch(selectedTiles);
            jasmine.clock().tick(1501);
            expect(handlers.clickExpect).toHaveBeenCalled();
            expect(gameBoard.checkBoardCleared).not.toHaveBeenCalled();
        })

        it("should check if board is clear if the two tiles match", function() {
            jasmine.getFixtures().set(
                `<div id="1" class="tile beginnerPair5"></div>
                <div id="3" class="tile beginnerPair6 faceDown"></div>
                <div id="7" class="tile beginnerPair5"></div>`
                );
            let selectedTiles = $(".tile").not(".faceDown");
            gameBoard.checkMatch(selectedTiles);
            jasmine.clock().tick(1501);
            expect(handlers.clickExpect).not.toHaveBeenCalled();
            expect(gameBoard.checkBoardCleared).toHaveBeenCalled();
        })

        
    })

})