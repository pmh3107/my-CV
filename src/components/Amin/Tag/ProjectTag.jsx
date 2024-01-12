import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../Firebase";
import { toast } from "react-toastify";
import { click } from "@testing-library/user-event/dist/click";

function AddDescription({ Click }) {
  return (
    <div className="admin__tag--description">
      <p className="admin__tag--title">Add new project ...</p>
      <form>
        <div className="admin__tag--description-form">
          <div className="admin__tag--left">
            <div className="form__name">
              <div className="form__input-action">
                <label className="form__label">Add title of project:</label>
                <input
                  type="text"
                  name="NAME"
                  className="form__input"
                  required
                />
              </div>
              <div className="form__input-action">
                <label className="form__label">Add name of project:</label>
                <input
                  type="text"
                  name="NAME"
                  className="form__input"
                  required
                />
              </div>
            </div>
            <div className="form__input-action">
              <label className="form__label" htmlFor="message">
                Describe
              </label>
              <textarea
                id="message"
                name="message"
                className="form__input form__input-textarea"
                required
              ></textarea>
            </div>
          </div>
          <div className="admin__tag--right">
            <img src="" alt="img_project" className="admin__tag--img" />
            <input type="file" className="admin__tag--avatarInput" />
          </div>
        </div>
        <div className="admin__tag--action">
          <button className="admin__tag--action-btn">Save</button>
        </div>
      </form>
    </div>
  );
}
function DescriptionFix({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {};

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Thực hiện xử lý ảnh (upload, cập nhật URL, etc.)
    // Ví dụ:
    // uploadImageAndUpdateURL(file);
  };

  return (
    <div className="admin__tag--description">
      <div className="admin__tag--description-project">
        {isEditing ? (
          <input
            type="text"
            name="TITLE"
            value={editedData.TITLE}
            onChange={handleChange}
            className="admin__tag--title fixed"
          />
        ) : (
          <p className="admin__tag--title"> {editedData.TITLE} </p>
        )}
        <div className="admin__tag--left">
          {isEditing ? (
            <div className="admin__tag--desc-Fix">
              <p className="admin__tag--desc">
                <strong>Name: </strong>
              </p>
              <input
                type="text"
                name="NAME"
                value={editedData.NAME}
                onChange={handleChange}
                className="admin__tag--desc fixed"
              />
            </div>
          ) : (
            <p className="admin__tag--desc">
              <strong>Name: {editedData.NAME}</strong>
            </p>
          )}

          <p className="admin__tag--desc">
            <strong>Describer:</strong>
            <br />
            {isEditing ? (
              <textarea
                name="DESC"
                value={editedData.DESC}
                onChange={handleChange}
                className="admin__tag--desc-textarea fixed"
              />
            ) : (
              <small>{editedData.DESC}</small>
            )}
          </p>
        </div>
        <div className="admin__tag--right">
          {isEditing ? (
            <div>
              <img
                src={editedData.IMAGE_PATH}
                alt="img_project"
                className="admin__tag--img"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="admin__tag--btnAvatar"
              />
            </div>
          ) : (
            <img
              src={editedData.IMAGE_PATH}
              alt="img_project"
              className="admin__tag--img"
            />
          )}
        </div>
      </div>
      <div className="admin__tag--action">
        {isEditing ? (
          <>
            <button className="admin__tag--action-btn" onClick={handleSave}>
              Save
            </button>
            <button className="admin__tag--action-btn" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button className="admin__tag--action-btn" onClick={handleEdit}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
function ProjectTag() {
  const [projectData, setProjectData] = useState([]);
  const [addProject, setAddProject] = useState(false);
  const [nodata, setNodata] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectDocRef = collection(db, "PROJECT");
        const projectSnapShot = await getDocs(projectDocRef);
        const data = projectSnapShot.docs.map((doc) => doc.data());
        if (Array.isArray(data)) {
          setProjectData(data);
        } else {
          setProjectData([]);
          setNodata(true);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        toast.error("Error fetching data!");
      }
    };
    fetchData();
  }, []);
  const handleAddProject = () => {
    setAddProject(!addProject);
  };
  if (nodata) {
    return (
      <div className="admin__inner">
        <div className="admin__tag">
          <h3 className="admin__tag--heading">Project</h3>
          <p className="admin__tag--desc">
            <strong> No data found !</strong>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="admin__inner">
      <div className="admin__tag">
        <div className="admin__tag--top">
          <h3 className="admin__tag--heading">Project</h3>
          <button
            onClick={handleAddProject}
            className="admin__tag--btn-top btn "
          >
            Add new project
          </button>
        </div>
        {addProject && (
          <>
            <AddDescription Click={handleAddProject} />
            <h3 className="admin__tag--heading">Project Created</h3>
          </>
        )}
        {projectData.map((data) => (
          <DescriptionFix data={data} />
        ))}
      </div>
    </div>
  );
}
export default ProjectTag;
