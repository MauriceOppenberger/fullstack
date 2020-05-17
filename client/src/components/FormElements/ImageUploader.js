import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import { MdDeleteForever, MdAddAPhoto, MdRefresh } from "react-icons/md";

const ImageUploaderWrapper = styled.div`
  .hidden {
    display: none;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  .btn {
    background: none;
    border: none;
  }
  .delete svg {
    border-bottom: 1px solid #ff0000;
  }
  .new svg {
    border-bottom: 1px solid #0e6b0e;
  }
  .btn:hover svg {
    transform: scale(1.4);
    transition: all 0.2s ease;
  }
`;
const PreviewContainer = styled.div`
  img {
    width: 75px;
    height: 75px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
    border-radius: 100%;
  }
`;
const ImageUploader = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const ImagePickerRef = useRef();

  useEffect(() => {
    if (props.file) {
      setPreviewUrl(`http://localhost:3000/${props.file}`);
    }
    if (!file) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file, props.file]);
  const pickImageHandler = () => {
    ImagePickerRef.current.click();
  };
  const pickHandler = (e) => {
    let pickedFile;
    if (e.currentTarget.files && e.currentTarget.files.length === 1) {
      pickedFile = e.currentTarget.files[0];
      setFile(pickedFile);
      props.setFieldValue("image", pickedFile);
    }
  };
  const removeHandler = () => {
    setFile(null);
    setPreviewUrl(null);
    props.setFieldValue("image", null);
  };
  return (
    <ImageUploaderWrapper>
      <input
        className="hidden"
        type={props.id}
        ref={ImagePickerRef}
        name="image"
        accept=".png, .jpg, .jpeg"
        id={props.id}
        onChange={pickHandler}
      />
      <div>
        <PreviewContainer>
          {previewUrl ? (
            <img src={previewUrl} alt="profile image" />
          ) : (
            <img src="" alt="" />
          )}
        </PreviewContainer>
        <ButtonContainer>
          <button className="btn new" type="button" onClick={pickImageHandler}>
            {previewUrl ? (
              <MdRefresh size={18} alt="change image" />
            ) : (
              <MdAddAPhoto size={18} alt="add new image" />
            )}
          </button>
          {previewUrl ? (
            <button
              className="btn delete"
              type="button"
              onClick={removeHandler}
            >
              <MdDeleteForever size={18} alt="delete image" />
            </button>
          ) : null}
        </ButtonContainer>
      </div>
    </ImageUploaderWrapper>
  );
};

export default ImageUploader;
