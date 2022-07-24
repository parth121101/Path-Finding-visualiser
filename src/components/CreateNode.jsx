import React from "react";
function CreateNode(props) {
  return <div onClick={() => props.onMouseClick(props.row, props.col)} id={"node-" + props.row + "-" + props.col} className="gridBlock" style={props.customStyle}></div>;
}
export default CreateNode;