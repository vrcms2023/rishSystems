import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../../Common/Title";
import Button from "../../../Common/Button";
import { useNavigate } from "react-router-dom";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";

import './authCommonStyles.css'
import Search from "../../../Common/Search";

const ContactUSAdmin = () => {
  const [userDetails, setUserDetails] = useState([]);

  const navigate = useNavigate();

  /**
   * get User details
   */
  const getAllUserDetails = async () => {
    try {
      const response = await axiosServiceApi.get(`/contactus/`);
      if (response?.status == 200 && response.data?.contactus?.length > 0) {
        setUserDetails(response.data.contactus);
      } else {
        setUserDetails([]);
      }
    } catch (error) {
      toast.error("Unable to load contactus details");
    }
  };
  useEffect(() => {
    getAllUserDetails();
  }, []);

  return (
    <div className="container-fluid pt-5">
      {/* <div className="row px-3 px-lg-5 mb-4">
        <div className="col-12" >
          <Button
              type="submit"
              cssClass="btn btn-secondary float-end"
              label="Back"
              icon="fa-chevron-left"
              handlerChange={() => navigate("/main")}
            />
        </div>
      </div> */}
      <div className="row px-3 px-lg-5">
        <div className="col-12 d-flex justify-content-between">
          <Title title={"Contact list"} cssClass="text-start fs-4" />
          <Search
              setObject={userDetails}
              clientSearchURL={""}
              adminSearchURL={""}
              clientDefaultURL={""}
              searchfiledDeatails={"Name / Email ID / Phone No. "}
            />
        </div>
      </div>

      <div className="row px-3 px-lg-5 py-4 table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>First name</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
          <tr >
                
               {userDetails?.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>
                <a
                  className="btn btn-primary mt-3 mt-lg-0"
                  href={`mailto:${
                    user.email 
                      ? user.email
                      : ""
                  }`}
                >
                {user.email}
                </a>
                </td> 
                <td>
                <a href={`tel:+91${user.phoneNumber}`}>Call {user.phoneNumber}</a>
                {/* {user.phoneNumber} */}
                </td>
                <td>{user.description} </td>
              </tr>
            ))} 
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactUSAdmin;
