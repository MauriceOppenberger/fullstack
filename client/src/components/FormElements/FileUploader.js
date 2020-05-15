import React, { useRef, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfContainer = styled.div`
  width: max-content;
  margin: auto;
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
    console.log("effect");
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
  }, [file]);

  const pickFileHandler = () => {
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

  const removeHandler = () => {
    setFile(null);
    setPreviewUrl(null);
    props.setFieldValue("file", null);
  };
  console.log(file);
  console.log(previewUrl);
  return (
    <PdfContainer>
      <input
        style={{ display: "none" }}
        type={props.id}
        ref={filePickerRef}
        name={props.id}
        accept=".pdf"
        id={props.id}
        onChange={pickHandler}
      />
      <div>
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
          onClick={pickFileHandler}
          size="small"
          variant="contained"
          color="primary"
        >
          {props.file ? "Select Different File" : "Select File"}
        </Button>
        {file || props.file ? (
          <Button
            type="button"
            onClick={removeHandler}
            size="small"
            variant="contained"
            color="secondary"
          >
            Remove file
          </Button>
        ) : null}
      </div>
    </PdfContainer>
  );
};

export default FileUploader;
