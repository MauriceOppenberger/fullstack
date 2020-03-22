import React, { useEffect, useReducer } from "react";
import Comment from "../components/Comment";
import Loading from "../components/Loading";

import CommentListWrapper from "./styles/CommentListWrapper";

const fetchReducer = (state, action) => {
  switch (action.type) {
    case "fetching":
      return {
        ...state,
        loading: true
      };
    case "success":
      return {
        loading: false,
        comments: action.data,
        error: null
      };
    case "failed":
      return {
        loading: false,
        comments: [],
        error: action.message
      };
    default:
      return state;
  }
};
const Comments = props => {
  const [state, dispatch] = useReducer(fetchReducer, {
    loading: false,
    comments: [],
    error: null
  });

  const fetchComments = async comments => {
    try {
      const res = await Promise.all(
        comments.map(async comment => {
          const result = await fetch(`/comments/${comment}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            }
          });
          const { data } = await result.json();
          return data;
        })
      );
      // const result = await res.json();
      console.log(res);
      dispatch({ type: "success", data: res });
    } catch (err) {
      console.log(err);
      dispatch({ type: "failed", message: err.message });
    }
  };
  useEffect(() => {
    dispatch({ type: "fetching" });
    const id = setTimeout(() => {
      fetchComments(props.comments);
    }, 400);
    return () => clearTimeout(id);
  }, [props.comments]);

  console.log(state);
  if (state.loading) {
    return <Loading />;
  }
  return (
    <CommentListWrapper>
      <ul className="list">
        {state.comments.map(comment => {
          return (
            <li key={comment._id} className="list-item">
              <Comment data={comment} />
            </li>
          );
        })}
      </ul>
    </CommentListWrapper>
  );
};

export default Comments;
