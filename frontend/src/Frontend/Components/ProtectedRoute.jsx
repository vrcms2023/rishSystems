import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UnauthorizedPage from "../../Admin/Pages/Login/UnauthorizedPage";
import { getCookie } from "../../util/cookieUtil";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserToken = () => {
      const userToken = getCookie("access");
      let is_appAccess = getCookie("is_appAccess")
        ? JSON.parse(getCookie("is_appAccess"))
        : false;

      if (!userToken || userToken === undefined) {
        setIsLoggedIn(false);
        return navigate("/login");
      }

      if (!is_appAccess) {
        setIsLoggedIn(false);
        return navigate("/unauthorized");
      }

      setIsLoggedIn(true);
    };

    checkUserToken();
  }, [isLoggedIn]);

  return <React.Fragment>{isLoggedIn ? props.children : ""}</React.Fragment>;
};
export default ProtectedRoute;
