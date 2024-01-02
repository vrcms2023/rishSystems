import React, { useEffect, useState } from "react";
import BriefIntro from "../../Common/BriefIntro";
import { useDispatch, useSelector } from "react-redux";
import { getClientProjects } from "../../features/project/clientProjectActions";
import ProjectItem from "../Components/projectItem";
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";

import { dataFormatedByCatergoryName } from "../../util/dataFormatUtil";

import "./Projects.css";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";

const Projects = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
  };

  const [admin, setAdmin] = useState(true);
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);

  const [completed, setCompleted] = useState([]);
  const [future, setFuture] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const { clientProjects, error } = useSelector(
    (state) => state.clientProjects,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (clientProjects.length === 0) {
      dispatch(getClientProjects());
    }
  }, []);

  useEffect(() => {
    if (clientProjects?.projectList?.length > 0) {
      const projectList = dataFormatedByCatergoryName(clientProjects);
      setCompleted(projectList.completed);
      setFuture(projectList.future);
      setOngoing(projectList.ongoing);
    }
  }, [clientProjects]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };
  return (
    <>
      <div className="headerBottomMargin">
        {admin ? (
          <EditIcon editHandler={() => editHandler("banner", true)} />
        ) : (
          ""
        )}
        <div className=" banner projectBanner"></div>
      </div>

      {/* Introduction */}
      {admin ? (
        <EditIcon editHandler={() => editHandler("briefIntro", true)} />
      ) : (
        ""
      )}
      <BriefIntro title="Welcome To HPR Infra Projects">
        We believe that construction is a man made wonder. The thought of
        bringing imagination to real life structures excites us, each day the
        passion in us grows as we contribute to this industry.
      </BriefIntro>

      {ongoing?.length > 0 ? (
        <ProjectItem projectList={ongoing} projectType={ongoing} />
      ) : (
        ""
      )}

      {/* Completed Projects */}
      {completed?.length > 0 ? (
        <ProjectItem projectList={completed} projectType={completed} />
      ) : (
        ""
      )}

      {/* future Projects */}
      {future?.length > 0 ? (
        <ProjectItem projectList={future} projectType={future} />
      ) : (
        ""
      )}

      {componentEdit.banner ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm editHandler={editHandler} componentType="banner" />
        </div>
      ) : (
        ""
      )}

      {componentEdit.briefIntro ? (
        <div className="adminEditTestmonial">
          <AdminBriefIntro
            editHandler={editHandler}
            componentType="briefIntro"
          />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};

export default Projects;
