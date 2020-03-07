import styled from "styled-components";

const LayoutWrapper = styled.main`
  a {
    color: inherit;
    text-decoration: none;
  }
  .page-body {
    display: grid;
    grid-template-columns: 15vw auto;
  }
  .main {
    padding: 0 2rem;
  }
  .btn {
    width: 150px;
    min-width: max-content;
    background: #ececec;
    margin: 0 auto;
    /* font-size: 1rem; */
  }

  .active button {
    background: var(--mainBlack);
    color: var(--mainWhite);
  }
`;

export default LayoutWrapper;
