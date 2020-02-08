# MindGym

MindGym is a browser-based classic Memory game.

## UX
 
### User stories

The website is intended primarily for younger users (children) who enjoy playing Memory. However, the Experienced and Hero difficulty levels may also appeal to older users who like a casual game which also trains their memory. 

The following user stories have been identified:

1. As a user, I want the home screen to be visually appealing, making me want to try the game.
2. As a user, I want to be able to start a game easily.
3. As a user, I want to be able to choose a difficulty level.
4. As a user, I want to be provided with instructions on how to play the game.
5. As a user, I want to be provided with in-game feedback on my progress.
6. As a user, I want to be able to restart the game without going back to the home page.
7. As a user, I want to have a scoreboard to track my progress compared to previous attempts.

### UI structure

Taking into consideration the above user stories, the following basic UI structure has been established:

 - Home page with a large cartoon-style "hero image", a large Play button and a small adjacent Info icon to open Instuctions (in modal format);
 - Level selection page with on-hover flip cards for difficulty level selection, each card providing information (on its flip side) about the respective level's features;
 - Gameplay page, displaying the game tile set and in-game messages, and containing a Restart button.

A top-fixed navigation bar in the header contains the MindGym favicon and navigation links to Home, Level selection and Instructions.

The footer contains copyright information only.

The color palette has been styled to be cartoon-like and vivid but not overwhelming.

