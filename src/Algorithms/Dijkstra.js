import AllNodes from "./UtilityFunctions/AllNodes";
import UnvisitedNeighboursSetDetails from "./UtilityFunctions/UnvisitedNeighbours.js";
import NodeSortingByDistance from "./UtilityFunctions/NodeDistance.js";

function Dijkstra(grid, startNode, endNode){
  const nodesUnvisited = AllNodes(grid); // initially all nodes in the grid are unvisited
  const nodesVisited = [];
  startNode.distance = 0;
  while (!!nodesUnvisited.length) {
    NodeSortingByDistance(nodesUnvisited);
    const nearestNode = nodesUnvisited.shift();
    
    if (nearestNode.isWall){
      // If wall is detected we don't visit that node
      continue;
    }
    if (nearestNode.distance === Infinity){
      // If the nearest node is at Infinity distance that means we are surronded by walls so we 
      // should stop here as furthur path is not avaliable.
      return nodesVisited;
    }
    nearestNode.isVisited = true;
    nodesVisited.push(nearestNode);
    if (nearestNode === endNode){
      // If we have reached the endNode we should return  
      return nodesVisited;
    }
    UnvisitedNeighboursSetDetails(nearestNode, grid,"dijkstra");
  }
}
export default Dijkstra;