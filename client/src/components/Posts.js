import React, { useEffect, useState, useReducer } from "react";
// import Post from "./Post";
import Loading from "./Loading";
import PostListWrapper from "./styles/PostListWrapper";
import { getPosts, getPublicPosts } from "../utils/api";
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
      const { data } = props.user ? await getPosts() : await getPublicPosts();

      if (!data) {
        const error = new Error("No posts found");
        throw error;
      }

      dispatch({ type: "success", data: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "failed", message: err });
    }
  };

  useEffect(() => {
    console.log("effect");
    dispatch({ type: "fetching" });
    const id = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => clearTimeout(id);
  }, []);

  const handleClick = id => {
    // props.history.push(`/dashboard/open-issues/${id}`);
    const index = state.posts.findIndex(post => post._id === id);
    updateShow({ show: true, id: index });
  };
  const handleDelete = () => {
    updateShow({ show: false, id: null });
  };

  console.log(state);
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
                      Creator: {post.creator.firstName} {post.creator.lastName}
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
      {!show.show && props.history.location.state && (
        <div className="message-container">
          <h2>{props.history.location.state.message}</h2>
        </div>
      )}{" "}
    </PostListWrapper>
  );
};

export default Posts;
