import React, { useEffect, useState } from "react";
import SingleIssue from "./SingleIssue";
import Loading from "./Loading";
import IssueListWrapper from "./styles/IssueListWrapper";
const IssueList = () => {
  const [open, setOpen] = useState({
    id: null,
    open: false
  });
  const [loading, setLoading] = useState(true);

  const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);
  const handleClick = id => {
    setOpen({ id: id, open: true });
  };

  if (loading) {
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
          {issues.map(el => {
            return (
              <li className="list-item" onClick={() => handleClick(el)}>
                <div className="issue-container">
                  <p>Priority: HIGH</p>
                  <h2>Brooklyn irony organic single-origin coffee meggings</h2>

                  <div className="meta-info">
                    <p>Opened: 02/20/2020</p>
                    <p>Creator: John Doe</p>
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
