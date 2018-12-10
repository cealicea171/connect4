//creates an array for the game to alternate between users
const USERS = ["player1", "player2"];
//these create values in the array for the players, 0 and 1 are for the places
//creates an array for colors so colors can be alternated
var playercolordefault = ["purple", "red"];
// thesestates the values for the array
//make an active player variable so the person knows what active player is playing
//  making a variable for The player to always be null making the player player 1 at the beginning and after the win
var activeplayer = "";
//  variable -the beginning player will be null to make it player 1, for when the game starts
var beginningplayer = "";
// variable-the number of clicks back to 0 when the game is loaded or when there is a win.
var numberofclicks = 0;
//define the checkers as variables ( the checkers)
var checkp = document.getElementById("checkerp");
var checkt = document.getElementById("checkert");
//make an empty array for the game board so we can have the positions for the actual game
var grid = [];
//grabs the id from the html to make it a currentplayer
var currentplayer = document.getElementById("player");

//SET UP GAME FUNCTION
const setUp = () => {
  resetGrid();
  makeGrid();
  // put these at the end basically so it can start the game over after a win at null and player 1
  numberofclicks = 0;
  activeplayer = "";
};

// when the webpage loads up go to the setup function
window.onload = setUp;

// a function that says if there is another table clear it so it doesnt add more boards
const clearElement = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};


//RESET Function so that the board runs a blank board
const resetGrid = () => {
  //make grid of the game board null
  grid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];
};


// the function that  makes a grid
const makeGrid = () => {
  // selects the  table element
  const tableEl = document.querySelector('table');
  //The Document method querySelector() returns the first Element within the document that matches the specified selector, or group of selectors. If no matches are found, null is returned.
  // runs the  clearElement function
  clearElement(tableEl);

  // row is coordY
  grid.forEach((row, coordY) => {
    // creates a table row element
    const rowEl = document.createElement('tr');
    // creates row
    //column is coordX
    row.forEach((cell, coordX) => {
      //creates a column
      const cellEl = document.createElement('td');
      // create its col and row number
      //this stores coordinates
      const cellCoords = [coordX, coordY];

      if (cell) {
        // it fills the table cell with the checker,
        // create a cell like text child.
        const cellText = document.createTextNode(cell);
        //the createTextNode() method creates a Text Node with the specified text.
        //add celltext to the cell element
        cellEl.appendChild(cellText);
        //The appendChild() method appends a node as the last child of a node.
      } else {
        // or else if the cell is still empty, add listeners for click and keyboard
        //function ()	Required. Specifies the function to run when the event occurs.
        // this function is saying when you click the cell alternate players and then go to the store cell function and pass the coordinates to that function

        //this is basically saying alternate players and starts storing the coordinates to start the game
        cellEl.addEventListener('click', function() {
          //  //The addEventListener() method attaches an event handler to the specified element.
          //if active player is player 1, then the player is player 2
          if (activeplayer === "player1") {
            activeplayer = USERS[1];
          }
          //if activeplayer is player 2, alternate to player 1
          else {
            activeplayer = USERS[0];
          }

          //send the coordinates to store cell function
          storecell(cellCoords)
        });
        //The addEventListener() method attaches an event handler to the specified element.
        // the event parameter is a Required. A String that specifies the name of the event.

        cellEl.setAttribute("id", "_" + cellCoords);
        //add id for each cell so i can pinpoint each cell as needed
      }

      // add the cell to the row
      rowEl.appendChild(cellEl);
    });

    // add the row to the table
    tableEl.appendChild(rowEl);
    //Set id of table to table. This is so i can pinpoint the table as a whole if needed.
    tableEl.setAttribute("id", "table");

  });

};
// ****************************THESE FUNCTIONS ARE WHAT MAKE THE GAME *************************************************************************
//get the coordinates from the click
// Store cell function is the function to store the coordinates and pass them to the addSymbol
function storecell(cellclick2) {
  //get the cell from the cell ID
  var indicell = document.getElementById("_" + cellclick2);
  //Indicell is the individual cell
  // the argument cellclick2 are the coordinates  //i put _ before the coordinates because i wanted to add something before the coordinates in the id


  // this is basically setting up for player 1
  //if active player is 1 and the cell has nothing in it(blank background).....
  if (activeplayer === "" || activeplayer === "player1" && indicell.style.backgroundColor === "") {
    //if u dont put this then it will change the checker one clicked

    addSymbol(USERS[0], indicell, cellclick2);
    //You pass through the first value in USERS which is player1. cellclick2 are the coordinates
    //U are passing those three things to the addSymbol function


  }

  //this is setting up for player 2
  if (activeplayer === "player2" && indicell.style.backgroundColor === "") {

    //go to add symbol to add the symbol
    addSymbol(USERS[1], indicell, cellclick2);
    ////You pass through the second index in USERS which is player2. Indicell is the individual cell and cellclick2 are the coordinates
    //U are passing those three tjings to the addSymbol function


  }

}

