import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
  const iconStyle = { width: "100px", height: "100px" };

  return (
    <>
      <div className="overlay show"></div>
      <div className="spanner show">
        {/* <div class="loader"></div> */}
        <div className="d-flex justify-content-center align-item-center">
          <div className="spinner-border" style={iconStyle} role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
}
