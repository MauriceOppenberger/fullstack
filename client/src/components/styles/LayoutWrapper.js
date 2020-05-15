import styled from "styled-components";

const LayoutWrapper = styled.main`
  a {
    color: inherit;
    text-decoration: none;
  }
  .page-body {
    display: grid;
    grid-template-columns: 15vmax auto;
  }
  .main {
    padding: 0 2rem;
  }
  .container {
    max-width: 70vmax;
    margin: 2rem auto;
  }
  .btn {
    min-width: max-content;
    background: none;
    border-radius: 0;
    border-bottom: 3px solid transparent;
    /* margin: 0 0.5rem 0 0; */
    /* font-size: 1rem; */
    padding: 0;
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
    border-bottom: 3px solid orange;
  }
`;

export default LayoutWrapper;
