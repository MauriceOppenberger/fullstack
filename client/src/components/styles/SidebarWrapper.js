import styled from "styled-components";

const SidebarWrapper = styled.div`
  .sidebar {
    border-right: 2px solid var(--mainGrey);
    text-align: center;
    height: 100%;
    position: fixed;
    display: flex;
    width: 15vmax;
    flex-direction: column;
  }

  .logo-container {
    padding: 1rem 0;

    background: #3f51b5;
    h1 {
      margin: 0;
      font-weight: 500;
      color: white;
    }
  }
  .sidebar-nav {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-grow: 1;
    padding: 1rem;
  }
  .nav-list {
    margin: 0;
    padding: 0;
  }
  .nav-item {
    display: flex;
    align-items: center;
    text-align: initial;
    list-style: none;
    text-decoration: none;
    margin-bottom: 0.5rem;

    span.icon {
      flex: 0.7;
    }
    span.text {
      flex: auto;
      text-align: initial;
    }
  }
  .nav-item:hover > span > button {
    border-bottom: 3px solid orange;
  }
`;

export default SidebarWrapper;
