import React, { useEffect, useState, useReducer } from "react";
import Loading from "./Loading";
import PostListWrapper from "./styles/PostListWrapper";
import { getPostsByUser, getAllPosts } from "../utils/api";
import PostPreview from "./PostPreview";
import timeConverter from "../utils/timeConverter";

const fetchReducer = (state, action) => {
  switch (action.type) {
    case "fetching":
      return { ...state, loading: true };
    case "success":
      return { ...state, posts: action.data, loading: false };
    case "failed":
      return { ...state, error: action.message, loading: false };
    default:
      return state;
  }
};
const Posts = props => {
  const [show, updateShow] = useState({
    show: false,
    id: null
  });
  const [state, dispatch] = useReducer(fetchReducer, {
    loading: true,
    posts: [],
    error: null
  });

  const fetchPosts = async () => {
    try {
      // if props.user not undefined, component is rendered from dashboard
      // get all posts for logged in user
      const { data } = props.user
        ? await getPostsByUser()
        : await getAllPosts();

      if (!data) {
        const error = new Error("No posts found");
        throw error;
      }

      dispatch({ type: "success", data: data });
    } catch (err) {
      dispatch({ type: "failed", message: err });
    }
  };

  useEffect(() => {
    dispatch({ type: "fetching" });
    //Set Timeout for user experience
    const id = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => clearTimeout(id);
    //Warning - Missing dependency array????
  }, []);

  // open post preview on click
  const handleClick = id => {
    const index = state.posts.findIndex(post => post._id === id);
    updateShow({ show: true, id: index });
  };
  // close post preview when post is deleted
  const handleDelete = () => {
    updateShow({ show: false, id: null });
  };

  if (state.loading) {
    return (
      <PostListWrapper>
        <div className="list-container">
          <Loading />
        </div>
      </PostListWrapper>
    );
  }
  return (
    <PostListWrapper>
      <div className="grid">
        <div className="list-container">
          <div className="list-info">
            <p>
              {props.user
                ? `Hi ${props.user.firstName}, here are all your posts`
                : `Welcome, check out our latest posts`}
            </p>
            <p>
              {props.user
                ? `Author: ${props.user.firstName} ${props.user.lastName}`
                : `Author: All`}
            </p>
          </div>
          <ul className="posts-list">
            {state.posts.map(post => {
              return (
                <li
                  key={post._id}
                  className="list-item"
                  onClick={() => handleClick(post._id)}
                >
                  <div className="post-container">
                    <h3>
                      {post.title.length > 180
                        ? `${post.title.substring(0, 180)}...`
                        : post.title}
                    </h3>

                    <div className="meta-info">
                      <p>Published: {timeConverter(post.createdAt)}</p>
                      <p>
                        Creator: {post.creator.firstName}{" "}
                        {post.creator.lastName}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {show.show && (
          <PostPreview
            {...props}
            post={state.posts[show.id]}
            handleDelete={handleDelete}
          />
        )}
        {/* inform user that post is deleted  */}
        {!show.show && props.history.location.state && (
          <div className="message-container">
            <h2>{props.history.location.state.message}</h2>
          </div>
        )}{" "}
      </div>
    </PostListWrapper>
  );
};

export default Posts;
