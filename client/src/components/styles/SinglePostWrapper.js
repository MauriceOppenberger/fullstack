import styled from "styled-components";

const SinglePostWrapper = styled.div`
  padding: 0 2rem;
  overflow: auto;

  .post-container {
    /* background: var(--offWhite); */
    position: -webkit-sticky;
    position: sticky;
    top: 20px;
    padding: 2rem !important;
    /* border-radius: 20px; */
    border: none;
    /* box-shadow: var(--lightShadow); */
    width: 100%;
  }
  .post-info {
    p {
      margin: 1rem 0;
      text-transform: capitalize;
      font-weight: 700;
    }
  }
  .description {
    margin: 2rem 0;
    /* max-width: 780px; */
  }
`;

export default SinglePostWrapper;
