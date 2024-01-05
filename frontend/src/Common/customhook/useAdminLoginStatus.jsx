import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "../../util/cookieUtil";

export const useAdminLoginStatus = () => {
  const [loginState, setLoginState] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (getCookie("access")) {
      setLoginState(true);
    }
  }, [userInfo]);

  return loginState;
};

export default useAdminLoginStatus;
