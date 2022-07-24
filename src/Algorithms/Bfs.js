import UpdateInfoOfUnvisitedNeighbors from "./UtilityFunctions/UnvisitedNeighbours.js";
import GetTheNeighbourDfs from "./UtilityFunctions/GetNeighbourDFS.js";
function Bfs(grid, start, end) {
  start.distance = 0;
  let stack = [start];
  const visitedNodesInOrder = [];
  let current;
  
  while (stack.length !== 0) {
    current = stack.shift();
    if (current === end) {return visitedNodesInOrder;}
    if(current.distance===Infinity){return visitedNodesInOrder;}
    if (!current.isVisited) {
      current.isVisited = true;
      visitedNodesInOrder.push(current);
      UpdateInfoOfUnvisitedNeighbors(current,grid,"bfs");
      const neighbour_curr = GetTheNeighbourDfs(current,grid);
      for (let i=0;i<neighbour_curr.length;i++) {
        let neighbour = neighbour_curr[i];
        if (!neighbour.isVisited && !neighbour.isWall) {
          stack.push(neighbour);
        }
      }
    }
  }
  return visitedNodesInOrder;
}
export default Bfs;