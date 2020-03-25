import styled from "styled-components";

const SinglePostWrapper = styled.div`
  padding: 0 1rem;

  .post-container {
    position: -webkit-sticky;
    position: sticky;
    max-width: 1100px;
    margin: auto;
    top: 20px;
  }
  .preview {
    box-shadow: var(--darkShadow);
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
  }
`;

export default SinglePostWrapper;