//function to add the symbol and stop the multiple clicking to change checkers(checker stays)
//addSymbol adds the color
//turn is who the player is
//cellclick2 is the individual cell
//coordinates are the coordinates for the cell
function addSymbol(turn, cellclick2, coordinates) {
  //The innerHTML property sets or returns the HTML content (inner HTML) of an element.
  // inside the paragraph element write in html whats inside this string
  currentplayer.innerHTML = "The player who last clicked is: " + activeplayer;
  //if it is player 1 and there is no background color
  if (turn === "player1" && cellclick2.style.backgroundColor === "") {


    //make the background color of the cell purple
    cellclick2.style.backgroundColor = "purple";
    numberofclicks++;

  }
  //if it is player1 and there is no background color
  if (turn === "player2" && cellclick2.style.backgroundColor === "") {

    //make the cell background color red
    cellclick2.style.backgroundColor = "red";
    numberofclicks++;

  }
  //check if there are any wins
  checkForWin(turn, coordinates, cellclick2, numberofclicks);
}
//this is the function to check if any players won
//pass all 4 arguments to this function
function checkForWin(turn, coordinates, indivcell, numberofclicks) {
  //make the variables for columns and rows, each have their own coordinates
  // x is column and y is row
  //coordinates[0]; is x!
  //coordinates[1]; IS Y
  var column = coordinates[0];
  var row = coordinates[1];

  //place the active player inside the grid
  grid[row][column] = activeplayer;

  //if it is player 1
  if (activeplayer === "player1") {

    //check for win horizontally from right to left.

    if (grid[row][column] === "player1" && grid[row][column + 1] === "player1" && grid[row][column + 2] === "player1" && grid[row][column + 3] === "player1") {

      alert("PURPLE HAS WON");
      setUp();
    }
    //check for win horizontally from left to right
    if (grid[row][column] === "player1" && grid[row][column - 1] === "player1" && grid[row][column - 2] === "player1" && grid[row][column - 3] === "player1") {

      alert("PURPLE HAS WON");
      setUp();
    }
    //check for diagonals
    //left to right upwards diagnoal
    if (grid[row][column] === "player1" && grid[row - 1][column + 1] === "player1" && grid[row - 2][column + 2] === "player1" && grid[row - 3][column + 3] === "player1") {

      alert("PURPLE HAS WON");
      setUp();
    }
    //right to left upwards diagnoal
    if (grid[row][column] === "player1" && grid[row - 1][column - 1] === "player1" && grid[row - 2][column - 2] === "player1" && grid[row - 3][column - 3] === "player1") {

      alert("PURPLE HAS WON");
      setUp();
    }
    //left to right downwards diagnoal
    if (grid[row][column] === "player1" && grid[row + 1][column - 1] === "player1" && grid[row + 2][column - 2] === "player1" && grid[row + 3][column - 3] === "player1") {

      alert("PURPLE HAS WON");
      setUp();
    }
    //right to left downwards  diagnoal
    if (grid[row][column] === "player1" && grid[row + 1][column + 1] === "player1" && grid[row + 2][column + 2] === "player1" && grid[row + 3][column + 3] === "player1") {

      alert("PURPLE HAS WON");
      setUp();
    }
    // for up to down vertcial
    if (grid[row][column] === "player1" && grid[row - 1][column] === "player1" && grid[row - 2][column] === "player1" && grid[row - 3][column] === "player1") {

      alert("PURPLE HAS WON");
      setUp();
    }
    //down to up vertical
    if (grid[row][column] === "player1" && grid[row + 1][column] === "player1" && grid[row + 2][column] === "player1" && grid[row + 3][column] === "player1") {

      alert("PURPLE HAS WON");
      setUp();
    }
  }

  //if player 2 was the active player
  if (activeplayer === "player2") {
    //right to left horizontal
    if (grid[row][column] === "player2" && grid[row][column + 1] === "player2" && grid[row][column + 2] === "player2" && grid[row][column + 3] === "player2") {

      alert("RED HAS WON");
      setUp();
    }
    //left to right horizontal
    if (grid[row][column] === "player2" && grid[row][column - 1] === "player2" && grid[row][column - 2] === "player2" && grid[row][column - 3] === "player2") {

      alert("RED HAS WON");
      setUp();
    }
    //left to right diagnoal downwards
    if (grid[row][column] === "player2" && grid[row - 1][column + 1] === "player2" && grid[row - 2][column + 2] === "player2" && grid[row - 3][column + 3] === "player2") {

      alert("RED HAS WON");
      setUp();
    }
    //right to left diagnoal downwards
    if (grid[row][column] === "player2" && grid[row - 1][column - 1] === "player2" && grid[row - 2][column - 2] === "player2" && grid[row - 3][column - 3] === "player2") {

      alert("RED HAS WON");
      setUp();
    }

    //up to down vertical
    if (grid[row][column] === "player2" && grid[row - 1][column] === "player2" && grid[row - 2][column] === "player2" && grid[row - 3][column] === "player2") {

      alert("RED HAS WON");
      setUp();
    }
    // down to up vertical
    if (grid[row][column] === "player2" && grid[row + 1][column] === "player2" && grid[row + 2][column] === "player2" && grid[row + 3][column] === "player2") {

      alert("RED HAS WON");
      setUp();
    }


    //diagnoal left to right upwards
    if (grid[row][column] === "player2" && grid[row + 1][column - 1] === "player2" && grid[row + 2][column - 2] === "player2" && grid[row + 3][column - 3] === "player2") {

      alert("RED HAS WON");
      setUp();
    }
    // diagnoal right to left upwards
    if (grid[row][column] === "player2" && grid[row + 1][column + 1] === "player2" && grid[row + 2][column + 2] === "player2" && grid[row + 3][column + 3] === "player2") {

      alert("RED HAS WON");
      setUp();
    }
  }
  //go to the same screen as the beginning(blank grid)
  if (numberofclicks >= 41) {
    setUp();
    //tie doesnt work so
  }

}



//module.exports = {
  //onload
//  resetGrid
  //makeGrid
//  storecell
//}
