import React from "react";

function SaveBtn(props) {
  return (
    <button className="btn btn-danger saveBook" {...props} type="button" tabIndex="2" >
      SAVE
    </button>
  );
}

export default SaveBtn;