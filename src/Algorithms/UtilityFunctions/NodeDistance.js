// The following function will help us to sort the Nodes based on the distance from the parent node
function NodeSortingByDistance(nodesUnvisited) {
    nodesUnvisited.sort(function(A, B) {
        return A.distance - B.distance
    });
}
export default NodeSortingByDistance;