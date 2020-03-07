import styled from "styled-components";

const SidebarWrapper = styled.div`
  border-right: 2px solid var(--mainGrey);
  text-align: center;
  min-height: 250px;
  .nav-list {
    margin: 0;
    padding: 0;
  }
  .nav-item {
    margin: 0.5rem;
    list-style: none;
    text-decoration: none;
  }
`;

export default SidebarWrapper;
