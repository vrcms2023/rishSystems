
import styled from "styled-components";

export const NewsStyled = styled.div`
    .card {
        background-color:${({ theme }) => theme.newsCardBg};
        color:${({ theme }) => theme.newsCardTextColor}; 

        .title{
            color:${({ theme }) => theme.newsCardTitleColor}; 
        }
    

        .card-body {
            // a {
            //     color:${({ theme }) => theme.primaryColor} !important; 

            //     &:hover {
            //         color:${({ theme }) => theme.secondaryColor} !important; 
            //     }
            // }
        }
    }

`