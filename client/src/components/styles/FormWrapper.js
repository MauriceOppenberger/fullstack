import styled from "styled-components";

const NewIssueFormWrapper = styled.div`
  width: 50vw;
  margin: auto;
  text-align: center;

  p.error {
    color: red;
  }
  #file {
    display: none;
  }

  .upload-field::after {
    content: "▾";
    font-size: 1.5rem;
    color: var(--mainBlack);
    padding-left: 1.5rem;
  }
  input,
  .upload-field,
  .priority-field {
    /* padding: 8px 16px; */
    border: 1px solid var(--darkGrey);
    border-radius: 10px;
    background: var(--mainGrey);
    font-size: 1rem;
  }
  .upload-field,
  .priority-field {
    color: #757575;
    select {
      border: none;
      background: transparent;
      font-size: 1rem;
      margin: 0 10px;
    }
  }
  .title {
    width: 50%;
  }
  textarea {
    font-size: 1rem;
    padding: 16px;
    width: 100%;
    min-height: 200px;
    border: 1px solid var(--darkGrey);
    border-radius: 10px;
    background: var(--mainGrey);
  }
  .form-button:hover {
    /* background: green !important; */
    box-shadow: inset 150px 0 0 0.01px green !important;
  }

  .authForm p {
    display: flex;
    flex-flow: row wrap;

    label {
      flex: 1 100%;
      margin-bottom: 0.5rem;
    }
    input {
      width: 400px;
    }
  }
`;

export default NewIssueFormWrapper;
