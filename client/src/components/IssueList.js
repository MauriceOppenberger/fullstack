import React, { useEffect, useState, useReducer } from "react";
import SingleIssue from "./SingleIssue";
import Loading from "./Loading";
import IssueListWrapper from "./styles/IssueListWrapper";
import { getPosts } from "../utils/api";

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
const IssueList = () => {
  const [open, setOpen] = useState({
    id: null,
    open: false
  });
  const [state, dispatch] = useReducer(fetchReducer, {
    loading: true,
    posts: [],
    error: null
  });

  const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    dispatch({ type: "fetching" });

    // fetch("http://localhost:3000/admin/posts", {
    //   method: "GET",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    getPosts()
      .then(result => {
        console.log(result);
        if (result.status !== 200) {
          const error = new Error("could not fetch");
          throw error;
        }
        return result.json();
      })
      .then(res => {
        console.log(res);
        dispatch({ type: "success", data: res.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: "failed", message: err });
      });
  }, []);
  // const handleClick = id => {
  //   setOpen({ id: id, open: true });
  // };
  console.log(state);
  if (state.loading) {
    return (
      <IssueListWrapper>
        <div className="list-container">
          <Loading />
        </div>
      </IssueListWrapper>
    );
  }
  return (
    <IssueListWrapper>
      <div className="list-container">
        <div className="list-info">
          <p>Page 1 of 45 open issues </p>
          <p>Priority: All</p>
        </div>
        <ul className="issue-list">
          {state.posts.map(post => {
            return (
              <li
                key={post._id}
                className="list-item"
                // onClick={() => handleClick(post)}
              >
                <div className="issue-container">
                  <p>Priority: HIGH</p>
                  <h2>Titile: {post.title}</h2>

                  <div className="meta-info">
                    <p>Opened: 02/20/2020</p>
                    <p>Creator: {post.creator.firstName}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="pagination">
          <button className="button active">1</button>
          <button className="button">2</button>
          <button className="button">3</button>
          <button className="button">4</button>
        </div>
      </div>
      {open.open && <SingleIssue id={open.id} />}
    </IssueListWrapper>
  );
};

export default IssueList;
