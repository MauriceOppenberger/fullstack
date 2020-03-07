import styled from "styled-components";

const SingleIssueWrapper = styled.div`
  padding: 0 2rem;

  .issue-container {
    position: -webkit-sticky;
    position: sticky;
    top: 20px;
    padding: 2rem !important;
    box-shadow: var(--lightShadow);
  }
  .issue-info {
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

export default SingleIssueWrapper;
