function GetTheNeighbourDfs(node,grid){
    const neighbours = [];
    const {col, row} = node;
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    if (row > 0) neighbours.push(grid[row - 1][col]);
    return neighbours.filter(neighbour => !neighbour.isVisited);
  }
export default GetTheNeighbourDfs; 