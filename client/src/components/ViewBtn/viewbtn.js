import React from "react";


function ViewBtn(props) {
  return (
       <a rel="noopener noreferrer" href={props.link} target="_blank">
    <button className="btn btn-primary" {...props} type="button" tabIndex="1" >
       MORE INFO
    </button>
    </a>
  );
}

export default ViewBtn;