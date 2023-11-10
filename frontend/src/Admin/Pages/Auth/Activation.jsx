import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { useParams } from "react-router-dom";
import Title from "../../../Common/Title";
import Error from "../../Components/Error";

const Activation = () => {
  const [verified, setVerified] = useState(false);
  let { uid, token } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    verify_account();
  }, [uid, token]);

  const verify_account = async () => {
    const data = {
      uid: uid,
      token: token,
    };

    const body = JSON.stringify(data);

    try {
      const response = await axiosClientServiceApi.post(
        `/user/auth/users/activation/`,
        body,
      );
      setIsLoading(false);
      if (response.status == 204) {
        setVerified(true);
      }
    } catch (error) {
      setIsLoading(false);
      setVerified(false);
      // if(error.response.status === 403) {
      //     setServerError(true)
      // }
      setServerError(error);
    }
  };

  return (
    <div className="login">
      <div className="bg-white d-flex justify-content-center align-items-center flex-column">
        <div className="container">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ margin: "100px 0" }}
          >
            <Title
              title="Verify your Account"
              cssClass="text-center text-dark mb-4 fw-bold fs-4"
            />

            {verified ? (
              <h5>
                {" "}
                Your Account verfied please click here to login{" "}
                <Link to="/login  ">Login</Link>
              </h5>
            ) : (
              <div>
                <p className="fw-bold">
                  {serverError && <Error>{serverError}</Error>}
                </p>
                <br />
                {serverError && (
                  <p className="text-center">Please contact your admin</p>
                )}
              </div>
            )}
            {isLoading ? (
              <div className="d-grid gap-2 mt-4">
                <h5> Please wait your account is verfication in process </h5>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activation;
