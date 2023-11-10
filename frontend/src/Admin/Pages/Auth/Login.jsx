import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, getUser } from "../../../features/auth/authActions";
import Title from "../../../Common/Title";
import Button from "../../../Common/Button";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../Components/Error";
import {
  removeAllCookies,
  removeCookie,
  setCookie,
  getCookie,
} from "../../../util/cookieUtil";

import "./Login.css";
import { toast } from "react-toastify";
import CSRFToken from "../../../Frontend/Components/CRSFToken";

const Login = () => {
  const { access, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  // redirect authenticated user to Main screen
  useEffect(() => {
    if (access) {
      dispatch(getUser());
    }
  }, [access]);

  useEffect(() => {
    if (userInfo) {
      toast.success(`${userInfo.userName} Login successfully `);
      setCookie("email", userInfo.email);
      setCookie("userName", userInfo.userName);
      setCookie("userId", userInfo.id);
      setCookie("is_admin", JSON.parse(userInfo.is_admin));
      setCookie("is_appAccess", JSON.parse(userInfo.is_appAccess));
      navigate("/main");
    } else {
      if (getCookie("email")) {
        removeAllCookies();
      }
    }
  }, [userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  const loginHandler = () => {};

  return (
    <div className="login">
      <div className="bg-white d-flex justify-content-center align-items-center flex-column">
        <form onSubmit={handleSubmit(submitForm)} className="shadow-lg">
          <CSRFToken />
          {error ? (
            <p className="fw-bold">{error && <Error>{error}</Error>}</p>
          ) : (
            ""
          )}
          <input
            type="hidden"
            {...register("csrfmiddlewaretoken")}
            name="csrfmiddlewaretoken"
            value="m6pDnuW9RPTEuK66x0H4oc09JSfyv6bD"
          />
          <Title
            title="Admin login"
            cssClass="text-center text-dark mb-4 fw-bold fs-4"
          />
          <div className="mb-3">
            <label
              htmlFor="userName"
              className="form-label text-dark fw-normal"
            >
              Email
            </label>
            <input
              type="text"
              {...register("email")}
              name="email"
              className="form-control bg-light"
              id="userName"
              aria-describedby="emailHelp"
            />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>
          <div className="mb-3">
            <label
              htmlFor="signPassord"
              className="form-label text-dark fw-normal"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              name="password"
              className="form-control bg-light"
              id="signPassord"
            />
          </div>

          <div className="d-grid gap-2 mt-4">
            <Button
              type="submit"
              cssClass="btn btn-lg btn-primary"
              handlerChange={loginHandler}
              label="Login"
            />
          </div>
          <div className="mt-3">
            Don't have an account ? <Link to="/register">Sign Up </Link>
          </div>
          <div className="mt-3">
            Forgot your Password ?{" "}
            <Link to="/reset_password  ">Reset Password </Link>
          </div>
          <div className="mt-3">
            Not Activate your account ?{" "}
            <Link to="/resend_activation">Activate</Link>
          </div>
        </form>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Back to HPR Infra website
        </button>
      </div>
    </div>
  );
};

export default Login;
