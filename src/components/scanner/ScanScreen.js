import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function ScanScreen(props) {
  const [image, setImage] = useState(undefined);
  const [crop, setCrop] = useState({
    x: 10,
    y: 10,
    width: 100,
    height: 100
  });

  function encodeBlob(blob) {
    var reader = new FileReader();
    reader.onloadend = function() {
      let base64data = reader.result;
      props.onUpload(base64data);
    };
    reader.readAsDataURL(blob);
  }

  function getCroppedImage() {
    if (image) {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const width = crop.width * scaleX;
      const height = crop.height * scaleY;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        width,
        height,
        0,
        0,
        width,
        height
      );

      canvas.toBlob(encodeBlob, 'image/png');
    }
  }

  return (
    <>
      <div className="w-100 mt-3">
        <button
          className="btn btn-primary btn-block mb-3"
          onClick={getCroppedImage}
        >
          Enviar
        </button>
        <ReactCrop
          src={props.image}
          crop={crop}
          onImageLoaded={(image, crop) => setImage(image)}
          onChange={crop => {
            setCrop(crop);
          }}
          alt="imagen"
        />
      </div>
    </>
  );
}
