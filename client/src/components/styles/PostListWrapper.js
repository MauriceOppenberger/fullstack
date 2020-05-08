import styled from "styled-components";

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 25vw auto;
  .serach-container {
    padding: 0rem 1rem 4rem;

    .search-bar {
      width: 50vmax;
    }
  }
  .list-info {
    padding: 0 1rem;
    color: #888;
    font-size: 0.9rem;
  }
  .list-container {
    margin-bottom: 3rem;
  }
  .post-container {
    padding: 1rem;
    border: 1px solid var(--darkGrey);
    border-radius: 20px;
  }
  .posts-list {
    margin: 0;
    padding: 1rem;
  }

  .list-item {
    background: var(--offWhite);
    list-style: none;
    box-shadow: var(--lightShadow);
    border-radius: 20px;
    margin-bottom: 1rem;
    max-width: 23vw;
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
    text-transform: capitalize;
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
  .message-container {
    padding: 0 1rem;
    text-align: center;
    color: red;
  }
`;

export default PostListWrapper;
