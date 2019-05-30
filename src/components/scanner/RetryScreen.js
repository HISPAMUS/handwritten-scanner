import React from "react";

export default function RetryScreen(props) {
  return (
    <div className="w-100 my-3">
      <div className="my-3">
        Ups! Algo ha ido mal{" "}
        <span role="img" aria-label="">
          🤷🏽‍♀️
        </span>
      </div>

      <button className="btn btn-primary w-100" onClick={props.onReset}>
        Vuelve a intentarlo
      </button>
    </div>
  );
}
