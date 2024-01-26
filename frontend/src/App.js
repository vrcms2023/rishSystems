import React, { useEffect, useState, lazy, Suspense  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";

// Components
import LoadingSpinner from "./Common/LoadingSpinner";
import SkeletonPage from "./Common/Skeltons/SkeletonPage";
import Footer from "./Common/Footer/Footer";
import Header from "./Common/Header/Header";
import TopStrip from "./Common/Header/TopStrip";
import Loading from "./Common/Loading";
import ProtectedRoute from "./Frontend/Components/ProtectedRoute";

import MainPage from "./Admin/Pages/Login/MainPage";
import { getCookie } from "./util/cookieUtil";
import { removeActiveClass } from "./util/ulrUtil";

// Themes
import ThemeOne from "./Common/StyledThemes/ThemeOne.json";
import { GlobalStyles } from "./Common/StyledComponents/GlobalStyles";

// CSS
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";

// Lazy Loading
const PageNotFound = lazy(() => import("./Frontend/Pages/PageNotFound"));
const Home = lazy(() => import("./Frontend/Pages/Home/index"));
const About = lazy(() => import("./Frontend/Pages/About"));
const Contact = lazy(() => import("./Frontend/Pages/Contact"));
const Services = lazy(() => import("./Frontend/Pages/Services"));
const ClientsList = lazy(() => import("./Frontend/Pages/ClientsList"));
const Careers = lazy(() => import("./Frontend/Pages/Careers"));
const CareerDetails = lazy(() => import("./Frontend/Pages/career-details"));
const Team = lazy(() => import("./Frontend/Pages/Team"));
const Projects = lazy(() => import("./Frontend/Pages/Projects"));
const ProjectTabs = lazy(() => import("./Frontend/Components/ProjectsTabs/ProjecTabs"));
const ProjectGallery = lazy(() => import("./Frontend/Pages/ProjectGallery"));
const CaseStudies = lazy(() => import("./Frontend/Pages/CaseStudies"));
const CaseStudiesDetails = lazy(() => import("./Frontend/Pages/caseStudies-details"));
const NewsAndUpdates = lazy(() => import("./Frontend/Pages/NewsAndUpdates"));
const TestimonialsList = lazy(() => import("./Frontend/Pages/TestimonialsList"));

const Login = lazy(() => import("./Admin/Pages/Auth/Login"));
const Registration = lazy(() => import("./Admin/Pages/Auth/Registration"));
const ChangePassword = lazy(() => import("./Admin/Pages/Auth/ChangePassword"));
const ResetPassword = lazy(() => import("./Admin/Pages/Auth/ResetPassword"));
const ResetPasswordConfirmation = lazy(() => import("./Admin/Pages/Auth/ResetPasswordConfirmation"));
const Activation = lazy(() => import("./Admin/Pages/Auth/Activation"));
const ResendActivationEmail = lazy(() => import("./Admin/Pages/Auth/ResendActivationEmail"));
const Dashboard = lazy(() => import("./Admin/Pages/Login/Dashboard"));
const UserAdmin = lazy(() => import("./Admin/Pages/Auth/UserAdmin"));
const UnauthorizedPage = lazy(() => import("./Admin/Pages/Login/UnauthorizedPage"));
const AuthForm = lazy(() => import("./Admin/Pages/Auth/AuthForm"));
const AddProject = lazy(() => import("./Admin/Pages/Login/AddProject"));
const AdminNews = lazy(() => import("./Admin/Pages/Login/AdminNews"));
const ContactUSAdmin = lazy(() => import("./Admin/Pages/Auth/ContactUSAdmin"));
const PagesConfiguration = lazy(() => import("./Admin/Pages/Auth/PagesConfiguration"));
const UserPagePermission = lazy(() => import("./Admin/Pages/Auth/UserPagePermission"));
const AdminTestimonial = lazy(() => import("./Admin/Pages/Login/AdminTestimonial"));


function App() {
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.loader);
  const [loginState, setLoginState] = useState("");
  const pathList = [
    "/login",
    "/register",
    "/unauthorized",
    "/activate",
    "/reset_password",
    "/authForm",
    "/resend_activation",
    "/password",
    "/adminNews",
    "/main",
    "/dashboard",
    "/editproject",
    "/addproject",
    "/testimonial",
    "/contactUSList",
    "/userAdmin",
    "/userPermission",
  ];
  let isHideMenu =
    pathList.indexOf(window.location.pathname) >= 0 ? true : false;

  useEffect(() => {
    if (userInfo) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [userInfo]);

  // useEffect(() => {
  //   removeActiveClass();
  //   //HideMenu()
  // });

  const HideMenu = () => {
    pathList.forEach((item) => {
      const list = window.location.pathname.split("/");
      if (list[1] === item) {
        isHideMenu = true;
      }
    });
  };

  const lazyText = "L o a d i n g . . ."
  return (
    <>
      <ThemeProvider theme={ThemeOne}>
        <GlobalStyles />
        <BrowserRouter>
          {/* {isLoading ? <LoadingSpinner /> : ""} */}
          <TopStrip />
          <Header />
          <Routes>
            {/* <Route exact path="*" element={<Suspense fallback={<Loading text={lazyText} cssClasses="" />}><PageNotFound /></Suspense>} /> */}
            <Route exact path="*" element={<Suspense fallback={<SkeletonPage />}><PageNotFound /></Suspense>} />
            <Route exact path="/" element={<Suspense fallback={<SkeletonPage />}><Home /></Suspense>} />
            <Route exact path="/about" element={<Suspense fallback={<SkeletonPage />}><About /></Suspense>} />
            <Route exact path="/contact" element={<Suspense fallback={<SkeletonPage />}><Contact /></Suspense>} />
            <Route exact path="/services" element={<Suspense fallback={<SkeletonPage />}><Services /></Suspense>} />
            <Route exact path="/services/:uid/" element={<Suspense fallback={<SkeletonPage />}><Services /></Suspense>} />
            <Route exact path="/clients" element={<Suspense fallback={<SkeletonPage />}><ClientsList /></Suspense>} />
            <Route exact path="/careers" element={<Suspense fallback={<SkeletonPage />}><Careers /></Suspense>} />
            <Route exact path="/career-details/:id/" element={<Suspense fallback={<SkeletonPage />}><CareerDetails /></Suspense>} />
            <Route exact path="/team" element={<Suspense fallback={<SkeletonPage />}><Team /></Suspense>} />
            <Route exact path="/projects" element={<Suspense fallback={<SkeletonPage />}><Projects /></Suspense>} />
            <Route exact path="/project-details" element={<Suspense fallback={<SkeletonPage />}><ProjectTabs /></Suspense>} />
            <Route exact path="/gallery" element={<Suspense fallback={<SkeletonPage />}><ProjectGallery /></Suspense>} />
            <Route exact path="/casestudies" element={<Suspense fallback={<SkeletonPage />}><CaseStudies /></Suspense>} />
            <Route exact path="/casestudies-details/:id/" element={<Suspense fallback={<SkeletonPage />}><CaseStudiesDetails /></Suspense>} />
            <Route exact path="/news" element={<Suspense fallback={<SkeletonPage />}><NewsAndUpdates /></Suspense>} />
            <Route exact path="/testimonials" element={<Suspense fallback={<SkeletonPage />}><TestimonialsList /></Suspense>} />
            <Route exact path="/login" element={<Suspense fallback={<SkeletonPage />}><Login /></Suspense>} />
            <Route exact path="/register" element={<Suspense fallback={<SkeletonPage />}><Registration /></Suspense>} />
            <Route exact path="/change_password" element={<Suspense fallback={<SkeletonPage />}>
              <ProtectedRoute> <ChangePassword /> </ProtectedRoute>
            </Suspense>} />
            <Route exact path="/reset_password" element={<Suspense fallback={<SkeletonPage />}><ResetPassword /></Suspense>} />
            <Route exact path="/password/reset/:uid/:token" element={<Suspense fallback={<SkeletonPage />}><ResetPasswordConfirmation /></Suspense>} />
            <Route exact path="/activate/:uid/:token" element={<Suspense fallback={<SkeletonPage />}><Activation /></Suspense>} />
            <Route exact path="/resend_activation" element={<Suspense fallback={<SkeletonPage />}><ResendActivationEmail /></Suspense>} />

            <Route exact path="/dashboard" element={<Suspense fallback={<SkeletonPage />}>
              <ProtectedRoute> <Dashboard /> </ProtectedRoute>
            </Suspense>} />

            <Route exact path="/userAdmin" element={<Suspense fallback={<SkeletonPage />}>
              <ProtectedRoute> {userInfo?.is_admin ? <UserAdmin /> : <UnauthorizedPage />} </ProtectedRoute>
            </Suspense>} />
            <Route exact path="/userPermission" element={<Suspense fallback={<SkeletonPage />}>
            <ProtectedRoute> {userInfo?.is_admin ? ( <UserPagePermission /> ) : ( <UnauthorizedPage /> )} </ProtectedRoute>
            </Suspense>} />

            <Route exact path="/unauthorized" element={<Suspense fallback={<SkeletonPage />}><UnauthorizedPage /></Suspense>} />
            <Route exact path="/authForm" element={<Suspense fallback={<SkeletonPage />}><AuthForm /></Suspense>} />
            <Route exact path="/addproject" element={<Suspense fallback={<SkeletonPage />}><AddProject /></Suspense>} />
            <Route exact path="/editproject/:id" element={<Suspense fallback={<SkeletonPage />}><AddProject /></Suspense>} />
            <Route exact path="/adminNews" element={<Suspense fallback={<SkeletonPage />}><AdminNews /></Suspense>} />
            <Route exact path="/contactUSList" element={<Suspense fallback={<SkeletonPage />}><ContactUSAdmin /></Suspense>} />
            <Route exact path="/adminPagesConfigurtion" element={<Suspense fallback={<SkeletonPage />}>
            <ProtectedRoute> {userInfo?.is_admin ? ( <PagesConfiguration /> ) : ( <UnauthorizedPage /> )} </ProtectedRoute>
            </Suspense>} />
            <Route exact path="/testimonial" element={<Suspense fallback={<SkeletonPage />}><AdminTestimonial /></Suspense>} />

          </Routes>
          {isHideMenu ? null : <Footer />}
          
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
}

export default App;
