import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// Components
import Title from "../Title";
import { getCookie, removeAllCookies } from "../../util/cookieUtil";
import { logout } from "../../features/auth/authSlice";
import { useAdminLoginStatus } from "../customhook/useAdminLoginStatus";

// Stylesheet
import "./TopStrip.css";

const TopStrip = () => {
  const [footerValues, setFooterValues] = useState([]);
  const isAdmin = useAdminLoginStatus();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loginState, setLoginState] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { footerData, error } = useSelector((state) => state.footerData);

  useEffect(() => {
    if (footerData?.address?.length > 0) {
      setFooterValues(footerData.address[0]);
    }
  }, [footerData]);

  useEffect(() => {
    if (userInfo || getCookie("access")) {
      const uName = userInfo ? userInfo.userName : getCookie("userName");
      setUserName(uName);
    } else {
      setLoginState(false);
      setUserName("");
    }
  }, [userInfo]);

  function logOutHandler() {
    removeAllCookies();
    dispatch(logout());
    toast.success("Logout successfully");
    navigate("/login");
    window.location.reload();
  }
  return (
    <div className="d-flex justify-content-center justify-content-md-between align-items-center topStrip">
      <div className="d-none d-md-flex">
        <Title title="Welcome to RishSystems" cssClass={"fs-6 fw-normal"} />
      </div>
      <div className="d-flex justify-content-between gap-4 quickContact">
        <span className="d-none d-md-flex">
          {" "}
          {footerValues?.phonen_number ? footerValues?.phonen_number : ""}{" "}
        </span>

        {footerValues.emailid ? (
          <span className="d-none d-md-flex">
            <i className="fa fa-paper-plane me-1" aria-hidden="true"></i>
            <a href={`mailto:${footerValues.emailid}`}>
              {footerValues.emailid}{" "}
            </a>
          </span>
        ) : (
          ""
        )}

        {isAdmin ? (
          <>
            <span className="d-none d-md-flex">
              <i className="fa fa-user-o" aria-hidden="true"></i> &nbsp;
              {userName}
            </span>

            <span>
              <a href="#nolink" onClick={logOutHandler}>
                Logout
              </a>
            </span>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default TopStrip;
