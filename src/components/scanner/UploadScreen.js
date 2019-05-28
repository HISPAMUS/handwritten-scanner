import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Axios from "axios";

import { UPLOADURL } from "../../Api";

export default function UploadScreen(props) {
  const [progress, setProgress] = useState(25);
  const [uploadData] = useState({
    image: props.image,
    score: props.score,
    onUpload: props.onUpload,
    onError: props.onError
  });

  useEffect(() => {
      let data = {
        png: uploadData.image.replace("data:image/png;base64,", ""),
        id: uploadData.score.id,
        db: uploadData.score.db
      };

      Axios.post(UPLOADURL, data, {
        headers: {
          "Content-Type": "application/json"
        },
        onUploadProgress: p => {
          setProgress(25 + (p.loaded / p.total) * 75);
        }
      })
        .then(data => {
          uploadData.onUpload();
        })
        .catch(error => {
          uploadData.onError();
        });

  }, [uploadData]);

  return (
    <>
      <ProgressBar animated now={progress} className="my-3" />
      <img src={props.image} alt="" className="img-fluid d-block mx-auto" />
    </>
  );
}
