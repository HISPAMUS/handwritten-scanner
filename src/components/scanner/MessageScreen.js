import React from "react";

export default function Message(props) {
  return (
    <div className="w-100 my-3">
      <div className={`alert alert-${props.variant}`} role="alert">
        {props.text}
      </div>

      <button
        className="btn btn-primary w-100"
        onClick={props.onReset}
      >
        Volver a empezar
      </button>
    </div>
  );
}
