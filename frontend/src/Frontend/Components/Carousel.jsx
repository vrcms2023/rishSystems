import React, { useEffect, useState } from "react";

// Components
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getBaseURL } from "../../util/ulrUtil";
import { getImagePath } from "../../util/commonUtil";

// Styles
import "./Carousel.css";

const Carousel = ({ carouselState }) => {
  const [carousel, setCarousel] = useState([]);
  const baseURL = getBaseURL();

  useEffect(() => {
    const getCarousels = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `carousel/clientCarousel/`,
        );

        if (response?.status == 200) {
          let key = Object.keys(response.data);
          setCarousel(response.data[key]);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!carouselState) {
      getCarousels();
    }
  }, [carouselState]);

  return (
    <div
      id="carouselExampleIndicators"
      className="homeCarousel carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {carousel.length > 0 ? (
          carousel?.map((item, index) => (
            <div
              className={`carousel-item ${index == 0 ? "active" : ""}`}
              key={item.id}
            >
              <img
                src={getImagePath(item.path)}
                alt={item.alternitivetext}
                className="d-block w-100"
              />

              <div className="carousel-caption ">
                {item.carouse_title ? (
                  <h1 className="fw-bold">{item.carouse_title}</h1>
                ) : (
                  ""
                )}

                {item.carouse_sub_title ? (
                  <span className="fw-normal subtitle fs-6">
                    {item.carouse_sub_title}
                  </span>
                ) : (
                  ""
                )}

                {item.carouse_description ? (
                  <p className="fw-normal description fs-5">
                    {item.carouse_description}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center fs-5 text-muted text-center noImg">
            Please add images for Carousel...
          </div>
        )}
        {/* {carousel?.map((item, index) => (
          <div
            className={`carousel-item ${index == 0 ? "active" : ""}`}
            key={item.id}
          >
            <img
              src={getImagePath(item.path)}
              alt={item.alternitivetext}
              className="d-block w-100"
            />
            <div className="carousel-caption d-none d-md-block">
              <h1 className="fw-bold">
                {item.carouse_title ? item.carouse_title : ""}{" "}
              </h1>
              <p className="fw-normal fs-5">
                {item.carouse_description ? item.carouse_description : ""}{" "}
              </p>
            </div>
          </div>
        ))} */}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
