import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../../Common/Title";
import Button from "../../../Common/Button";
import { useNavigate } from "react-router-dom";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";

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
    <div className="container-fluid pt-5" style={{ marginTop: "120px" }}>
      <div className="row px-3 px-lg-5">
        <div className="text-end d-flex justify-content-between">
          <Title
            title={"List of user contacts"}
            cssClass="text-center blue-500 fs-4"
          />
          <Button
            type="submit"
            cssClass="btn btn-secondary"
            label="Back to Menu"
            handlerChange={() => navigate("/main")}
          />
        </div>
      </div>

      <div className="row px-3 px-lg-5 py-4 table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>FirstName</th>
              <th>Email</th>
              <th>phoneNumber</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            {userDetails?.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.description} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactUSAdmin;
