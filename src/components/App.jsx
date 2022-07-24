import React from "react";
import CreateGrids from "./CreateGrids";
function App() {
  return (
    <div>
      <div  className="heading">
        <h1>Path Finding Algorithms</h1>
        {/* <button className = "btn reset btn-lg btn-info" >Help</button> */}
      </div>
      <CreateGrids />
      <div className="copyright"><h6>© Namarth 2022</h6></div>
    </div>
  );
}

export default App;