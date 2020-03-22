import React from "react";
import CommentWrapper from "./styles/CommentWrapper";
import Highlight from "react-highlight.js";
import styles from "highlight.js/styles/railscasts.css";
import timeConverter from "../utils/timeConverter";
const Comment = props => {
  return (
    <CommentWrapper>
      <p>{props.data.comment}</p>
      {props.data.code ? (
        <Highlight
          language="javascript"
          style={styles}
          className="code-container"
        >
          {props.data.code}{" "}
        </Highlight>
      ) : null}
      <span>
        {props.data.creator.firstName} {props.data.creator.lastName}
      </span>{" "}
      <span>{timeConverter(props.data.createdAt)}</span>
    </CommentWrapper>
  );
};

export default Comment;
