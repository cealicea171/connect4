//creates an array for the game to alternate between users
const USERS = [];
//players in array
USERS[0] = "player1";
USERS[1] = "player2";
//creates an array for colors so colors can be alternated
var playercolordefault = [];
playercolordefault[0] = "purple";
playercolordefault[1] = "red";
//make an active player variable so the person knows what active player is playing
var activeplayer = "";
var beginningplayer = "";
var numberofclicks = 0;
//define the checkers as variables
var checkp = document.getElementById("checkerp");
var checkt = document.getElementById("checkert");
//make an array for the game board so we can have the positions for the actual game
var grid = [];
var currentplayer = document.getElementById("player");

//SET UP GAME FUNCTION
const setUp = () => {
  resetGrid();
  makeGrid();
  numberofclicks = 0;
  activeplayer = "";
};

//when the webpage loads up go to the setup function
window.onload = setUp;

//clear the element of table from the webpage if there so we can create a new one
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



const makeGrid = () => {
  // selects the  table element
  const tableEl = document.querySelector('table');
  //The Document method querySelector() returns the first Element within the document that matches the specified selector, or group of selectors. If no matches are found, null is returned.
  // runs the  clearElement function
  clearElement(tableEl);

  // for each method with 2 parameters
  grid.forEach((row, coordY) => {
    // creates a table row element
    const rowEl = document.createElement('tr');
    // creates row

    row.forEach((cell, coordX) => {
      //creates a table column element
      const cellEl = document.createElement('td');
      // create its col and row number
      const cellCoords = [coordX, coordY];

      if (cell) {
        // it fill the table cell with the checker,
        // create a cell like text child.
        const cellText = document.createTextNode(cell);
        //he createTextNode() method creates a Text Node with the specified text.
        //add it to the cell element
        cellEl.appendChild(cellText);
        //The appendChild() method appends a node as the last child of a node.
      } else {
        // if the cell is still empty, add listeners for click and keyboard
        //The addEventListener() method attaches an event handler to the specified element.

        //function ()	Required. Specifies the function to run when the event occurs.
        // this function is saying when you click the cell alternate players and then go to the store cell function and pass the coordinates to that function
        cellEl.addEventListener('click', function() {
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
        cellEl.addEventListener('keyup', (event) => {
          ////When a key on the keyboard is pressed, your browser fires a "keydown" event. When it is released, you get a "keyup" event.
          if (event.key === "Enter") {
            addSymbol(USERS[turn], cellCoords);
          }
        });
        cellEl.className = 'empty';
        //className gets and sets the value of the class attribute of the specified element
        // and a tabindex to enable keyboard interaction
        //Sets the value of an attribute on the specified element.
        cellEl.setAttribute('tabindex', '0');
        //The tabindex global attribute indicates if its element can be focused, and if/where it participates in sequential keyboard navigation
        cellEl.setAttribute("id", "_" + cellCoords);
        //Sets the value of an attribute on the specified element.
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
  //Indicell is the individual cell and cellclick2 are the coordinates
  //I put that because when i added a id for the cells i put _ before the coordinates because i wanted to add something before the coordinates in the id



  //if active player is 1 and the cell has nothing in it(blank background).....
  if (activeplayer === "" || activeplayer === "player1" && indicell.style.backgroundColor === "") {


    addSymbol(USERS[0], indicell, cellclick2);
    //You pass through the second index in USERS which is player2. Indicell is the individual cell and cellclick2 are the coordinates
    //U are passing those three tjings to the addSymbol function


  }

  //same as before just with player 2
  if (activeplayer === "player2" && indicell.style.backgroundColor === "") {

    //go to add symbol to add the symbol
    addSymbol(USERS[1], indicell, cellclick2);
    ////You pass through the second index in USERS which is player2. Indicell is the individual cell and cellclick2 are the coordinates
    //U are passing those three tjings to the addSymbol function


  }

}



module.exports = {
  onload
  resetGrid
  makeGrid
  storecell
};
