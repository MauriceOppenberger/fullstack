import React, { useRef, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
const ImageUploader = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const ImagePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  const pickImageHandler = () => {
    ImagePickerRef.current.click();
  };
  const pickHandler = (e) => {
    let pickedFile;
    if (e.currentTarget.files && e.currentTarget.files.length === 1) {
      pickedFile = e.currentTarget.files[0];
      setFile(pickedFile);
    }
  };
  const removeHandler = () => {
    setFile(null);
    setPreviewUrl(null);
  };
  return (
    <div>
      <input
        style={{ display: "none" }}
        type={props.id}
        ref={ImagePickerRef}
        name={props.id}
        accept=".png, .jpg, .jpeg"
        id={props.id}
        onChange={pickHandler}
      />
      <div>
        <div className="preview">
          <img src={previewUrl} alt="" />
        </div>
        <Button
          type="button"
          onClick={pickImageHandler}
          size="small"
          variant="contained"
          color="primary"
        >
          {file ? "Change Image " : "Select Image"}
        </Button>
        {file ? (
          <Button
            type="button"
            onClick={removeHandler}
            size="small"
            variant="contained"
            color="secondary"
          >
            Remove Image
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default ImageUploader;
