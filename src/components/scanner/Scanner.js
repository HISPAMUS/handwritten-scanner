import React, { useEffect, useReducer } from "react";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import LoadingScreen from "./LoadingScreen";
import MessageScreen from "./MessageScreen";
import ScoreScreen from "./ScoreScreen";
import ScanScreen from "./ScanScreen";
import UploadScreen from "./UploadScreen";

import { RANDOMURL } from "../../Api";

export const ScannerState = {
  LOADING_SCORE: "loading_score",
  LOAD_ERROR: "load_error",
  LOADED_SCORE: "loaded_score",
  LOADED_IMAGE: "loaded_image",
  CROPPED_IMAGE: "cropped_image",
  UPLOAD_ERROR: "upload_error",
  UPLOADED_IMAGE: "uploaded_image",
  RESET: "reset"
};

const initialState = {
  loading: false,
  error: false,
  score: undefined,
  selectedImage: undefined,
  croppedImage: undefined,
  finished: false
};

function reducer(state, action) {
  switch (action.type) {
    case ScannerState.LOADING_SCORE:
      return { ...state, loading: true };
    case ScannerState.LOAD_ERROR:
      return { ...state, loading: true, error: true };
    case ScannerState.LOADED_SCORE:
      return { ...state, loading: false, error: false, score: action.payload };
    case ScannerState.LOADED_IMAGE:
      return { ...state, selectedImage: action.payload };
    case ScannerState.CROPPED_IMAGE:
      return { ...state, croppedImage: action.payload };
    case ScannerState.UPLOAD_ERROR:
      return { ...state, error: true };
    case ScannerState.UPLOADED_IMAGE:
      return { ...initialState, finished: true };
    case ScannerState.RESET:
      return initialState;
    default:
      throw new Error();
  }
}

export default function Scanner() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function reset() {
    dispatch({ type: ScannerState.RESET });
    loadScore();
  }

  function loadScore() {
    dispatch({ type: ScannerState.LOADING_SCORE });

    fetch(RANDOMURL)
      .then(response => {
        if (response.status === 200) return response.json();
        else throw new Error("No se puede contactar con el servidor");
      })
      .then(response => {
        dispatch({ type: ScannerState.LOADED_SCORE, payload: response });
      })
      .catch(error => {
        dispatch({ type: ScannerState.LOAD_ERROR });
        console.error(error);
      });
  }

  function loadSelectedImage(file) {
    let reader = new FileReader();
    reader.onload = () => {
      dispatch({ type: ScannerState.LOADED_IMAGE, payload: reader.result });
    };
    reader.readAsDataURL(file);
  }

  function uploadCroppedImage(image) {
    dispatch({ type: ScannerState.CROPPED_IMAGE, payload: image });
  }

  useEffect(() => {
    loadScore();
  }, []);

  return (
    <>
      <Header small />
      {state.loading && !state.error && <LoadingScreen />}
      {state.loading && state.error && (
        <MessageScreen
          variant="danger"
          text="Ha ocurrido un error al cargar la imagen"
          onReset={reset}
        />
      )}
      {state.score && !state.selectedImage && (
        <ScoreScreen
          score={state.score}
          onSelect={loadSelectedImage}
          onReset={reset}
        />
      )}
      {state.selectedImage && !state.croppedImage && (
        <ScanScreen image={state.selectedImage} onUpload={uploadCroppedImage} />
      )}
      {state.croppedImage && !state.error && (
        <UploadScreen
          image={state.croppedImage}
          score={state.score}
          onUpload={() => dispatch({ type: ScannerState.UPLOADED_IMAGE })}
          onError={() => dispatch({ type: ScannerState.UPLOAD_ERROR })}
        />
      )}
      {state.croppedImage && state.error && (
        <MessageScreen
          variant="danger"
          text="Ha ocurrido un error al enviar la imagen"
          onReset={reset}
        />
      )}
      {state.finished && (
        <MessageScreen
          variant="success"
          text="¡Gracias por colaborar!"
          onReset={reset}
        />
      )}
      <Footer />
    </>
  );
}
