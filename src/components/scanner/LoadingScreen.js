import React from "react";

export default function LoadingScreen() {
  return (
    <div className="w-100 mt-2">
      <div className="d-flex flex-column flex-sm-row justify-content-sm-end">
        <div
          className="d-inline-block mb-3 mx-sm-1 skeleton"
          style={{minWidth: '15ex'}}
        >
          &nbsp;
        </div>
        <div
          className="d-inline-block mb-3 mx-sm-1 skeleton"
          style={{minWidth: '15ex'}}
        >
          &nbsp;
        </div>
      </div>
      <div className="d-block mr-3 skeleton" style={{width: '25ex'}}>
        &nbsp;
      </div>
      <div className="d-block w-100 mt-4 skeleton" style={{height: '100px'}}>
        &nbsp;
      </div>
    </div>
  );
}
