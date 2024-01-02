import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Component Import
import Title from "../../Common/Title";
import NewsForm from "../../Admin/Components/News/index";

// Styles
import "./ABrief.css";

// Image Import
import CareerImg from "../../Images/insrued.png";
import EditIcon from "../../Common/AdminEditIcon";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import ModelBg from "../../Common/ModelBg";
import BriefIntroAdmin from "../../Admin/Components/BriefIntro";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getImagePath } from "../../util/commonUtil";
import { getFormDynamicFields } from "../../util/dynamicFormFields";

const ABrief = ({ title, cssClass, linkClass, moreLink, dimensions }) => {
  const editComponentObj = {
    homecareers: false,
  };
  const pageType = "homePageCareer";
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [bannerdata, setBannerData] = useState([]);
  const ServiceBannerFormField = {
    imageTitle: {
      label: "Title",
      type: "text",
      fieldName: "imageTitle",
    },
    bannerTitle: {
      label: "Sub Title",
      type: "text",
      fieldName: "bannerTitle",
    },
    imageDescription: {
      label: "Description",
      type: "textarea",
      fieldName: "imageDescription",
    },
    pageType: {
      label: "News Title",
      readonly: true,
      type: "hidden",
      value: pageType ? pageType : "",
      fieldName: "pageType",
    },
  };

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `banner/clientBannerIntro/${pageType}/`,
        );
        if (response?.status == 200) {
          setBannerData(response.data.imageModel);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.homecareers) {
      getBannerData();
    }
  }, [componentEdit.homecareers]);

  return (
    <div className="row h-100">
      {/* Edit News */}

      <div className="col-md-5 ps-0 ABriefImg ">
        <img
          src={bannerdata?.path ? getImagePath(bannerdata.path) : CareerImg}
          alt=""
          className="w-100 h-100 img-fluid"
        />
      </div>
      <div className="col-md-7 p-4 pt-0 d-flex justify-content-start align-items-start flex-column position-relative">
        {isAdmin ? (
          <EditIcon editHandler={() => editHandler("homecareers", true)} />
        ) : (
          ""
        )}
        {bannerdata ? (
          <Title title={bannerdata.banner_title} cssClass={cssClass} />
        ) : (
          ""
        )}
        {/* <Title
          title={
            bannerdata?.banner_title ? bannerdata.banner_title : "upload Title"
          }
          cssClass={cssClass}
        /> */}

        <p className="lh-md mt-4">
          {bannerdata?.banner_descripiton
            ? bannerdata.banner_descripiton
            : "upload Description"}
        </p>

        <div>
          <Link to={moreLink} className={linkClass}>
            Join Us Now
          </Link>
        </div>
      </div>
      {componentEdit.homecareers ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm
            editHandler={editHandler}
            componentType="homecareers"
            pageType={pageType}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(pageType)}
            dimensions={dimensions}
          />

          {/* <NewsForm editHandler={editHandler} componentType="careers" /> */}
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </div>
  );
};
export default ABrief;
