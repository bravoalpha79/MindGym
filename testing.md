# MindGym Testing

## Code
Before testing the application itself, all code has been tested using online validators:
- [W3C Markup Validation Service](https://validator.w3.org/) for HTML;
- [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/) for CSS;
- [JSHint](https://jshint.com/) for JavaScript.

**No code errors have been identified.**

## Automated testing

Automated testing of JavaScript has been performed using [Jasmine](https://jasmine.github.io/index.html) framework. [jasmine-jquery](https://www.npmjs.com/package/jasmine-jquery) was added to Jasmine as jQuery was also used to develop the app.      

The relevant code for Jasmine tests can be found here:
- [HTML with Jasmine and jasmine-jquery scripts](https://github.com/bravoalpha79/MindGym/blob/master/assets/jasmine-testing/test.html);
- [Jasmine specifications file](https://github.com/bravoalpha79/MindGym/blob/master/assets/jasmine-testing/spec/mindGymSpec.js)

To run the tests:
1. Clone or download the master branch of the [MindGym](https://github.com/bravoalpha79/MindGym) GitHub repository.
2. Load the repository into your IDE.
3. Open the test.html file and run/preview it in your browser.

The automated tests cover 7 of the total 18 functions defined in the JavaScript code. The reason for this rather limited scope of automated tests lies in the fact that this is my first ever project involving JavaScript and the first one involving Jasmine. Somewhere in the middle of JS development I ran into some serious issues that I was not able to fix for several days, which cased an eventual overall delay in development, so the time remaining for developing Jasmine tests - which involved a second learning curve - was very restricted.   

For the same reason, TDD was not applied to this project. Instead, Jasmine tests were written once the JavaScript part was completed and proven to be working in all manual tests.

**All automated tests have been passed successfully.** 

## Manual testing

### User stories testing

1. As a user, I want the home screen to be visually appealing, making me want to try the game.
   - The home screen involves a cartoon-style picture of a gym, with a comical cartoon-character bull coach as the central figure.
   - The colours chosen attribute to the positive and cartoon-like appearance of the page.
   - The "Play!" button is located near the very centre of the page/picture and is coloured in bright blue, attracting particular attention amid other colours on the page. 
2. As a user, I want to be able to start a game easily.
   - A game can be started in as little as two clicks: click "Play!" --> choose difficulty level --> game starts. 
3. As a user, I want to be able to choose a difficulty level.
   - Three difficulty levels are available:
     - Rookie, with 8 tile pairs containing different alphabet letters (A-H);
     - Experienced, with 12 tile pairs containing different colours;
     - Hero, with 18 tile pairs containing different (simplified) playing cards.
4. As a user, I want to be provided with instructions on how to play the game.
    - Instructions are available from all parts of the app:
      - from Home, either via Instructions in the navbar or from the Info icon next to the Play button;
      - from Level selection, via Instructions in the navbar;
      - from Gameplay (even from in-game), via Instructions in the navbar.
5. As a user, I want to be provided with in-game feedback on my progress.
   - appropriate in-game messages are displayed to the user at each of the following events:
     - at game start;
     - upon successful pair matching;
     - upon unsuccessful pair matching;
     - upon game completion.   

6. As a user, I want to be able to restart the game without going back to the home page.
   - a Restart button is available during a game; clicking it will restart the game with unchanged difficulty settings;
   - a Play Again button becomes available upon game completion; clicking it will take the user to Level selection. 


### Structural integrity testing
  
7. Check that fonts are rendered properly.

8. Check that the Header/Navigation section is rendered properly on all pages:
   - the Navbar favicon is displayed properly;
   - the Navbar items _Home_, _Play_ and _Instructions_ are displayed correctly.

   _Note: the full functionality of the Navbar is tested in Interactive Components tests._ 
 
9. Check that the Footer section is rendered properly on all pages:
   - copyright information is displayed.

10. Check that frames, margins/paddings and borders are homogenous on all pages.
 
11. Check that the display of images and icons on all pages is complete and correct within the overall page structure.

12. On Gameplay page, check that the display of tiles is correct on all difficulty level settings:
    - tile back is correct;
    - tile front (flipped) is correct.

13. Check that the textual parts contain no typos.

14. Using a different web browser, repeat tests 7 through 12.


----
**Identified Issue #1**:   
On Gameplay page, the navbar Home link is wrongly indicated (colour-coded) as active/current.   

_Investigation:_ HTML code inspection reveals that gameplay.html wrongly contained the Bootstrap class "active" for the Home nav-link anchor, and it also contained an sr-only span denoting it as "current".   

_Solution:_   
In gameplay.html, remove the "active" class and the sr-only span from the Home nav-link anchor.  
Check other pages' HTML to make sure that a similar error is not present there as well.

_Verification:_ 
1. Re-validate the corrected HTML code.
2. Repeat Test 8 on all tested browsers.

**_Result:_**


----


### Gameplay

#### Tile sets

15. Start a game with Rookie difficulty level.
Check that the expected number of tiles is displayed an they are all "face down".   
On Gameplay page, open Chrome Developer tools.   
In the Console, enter `$(".tile").removeClass("faceDown");`   
Check that all and only the expected tiles are displayed.

16. Start a game with Experienced difficulty level and repeat actions of Test 15.
17. Start a game with Hero difficulty level and repeat actions of Test 15.

#### Tile selection

18. Click on a tile. Check that the "front" side of the selected tile becomes displayed.

19. Select two tiles. If they match:

    - check that a success message is displayed;
    - check that the tiles disappear from the board.

20. Select two tiles. If they don't match:
    - check that a failure message is displayed;
    - check that after a short time (approx. 1 second) the two tiles are "flipped back".

21. Try to select three tiles in quick succession (within one second for 2nd and 3rd tile).
Check that it is impossible to select a third tile before the previous two are either flipped back (if non-matching) or removed (if matching).

#### In-game messages

22. Start a game with any difficulty setting. Check that a "Good luck!" message is displayed.

23. Complete a game (at any difficulty setting). Check that a game completion message is displayed.


### Interactive Components

#### Navigation

24. From Home page:  
    - In the Navbar, click on the favicon. Check that the Home page opens.
    - In the Navbar, click on the _Home_ field. Check that the Home page opens.
    - In the Navbar, click on the _Play_ field. Check that the Level selection page opens.
    - In the Navbar, click on the _Instructions_ field. Check that the Instruction modal opens.

25. From Level selection page, repeat actions 1 through 4 of Test 24.
 
26. From Gameplay page, repeat actions 1 through 4 of Test 24.


#### Buttons and modals

27. On Home page, Click on the "Play!" button. Check that the browser navigates to the Level selection page.   

28. On Home page, click on the Info ("?") icon. Check that the Instructions modal opens.   
Check that the modal can be closed:

       - by clicking on the close icon ("x");
       - by clicking on the Close button;
       - by clicking anywhere outside the modal area.      
    
29. On Gameplay page, on Rookie difficulty setting, find two matching tiles. Remember their positions.   
Click the Restart button. Check that the game is restarted with the same number of tiles (16).   
Check that the tiles in the positions of the two previous tiles are now different.

30. On Gameplay page, on Rookie difficulty setting, complete a game.   
Check that the Restart button is replaced by a "Play again?" button.   
Click the button. Check that the browser navigates to the Level selection page.

#### Flip cards

31. On Level selection page, for each of the three level cards:

       - check that on hover, the card "flips", and it flips back when the mouse pointer leaves it;   
       - check that the card's flip side displays the respective level's settings (number of pairs and tile sample);
       - check that, when the card is flipped and clicked, the Gameplay opens with the chosen difficulty level.


### Responsive Design

32. Using Google Chrome Development Tools in Responsive view, check the rendering and layout of each of the three pages in the following width ranges:
    1. below 576px;
    2. at and above 576px but below 768px;
    3. at and above 768px but below 992px;
    4. at and above 992px but below 1200px;
    5. at and above 1200px but below 1700px;
    6. at and above 1700px;

33. For screen widths 1700px and above, on Gameplay page:

     - check that the in-game messages are no longer displayed above the tile area;
     - check that the cartoon "avatar" is displayed to the left of the tile area;
     - check that in-game messages are displayed in a message bubble above the "avatar".
 
34. Using Google Chrome Development Tools in Emulated Device view, check the rendering and layout of each of the three pages on the following emulated devices:
    - iPad Pro (large screen),
    - Kindle Fire HDX (medium screen),
    - Galaxy S5 (extra small screen).
 
35. Check the rendering and layout of each of the three pages on a physical device of your choice.








