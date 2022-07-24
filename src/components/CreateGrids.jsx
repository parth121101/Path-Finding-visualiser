import React, { useEffect, useState } from "react";
import CreateNode from "./CreateNode";
import Dijkstra from "../Algorithms/Dijkstra";
import Dfs from "../Algorithms/Dfs";
import Bfs from "../Algorithms/Bfs";
import GetNodesOfPath from "../Algorithms/UtilityFunctions/GetPathNodes";

function CreateGrids(){
  const NumOfCols = 35; // Will store the number of rows in the grid
  const NumOfRows = 12; // Will store the number of columns in the grid
  let isStartAssigned = false; // Will store if the start node is assigned or not
  let isEndAssigned = false; // Will store if the end node is assigned or not
  let startNode = null; // Will store the start node
  let endNode = null; // Will store the end node
  const [Grid, setGrid] = useState([]); // This is the hook grid of nodes 
  const [PathDijkstra, setPathDijkstra] = useState([]); // This is the hook to store the path in Dijkstra from start to end node
  const [NeighDijkstra, setNeighDijkstra] = useState([]);// This is the hook to store all the visited nodes in Dijkstra
  const [PathDFS, setPathDFS] = useState([]); // This is the hook to store the path in DFS from start to end node
  const [NeighDFS, setNeighDFS] = useState([]); // This is the hook to store all the visited nodes in Dijkstra
  const [PathBFS, setPathBFS] = useState([]); // This is the hook to store the path in BFS from start to end node
  const [NeighBFS, setNeighBFS] = useState([]); // This is the hook to store all the visited nodes in Dijkstra
  useEffect(function () {
    CreateGrid();
  },10);
  // The following function will assign the grid with rows and coloumns specified 
  function CreateGrid(){
    const grid = new Array(NumOfRows);
    for (let i = 0; i < NumOfRows; i++) {
      grid[i] = new Array(NumOfCols);
    }  
    AddDetails(grid);
    setGrid(grid);
  }
  // The following two function will add some identity to the nodes of the grid
  function AddDetails(grid) {
    for (let i = 0; i < NumOfRows; i++) {
      for (let j = 0; j < NumOfCols; j++) {
        grid[i][j] = new Details(i, j);
      }
    }
  }
  class Details {
    constructor(i, j) {
      this.row = i; // To store the row number
      this.col = j; // To store the column number
      this.distance = Infinity; // To store its distance from the start node
      this.isVisited = false; // To store if it is visited or not
      this.isWall = false; // To store if its a wall or not
      this.previousNode = null; // To store its previous nodes
      if (Math.random(1) < 0.2) {
        // To randomly assign 20% nodes with walls 
        this.isWall = true;
      }
      this.start = false; // To store if the node is start node or not
      this.end = false; // To store if the node is end node or not
      // If we don't want to choose start and end manually we can fix it
      // this.start = (i==0 && j==0)?true:false;
      // this.end = (i==6 && j==10)?true:false;
    }
  }
  // The following two functions will assign the start and end node with the mouse click
  function handleMouseClick(row,col){
    const AssignedGrid  = AssignStartEndNode(Grid,row,col);
    setGrid(AssignedGrid);
  }
  function AssignStartEndNode(Grid,row,col) {
    const AssignedGrid = Grid;
    const node = AssignedGrid[row][col];
    // A new copy grid id made and the node which is click is set to start node and if already start node then to end node
    // Rest all nodes remain as it is
    const AssignedNode = {
      ...node,
      start: (!isStartAssigned)?true:false, // If the start node is assigned we check if end node is assigned or not
      end: (isStartAssigned && !isEndAssigned)?true:false // If the end node is also assigned then no need to do response on the click
    };
    if(!isStartAssigned){
      isStartAssigned=true; 
    }
    else if(!isEndAssigned){
      isEndAssigned=true;
    }    
    AssignedGrid[row][col] = AssignedNode;
    return AssignedGrid;
  }
  // The following function assigns the locally assigned start and end nodes to the variables startNode and endNode
  function SetNodes(){
    for(let i=0;i<NumOfRows;i++){
      for(let j=0;j<NumOfCols;j++){
        if(Grid[i][j].start === true){
          startNode = Grid[i][j];
        }
        else if(Grid[i][j].end === true){
          endNode = Grid[i][j];
        }
      }
    }
    // Also this function checks if the startNode and endNode are assigned and if they are assigned it compleates all the 
    // path finding algorithms and save the result in the Path and visited node array.
    if(startNode!==null && endNode!==null){
      let NodesVisited = Dijkstra(Grid,startNode, endNode);
      let PathFound = GetNodesOfPath(endNode);
      setNeighDijkstra(NodesVisited);
      setPathDijkstra(PathFound);
      Getoriginal();
      NodesVisited = Dfs(Grid,startNode, endNode);
      PathFound = GetNodesOfPath(endNode);
      setNeighDFS(NodesVisited);
      setPathDFS(PathFound);
      Getoriginal();
      NodesVisited = Bfs(Grid,startNode, endNode);
      PathFound = GetNodesOfPath(endNode);
      setNeighBFS(NodesVisited);
      setPathBFS(PathFound);
      Getoriginal();
    }
  }
  // After every path finding algorithm the details of the nodes are updated, so to reset it to the original details 
  // the following function is used 
  function Getoriginal(){
    for(let i=0;i<NumOfRows;i++){
      for(let j=0;j<NumOfCols;j++){
        const current_node = Grid[i][j];
        current_node.distance = Infinity;
        current_node.isVisited = false;
        current_node.previousNode = null;
      }
    }
  }
  // The following function fully visualizes the dijkstra Algorithm with all visited nodes and also the path found
  function VisualizeDijkstra(){
    for(let i=0;i<NumOfRows;i++){
      for(let j=0;j<NumOfCols;j++){
        const current_node = Grid[i][j];
        document.getElementById("node-" + current_node.row + "-" + current_node.col).className = "gridBlock clearNode";
      }
    }
    for(let i = 0; i<=NeighDijkstra.length ; i++){
      if(i===NeighDijkstra.length){
        setTimeout(() => {
          ShortestPathAnimation(PathDijkstra,"dijkstra");
        },20*i);
      }
      else{
        setTimeout(() => {
          const node = NeighDijkstra[i];
          if(!(node.start) && !(node.end)){
            document.getElementById("node-" + node.row + "-" + node.col).className = "gridBlock VisitedDijkstraNode VisitedNode";
          }
          
        },20*i);
      }
    }
  }
  // The following function fully visualizes the DFS Algorithm with all visited nodes and also the path found
  function VisualizeDFS(){
    for(let i=0;i<NumOfRows;i++){
      for(let j=0;j<NumOfCols;j++){
        const current_node = Grid[i][j];
        document.getElementById("node-" + current_node.row + "-" + current_node.col).className = "gridBlock clearNode";
      }
    }
    for(let i = 0; i<=NeighDFS.length ; i++){
      if(i===NeighDFS.length){
        setTimeout(() => {
          ShortestPathAnimation(PathDFS,"dfs");
        },50*i);
      }
      else{
        setTimeout(() => {
          const node = NeighDFS[i];
          if(!(node.start) && !(node.end)){
            document.getElementById("node-" + node.row + "-" + node.col).className = "gridBlock VisitedDFSNode VisitedNode";
          }
        },50*i);
      }
    }
  }
  // The following function fully visualizes the DFS Algorithm with all visited nodes and also the path found
  function VisualizeBFS(){
    for(let i=0;i<NumOfRows;i++){
      for(let j=0;j<NumOfCols;j++){
        const current_node = Grid[i][j];
        document.getElementById("node-" + current_node.row + "-" + current_node.col).className = "gridBlock clearNode";
      }
    }
    for(let i = 0; i<=NeighBFS.length ; i++){
      if(i===NeighBFS.length){
        setTimeout(() => {
          ShortestPathAnimation(PathBFS,"bfs");
        },20*i);
      }
      else{
        setTimeout(() => {
          const node = NeighBFS[i];
          if(!(node.start) && !(node.end)){
            document.getElementById("node-" + node.row + "-" + node.col).className = "gridBlock VisitedBFSNode VisitedNode";
          }
        },20*i);
      }
    }
  }
  function ShortestPathAnimation(PathArray,algo){
    for(let i = 1; i<PathArray.length-1; i++){
      setTimeout(() => {
        const node = PathArray[i];
        if(algo==="dijkstra"){
          document.getElementById("node-" + node.row + "-" + node.col).className = "gridBlock PathNodes PathDijkstraNodes";
        }
        else if(algo==="bfs"){
          document.getElementById("node-" + node.row + "-" + node.col).className = "gridBlock PathNodes PathBFSNodes";
        }
        else if(algo==="dfs"){
          document.getElementById("node-" + node.row + "-" + node.col).className = "gridBlock PathNodes PathDFSNodes";
        }
      }, 30*i);
    }
  }
  // The following function is used to reset the grid with different wall positions
  function reset(){
    window.location.reload(false);
  }
  return(
    <div className="gridWrapper">
      <div className="buttons">
        <button className = "btn dijkstra  btn-lg btn-info" onClick={VisualizeDijkstra}>Dijkstra</button>
        <button className = "btn bfs  btn-lg btn-info" onClick={VisualizeBFS}>BFS</button>
        <button className = "btn dfs  btn-lg btn-info" onClick={VisualizeDFS}>DFS</button>
        <button className = "btn setNodes  btn-lg btn-info" onClick={SetNodes}>Set Nodes</button>
        <button className = "btn reset btn-lg btn-info" onClick={reset}>Reset</button>
      </div>
      <div className="Headers">
        <div className="colorHeader" style={{backgroundColor: "green"}}></div>
        <span className="subHeading">Start Node</span>
        <div className="colorHeader" style={{backgroundColor: "purple"}}></div>
        <span className="subHeading">End Node</span>
        <div className="colorHeader" style={{backgroundColor: "black"}}></div>
        <span className="subHeading">Wall</span>
        <div className="colorHeader" style={{backgroundColor: "#bef9b2"}}></div>
        <span className="subHeading">Dijkstra spread</span>
        <div className="colorHeader" style={{backgroundColor: "#fc0026"}}></div>
        <span className="subHeading">Dijkstra path</span>
        <div className="colorHeader" style={{backgroundColor: "#8ecdf8"}}></div>
        <span className="subHeading">BFS spread</span>
        <div className="colorHeader" style={{backgroundColor: "#FFC900"}}></div>
        <span className="subHeading">BFS path</span>
        <div className="colorHeader" style={{backgroundColor: "#F6C6EA"}}></div>
        <span className="subHeading">DFS spread</span>
        <div className="colorHeader" style={{backgroundColor: "#f77a44"}}></div>
        <span className="subHeading">DFS path</span> 
      </div>
      {Grid.map(function(row, rowindex){
        return (
          <div key={rowindex} className="GridRowWrapper">
            {row.map(function(col, colindex) {
              return <CreateNode onMouseClick={(row, col) => handleMouseClick(row, col)} row={rowindex} col={colindex} key={colindex} customStyle = {col.start?{backgroundColor: "green"}:col.end?{backgroundColor:"purple"}:col.isWall?{backgroundColor:"black"}:{}} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CreateGrids;