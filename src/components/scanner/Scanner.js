import React, { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import LoadingScreen from "./LoadingScreen";
import RetryScreen from "./RetryScreen";
import ScoreScreen from "./ScoreScreen";
import CropScreen from "./CropScreen";
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
  reset: true,
  loading: false,
  error: false,
  score: undefined,
  selectedImage: undefined,
  croppedImage: undefined
};

function reducer(state, action) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
    console.log(`action=${action.type}`);

  switch (action.type) {
    case ScannerState.LOADING_SCORE:
      return { ...state, reset: false, loading: true };
    case ScannerState.LOAD_ERROR:
      toast.error("Error al cargar la partitura");
      return { ...state, error: true };
    case ScannerState.LOADED_SCORE:
      return {
        ...state,
        loading: false,
        score: action.payload,
        selectedImage: undefined // In case it comes from CropScreen.onCancel
      };
    case ScannerState.LOADED_IMAGE:
      return {
        ...state,
        error: false,
        selectedImage: action.payload,
        croppedImage: undefined
      };
    case ScannerState.CROPPED_IMAGE:
      return { ...state, error: false, croppedImage: action.payload };
    case ScannerState.UPLOAD_ERROR:
      toast.error("Error al enviar la imagen");
      return { ...state, error: true };
    case ScannerState.UPLOADED_IMAGE:
      toast.success("¡Muchas gracias por colaborar!");
      return initialState;
    case ScannerState.RESET:
      return initialState;
    default:
      throw new Error();
  }
}

export default function Scanner() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
      console.log(state);
  }, [state]);

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

  useEffect(() => {
    if (state.reset) loadScore();
  }, [state.reset]);

  return (
    <>
      <Header small />
      {state.loading && !state.error && <LoadingScreen />}
      {state.loading && state.error && (
        <RetryScreen onReset={() => dispatch({ type: ScannerState.RESET })} />
      )}
      {state.score && !state.selectedImage && (
        <ScoreScreen
          score={state.score}
          onSelect={loadSelectedImage}
          onReset={() => dispatch({ type: ScannerState.RESET })}
        />
      )}
      {state.selectedImage && !state.croppedImage && (
        <CropScreen
          image={state.selectedImage}
          onUpload={image =>
            dispatch({ type: ScannerState.CROPPED_IMAGE, payload: image })
          }
          onCancel={() =>
            dispatch({ type: ScannerState.LOADED_SCORE, payload: state.score })
          }
        />
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
        <RetryScreen
          onReset={() =>
            dispatch({
              type: ScannerState.LOADED_IMAGE,
              payload: state.selectedImage
            })
          }
        />
      )}
      <Footer />
    </>
  );
}
