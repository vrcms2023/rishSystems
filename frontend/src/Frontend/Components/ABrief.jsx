import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Component Import
import Title from "../../Common/Title";


import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import ModelBg from "../../Common/ModelBg";

import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getImagePath } from "../../util/commonUtil";
import { getFormDynamicFields } from "../../util/dynamicFormFields";

// Image Import
import Logo from "../../../src/Images/logo.svg";
import circleArrow from "../../../src/Images/circleArrow.svg";
import EditIcon from "../../Common/AdminEditIcon";

// Styles
import "./ABrief.css";

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

      <div className="d-none col-lg-6 p-0 ABriefImg d-md-flex justify-content-center align-items-center">
        <div className="bg-white text-black m-3 ms-lg-5 p-4 py-5">
          <p>
            {/* <img src={Logo} alt="logo" className="img-fluid text-white" /> */}
            
  <svg width="246" height="43" viewBox="0 0 246 43" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M43.8336 15.4223L42.6937 11.9186C42.6193 11.6897 42.4059 11.5348 42.1648 11.5348H30.2991L26.6727 0.383794C26.5983 0.154886 26.3849 0 26.1438 0H22.4555H18.7684C18.5273 0 18.3138 0.154886 18.2394 0.383794L14.5726 11.6563H2.83525C2.59415 11.6563 2.38075 11.8112 2.30635 12.0401L1.16705 15.5438L0.0272439 19.0475C-0.0471562 19.2764 0.0342938 19.5271 0.229244 19.6686L9.82846 26.6355L6.2015 37.7864C6.1271 38.0153 6.20855 38.2659 6.4035 38.4075L9.38691 40.5727C9.38746 40.5731 9.38816 40.5732 9.38871 40.5736L12.3704 42.7379C12.4681 42.8087 12.5827 42.8439 12.6972 42.8439C12.8118 42.8439 12.9264 42.8087 13.0241 42.7379L22.6234 35.7712L32.1187 42.663C32.2164 42.7338 32.331 42.7691 32.4456 42.7691C32.5602 42.7691 32.6747 42.7338 32.7725 42.663L35.7564 40.4973L38.7399 38.3321C38.9348 38.1905 39.0163 37.9399 38.9419 37.711L35.2751 26.4387L44.7708 19.5466C44.9657 19.405 45.0472 19.1544 44.9728 18.9255L43.8336 15.4223ZM41.7608 12.6458L42.6508 15.3819L39.662 17.5509L33.774 21.8238L33.5847 21.242L32.9959 19.4313L37.6642 16.0434C37.8592 15.9018 37.9406 15.6512 37.8662 15.4223C37.7918 15.1934 37.5784 15.0385 37.3373 15.0385L22.1462 15.038L22.9243 12.6458H26.2074H29.895H41.7608ZM19.6719 19.0475C19.6717 19.0484 19.672 19.0493 19.6717 19.0502L18.4762 22.7262L16.3345 21.172L20.6119 8.02186L21.9353 12.0903L21.7704 12.5972L20.8514 15.4218L19.6719 19.0475ZM24.4343 19.7747L25.6178 23.4127L22.5199 25.6611L19.422 23.413L20.6054 19.7748L24.4343 19.7747ZM21.5738 26.3477L19.4324 27.9019L8.2346 19.7747H12.5164L21.5738 26.3477ZM19.7594 29.038L22.847 26.7973C22.8475 26.797 22.8478 26.7965 22.8483 26.7961L25.9792 24.5239L26.797 27.0387L25.2221 28.1817L15.5994 35.1653L16.9223 31.097L19.7594 29.038ZM25.6035 19.7747H28.2506L32.5276 32.9252L29.0638 30.4104L28.7182 29.3485L25.6035 19.7747ZM28.6547 18.6635H24.8383C24.8375 18.6635 24.8368 18.6637 24.8361 18.6637H20.9668L21.7848 16.1489L35.6256 16.1494L32.1608 18.6637H28.6564C28.6558 18.6638 28.6553 18.6635 28.6547 18.6635ZM25.7397 1.11097L29.1299 11.5348H26.6114L23.2209 1.11097H25.7397ZM15.5058 12.3834C15.5059 12.3831 15.5057 12.3828 15.5058 12.3824L19.1723 1.11097H22.0514L25.4418 11.5348H22.9241L21.1408 6.05274C21.0664 5.82384 20.853 5.66895 20.6118 5.66895C20.3707 5.66895 20.1573 5.82384 20.0829 6.05274L15.3883 20.4852L13.351 19.0069L14.3659 15.8872L15.5058 12.3834ZM3.23925 12.7673H14.2112L13.4328 15.1601H2.4611L3.23925 12.7673ZM1.20995 19.0071L2.1 16.271H13.0715L12.2931 18.6637H6.523C6.2819 18.6637 6.06845 18.8186 5.99405 19.0475C5.91965 19.2764 6.00115 19.5271 6.1961 19.6686L18.4863 28.5885L16.4489 30.0671L16.4473 30.066L13.7931 28.1391L10.8091 25.9739C10.809 25.9739 10.8092 25.9739 10.8091 25.9739L1.20995 19.0071ZM7.3842 37.746L10.7744 27.322L12.8122 28.801L9.42166 39.2245L7.3842 37.746ZM22.2964 34.635C22.296 34.6353 22.2958 34.6356 22.2955 34.6359L12.6972 41.6018L10.3682 39.9112L12.8679 32.2251L13.7584 29.4877L14.8021 30.2451L15.7952 30.9661L14.0125 36.4482C13.9381 36.6771 14.0195 36.9277 14.2145 37.0693C14.41 37.2109 14.6728 37.2109 14.8683 37.0693L27.1587 28.1495L27.9369 30.5416L26.748 31.4045L25.2811 32.4688C25.2807 32.4691 25.2802 32.4692 25.2798 32.4695L22.2964 34.635ZM32.4456 41.5269L23.5695 35.0846L25.6068 33.606L34.4835 40.048L32.4456 41.5269ZM37.7592 37.6706L35.4297 39.3614L26.5531 32.9192L28.1855 31.7345L28.5907 31.4405L33.2586 34.829C33.4541 34.9705 33.7169 34.9705 33.9124 34.829C34.1073 34.6874 34.1888 34.4368 34.1144 34.2079L29.4203 19.7748H31.9379L37.7592 37.6706ZM34.9137 25.3275L34.1355 22.9348L37.1243 20.7658L43.0124 16.4928L43.79 18.8851L34.9137 25.3275Z" fill="black"/>
  <path d="M77.1197 21.9309C77.0029 19.307 75.3394 17.6744 72.9462 15.6919H68.9186V21.9309H66V3.30115H68.0138H68.9186H73.9968C74.814 3.30115 75.5729 3.44693 76.3317 3.70932C77.0613 4.00086 77.7618 4.43818 78.3163 4.96296C79.5713 6.12915 80.2717 7.73265 80.2717 9.48193C80.2717 11.2604 79.5713 12.8639 78.3163 14.0009C77.8493 14.4674 77.2948 14.8172 76.7111 15.1088C77.2072 15.6044 77.6742 16.1 78.112 16.6831C79.3378 18.2575 79.9507 19.9484 80.0382 21.8143V21.9309H77.1197ZM68.9186 12.7764H73.9968C75.6312 12.7764 77.3532 11.6102 77.3532 9.48193C77.3532 7.35364 75.6312 6.21661 73.9968 6.21661H68.9186V12.7764ZM86.1088 21.9309H83.1903V3.30115H86.1088V21.9309ZM97.6955 22.1933C94.8937 22.1933 91.3038 21.4062 90.1364 20.9688L91.1579 18.2283C92.2378 18.6365 96.7615 19.5694 98.8921 19.1904C99.6217 19.0738 100.205 18.4032 100.322 17.6452C100.439 16.654 99.7093 15.6919 98.2792 15.0213C97.4036 14.6131 95.7692 13.9134 94.4559 13.3595C93.6971 13.0388 93.0258 12.7472 92.6172 12.5723C91.5665 12.1058 90.691 11.377 90.1072 10.5315C89.5527 9.68601 89.2609 8.72391 89.29 7.73265C89.3192 6.79971 89.6111 5.92507 90.1656 5.16705C90.7201 4.37987 91.5081 3.79678 92.4421 3.44693C93.6971 2.9513 95.5066 2.9513 97.8122 3.35946C99.5634 3.70932 101.139 4.20495 101.811 4.43818L100.789 7.17872C100.264 6.97463 98.8337 6.53731 97.2577 6.24577C94.8645 5.77929 93.8138 6.04169 93.4928 6.1583C92.7048 6.44985 92.2378 7.0621 92.2086 7.82012C92.1794 8.6656 92.7923 9.45278 93.8138 9.91925C94.1932 10.065 94.8645 10.3566 95.6233 10.6773C96.9367 11.2604 98.6002 11.9601 99.5342 12.3974C100.877 13.0388 101.869 13.8551 102.511 14.8755C103.124 15.8668 103.357 16.9455 103.212 18.0534C102.949 20.0651 101.373 21.6977 99.4174 22.0476C98.8921 22.135 98.3084 22.1933 97.6955 22.1933ZM117.483 3.30115H120.402V21.9309H117.483V13.447H109.37V21.9309H106.451V3.30115H109.37V10.5315H117.483V3.30115ZM140.715 22.1933C137.913 22.1933 134.323 21.4062 133.156 20.9688L134.177 18.2283C135.257 18.6365 139.781 19.5694 141.912 19.1904C142.641 19.0738 143.225 18.4032 143.342 17.6452C143.458 16.654 142.729 15.6919 141.299 15.0213C140.423 14.6131 138.789 13.9134 137.475 13.3595C136.717 13.0388 136.045 12.7472 135.637 12.5723C134.586 12.1058 133.71 11.377 133.127 10.5315C132.572 9.68601 132.28 8.72391 132.309 7.73265C132.339 6.79971 132.631 5.92507 133.185 5.16705C133.74 4.37987 134.528 3.79678 135.462 3.44693C136.717 2.9513 138.526 2.9513 140.832 3.35946C142.583 3.70932 144.159 4.20495 144.83 4.43818L143.809 7.17872C143.283 6.97463 141.853 6.53731 140.277 6.24577C137.884 5.77929 136.833 6.04169 136.512 6.1583C135.724 6.44985 135.257 7.0621 135.228 7.82012C135.199 8.6656 135.812 9.45278 136.833 9.91925C137.213 10.065 137.884 10.3566 138.643 10.6773C139.956 11.2604 141.62 11.9601 142.554 12.3974C143.896 13.0388 144.888 13.8551 145.531 14.8755C146.143 15.8668 146.377 16.9455 146.231 18.0534C145.968 20.0651 144.392 21.6977 142.437 22.0476C141.912 22.135 141.328 22.1933 140.715 22.1933ZM162.808 3.272V3.30115C162.867 4.90466 162.575 6.59562 161.991 8.25744C160.853 11.5228 158.781 14.1467 157.059 15.9251V21.9309H154.14V15.9251C152.389 14.1467 150.317 11.5228 149.179 8.25744C148.595 6.59562 148.303 4.90466 148.362 3.30115V3.272H151.251C151.105 7.44111 153.732 11.1146 155.6 13.1846C157.438 11.1146 160.065 7.44111 159.919 3.272H162.808ZM173.286 22.1933C170.484 22.1933 166.894 21.4062 165.727 20.9688L166.748 18.2283C167.828 18.6365 172.352 19.5694 174.483 19.1904C175.212 19.0738 175.796 18.4032 175.913 17.6452C176.029 16.654 175.3 15.6919 173.87 15.0213C172.994 14.6131 171.36 13.9134 170.046 13.3595C169.288 13.0388 168.616 12.7472 168.208 12.5723C167.157 12.1058 166.281 11.377 165.698 10.5315C165.143 9.68601 164.851 8.72391 164.881 7.73265C164.91 6.79971 165.202 5.92507 165.756 5.16705C166.311 4.37987 167.099 3.79678 168.033 3.44693C169.288 2.9513 171.097 2.9513 173.403 3.35946C175.154 3.70932 176.73 4.20495 177.401 4.43818L176.38 7.17872C175.854 6.97463 174.424 6.53731 172.848 6.24577C170.455 5.77929 169.404 6.04169 169.083 6.1583C168.295 6.44985 167.828 7.0621 167.799 7.82012C167.77 8.6656 168.383 9.45278 169.404 9.91925C169.784 10.065 170.455 10.3566 171.214 10.6773C172.527 11.2604 174.191 11.9601 175.125 12.3974C176.467 13.0388 177.459 13.8551 178.102 14.8755C178.714 15.8668 178.948 16.9455 178.802 18.0534C178.539 20.0651 176.963 21.6977 175.008 22.0476C174.483 22.135 173.899 22.1933 173.286 22.1933ZM192.957 3.272V6.18746H188.404V21.9309H185.486V6.18746H180.962V3.272H192.957ZM198.94 18.9863H206.849V21.9018H196.021V3.272H206.178V6.18746H198.94V10.5023H205.653V13.4178H198.94V18.9863ZM212.103 21.9309H209.155L211.081 3.272H215.868L219.457 17.6452L223.047 3.272H227.834L229.76 21.9309H226.812L225.236 6.44985L221.15 21.9309H217.765L213.708 6.44985L212.103 21.9309ZM240.442 22.1933C237.64 22.1933 234.05 21.4062 232.883 20.9688L233.904 18.2283C234.984 18.6365 239.508 19.5694 241.638 19.1904C242.368 19.0738 242.952 18.4032 243.069 17.6452C243.185 16.654 242.456 15.6919 241.026 15.0213C240.15 14.6131 238.516 13.9134 237.202 13.3595C236.443 13.0388 235.772 12.7472 235.364 12.5723C234.313 12.1058 233.437 11.377 232.854 10.5315C232.299 9.68601 232.007 8.72391 232.036 7.73265C232.066 6.79971 232.357 5.92507 232.912 5.16705C233.467 4.37987 234.255 3.79678 235.188 3.44693C236.443 2.9513 238.253 2.9513 240.559 3.35946C242.31 3.70932 243.886 4.20495 244.557 4.43818L243.536 7.17872C243.01 6.97463 241.58 6.53731 240.004 6.24577C237.611 5.77929 236.56 6.04169 236.239 6.1583C235.451 6.44985 234.984 7.0621 234.955 7.82012C234.926 8.6656 235.539 9.45278 236.56 9.91925C236.94 10.065 237.611 10.3566 238.37 10.6773C239.683 11.2604 241.347 11.9601 242.281 12.3974C243.623 13.0388 244.615 13.8551 245.257 14.8755C245.87 15.8668 246.104 16.9455 245.958 18.0534C245.695 20.0651 244.119 21.6977 242.164 22.0476C241.638 22.135 241.055 22.1933 240.442 22.1933Z" fill="black"/>
  <path d="M72.2581 30.2673V31.2866H69.6732V38.2855H68.5849V31.2866H66V30.2673H72.2581ZM76.5572 30.2673V33.5969H80.7179V30.2673H81.8063V38.2855H80.7179V34.6162H76.5572V38.2855H75.4688V30.2673H76.5572ZM87.0123 30.2673V38.2855H85.9239V30.2673H87.0123ZM92.5584 30.2673L96.9799 36.8586H97.0026V30.2673H98.0909V38.2855H96.7078L92.241 31.6943H92.2183V38.2855H91.1299V30.2673H92.5584ZM103.297 30.2673V33.7328H103.388L106.936 30.2673H108.455L104.578 33.9707L108.716 38.2855H107.129L103.388 34.2764H103.297V38.2855H102.209V30.2673H103.297ZM122.167 30.2673V31.2866H119.582V38.2855H118.493V31.2866H115.908V30.2673H122.167ZM130.558 30.2673V31.2866H126.466V33.6762H130.275V34.6955H126.466V37.2663H130.762V38.2855H125.377V30.2673H130.558ZM138.043 30.0635C138.61 30.0635 139.141 30.1692 139.636 30.3806C140.131 30.592 140.537 30.9015 140.855 31.3092L139.948 32.0001C139.456 31.3885 138.81 31.0827 138.009 31.0827C137.14 31.0827 136.424 31.3923 135.861 32.0114C135.298 32.6305 135.016 33.4081 135.016 34.3444C135.016 35.2504 135.294 35.9979 135.849 36.5868C136.405 37.1757 137.125 37.4701 138.009 37.4701C138.893 37.4701 139.593 37.1115 140.106 36.3942L141.025 37.0851C140.707 37.5079 140.284 37.8476 139.755 38.1043C139.226 38.361 138.636 38.4894 137.986 38.4894C137.215 38.4894 136.516 38.3025 135.889 37.9288C135.262 37.5551 134.767 37.0416 134.404 36.3886C134.041 35.7355 133.86 35.0503 133.86 34.3331C133.86 33.0949 134.249 32.0737 135.027 31.2696C135.806 30.4655 136.811 30.0635 138.043 30.0635ZM145.483 30.2673V33.5969H149.643V30.2673H150.732V38.2855H149.643V34.6162H145.483V38.2855H144.394V30.2673H145.483ZM156.244 36.9945L155.291 39.7805H154.362L155.144 36.9945H156.244ZM168.946 30.0635C169.513 30.0635 170.044 30.1692 170.539 30.3806C171.034 30.592 171.44 30.9015 171.757 31.3092L170.851 32.0001C170.359 31.3885 169.713 31.0827 168.912 31.0827C168.043 31.0827 167.327 31.3923 166.763 32.0114C166.2 32.6305 165.919 33.4081 165.919 34.3444C165.919 35.2504 166.197 35.9979 166.752 36.5868C167.308 37.1757 168.028 37.4701 168.912 37.4701C169.796 37.4701 170.495 37.1115 171.009 36.3942L171.928 37.0851C171.61 37.5079 171.187 37.8476 170.658 38.1043C170.129 38.361 169.539 38.4894 168.889 38.4894C168.118 38.4894 167.419 38.3025 166.792 37.9288C166.165 37.5551 165.669 37.0416 165.307 36.3886C164.944 35.7355 164.762 35.0503 164.762 34.3331C164.762 33.0949 165.152 32.0737 165.93 31.2696C166.709 30.4655 167.714 30.0635 168.946 30.0635ZM176.385 30.2673V33.5969H180.546V30.2673H181.634V38.2855H180.546V34.6162H176.385V38.2855H175.297V30.2673H176.385ZM189.437 30.0635C190.631 30.0635 191.627 30.4599 192.424 31.2526C193.221 32.0454 193.62 33.0533 193.62 34.2764C193.62 35.0541 193.442 35.7657 193.087 36.4112C192.732 37.0568 192.231 37.5645 191.585 37.9345C190.939 38.3045 190.223 38.4894 189.437 38.4894C188.658 38.4894 187.948 38.3063 187.305 37.9401C186.663 37.574 186.16 37.0681 185.797 36.4226C185.435 35.777 185.253 35.0616 185.253 34.2764C185.253 33.0836 185.644 32.0831 186.427 31.2753C187.209 30.4675 188.212 30.0635 189.437 30.0635ZM186.41 34.2764C186.41 35.1825 186.693 35.9412 187.26 36.5528C187.827 37.1644 188.552 37.4701 189.437 37.4701C190.306 37.4701 191.028 37.1681 191.602 36.5641C192.177 35.9601 192.464 35.1975 192.464 34.2764C192.464 33.3629 192.18 32.6022 191.613 31.9944C191.047 31.3866 190.317 31.0828 189.425 31.0828C188.564 31.0828 187.846 31.3848 187.271 31.9888C186.697 32.5928 186.41 33.3554 186.41 34.2764ZM200.923 30.0635C202.118 30.0635 203.113 30.4599 203.911 31.2526C204.708 32.0454 205.107 33.0533 205.107 34.2764C205.107 35.0541 204.929 35.7657 204.574 36.4112C204.219 37.0568 203.718 37.5645 203.072 37.9345C202.426 38.3045 201.709 38.4894 200.923 38.4894C200.145 38.4894 199.435 38.3063 198.792 37.9401C198.15 37.574 197.647 37.0681 197.284 36.4226C196.921 35.777 196.74 35.0616 196.74 34.2764C196.74 33.0836 197.131 32.0831 197.913 31.2753C198.696 30.4675 199.699 30.0635 200.923 30.0635ZM197.896 34.2764C197.896 35.1825 198.18 35.9412 198.747 36.5528C199.314 37.1644 200.039 37.4701 200.923 37.4701C201.793 37.4701 202.514 37.1681 203.089 36.5641C203.663 35.9601 203.95 35.1975 203.95 34.2764C203.95 33.3629 203.667 32.6022 203.1 31.9944C202.533 31.3866 201.804 31.0828 200.912 31.0828C200.051 31.0828 199.333 31.3848 198.758 31.9888C198.184 32.5928 197.896 33.3554 197.896 34.2764ZM211.027 30.0635C212.07 30.0635 212.841 30.3693 213.34 30.9809L212.456 31.785C212.32 31.5736 212.127 31.4037 211.877 31.2753C211.628 31.147 211.341 31.0828 211.016 31.0828C210.547 31.0828 210.171 31.198 209.888 31.4282C209.604 31.6585 209.463 31.9548 209.463 32.3172C209.463 32.9213 209.863 33.344 210.664 33.5857L211.673 33.9141C212.24 34.0953 212.673 34.3482 212.971 34.6729C213.27 34.9975 213.419 35.443 213.419 36.0092C213.419 36.7492 213.157 37.3475 212.631 37.8043C212.106 38.261 211.439 38.4895 210.63 38.4895C209.474 38.4895 208.62 38.1195 208.068 37.3796L208.964 36.6095C209.138 36.8813 209.376 37.0927 209.678 37.2437C209.98 37.3947 210.309 37.4702 210.664 37.4702C211.11 37.4702 211.488 37.3418 211.798 37.0851C212.108 36.8284 212.263 36.5113 212.263 36.1338C212.263 35.8545 212.168 35.6204 211.979 35.4317C211.79 35.2429 211.45 35.073 210.959 34.922L210.245 34.6842C209.527 34.4426 209.024 34.1349 208.737 33.7612C208.45 33.3875 208.306 32.9062 208.306 32.3172C208.306 31.6906 208.559 31.1583 209.066 30.7204C209.572 30.2825 210.226 30.0635 211.027 30.0635ZM222.265 30.2673V31.2866H218.172V33.6762H221.981V34.6955H218.172V37.2663H222.469V38.2855H217.083V30.2673H222.265ZM232.212 30.2673V35.2164C232.212 35.8733 232.395 36.4132 232.762 36.8359C233.128 37.2587 233.618 37.4701 234.23 37.4701C234.842 37.4701 235.331 37.2587 235.698 36.8359C236.064 36.4131 236.248 35.8733 236.248 35.2164V30.2673H237.336V35.3976C237.336 35.9488 237.206 36.4641 236.945 36.9435C236.684 37.423 236.314 37.8004 235.834 38.076C235.354 38.3516 234.819 38.4894 234.23 38.4894C233.323 38.4894 232.578 38.1931 231.996 37.6004C231.414 37.0077 231.123 36.2734 231.123 35.3976V30.2673H232.212ZM243.608 30.0635C244.651 30.0635 245.422 30.3693 245.921 30.9809L245.036 31.785C244.9 31.5736 244.708 31.4037 244.458 31.2753C244.209 31.147 243.922 31.0828 243.597 31.0828C243.128 31.0828 242.752 31.198 242.468 31.4282C242.185 31.6585 242.043 31.9548 242.043 32.3172C242.043 32.9213 242.444 33.344 243.245 33.5857L244.254 33.9141C244.821 34.0953 245.254 34.3482 245.552 34.6729C245.851 34.9975 246 35.443 246 36.0092C246 36.7492 245.737 37.3475 245.212 37.8043C244.687 38.261 244.02 38.4895 243.211 38.4895C242.055 38.4895 241.201 38.1195 240.649 37.3796L241.544 36.6095C241.718 36.8813 241.956 37.0927 242.259 37.2437C242.561 37.3947 242.89 37.4702 243.245 37.4702C243.691 37.4702 244.069 37.3418 244.379 37.0851C244.689 36.8284 244.844 36.5113 244.844 36.1338C244.844 35.8545 244.749 35.6204 244.56 35.4317C244.371 35.2429 244.031 35.073 243.54 34.922L242.826 34.6842C242.108 34.4426 241.605 34.1349 241.318 33.7612C241.031 33.3875 240.887 32.9062 240.887 32.3172C240.887 31.6906 241.14 31.1583 241.647 30.7204C242.153 30.2825 242.807 30.0635 243.608 30.0635Z" fill="black"/>
  </svg>

          </p>
          <ul className="mt-5 list-unstyled servicesList">
            <li>
            <img src={circleArrow} alt="" />
            <Link to="">
              Program Management & Independent Verification & Validation (IV&V) Support
              </Link>
            </li>
            <li>
            <img src={circleArrow} alt="" />
            <Link to="">
            Software Design, Development & Maintenance
              </Link>
            </li>
            <li>
            <img src={circleArrow} alt="" />
            <Link to="">
              Infrastructure & Security
            </Link>
            </li>
          </ul>
        </div>
      

        {/* <img
          src={bannerdata?.path ? getImagePath(bannerdata.path) : getImagePath('/media/images/dummy-image-square.png')}
          alt=""
          className="w-100 h-100 img-fluid"
        /> */}

      </div>
      <div className="col-12 col-lg-6 p-4 d-flex justify-content-center align-items-start flex-column position-relative briefServices">
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

        <p className="lh-md mt-md-3">
          {bannerdata?.banner_descripiton
            ? bannerdata.banner_descripiton
            : "upload Description"}
        </p>

        <div>
          <Link to={moreLink} className={linkClass}>
            More services
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
