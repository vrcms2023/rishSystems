import React, { useState, useEffect } from "react";
import Title from "../../Common/Title";
import Model from "../../Common/Model";

import ModelBg from "../../Common/ModelBg";

import "./NewsAndUpdates.css";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import News from "./News";
import { removeActiveClass } from "../../util/ulrUtil";

const NewsAndUpdates = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    removeActiveClass();
  }, []);

  useEffect(() => {
    const getNews = async () => {
      try{
      const response = await axiosClientServiceApi.get(
        `/appNews/clientAppNews/`,
      );
      if (response?.status == 200) {
        setNews(response.data.appNews);
      }
    }catch(error){
      console.log("unable to access ulr because of server is down")
    }
    };
    getNews();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const [obj, setObj] = useState({});

  const articleHandler = (id) => {
    const searchObj = news.find((newsItem) => newsItem.id === id);
    setObj(searchObj);
    setShowModal(!showModal);
  };

  const closeModel = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dateFormat = (date) => {
    let datestring = date;
    return datestring.slice(0, 10);
  };

  return (
    <>
      <div className="headerBottomMargin">
        <div className=" banner newBanner"></div>
      </div>
      <div className="container my-4 newsAndUpdates">
        <div className="row">
          <Title title="News And Updates" cssClass="blue-900 fs-4 mb-4" />
          {news?.length > 0 &&
            news.map((item) => (
              <News
                item={item}
                dateFormat={dateFormat}
                key={item.id}
                articleHandler={articleHandler}
              />
            ))}
        </div>
      </div>
      {showModal && <Model obj={obj} closeModel={closeModel} flag="news" />}
      {showModal && <ModelBg closeModel={closeModel} />}
    </>
  );
};

export default NewsAndUpdates;
