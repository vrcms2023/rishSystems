import styled from "styled-components";

export const StyledMenu = styled.menu`
  margin-left: auto;
  .nav-item {
    background-color: ${({ theme }) => theme.navbarLinkBgColor};

    @media (min-width: 992px) {
      background-color: ${({ theme }) => theme.transparent};
    }
  }

  .nav-item.dropdown ul {
    background-color: ${({ theme }) => theme.navbarChildLinkBgColor};
  }

  .nav-item.dropdown ul li a {
    color: ${({ theme }) => theme.navbarChildLinkColor};

    &:hover {
      color: ${({ theme }) => theme.navbarChildLinkHoverColor};
      background-color: ${({ theme }) => theme.navbarChildLinkBgColor};
    }
  }
`;
