import styled from "styled-components";

const SinglePostWrapper = styled.div`
  padding: 0 2rem;

  .post-container {
    /* background: var(--offWhite); */
    position: -webkit-sticky;
    position: sticky;
    top: 20px;
    padding: 2rem !important;
    /* border-radius: 20px;
    box-shadow: var(--lightShadow); */
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
