import React, { useEffect, useState } from "react";
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
import Footer from "./Common/Footer/Footer";
import Header from "./Common/Header/Header";
import LoadingSpinner from "./Common/LoadingSpinner";
import TopStrip from "./Common/Header/TopStrip";
import { GlobalStyles } from "./Common/StyledComponents/GlobalStyles";

import Home from "./Frontend/Pages/Home/index";
import About from "./Frontend/Pages/About";
import Projects from "./Frontend/Pages/Projects";
import ProjectGallery from "./Frontend/Pages/ProjectGallery";
import Services from "./Frontend/Pages/Services";
import Careers from "./Frontend/Pages/Careers";
import CareerDetails from "./Frontend/Pages/career-details";
import Contact from "./Frontend/Pages/Contact";
import TestimonialsList from "./Frontend/Pages/TestimonialsList";
import ClientsList from "./Frontend/Pages/ClientsList";
import CaseStudies from "./Frontend/Pages/CaseStudies";
import ProtectedRoute from "./Frontend/Components/ProtectedRoute";
import ProjectTabs from "./Frontend/Components/ProjectsTabs/ProjecTabs";
import NewsAndUpdates from "./Frontend/Pages/NewsAndUpdates";
import PageNotFound from "./Frontend/Pages/PageNotFound";

import Dashboard from "./Admin/Pages/Login/Dashboard";
import AddProject from "./Admin/Pages/Login/AddProject";
import AdminNews from "./Admin/Pages/Login/AdminNews";
import AdminTestimonial from "./Admin/Pages/Login/AdminTestimonial";
import MainPage from "./Admin/Pages/Login/MainPage";
import Login from "./Admin/Pages/Auth/Login";
import Registration from "./Admin/Pages/Auth/Registration";
import Activation from "./Admin/Pages/Auth/Activation";
import ResendActivationEmail from "./Admin/Pages/Auth/ResendActivationEmail";
import ChangePassword from "./Admin/Pages/Auth/ChangePassword";
import ResetPassword from "./Admin/Pages/Auth/ResetPassword";
import ResetPasswordConfirmation from "./Admin/Pages/Auth/ResetPasswordConfirmation";
import AuthForm from "./Admin/Pages/Auth/AuthForm";
import UserAdmin from "./Admin/Pages/Auth/UserAdmin";
import UnauthorizedPage from "./Admin/Pages/Login/UnauthorizedPage";
import ContactUSAdmin from "./Admin/Pages/Auth/ContactUSAdmin";

import { getCookie } from "./util/cookieUtil";
import { removeActiveClass } from "./util/ulrUtil";

// Themes
import ThemeOne from "./Common/StyledThemes/ThemeOne.json";

// CSS
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import CaseStudiesDetails from "./Frontend/Pages/caseStudies-details";
import Team from "./Frontend/Pages/Team";

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
  ];
  let isHideMenu =
    pathList.indexOf(window.location.pathname) >= 0 ? true : false;

  useEffect(() => {
    if (userInfo || getCookie("access")) {
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
  return (
    <>
      <ThemeProvider theme={ThemeOne}>
        <GlobalStyles />
        <BrowserRouter>
          {isLoading ? <LoadingSpinner /> : ""}
          {/* <LoadingSpinner />  */}
          <TopStrip />
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/projects" element={<Projects />} />
            <Route exact path="/project-details" element={<ProjectTabs />} />
            <Route exact path="/gallery" element={<ProjectGallery />} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/services/:uid/" element={<Services />} />
            <Route exact path="/careers" element={<Careers />} />
            <Route
              exact
              path="/career-details/:id/"
              element={<CareerDetails />}
            />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/testimonials" element={<TestimonialsList />} />
            <Route exact path="/clients" element={<ClientsList />} />
            <Route exact path="/team" element={<Team />} />
            <Route exact path="/casestudies" element={<CaseStudies />} />
            <Route
              exact
              path="/casestudies-details/:id/"
              element={<CaseStudiesDetails />}
            />
            <Route exact path="/news" element={<NewsAndUpdates />} />
            {/* <Route exact path="/testmonial" element={<Testimonial />} /> */}
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Registration />} />
            <Route exact path="/authForm" element={<AuthForm />} />
            <Route
              exact
              path="/activate/:uid/:token"
              element={<Activation />}
            />
            <Route exact path="/reset_password" element={<ResetPassword />} />
            <Route exact path="/unauthorized" element={<UnauthorizedPage />} />
            <Route
              exact
              path="/resend_activation"
              element={<ResendActivationEmail />}
            />
            <Route
              exact
              path="/password/reset/:uid/:token"
              element={<ResetPasswordConfirmation />}
            />
            <Route path="*" element={<PageNotFound />} />
            {/* <Route
              exact
              path="/main"
              element={
                <ProtectedRoute>
                  {" "}
                  <MainPage />{" "}
                </ProtectedRoute>
              }
            /> */}
            <Route
              exact
              path="/change_password"
              element={
                <ProtectedRoute>
                  {" "}
                  <ChangePassword />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/addproject"
              element={
                <ProtectedRoute>
                  <AddProject />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/editproject/:id"
              element={
                <ProtectedRoute>
                  <AddProject />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/userAdmin"
              element={
                <ProtectedRoute>
                  <UserAdmin />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/adminNews"
              element={
                <ProtectedRoute>
                  {" "}
                  <AdminNews />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/testimonial"
              element={
                <ProtectedRoute>
                  {" "}
                  <AdminTestimonial />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/contactUSList"
              element={
                <ProtectedRoute>
                  {" "}
                  <ContactUSAdmin />
                </ProtectedRoute>
              }
            />
            ContactUSAdmin
          </Routes>
          {isHideMenu ? null : <Footer />}
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
}

export default App;
