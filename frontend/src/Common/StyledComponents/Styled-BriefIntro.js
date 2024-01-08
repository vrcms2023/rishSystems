import styled from "styled-components";

export const BriefIntroStyled = styled.div`
  background-color: ${({ theme }) => theme.briefIntroBg};
  p {
    color: ${({ theme }) => theme.briefIntroTextColor};
  }

  .briefIntro h3 {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.briefIntroTitleColor};
  }
`;
