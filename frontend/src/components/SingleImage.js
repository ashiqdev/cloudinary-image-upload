import React from "react";

const SingleImage = ({ image }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ padding: "1rem" }}>
        <h3>Original</h3>
        {image.original && <img src={image.original} alt="Original" />}
      </div>

      <div style={{ padding: "1rem" }}>
        <h3>Resized</h3>
        {image.w200 && <img src={image.w200} alt="resized" />}
      </div>
    </div>
  );
};

export default SingleImage;
