import React, {useState, useEffect} from 'react'
import EditIcon from '../../Common/AdminEditIcon';
import Banner from '../../Common/Banner';
import BriefIntroFrontend from '../../Common/BriefIntro';
import ImageInputsForm from '../../Admin/Components/forms/ImgTitleIntoForm';
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";
import { getFormDynamicFields, imageDimensionsJson } from '../../util/dynamicFormFields';
import useAdminLoginStatus from '../../Common/customhook/useAdminLoginStatus';
import { axiosClientServiceApi } from '../../util/axiosUtil';
import { getImagePath } from '../../util/commonUtil';


const TestimonialsList = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    addSection: false,
    editSection: false,
  };
  
  const pageType = "testimonial";
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [testimonis, setTestmonis] = useState([]);
  const [show, setShow] = useState(false);
  const [editCarousel, setEditCarousel] = useState({});

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
        console.log(response, "testimonials response")
        if (response?.status === 200) {
          setTestmonis(response.data.testimonial);
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
            <h1 className="title">
              Testimonials
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          {testimonis.length && testimonis.map(item => (
          <div className='py-4 d-flex flex-column flex-column-reverse flex-md-row gap-3 gap-md-5 border-bottom justify-content-center align-items-center testimonialList'>
            <div>
              <h4 className='fw-bold'>{item.testimonial_title}</h4>
              <h3>{item.testimonial_sub_title}</h3>
              <p>{item.testimonial_description}</p>
            </div>
            <img src={getImagePath(item.path)} alt={item.testimonial_title} className='rounded-circle img-fluid'/>
          </div>))}

          </div>
        </div>
      </div>
      
    </>
  )
}

export default TestimonialsList