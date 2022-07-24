// The following function is to get the nodes of the path from start to end node 
function GetNodesOfPath(finishNode) {
    const nodesInPath = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInPath;
}
export default GetNodesOfPath;
  