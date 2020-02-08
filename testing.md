# MindGym Testing

## Code
Before testing the application itself, all code has been tested using online validators:
- [W3C Markup Validation Service](https://validator.w3.org/) for HTML;
- [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/) for CSS;
- [JSHint](https://jshint.com/) for JavaScript.

No code issues have been identified.

## Automated testing

Automated testing of Javascript has been performed using [Jasmine](https://jasmine.github.io/index.html) framework. [jasmine-jquery](https://www.npmjs.com/package/jasmine-jquery) was added to Jasmine as jQuery was also used to develop the app.   
The relevant code for Jasmine tests can be found here:
- [HTML with Jasmine and jasmine-jquery scripts](https://github.com/bravoalpha79/MindGym/blob/master/assets/jasmine-testing/test.html);
- [Jasmine specifications file](https://github.com/bravoalpha79/MindGym/blob/master/assets/jasmine-testing/spec/mindGymSpec.js)

To run the tests:
1. Clone or download the master branch of the [MindGym](https://github.com/bravoalpha79/MindGym) GitHub repository.
2. Load the repository into your IDE.
3. Open the test.html file and run/preview it in your browser.

The automated tests cover 7 of the total 18 functions defined in the JavaScript code. The reason for this rather limited scope of automated tests lies in the fact that this is my first ever project involving Javascript and the first one involving Jasmine. Somewhere in the middle of JS development I ran into some serious issues that I was not able to fix for several days, which cased an eventual overall delay in development, so the time remaining for developing Jasmine tests - which involved a second learning curve - was very restricted.   
For the same reason, TDD was not applied to this project. Instead, Jasmine tests were written once the JavaScript part was completed and proven to be working in all manual tests.

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
     - upon succesful pair matching;
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

14. Using a different web browser, repeat tests 1 through 6.

### Interactive Components

#### Navigation

15. From Home page:  
   - In the Navbar, click on the Navbar favicon. Check that the Home page opens.
   - In the Navbar, click on the _Home_ field. Check that the Home page opens.
   - In the Navbar, click on the _Play_ field. Check that the Level selection page opens.
   - In the Navbar, click on the _Instructions_ field. Check that the Instruction modal opens.

16. From Level selection page, repeat actions 1 through 4 of Test 15.
 
17. From Gameplay page, repeat actions 1 through 4 of Test 15.


#### Buttons and modals

18. On Home page, Click on the "Play!" button. Check that the browser navigates to the Level selection page.   

19. On Home page, click on the Info ("?") icon. Check that the Instructions modal opens.     
    
20. On Gameplay page, on Rookie difficulty setting, find two matching tiles. Remember their positions.   
Click the Restart button. Check that the game is restarted with the same number of tiles (16).   
Check that the tiles in the positions of the two previous tiles are now different.

21. On Gameplay page, on Rookie difficulty setting, complete a game.   
Check that the Restart button is replaced by a "Play again?" button.   
Click the button. Check that the browser navigates to the Level selection page.

#### Flip cards

22. On Level selection page, for each of the three level cards:   
          - check that on hover, the card "flips", and it flips back when the mouse pointer leaves it;   
          - check that the card's flip side displays the respective level's settings (number of pairs and tile sample).
     








