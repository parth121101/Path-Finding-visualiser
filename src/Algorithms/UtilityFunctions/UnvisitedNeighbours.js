import GetTheNeighbour from "./GetNeighbours";
import GetTheNeighbourDfs from "./GetNeighbourDFS";
//now since we got the neighbours we will update the info of all of these neighbours
function UnvisitedNeighboursSetDetails(node, grid,algo) {
  let neighboursUnvisited;
  if(algo === "dijkstra"){
    neighboursUnvisited = GetTheNeighbour(node, grid);
  }
  else{
    neighboursUnvisited = GetTheNeighbourDfs(node, grid);
  }
    
  for (const neighbour of neighboursUnvisited) {
    neighbour.distance = node.distance + 1;
    neighbour.previousNode = node;
  }
}
export default UnvisitedNeighboursSetDetails;
