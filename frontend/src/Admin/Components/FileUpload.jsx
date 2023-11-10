import React, { useEffect, useState } from "react";
import Title from "../../Common/Title";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { getBaseURL } from "../../util/ulrUtil";
import { getCookie } from "../../util/cookieUtil";
import { axiosFileUploadServiceApi } from "../../util/axiosUtil";
import Button from "../../Common/Button";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
);

const FileUpload = ({
  title,
  project,
  updated_By,
  category,
  gallerysetState,
  galleryState,
  saveState,
  validTypes,
  disabledFile = false,
  descriptionTitle,
  showDescription = false,
  maxFiles,
  buttonLable,
}) => {
  const [files, setFiles] = useState([]);
  const [extTypes, setExtTypes] = useState([]);
  const backendURL = getBaseURL();
  const accessToken = useState(getCookie("access"));
  const [imageDescription, setimageDescription] = useState("");

  useEffect(() => {
    let extArr = validTypes.split(",");
    setExtTypes(extArr);
  }, [validTypes]);

  const onprocessfile = (error, file) => {
    if (!error) {
      const response = JSON.parse(file.serverId);
      const imageResponse = response.imageModel;
      const img = {
        id: imageResponse.id,
        originalname: imageResponse.originalname,
        path: imageResponse.path,
        contentType: imageResponse.contentType,
      };
      gallerysetState([...galleryState, img]);
      setFiles([]);
    }
  };

  useEffect(() => {
    if (files.length > 0 && !showDescription) {
      uploadFile();
    }
  }, [files, showDescription]);

  const uploadFile = async () => {
    const arrURL = [];
    saveState(true);

    files.forEach((element, index) => {
      let formData = new FormData();
      formData.append("path", element.file);
      formData.append("projectID", project?.id);
      formData.append("category", category);
      formData.append("imageTitle", "");
      formData.append("imageDescription", imageDescription);
      formData.append("created_by", getCookie("userName"));
      formData.append("updated_By", getCookie("userName"));

      arrURL.push(
        axiosFileUploadServiceApi.post(`/gallery/createGallery/`, formData),
      );
    });
    try {
      await Promise.all(arrURL).then(function (values) {
        updatedFileChnages(values);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updatedFileChnages = (response) => {
    const imgarr = [];
    response.forEach((item, i) => {
      const imageResponse = item.data.imageModel;
      const img = {
        id: imageResponse.id,
        originalname: imageResponse.originalname,
        path: imageResponse.path,
        contentType: imageResponse.contentType,
      };
      imgarr.push(img);
    });

    gallerysetState([...galleryState, ...imgarr]);
    setimageDescription("");
    saveState(false);
    setFiles([]);
  };

  const onerror = (error) => {
    if (error.type) {
      console.log("error upload fil");
    }
  };
  const changeHandler = (e) => {
    setimageDescription(e.target.value);
  };

  return (
    <>
      <Title title={title} cssClass="fs-6 fw-bold" />
      <div className="border border-3 mb-4 shadow-lg">
        {/* <label htmlFor="addImages" className="form-label  ">Add Image's</label> */}
        {/* <input className="form-control" type="file" id="addImages" multiple />  */}

        <FilePond
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          labelInvalidField="invalid files"
          name="path"
          files={files}
          onerror={onerror}
          onupdatefiles={setFiles}
          allowMultiple={true}
          maxFiles={maxFiles ? maxFiles : 4}
          maxParallelUploads={4}
          disabled={disabledFile}
          credits={false}
          acceptedFileTypes={extTypes}
          instantUpload={false}
        />

        {/* <FilePond
          name="path"
          files={files}
          onprocessfile={onprocessfile}
          onerror={onerror}
          onupdatefiles={setFiles}
          allowMultiple={true}
          maxFiles={4}
          maxParallelUploads={4}
          disabled={disabledFile}
          credits={false}
          acceptedFileTypes={extTypes}
          instantUpload={true}
          server=
          {
            {
              process:{
                url: `${backendURL}/gallery/createGallerys/`,
                ondata: (formData) => {
                  formData.append('projectID', project?.id);
                  formData.append('category', category);
                  formData.append('imageTitle', '');
                  formData.append('imageDescription', '');
                  formData.append('created_by', getCookie("userName"));
                  formData.append('updated_By', getCookie("userName"));
                  return formData;
                },
                headers: {
                    'Content-Type' : 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
                       // 'Authorization': `JWT ${accessToken}`
                },
               
              }
            }
        }
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          labelInvalidField="invalid files"
        /> */}
      </div>
      {showDescription ? (
        <div className="py-3">
          <Title
            title={descriptionTitle ? descriptionTitle : "Image desccription"}
            cssClass="fs-5 fw-bold"
          />
          <div className="row">
            <div className="col-8">
              {/* <label htmlFor="addImages" className="form-label  ">Add Image's</label> */}
              <textarea
                className="form-control"
                name={"imageDescription"}
                value={imageDescription}
                onChange={(e) => changeHandler(e)}
                id="amenitiesDescription"
                rows="2"
              ></textarea>
            </div>
            <div className="col-4 text-center ">
              <Button
                type="submit"
                cssClass="btn btn-success mx-2"
                label={buttonLable ? buttonLable : "upload Image"}
                handlerChange={uploadFile}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FileUpload;
