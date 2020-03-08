import styled from "styled-components";

const HeaderWrapper = styled.div`
  /* Header  */
  margin: 0;
  margin-bottom: 2rem;
  padding: 2rem 0;
  background: var(--mainGrey);

  /* Header Container */

  .header-container {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    text-align: left;
    padding: 0 3rem;
    margin: auto;
    a {
      color: inherit;
      text-decoration: none;
    }
    /* Logo Container */
    .logo-container {
      flex: 1;
      width: max-content;
      max-width: 30vw;
      .logo-link {
      }
      h1 {
        margin: 0;
      }
    }
    /* Primary Navigation */
    .primary-nav {
      flex: 1;
      width: max-content;
      max-width: 70vw;

      .primary-nav-list {
        width: max-content;
        margin: 0 0 0 auto;
        padding: 0 2rem;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;

        .primary-nav-item {
          width: max-content;
          list-style: none;
          margin-right: 1.5rem;
          font-size: 1.2rem;
        }
        .primary-nav-item:last-child {
          margin: 0;
        }
      }
    }

    /* End Header Container */
  }
`;

export default HeaderWrapper;
