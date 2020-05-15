import styled from "styled-components";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  .welcome {
    text-transform: capitalize;
    font-size: max(1.5rem, 2.2vw);
    margin-bottom: 0;
  }
  .form {
    width: 100%; // Fix IE 11 issue.
    margin-top: 1rem;
  }
  .submit {
    position: fixed;
    bottom: 5px;
    width: 55px;
    height: 53px;
    right: 8vmax;
    border-top-right-radius: 15px;
    margin: 2rem 0 1rem;

    min-width: 0 !important;
    margin: 2rem 0 1rem;
  }
  .summary #summary {
    line-height: 1.5;
    text-align: justify;
  }
  section {
    margin-bottom: 1.5rem;
    padding: 2rem 1.5rem;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
  }
  section .title {
    font-size: max(1.5rem, 2.2vw);
    margin: 0 0 1rem 0;
  }
`;

export default ProfileWrapper;
