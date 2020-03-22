import React, { useEffect, useState, useReducer } from "react";
import SinglePostWrapper from "./styles/SinglePostWrapper";
import Loading from "./Loading";
import Button from "@material-ui/core/Button";
import { getPost, deletePost } from "../utils/api";
import AuthContext from "../context/auth";
import Highlight from "react-highlight.js";
import styles from "highlight.js/styles/railscasts.css";
import NewComment from "./NewComment";
import Comments from "./Comments";
import Comment from "./Comment";
import CommentListWrapper from "./styles/CommentListWrapper";

const fetchPostReducer = (state, action) => {
  switch (action.type) {
    case "fetching":
      return { ...state, loading: true };

    case "success":
      return {
        ...state,
        post: action.data,
        loading: false
      };
    case "failed":
      return { ...state, loading: false, error: action.message };
    default:
      return state;
  }
};

const Post = props => {
  const [state, dispatch] = useReducer(fetchPostReducer, {
    loading: true,
    error: null,
    post: null
  });
  const [addComment, updateAddComment] = useState(false);
  const [newComment, updateNewComment] = useState([]);

  const fetchPost = async id => {
    try {
      dispatch({ type: "fetching" });
      const { post } = await getPost(id);

      if (!post) {
        const error = new Error("No post found");
        throw error;
      }
      dispatch({ type: "success", data: post });
    } catch (err) {
      console.log(err);
      dispatch({ type: "failed", message: err.message });
    }
  };
  useEffect(() => {
    //set time out for user experience
    const id = setTimeout(() => {
      fetchPost(props.match.params.id);
    }, 500);
    return () => clearTimeout(id);
  }, []);

  const handleDelete = async id => {
    try {
      const res = await deletePost(id);

      if (res.status !== 200) {
        const error = new Error("Failed to delete post");
        throw error;
      }
      props.history.push({
        pathname: "/dashboard/open-posts",
        state: { message: "Post Deleted!" }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleNewComment = data => {
    updateAddComment(false);
    //update UI based on local state
    //avaid making new fetch request for newly added comments
    updateNewComment(prev => {
      return [...prev, data];
    });
  };

  const { loading, post, error } = state;
  console.log(state);
  if (loading) {
    return (
      <div className="post-container">
        <div style={{ width: "250px", margin: "0 auto" }}>
          <Loading />
        </div>
      </div>
    );
  }
  if (!loading && error) {
    return (
      <div className="post-container">
        <div style={{ width: "250px", margin: "0 auto" }}>
          <h2>{error}</h2>
        </div>
      </div>
    );
  }
  console.log(newComment);
  return (
    <AuthContext.Consumer>
      {context => {
        return (
          <SinglePostWrapper>
            <div className="post-container">
              <h3>{post.title}</h3>
              <div className="description">
                <Highlight language={post.language} style={styles}>
                  {post.description}
                </Highlight>
              </div>
              <div className="post-info">
                <p>
                  {post.creator.firstName} {post.creator.lastName}
                </p>
                <p> {new Date(post.createdAt).toUTCString()}</p>
              </div>
              <div className="comments-container">
                <Comments comments={post.comments} />

                {newComment.length > 0 && (
                  <CommentListWrapper>
                    <ul className="list">
                      {newComment.map(({ data }) => (
                        <li className="list-item" key={data._id}>
                          <Comment
                            data={{
                              comment: data.comment,
                              code: data.code,
                              creator: {
                                firstName: context.user.firstName,
                                lastName: context.user.lastName
                              },
                              createdAt: data.createdAt
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </CommentListWrapper>
                )}
              </div>
              <br />
              <div className="commentForm-container">
                {addComment && (
                  <NewComment
                    id={post._id}
                    handleNewComment={handleNewComment}
                  />
                )}
              </div>
              <hr />
              <div className="btn-container">
                <Button
                  onClick={() =>
                    context.user
                      ? updateAddComment(true)
                      : props.history.push({
                          pathname: "/login",
                          state: { from: props.location }
                        })
                  }
                  variant="contained"
                  size="medium"
                  className="btn btn-edit"
                  type="submit"
                >
                  Comment
                </Button>
                {context.user && (
                  <>
                    <Button
                      onClick={() =>
                        props.history.push(`/dashboard/edit-post/${post._id}`)
                      }
                      variant="contained"
                      size="medium"
                      className="btn btn-edit"
                      type="submit"
                    >
                      Edit Post
                    </Button>
                    <Button
                      variant="contained"
                      size="medium"
                      className="btn btn-delete"
                      type="submit"
                      onClick={() => handleDelete(post._id)}
                    >
                      DELETE
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SinglePostWrapper>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Post;
