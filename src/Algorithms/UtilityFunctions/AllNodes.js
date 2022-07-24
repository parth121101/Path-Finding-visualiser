// The following function is to store all the nodes present in the grid
function AllNodes(grid){
    const allnodes = [];
    for(const row of grid){
        for(const node of row){
            allnodes.push(node)
        }
    }
    return allnodes;
}
export default AllNodes;