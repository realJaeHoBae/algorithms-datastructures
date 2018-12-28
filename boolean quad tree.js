/**
 * // Definition for a QuadTree node.
 * function Node(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *    this.val = val;
 *    this.isLeaf = isLeaf;
 *    this.topLeft = topLeft;
 *    this.topRight = topRight;
 *    this.bottomLeft = bottomLeft;
 *    this.bottomRight = bottomRight;
 * };
 */

var construct = (grid, sR = 0, eR = grid.length - 1, sC = 0, eC = grid.length - 1, node = { val : '', isLeaf : true, topLeft : null , topRight : null , bottomLeft : null ,bottomRight : null }) => {
  let reference = grid[sR][sC], willBreak = false;
  node.val = reference;
  
  for (let row = sR; row <= eR; row++) {
    for (let col = sC; col <= eC; col++) {
      if (grid[row][col] !== reference) {
        node.isLeaf = false; node.val = '';
        node.topLeft = construct(grid, sR, Math.floor((sR + eR)/2), sC, Math.floor((eC + sC)/2), { val : '', isLeaf : true, topLeft : null , topRight : null , bottomLeft : null , bottomRight : null });
        node.topRight = construct(grid, sR, Math.floor((eR + sR)/2), Math.ceil((eC + sC)/2), eC, { val : '', isLeaf : true, topLeft : null , topRight : null , bottomLeft : null , bottomRight : null });
        node.bottomLeft = construct(grid, Math.ceil((sR + eR)/2), eR, sC, Math.floor((eC + sC)/2), { val : '', isLeaf : true, topLeft : null , topRight : null , bottomLeft : null , bottomRight : null });
        node.bottomRight = construct(grid, Math.ceil((eR + sR)/2), eR, Math.ceil((eC + sC)/2), eC, { val : '', isLeaf : true, topLeft : null , topRight : null , bottomLeft : null , bottomRight : null });
        willBreak = true;
        break;
      }
    }
    if (willBreak) { break; }
  }
  
  return node;
};



let grid = [
  [true, true, false, false],
  [true, true, false, false],
  [true, true, false, true],
  [true, false, true, false]
];


console.log(construct(grid));