import styled from "styled-components";

const LayoutWrapper = styled.main`
  a {
    color: inherit;
    text-decoration: none;
  }
  .page-body {
    display: grid;
    grid-template-columns: auto 85vw;
  }
  .main {
    padding: 0 2rem;
  }
  .btn {
    width: 150px;
    min-width: max-content;
    background: none;
    margin: 0 0.5rem 0 0;
    /* font-size: 1rem; */
    transition: all 0.3s ease;
  }

  .btn-edit:hover {
    background: orange;
    color: var(--mainWhite);
  }
  .btn-delete:hover {
    background: red;
    color: var(--mainWhite);
  }

  .active button {
    background: var(--mainBlack);
    color: var(--mainWhite);
  }
`;

export default LayoutWrapper;
