import React, { useContext, useState } from "react";
import { AppContext } from "../context/Provider";
import { imageUpload } from "../helpers/globalFunctions";

const NewImagePicker = ({ uri }) => {
  const { image, setImage } = useContext(AppContext);

  const setData = async (e) => {
    let data = await imageUpload(e);
    setImage(data);
  };

  return (
    <>
      {image ? (
        <img width={100} height={100} src={image} alt="Red dot" />
      ) : uri ? (
        <img width={100} height={100} src={uri} alt="Red dot" />
      ) : (
        <input type="file" id="imageFile" name="imageFile" onChange={setData} />
      )}
    </>
  );
};

export default NewImagePicker;
