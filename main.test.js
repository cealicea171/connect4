const {
onload
resetGrid
makeGrid
storecell
} = require('./main');

describe('setUp', () => {
  test('setup the game when loading', () => {
    expect(onload(function)).toBe(setUp);
  });

  describe('resetGrid', () => {
    test('reset grid function for blank board', () => {
      expect(resetGrid(function)).toBe(null);
    });

describe('makeGrid', () => {
  test('make grid function with clear element to not add more boards', () => {
    expect(makeGrid(function)).toBe(6X7grid);
  });

  describe('storeCell', () => {
    test('store cell get the coordinates from the click', () => {
      expect(storecell(function)).toBe(store the coordinates);
    });
