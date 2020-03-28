import styled from "styled-components";

const SinglePostWrapper = styled.div`
  padding: 0 1rem;
  overflow: hidden;
  .post-container {
    /* max-width: 980px; */
    margin: auto;
    position: -webkit-sticky;
    position: sticky;
    top: 20px;
  }
  .preview {
    box-shadow: var(--darkShadow);
    margin: 0;
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

  @media screen and (max-width: 980px) {
    grid-row: 1;
    .preview {
      margin-bottom: 2rem;
    }
  }
`;

export default SinglePostWrapper;
