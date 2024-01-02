import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;500&family=Poppins:wght@100;200;300;400;600&family=Roboto:wght@300;500&display=swap');

* {
    margin:0;
    padding: 0;
}

ul, li {
    margin: 0;
    padding:0;
    // list-style: none;
}

a {text-decoration: none}

h1, h2, h3, h4, h5, h6 {
    font-family: Poppins;
}

body {
    font-family: ${({ theme }) => theme.fontFamily};
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textColor};
}


.navbar {
    background-color:${({ theme }) => theme.navbarBg}; 
    box-shadow: 0px 5px 30px #111111;
    height: 80px;

    .nav-Link {
        color:${({ theme }) => theme.navbarLinkColor}; 

        &:hover {
            color:${({ theme }) => theme.navbarLinkHoverColor};
        }
    }
}

.topStrip {
    background-color: ${({ theme }) => theme.topStripBgColor};
    color: ${({ theme }) => theme.topStripColor};

    a {
        color: ${({ theme }) => theme.white};
    }

    a:hover {
        color: ${({ theme }) => theme.primaryColor};
    }
}

.carousel-caption {
    h1 { color:${({ theme }) => theme.carouselSlideTitleColor};     }
    p { color:${({ theme }) => theme.carouselSlideCaptionColor}; }
}

.briefIntro {
    background-color:${({ theme }) => theme.briefIntroBg}; 
    h3 { color:${({ theme }) => theme.briefIntroTitleColor};     }
    p { color:${({ theme }) => theme.briefIntroTextColor}; }
}


.ABrief {
    background-color:${({ theme }) => theme.ABriefBg}; 
    color:${({ theme }) => theme.ABriefTextColor};
}
.ABrief h3, .ABrief .title {border-color: ${({ theme }) =>
  theme.ABriefTitleBorderColor}; }

  .ABrief h3::before, .ABrief .title::before {border-color: ${({ theme }) =>
    theme.ABriefTitleBorderColor}; }

.ABriefAbout {
    background-color:${({ theme }) => theme.ABriefAboutBg}; 
    color:${({ theme }) => theme.ABriefAboutTextColor};
}

.ABriefAbout h3, .ABriefAbout .title { border-color: ${({ theme }) =>
  theme.ABriefAboutTitleBorderColor}; }

.ABriefAbout h3::before, .ABriefAbout .title::before { border-color: ${({
  theme,
}) => theme.ABriefAboutTitleBorderColor}; }

.testimonials {
    background-color:${({ theme }) => theme.testimonialsBg}; 
    color:${({ theme }) => theme.white};
}
.testimonials h3 {color:${({ theme }) => theme.testimonialsHeadingColor};}
.testimonials p {color:${({ theme }) => theme.testimonialsTextColor};}


.homeServices {
    color:${({ theme }) => theme.secondaryColor}; 
    h2 {
        color:${({ theme }) => theme.secondaryColor}; 
        border-color: ${({ theme }) => theme.primaryColor}; 
    }

    h3 {
        color:${({ theme }) => theme.secondaryColor}; 
    }

    a.btn {
        background-color:${({ theme }) => theme.primaryHoverColor};
    }

    a.btn:hover {
        background-color:${({ theme }) => theme.primaryColor};
    }
}


.homeNews {
    background-color:""; 
    color:${({ theme }) => theme.secondaryColor}; 

    h2 {
        border-color: ${({ theme }) => theme.homeNewsTitleColor} !important; 
    }

    .card {
        background-color: color:${({ theme }) => theme.homeNewsCardBg}; 
    }

    .card-body {
        h3 {
            color:${({ theme }) => theme.homeNewsNewsTitleColor}; 
        }

        a {
            color:${({ theme }) => theme.primaryColor} !important; 

            &:hover {
                color:${({ theme }) => theme.secondaryColor} !important; 
            }
        }
    }
}


.pageBanner {
    .titleCaption {
        h3 {color:${({ theme }) => theme.pageBannerTitleColor};}
        p {color:${({ theme }) => theme.pageBannerCaptionColor};}
    }
}



.btn-primary {
    background-color:${({ theme }) => theme.primaryColor} !important; 
    color:${({ theme }) => theme.white};
    box-shadow: 0 4px 4px 0 ${({ theme }) => theme.secondaryColor};
}
.btn-primary:hover {
    background-color:${({ theme }) => theme.primaryHoverColor}; 
}

.btn-secondary {
    background-color:${({ theme }) => theme.secondaryColor}; 
    color:${({ theme }) => theme.white};
    box-shadow: 0 4px 4px 0 ${({ theme }) => theme.secondaryColor};
}

.btn-secondary:hover {
    background-color:${({ theme }) => theme.primaryColor}; 
}

.btn-outline {
    border: 1px solid ${({ theme }) => theme.white} !important; 
    color:${({ theme }) => theme.white};
}

.btn-outline:hover {
    border: 1px solid ${({ theme }) => theme.primaryColor} !important;  
}

footer {
    background-color:${({ theme }) => theme.secondaryColor}; 
    color:${({ theme }) => theme.white};

    a {
        color:${({ theme }) => theme.white};
    }

    a:hover {
        color:${({ theme }) => theme.primaryColor};
    }

    h5 {
        color:${({ theme }) => theme.white};
    }

    .footerCopyRights {
        background-color:${({ theme }) => theme.primaryColor}; 
        
        a:hover {
            color:${({ theme }) => theme.secondaryColor};
        }
    
        .dby, .dby a  {
            color:${({ theme }) => theme.secondaryColor};
        }

        .dby a:hover  {
            color:${({ theme }) => theme.primaryHoverColor};
        }
    }
}
`;
