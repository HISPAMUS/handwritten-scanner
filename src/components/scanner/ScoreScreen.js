import React, { useState } from "react";

export default function ScoreScreen(props) {
  const [zoom, setZoom] = useState(false);
  const inputFile = React.createRef();

  function toggleZoom() {
    setZoom(!zoom);
  }

  function handleFileSelected() {
    if (inputFile.current.files && inputFile.current.files.length > 0) {
      props.onSelect(inputFile.current.files[0]);
    }
  }

  return (
    <div className="w-100 mt-2">
      <div className="d-flex flex-column flex-sm-row justify-content-sm-end">
        <button className="btn btn-danger mb-3 mx-1" onClick={props.onReset}>
          <i className="fas fa-sync" /> Cargar otra
        </button>
        <label
          className="btn btn-success mb-3 mx-1"
          htmlFor="inputImage"
          title="Escanear"
        >
          <input
            type="file"
            id="inputImage"
            className="sr-only"
            name="file"
            accept="image/*"
            ref={inputFile}
            onChange={handleFileSelected}
          />
          <i className="fas fa-camera" /> Escanear versión manuscrita
        </label>
      </div>
      <h5 className="my-3">
        {props.score.title} ({props.score.author})
      </h5>
      <div className="overflow-auto mt-3">
        <img
          className={zoom ? "" : "img-fluid"}
          alt="score"
          src={`data:image/png;base64,${props.score.png}`}
          onClick={toggleZoom}
        />
      </div>
      <div className="w-100 mt-3 text-center">
        <button
          className="btn btn-link text-dark text-decoration-none"
          onClick={toggleZoom}
        >
          <i className={"fas fa-search-" + (zoom ? "minus" : "plus")} />{" "}
          <small>Click en la imagen para hacer zoom</small>
        </button>
      </div>
    </div>
  );
}
