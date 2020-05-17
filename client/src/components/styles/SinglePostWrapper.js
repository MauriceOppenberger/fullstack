import styled from "styled-components";

const SinglePostWrapper = styled.div`
  overflow: auto;

  .post-container {
    /* background: var(--offWhite); */
    position: -webkit-sticky;
    position: sticky;
    top: 20px;

    /* border-radius: 20px; */
    border: none;
    /* box-shadow: var(--lightShadow); */
    width: 100%;
  }
  .meta-info {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    margin-bottom: 2rem;
  }
  .image-container {
    flex: 1;
    max-width: max-content;
    margin-right: 1rem;

    .author-image {
      width: 55px;
      height: 55px;

      border-radius: 100%;
    }
  }
  .text-container {
    flex: 1;
    width: auto;

    .author-name {
      text-transform: capitalize;
      font-size: max(0.9rem, 1.3vw);
      margin: 0;
    }
    .author-title {
      font-size: max(0.7rem, 1vw);
      margin: 0;
    }
  }
  .post-headline {
    .post-title {
      text-transform: capitalize;
      font-size: max(1.5rem, 2.2vw);
      margin: 0;
    }
  }

  .post-description {
    margin: 2rem 0;
    /* max-width: 780px; */
  }
`;

export default SinglePostWrapper;