Three wireframes were created (using [wireframe.cc](https://wireframe.cc/)) during the initial UI design phase:

[Home page](https://wireframe.cc/uiqQ2d)   
[Level selection](https://wireframe.cc/EaLrPF)  
[Gameplay](https://wireframe.cc/QKaQTL)  

Two details are different in the final game design compared to the wireframes:   
- the Instructions button was replaced by a small Info ("?") icon to avoid having the word "instructions" repeated twice on the same page;
- the "Time elapsed" feature was not implemented in this version due to eventual time constraints; as a result, User story #7 will need to be fulfilled in a future version.

## Features

 
### Existing Features

#### Navigation bar
The top-fixed navigation bar provides the user with links to navigate to Home (via favicon or Home link) and Level selection (via Game link) and to view Instructions. 
The Instructions are always displayed as a modal, thus it is possible to view them from any page, including during a game itself, via the Instructions link in the Navbar.

_Note: The Gameplay page cannot be accessed directly from the Navbar but only via the Level selection page. This is a defensive programming feature to make sure that the game is always started with the intended difficulty level._

#### Home page
The large "Play!" button in the centre of the Home page picture enables the user to go to Level selection to start a game immediately. 
The small Info icon ("?") beside the Play button opens the Instructions modal.

#### Level selection page
The level selection "buttons" are implemented as on-hover flip cards. The front side of each card displays an image symbolic of the respective level, while the flip side displays the level's name and settings (a sample tile and number of tile pairs):
- Rookie, with 8 tile pairs containing different alphabet letters (A-H);
- Experienced, with 12 tile pairs containing different colours;
- Hero, with 18 tile pairs containing different (simplified) playing cards.

Clicking on a flipped card will select the chosen difficulty level and start the game with it.

#### Gameplay page
The central area of the page is occupied by the game tiles. 
Below the "play area" is a Restart button which, if clicked during a game, will restart the game with the same difficulty level (but with rearranged tiles).
Once a game is completed (board clear), the Restart button changes to a "Play again?" button which, if clicked, will navigate the user to Level selection.
A message area, displaying in-game messages, is implemented dynamically:
- at screen widths below 1700px, the message area is above the tile area and displays text only;
- at large desktop widths of 1700px or above, the message area is positioned to the left of the tile area and features an "avatar" (the same cartoon character from the Home page image) and the message appearing in a "message bubble", comics-style. 

### Features Left to Implement
- Add the "Elapsed time" feature (user story #7) and modify the corresponding Game completion message to indicate the time of game completion; possibly add a Pause button;
- Add a "Best times" page, where after a game the user could enter their name and their accomplishment would be displayed in a table sorted by difficilty levels and best times of previous plays; 
- Add a flip animation to game tiles (corresponding to the one on Level selection);
- Add sounds (tile flip, matching tiles, non-matching tiles, game completed...);

## Technologies Used

The languages, frameworks, libraries, and other tools used during this project: 

- HTML5 for page structure and content;
- CSS3 for content styling;
- JavaScript (ES6 to the best of my ability) for game logic/processing and DOM manipulation;
- [jQuery](https://jquery.com/) was used to facilitate DOM manipulation;
- [Bootstrap](https://getbootstrap.com/) was used for navigation bar and modal implementation and some additional styling (buttons); 
  
  _Note: Bootstrap was_ not _used for responsive design as the nature of the game (individual tiles) required additional customisation. CSS Flexbox and media queries were used instead._
- Fonts were obtained from [Google Fonts](https://fonts.google.com/);
- Icons were obtained from [Font Awesome](https://fontawesome.com/);
- Beginner and Expert tile images were created in Microsoft Word;
- [Favicon.io](https://favicon.io/) was used for favicon creation;
- [W3C Markup Validation Service](https://validator.w3.org/) was used to validate HTML and CSS code;
- [JSHint](https://jshint.com/) was used to validate JavaScript code;
- [Jasmine](https://jasmine.github.io/index.html) with [jasmine-jquery](https://www.npmjs.com/package/jasmine-jquery) was used for automated JavaScript testing;
- [W3schools.com Color Converter](https://www.w3schools.com/colors/colors_converter.asp) was used to convert colours between default, HEX and RGB for CSS coding purposes;
- [Autoprefixer CSS online](https://autoprefixer.github.io/) was used for correct vendor prefixing of CSS styles where required;
- [Convertio](https://convertio.co/eps-jpg/) was used for image conversion from EPS (from Shutterstock) to JPEG;
- [Compress JPEG](https://compressjpeg.com/) and [Compress PNG](https://compresspng.com/) for image file size reduction;
- Google Chrome Developer Tools were used for console development and testing, debugging and as a styling aid;
- [Gitpod](https://www.gitpod.io/) was used as the IDE for development and Git version control;
- [GitHub](https://github.com/) was used for source code storage and site deployment (GitHub Pages).




## Deployment

   The deployment version of the source code is stored on [GitHub](https://github.com/), in the master branch of [bravoalpha79/MindGym](https://github.com/bravoalpha79/MindGym).

   From the master branch, the site has been published using [GitHub Pages](https://help.github.com/en/github/working-with-github-pages/creating-a-github-pages-site) using the following procedure:

   1. On the bravoalpha79/MindGym repository page, make sure that the "master" branch is selected.
   2. Click on the Settings tab.
   3. In the GitHub Pages frame, from the Source dropdown menu, choose "master branch".
   4. Scrool back down to the GitHub Pages frame, where the address of the newly-published site is now displayed.

   The deployed site code is identical to the code stored on the master branch on GitHub.

   **The live version of the site is located at:**   
   **https://bravoalpha79.github.io/MindGym/** 

## Credits

### Code
#### HTML and CSS
- The "perfect background image" CSS code snippet (used for styling of background images on all pages) was obtained from [CSS-tricks](https://css-tricks.com/).
- The "message bubble" CSS code snippet was obtained from [Bubbly](https://leaverou.github.io/bubbly/).
- The tile flip animation HMTL/CSS code snippet (for levelselection.html) was obtained from [W3Schools](https://www.w3schools.com/).
- The correct script order for test.html was obtained by taking a peek into a project by **anna_ci**.  
#### JavaScript
- The array generation algorithm was suggested by **Eventyret_mentor**.
- The Shuffle Array algorithm was obtained from [Stack Overflow](https://stackoverflow.com/).
- The localStorage solution was obtained from W3Schools and Stack Overflow.
- The handlers.clickExpect method is based on a video lesson by [Watch and Code](https://watchandcode.com/) and a post on Stack Overflow.

### Media
- All pictures were purchased on [Shutterstock](https://www.shutterstock.com/home), except for the tile background wallpaper which was obtained from [PublicDomainPictures.net](https://www.publicdomainpictures.net/en/index.php).

### Acknowledgements
- A special THANK YOU to **anna_ci** and **Eventyret_mentor** for giving me a generous boost and encouragement when I hit the wall mid-project. I would never have been able to complete this project (let alone in time) and learn so much along the way without their help.
- I received inspiration for this project from my little nephew Gabrijel, who enjoys playing Memory.