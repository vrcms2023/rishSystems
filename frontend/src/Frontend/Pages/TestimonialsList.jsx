import React, { useState, useEffect } from "react";
import EditIcon from "../../Common/AdminEditIcon";
import Banner from "../../Common/Banner";
import BriefIntroFrontend from "../../Common/BriefIntro";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";
import {
  getFormDynamicFields,
  getTestimonialsFields,
  imageDimensionsJson,
} from "../../util/dynamicFormFields";
import useAdminLoginStatus from "../../Common/customhook/useAdminLoginStatus";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getImagePath, paginationDataFormat } from "../../util/commonUtil";

import { removeActiveClass } from "../../util/ulrUtil";

import Title from "../../Common/Title";
import Search from "../../Common/Search";
import CustomPagination from "../../Common/CustomPagination";
import { sortCreatedDateByDesc } from "../../util/dataFormatUtil";
import AdminBanner from "../../Admin/Components/forms/ImgTitleIntoForm-List";

const TestimonialsList = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    addSection: false,
    editSection: false,
    testmonial: false,
  };

  const pageType = "testimonial";
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [testimonis, setTestmonis] = useState([]);
  const [show, setShow] = useState(false);
  const [editCarousel, setEditCarousel] = useState({});

  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    removeActiveClass();
    const id = document.getElementById("KnowledgeHubnavbarDropdown");
    if (id) {
      id.classList.add("active");
    }
  });

  const setResponseData = (data) => {
    setTestmonis(
      data.results.length > 0 ? sortCreatedDateByDesc(data.results) : [],
    );
    setPaginationData(paginationDataFormat(data));
    setCurrentPage(1);
  };

  const editHandler = (name, value, item) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    if (item?.id) {
      setEditCarousel(item);
    }
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const getTestimonial = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/testimonials/clientTestimonials/`,
        );
       
        if (response?.status === 200) {
          setResponseData(response.data);
          setPageloadResults(1)
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.testmonial) {
      getTestimonial();
    }
  }, [componentEdit.testmonial]);

  return (
    <>
      {/* Page Banner Component */}
      <div className="position-relative">
        {isAdmin ? (
          <EditIcon editHandler={() => editHandler("banner", true)} />
        ) : (
          ""
        )}
        <Banner
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
          bannerState={componentEdit.banner}
        />
      </div>
      {componentEdit.banner ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            pageType={`${pageType}-banner`}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-banner`)}
            dimensions={imageDimensionsJson("banner")}
          />
        </div>
      ) : (
        ""
      )}

      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <Title title="Testimonials" cssClass="fs-1 pageTitle" />
          </div>
          <div className="col-md-6">
                <Search
                  setObject={setResponseData}
                  clientSearchURL={"/testimonials/searchtestimonials/"}
                  adminSearchURL={"/testimonials/createTestimonials/"}
                  clientDefaultURL={"/testimonials/clientTestimonials/"}
                  searchfiledDeatails={"Testimonial Title / Testimonial description "}
                  setPageloadResults={setPageloadResults}
                  setSearchquery={setSearchquery}
                  searchQuery={searchQuery}
                />
              </div>
              {isAdmin ? (
            <div className="col-md-6">
              <div className="d-flex justify-content-end align-items-center mb-3">
                <span className="fw-bold me-2">Add / Edit Testimonials </span>
                <button
                  type="submit"
                  className="btn btn-primary px-3"
                  onClick={() => editHandler("testmonial", true)}
                >
                  {" "}
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
              </div>
              
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="row">
          <div className="col-md-12">
            {testimonis.length &&
              testimonis.map((item) => (
                <div className="py-4 d-flex flex-column flex-column-reverse flex-md-row gap-3 gap-md-5 border-bottom justify-content-center align-items-center testimonialList">
                  <div>
                    <Title
                      title={item.testimonial_title}
                      cssClass="fs-3 fw-bold"
                    />
                    <Title
                      title={item.testimonial_sub_title}
                      cssClass="fs-5 fw-bold"
                    />
                    <p>{item.testimonial_description}</p>
                  </div>
                  <img
                    src={getImagePath(item.path)}
                    alt={item.testimonial_title}
                    className="rounded-circle img-fluid"
                  />
                </div>
              ))}
          </div>
        </div>
        <div>
                
        {componentEdit.testmonial ? (
          
        <div className="adminEditTestmonial">
          <AdminBanner
            editHandler={editHandler}
            componentType="testmonial"
            getImageListURL="testimonials/clientTestimonials/"
            deleteImageURL="testimonials/updateTestimonials/"
            imagePostURL="testimonials/createTestimonials/"
            imageUpdateURL="testimonials/updateTestimonials/"
            imageLabel="Add your Image"
            titleTitle="Testmonial Name"
            descriptionTitle="Testimonial Writeup "
            showDescription={false}
            showExtraFormFields={getTestimonialsFields("testmonial")}
            dimensions={imageDimensionsJson("testimonial")}
          />
        </div>
      ) : (
        ""
      )}
          
          {paginationData?.total_count ? (
                  <CustomPagination
                    paginationData={paginationData}
                    paginationURL={
                      isAdmin
                        ? "/testimonials/createTestimonials/"
                        : "/testimonials/clientTestimonials/"
                    }
                    paginationSearchURL={
                      searchQuery
                        ? `/testimonials/searchtestimonials/${searchQuery}/`
                        : isAdmin
                        ? "/testimonials/createTestimonials/"
                        : "/testimonials/clientTestimonials/"
                    }
                    searchQuery={searchQuery}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    setResponseData={setResponseData}
                    pageLoadResult={pageLoadResult}
                  />
                ) : (
                  ""
                )}
              </div>
      </div>
    </>
  );
};

export default TestimonialsList;
