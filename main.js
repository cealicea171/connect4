const USERS = ['player1', 'player2'];




//SET UP GAME FUNCTION
const setUp = () => {
  resetGrid();
  makeGrid();

};
window.onload = setUp;

const clearElement = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};


//RESET Function so that the board runs a blank board
const resetGrid = () => {

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
  // grabs the  table element
  const tableEl = document.querySelector('table');
  // calls clearElement function
  clearElement(tableEl);

  // for each method with 2 parameters
  grid.forEach((row, coordY) => {
    // creates a table row element
    const rowEl = document.createElement('tr');
// creates row

    row.forEach((cell, coordX) => {
      //creates a table cell element
      const cellEl = document.createElement('td');
      // store its col and row number
      const cellCoords = [coordX, coordY];

      if (cell) {
        // it fill the table cell with the checker, if it exists
        const cellText = document.createTextNode(cell);
        cellEl.appendChild(cellText);
      } else {
        // if the cell is still empty, add listeners for click and keyboard =
        cellEl.addEventListener('click', () => addSymbol(USERS[turn], cellCoords));
        cellEl.addEventListener('keyup', (event) => {
          if (event.key === "Enter") {
            addSymbol(USERS[turn], cellCoords);
          }
        });
        cellEl.className = 'empty';
        // and a tabindex to enable keyboard interaction
        cellEl.setAttribute('tabindex', '0');
      }

      // add the cell to the row
      rowEl.appendChild(cellEl);
    });

    // add the row to the table
    tableEl.appendChild(rowEl);
  });
};
