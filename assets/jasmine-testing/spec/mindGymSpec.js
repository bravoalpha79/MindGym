describe("MindGym Testing", function() {

    describe("tileSets content", function() {
        it("beginner set should contain 16 tiles numbered 1 to 16", function() {
            expect(tileSets.beginner.length).toBe(16);
            expect(tileSets.beginner[0]).toBe(1);
            expect(tileSets.beginner[15]).toBe(16);
            expect(tileSets.beginner).toEqual(jasmine.arrayContaining([7, 8, 9, 10, 11]));
        })
        it("intermediate set should contain 24 tiles numbered 1 to 24", function() {
            expect(tileSets.intermediate.length).toBe(24);
            expect(tileSets.intermediate[0]).toBe(1);
            expect(tileSets.intermediate[23]).toBe(24);
            expect(tileSets.intermediate).toEqual(jasmine.arrayContaining([19, 20, 21, 22]));
        })
        it("expert set should contain 36 tiles numbered 1 to 36", function() {
            expect(tileSets.expert.length).toBe(36);
            expect(tileSets.expert[0]).toBe(1);
            expect(tileSets.expert[35]).toBe(36);
            expect(tileSets.expert).toEqual(jasmine.arrayContaining([26, 27, 28, 29, 30]));
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

        it("should check if board is clear if the tiles match", function() {
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

    describe("check if board is cleared", function() {
        beforeEach(function () {
            spyOn(handlers, "clickExpect");
            spyOn(view, "displayPlayAgainButton");
        })
        it("should invoke display of 'Play again?' if the board is clear", function() {
            jasmine.getFixtures().set(
                `<div id="1" class="tile intermediatePair2 completed"></div>
                <div id="3" class="tile intermediatePair11 completed"></div>
                <div id="7" class="tile intermediatePair2 completed"></div>
                <div id="10" class="tile intermediatePair11 completed"></div>`
            );
            gameBoard.gameSet = [1, 3, 7, 10];
            gameBoard.checkBoardCleared();
            expect(handlers.clickExpect).not.toHaveBeenCalled();
            expect(view.displayPlayAgainButton).toHaveBeenCalled();
        })
        it("should enable clicking if the board is not clear", function() {
            jasmine.getFixtures().set(
                `<div id="1" class="tile intermediatePair7 completed"></div>
                <div id="3" class="tile intermediatePair7 completed"></div>
                <div id="7" class="tile intermediatePair4"></div>
                <div id="10" class="tile intermediatePair4"></div>`
            );
            gameBoard.gameSet = [1, 3, 7, 10];
            gameBoard.checkBoardCleared();
            expect(handlers.clickExpect).toHaveBeenCalled();
            expect(view.displayPlayAgainButton).not.toHaveBeenCalled();
        })       
    })

    describe("removing and adding of 'faceDown' for flipping of selected tile(s)", function() {
        it("should remove 'faceDown' from selected tile", function() {
            jasmine.getFixtures().set(
            `<div id="6" class="tile expertPair7 faceDown"></div>
            <div id="11" class="tile expertPair8 faceDown"></div>`
            );
            view.selectTile(6);
            expect($("#6")).not.toHaveClass("faceDown");
            expect($("#11")).toHaveClass("faceDown");
        })
        it("should add 'faceDown' to selected & unmatched tile pair", function() {
            jasmine.getFixtures().set(
            `<div id="2" class="tile intermediatePair7"></div>
            <div id="14" class="tile intermediatePair8"></div>
            <div id="17" class="tile intermediatePair1 faceDown"></div>`
            );
            var one = $(".tile").not(".faceDown")[0];
            var two = $(".tile").not(".faceDown")[1];
            view.unflipTiles(one, two);
            expect($("#2")).toHaveClass("faceDown");
            expect($("#14")).toHaveClass("faceDown");
            expect($("#17")).toHaveClass("faceDown");
        })
    })

    describe("adding of 'completed' for removal of matched pairs", function() {
        it("should add 'completed' and 'faceDown' to matched tile pair", function() {
            jasmine.getFixtures().set(
            `<div id="5" class="tile beginnerPair5"></div>
            <div id="9" class="tile beginnerPair2 faceDown"></div>
            <div id="14" class="tile beginnerPair5"></div>
            `
            );
            var one = $(".tile").not(".faceDown")[0];
            var two = $(".tile").not(".faceDown")[1];
            view.removeMatchedTiles(one, two);
            expect($("#5")).toHaveClass("faceDown");
            expect($("#5")).toHaveClass("completed");
            expect($("#14")).toHaveClass("faceDown");
            expect($("#14")).toHaveClass("completed");
            expect($("#9")).toHaveClass("faceDown");
            expect($("#9")).not.toHaveClass("completed");
        })
    })
})