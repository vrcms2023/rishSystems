import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../../Common/Title";

import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import { getCookie } from "../../../util/cookieUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import EditIcon from "../../../Common/AdminEditIcon";
import ModelBg from "../../../Common/ModelBg";
import MenuForm from "../../Components/forms/MenuForm";
import { getMenuObject } from "../../../util/commonUtil";

const PagesConfiguration = () => {
  const editComponentObj = {
    menu: false,
  };
  const [pagesDetails, setPagesDetails] = useState([]);
  const [isSuperAdmin, setisSuperAdmin] = useState("");
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [editMenu, setEditMenu] = useState({});

  useEffect(() => {
    setisSuperAdmin(JSON.parse(getCookie("is_admin")));
  }, []);

  const editHandler = (name, value, item) => {
    setEditMenu(item);
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  /**
   * get User details
   */
  const getAllPagesDetails = async () => {
    try {
      const response = await axiosServiceApi.get(`/pageMenu/createPageMenu/`);
      if (response?.status === 200 && response?.data?.PageDetails?.length > 0) {
        const result = getMenuObject(response.data.PageDetails);
        setPagesDetails(result);
      } else {
        setPagesDetails([]);
      }
    } catch (error) {
      toast.error("Unable to load user details");
    }
  };
  useEffect(() => {
    if (!componentEdit.menu) {
      getAllPagesDetails();
    }
  }, [componentEdit.menu]);

  const handleUserDelete = (menu) => {
    const id = menu.id;
    const title = menu.page_label;
    const deleteMenuItemByID = async () => {
      const response = await axiosServiceApi.delete(
        `/pageMenu/updatePageMenu/${id}/`,
      );
      if (response.status === 204) {
        toast.success(`${title} Memu is delete successfully `);
        getAllPagesDetails();
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteMenuItemByID}
            message={`you want to delete the ${title} Menu`}
          />
        );
      },
    });
  };

  /**
   * user activation
   * @param {*} user
   */
  const activeDeactiveUser = async (user) => {
    try {
      const response = await axiosServiceApi.put(
        `/user/auth/appAccess/${user.id}/`,
        {
          is_appAccess: !user.is_appAccess,
        },
      );

      if (response.status !== 200) {
        toast.error("Unable to active user");
      }

      if (response.status === 200) {
        toast.success(`${user.userName} is status updated`);
        getAllPagesDetails();
      }
    } catch (error) {
      toast.error("Unable to active user");
    }
  };

  const childContent = (page, isChild) => {
    return (
      <React.Fragment key={page.id}>
        <tr key={page.id} className={`${isChild ? "table-info" : ""}`}>
          <td width="20%">
            <div>{page.page_label}</div>
          </td>
          <td width="20%">{page.page_url}</td>
          <td width="20%">{page.is_Parent ? "Parent Menu" : "Child Menu"}</td>
          <td width="12%" className="text-center">
            {page.page_position}
          </td>
          <td width="13%" className="text-center">
            <input
              type="checkbox"
              checked={page.page_isActive}
              readOnly
              onClick={() => {
                activeDeactiveUser(page);
              }}
            />
          </td>
          <td width="15%" className="text-center">
            <Link
              to=""
              onClick={() => editHandler("menu", true, page)}
              className="p-2"
            >
              <i
                className="fa fa-pencil text-warning cursor-pointer fs-5"
                aria-hidden="true"
              ></i>
            </Link>

            <Link
              to=""
              className=" ms-4"
              onClick={() => handleUserDelete(page)}
            >
              <i
                className="fa fa-trash-o fs-4 text-danger"
                aria-hidden="true"
                title="Delete"
              ></i>
            </Link>
          </td>
        </tr>
        {page.childMenu?.length > 0
          ? page.childMenu.map((child) => childContent(child, true))
          : ""}
      </React.Fragment>
    );
  };

  return (
    <div className="container-fluid pt-5">
      <div className="position-relative">
        <EditIcon editHandler={() => editHandler("menu", true)} />

        {componentEdit.menu ? (
          <div className="adminEditTestmonial">
            <MenuForm
              editHandler={editHandler}
              menuList={pagesDetails}
              editMenu={editMenu}
              componentType="menu"
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="row px-3 px-lg-5">
        <div className="text-end d-flex justify-content-between">
          <Title title={"Menu Administration"} cssClass="fs-1 pageTitle" />
        </div>
      </div>

      <div className="row px-3 px-lg-5 py-4 table-responsive">
        {isSuperAdmin ? (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Menu Lable</th>
                <th>URL</th>
                <th>Menu type</th>
                <th className="text-center">Position</th>
                <th className="text-center">Active status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {pagesDetails?.map((page) => childContent(page, false))}
            </tbody>
          </table>
        ) : (
          <h3>Not authorized to view this page </h3>
        )}
      </div>

      {show && <ModelBg />}
    </div>
  );
};

export default PagesConfiguration;
