import React, { useRef, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfContainer = styled.div`
  text-align: center;
  .document {
    margin: 1rem 0;
  }
  .page div:nth-child(1) {
    margin: auto;
    border: 1px solid;
  }
`;

const FileUploader = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const filePickerRef = useRef();

  useEffect(() => {
    if (props.file && !file) {
      setPreviewUrl(`http://localhost:8080/${props.file}`);
      return;
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
    filePickerRef.current.click();
  };
  const pickHandler = (e) => {
    let pickedFile;
    if (e.currentTarget.files && e.currentTarget.files.length === 1) {
      pickedFile = e.currentTarget.files[0];
      setFile(pickedFile);
      props.setFieldValue("file", pickedFile);
    }
  };
  return (
    <div className="form-control">
      <input
        style={{ display: "none" }}
        type="file"
        ref={filePickerRef}
        name="file"
        accept=".pdf"
        id={props.id}
        onChange={pickHandler}
      />
      <PdfContainer>
        <a href={previewUrl} target="_blank">
          <Document className="document" file={previewUrl} renderMode="svg">
            <Page
              pageNumber={1}
              width={300}
              className="page"
              renderInteractiveForms={true}
              renderTextLayer={false}
            />
          </Document>
        </a>
        <Button
          type="button"
          onClick={pickImageHandler}
          size="small"
          variant="contained"
          color="primary"
        >
          {props.file ? "Select Different File" : "Select File"}
        </Button>
      </PdfContainer>
    </div>
  );
};

export default FileUploader;
