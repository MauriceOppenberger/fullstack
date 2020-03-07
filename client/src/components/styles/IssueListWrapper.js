import styled from "styled-components";

const IssueListWrapper = styled.div`
  display: grid;
  grid-template-columns: 30vw auto;
  .list-info {
    padding: 0 1rem;
    color: #888;
    font-size: 0.9rem;
  }
  .list-container {
    margin-bottom: 3rem;
  }
  .issue-container {
    padding: 1rem;
    border: 1px solid var(--darkGrey);
    border-radius: 20px;
  }
  .issue-list {
    margin: 0;
    padding: 1rem;
  }
  .list-item {
    list-style: none;
    box-shadow: var(--lightShadow);
    border-radius: 20px;
    margin-bottom: 1rem;
  }
  .list-item:hover {
    box-shadow: var(--darkShadow);
    border-radius: 20px;
    cursor: pointer;
  }
  .meta-info {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
  .pagination {
    text-align: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    .button {
      border: none;
      font-size: 1rem;
      margin: 0 0.2rem;
    }
    .button.active {
      border-bottom: 1px solid;
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
`;

export default IssueListWrapper;
