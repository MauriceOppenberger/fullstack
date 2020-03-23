import React, { useEffect } from "react";
import SinglePostWrapper from "./styles/SinglePostWrapper";
import Button from "@material-ui/core/Button";
import { deletePost } from "../utils/api";
import AuthContext from "../context/auth";
import Highlight from "react-highlight.js";
import highlightStyles from "highlight.js/styles/railscasts.css";

const PostPreview = props => {
  useEffect(() => {}, []);

  const handleDelete = async id => {
    try {
      const res = await deletePost(id);

      if (res.status !== 200) {
        const error = new Error("Failed to delete post");
        throw error;
      }
      props.handleDelete();
      props.history.push({
        pathname: "/dashboard/open-posts",
        state: { message: "Post Deleted!" }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const { post } = props;

  return (
    <AuthContext.Consumer>
      {context => {
        return (
          <SinglePostWrapper>
            <div className="post-container">
              <h3>{post.title}</h3>
              <div className="description">
                <Highlight language="javascript" style={highlightStyles}>
                  {post.description.length > 500
                    ? `${post.description.substring(
                        0,
                        500
                      )}...//click more details to continue reading`
                    : post.description}
                </Highlight>
              </div>
              <hr />
              <br />
              <div>
                <Button
                  onClick={() => props.history.push(`/post/${post._id}`)}
                  variant="contained"
                  size="medium"
                  className="btn"
                  type="submit"
                >
                  More Details
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

export default PostPreview;
