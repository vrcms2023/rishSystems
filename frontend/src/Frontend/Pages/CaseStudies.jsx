import React, { useState, useEffect } from "react";
import EditIcon from "../../Common/AdminEditIcon";
import Banner from "../../Common/Banner";
import BriefIntroFrontend from "../../Common/BriefIntro";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";
import Ancher from '../../Common/Ancher';
import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../util/dynamicFormFields";
import useAdminLoginStatus from "../../Common/customhook/useAdminLoginStatus";
import { axiosClientServiceApi, axiosServiceApi } from "../../util/axiosUtil";
import { getImagePath, paginationDataFormat } from "../../util/commonUtil";
import Title from "../../Common/Title";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../Common/DeleteDialog";
import AddEditAdminNews from "../../Admin/Components/News";
import { toast } from "react-toastify";


import { getCaseStudiesFields } from "../../util/dynamicFormFields";
import { removeActiveClass } from "../../util/ulrUtil";
import Search from "../../Common/Search";
import CustomPagination from "../../Common/CustomPagination";
import { sortCreatedDateByDesc } from "../../util/dataFormatUtil";

const CaseStudies = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    addSection: false,
    editSection: false,
  };

  const pageType = "casestudies";
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [clientsList, setClientsList] = useState([]);
  const [show, setShow] = useState(false);
  const [editCarousel, setEditCarousel] = useState({});

  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const setResponseData = (data) => {
    setClientsList(
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
    } else {
      setEditCarousel({});
    }
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const getCAseStutiesvalues = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/caseStudies/clientCaseStudies/`,
        );
        console.log(response, "response")
        if (response?.status === 200) {
          setResponseData(response.data);
          setPageloadResults(1);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.addSection || !componentEdit.editSection) {
      getCAseStutiesvalues();
    }
  }, [componentEdit.addSection, componentEdit.editSection]);

  useEffect(() => {
    removeActiveClass();
    const id = document.getElementById("KnowledgeHubnavbarDropdown");
    if (id) {
      id.classList.add("active");
    }
  });

  const deleteAboutSection = (item) => {
    const id = item.id;
    const name = item.case_studies_title;

    const deleteSection = async () => {
      const response = await axiosServiceApi.delete(
        `/caseStudies/updateCaseStudies/${id}/`,
      );
      if (response.status === 204) {
        const list = clientsList.filter((list) => list.id !== id);
        setClientsList(list);
        toast.success(`${name} is deleted`);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteSection}
            message={`deleting the ${name} Service?`}
          />
        );
      },
    });
  };

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

      {/* Brief Introduction */}
      {isAdmin ? (
        <EditIcon editHandler={() => editHandler("briefIntro", true)} />
      ) : (
        ""
      )}

      <BriefIntroFrontend
        introState={componentEdit.briefIntro}
        pageType={pageType}
      />

      {componentEdit.briefIntro ? (
        <div className="adminEditTestmonial">
          <AdminBriefIntro
            editHandler={editHandler}
            componentType="briefIntro"
            pageType={pageType}
          />
        </div>
      ) : (
        ""
      )}

      {/* Add Clients */}
      <div className="container-fluid container-lg my-md-5 ">
        <div className="row">
          <div className="col-md-6 fs-3 mt-4 mt-md-0">
            <Title title="Case Studies" cssClass="fs-1 pageTitle" />
          </div>

          <div className="col-md-6">
            <Search
              setObject={setResponseData}
              clientSearchURL={"/caseStudies/searchCaseStudies/"}
              adminSearchURL={"/caseStudies/createCaseStudies/"}
              clientDefaultURL={"/caseStudies/clientCaseStudies/"}
              searchfiledDeatails={
                "Case studies Title / Case studies description "
              }
              setPageloadResults={setPageloadResults}
              setSearchquery={setSearchquery}
              searchQuery={searchQuery}
            />
          </div>
          {isAdmin ? (
            <div className="col-md-6">
              <div className="d-flex justify-content-end align-items-center mb-3">
                <span className="fw-bold me-2">Add content </span>
                <button
                  type="submit"
                  className="btn btn-primary px-3"
                  onClick={() => editHandler("addSection", true)}
                >
                  {" "}
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {componentEdit.editSection || componentEdit.addSection ? (
          <div className="adminEditTestmonial">
            <AddEditAdminNews
              editHandler={editHandler}
              category="about"
              editCarousel={editCarousel}
              setEditCarousel={setEditCarousel}
              componentType={`${
                componentEdit.editSection ? "editSection" : "addSection"
              }`}
              imageGetURL="caseStudies/createCaseStudies/"
              imagePostURL="caseStudies/createCaseStudies/"
              imageUpdateURL="caseStudies/updateCaseStudies/"
              imageDeleteURL="caseStudies/updateCaseStudies/"
              imageLabel="Image"
              showDescription={false}
              showExtraFormFields={getCaseStudiesFields()}
              dimensions={imageDimensionsJson("aboutus")}
            />
          </div>
        ) : (
          ""
        )}

        <div className="row aboutPage">
          {clientsList.length > 0 ? (
            clientsList.map((item, index) => (
              
              <>
                <div
                  key={item.id}
                  className={`row mb-2 ${
                    isAdmin
                      ? "border border-warning mb-3 position-relative"
                      : ""
                  } ${index % 2 === 0 ? "normalCSS" : "flipCSS"}`}
                >
                  {isAdmin ? (
                    <>
                      <EditIcon
                        editHandler={() =>
                          editHandler("editSection", true, item)
                        }
                      />
                      <Link
                        className="deleteSection"
                        onClick={() => deleteAboutSection(item)}
                      >
                        <i
                          className="fa fa-trash-o text-danger fs-4"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="col-12 col-lg-9 p-3 p-md-4 py-md-4 d-flex justify-content-center align-items-start flex-column">
                    {item.case_studies_title ? (
                      <Title
                        title={item.case_studies_title}
                        cssClass="fs-3 fw-bold mb-1"
                      />
                    ) : (
                      ""
                    )}

                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.case_studies_description,
                      }}
                    />
                    <div className=''>
                    <Ancher AncherClass='btn btn-outline d-flex gap-2 justify-content-center align-items-center' AnchersvgColor="#17427C" AncherLabel="More" />
                    </div>
                  </div>

                  <div className="col-lg-3 d-none d-lg-block h-100">
                    <div className="h-100 p-3 p-md-5 py-md-4 d-flex flex-column justify-content-center align-items-center reset ">
                      <img
                        src={getImagePath(item.path)}
                        alt=""
                        className="img-fluid rounded-circle shadow-lg border border-4"
                      />
                    </div>
                    
                  </div>
                </div>
                <hr className="border-secondary" />
              </>
            ))
          ) : (
            <p className="text-center text-muted py-5">
              Please add page contents...
            </p>
          )}
        </div>
        <div>
          {paginationData?.total_count ? (
            <CustomPagination
              paginationData={paginationData}
              paginationURL={
                isAdmin
                  ? "/caseStudies/createCaseStudies/"
                  : "/caseStudies/clientCaseStudies/"
              }
              paginationSearchURL={
                searchQuery
                  ? `/caseStudies/searchCaseStudies/${searchQuery}/`
                  : isAdmin
                  ? "/caseStudies/createCaseStudies/"
                  : "/caseStudies/clientCaseStudies/"
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

export default CaseStudies;
