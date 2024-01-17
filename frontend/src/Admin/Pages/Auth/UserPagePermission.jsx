import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Title from "../../../Common/Title";

import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import { getCookie } from "../../../util/cookieUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import { getMenuObject } from "../../../util/commonUtil";

const UserPagePermission = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [isSuperAdmin, setisSuperAdmin] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [menuDetails, setMenuDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  useEffect(() => {
    setUserName(getCookie("userName"));
    setisSuperAdmin(JSON.parse(getCookie("is_admin")));
    setUserId(JSON.parse(getCookie("userId")));
  }, []);

  /**
   * get User details
   */
  const getAllUserDetails = async () => {
    try {
      const response = await axiosServiceApi.get(`/user/auth/users/`);
      if (response?.status == 200 && response.data?.length > 0) {
        setUserDetails(response.data);
      } else {
        setUserDetails([]);
      }
    } catch (error) {
      toast.error("Unable to load user details");
    }
  };

  /**
   * get Menu details
   */
  const getMenuDetails = async () => {
    try {
      const response = await axiosServiceApi.get(`/pageMenu/createPageMenu/`);
      if (response?.status === 200 && response?.data?.PageDetails?.length > 0) {
        const result = getMenuObject(response.data.PageDetails);
        setMenuDetails(result);
      } else {
        setMenuDetails([]);
      }
    } catch (error) {
      toast.error("Unable to load user details");
    }
  };

  useEffect(() => {
    getAllUserDetails();
    getMenuDetails();
  }, []);

  const userSelection = (user) => {
    console.log(user);
  };

  const handleClick = (e) => {
    const { id, checked, name } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const childContent = (menu, isChild) => {
    return (
      <React.Fragment key={menu.id}>
        <li
          className={`list-group-item ${
            !menu.childMenu
              ? "d-flex justify-content-between align-items-start"
              : ""
          }`}
        >
          {menu.page_label}
          {!menu.childMenu ? (
            <span className="badge">
              <Checkbox
                key={menu.id}
                type="checkbox"
                name={menu.page_label}
                id={menu.id}
                handleClick={handleClick}
                isChecked={isCheck.includes(menu.id)}
              />
            </span>
          ) : (
            ""
          )}

          {menu.childMenu?.length > 0 ? (
            <ul className="list-group">
              {menu.childMenu.map((childMenu) => childContent(childMenu, true))}
            </ul>
          ) : (
            ""
          )}
        </li>
      </React.Fragment>
    );
  };

  return (
    <div className="container-fluid pt-5">
      <div className="row px-3 px-lg-5">
        <div className="text-end d-flex justify-content-between">
          <Title title={"User's page Permission"} cssClass="fs-1 pageTitle" />
        </div>
      </div>

      <div className="row px-3 px-lg-5 py-4 table-responsive">
        <div className="col-6">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {userDetails?.map((user) => (
                <tr key={user.id}>
                  <td className={`${user.is_admin ? "text-danger" : ""}`}>
                    {user.userName}
                  </td>
                  <td className={`${user.is_admin ? "text-danger" : ""}`}>
                    {user.email}
                  </td>
                  <td className={`${user.is_admin ? "text-danger" : ""}`}>
                    {user.id !== userId && !user.is_admin ? (
                      <input
                        name="userCheckbox"
                        type="checkbox"
                        onClick={() => {
                          userSelection(user);
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <ul className="list-group">
            {menuDetails?.map((menu) => childContent(menu, false))}
          </ul>

          {/* {menuDetails?.length > 0 ? (
                    <ul class="list-group">
                        <li class="list-group-item">{page_label}</li>
                        {menuDetails?.childMenu?.length > 0 ? (
                          <ul class="list-group">
                            <li class="list-group-item">{page_label}</li>
                          </ul>
                        ) :'' }
                    </ul>
                ):''} */}
        </div>
      </div>
    </div>
  );
};

const Checkbox = ({ id, type, name, handleClick, isChecked }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

export default UserPagePermission;
