import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../../Firebase";
import { toast } from "react-toastify";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { Link } from "react-router-dom";

function AddDescription({ Click, fetchData }) {
  const [editedData, setEditedData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setShowImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setShowImage(null);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    toast("Proceed to save ....");
    try {
      const projectDocRef = await addDoc(collection(db, "PROJECT"), {
        ...editedData,
      });
      const projectId = projectDocRef.id;

      if (selectedImage) {
        await handleSaveImgChange(projectId);
      }
      toast.success("Created new project !");
      await delay(2000);
      await fetchData();
      Click(false);
    } catch (error) {
      console.error("Error updating project data:", error);
      toast.error("Error updating !");
    }
  };

  const handleSaveImgChange = async (projectId) => {
    try {
      const newImageRef = ref(storage, `My_Project/${projectId}`);
      const uploadTask = uploadBytesResumable(newImageRef, selectedImage);

      await uploadTask;

      const url = await getDownloadURL(newImageRef);
      toast.success("Upload Image Successful!");

      await updateDoc(doc(db, "PROJECT", projectId), {
        ID: projectId,
        IMAGE_PATH: url,
      });
    } catch (error) {
      console.error("Error during image upload:", error);
      toast.error("Error uploading image!");
    }
  };

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
                  name="TITLE"
                  value={editedData.TITLE}
                  onChange={handleChange}
                  className="form__input"
                  required
                />
              </div>
              <div className="form__input-action">
                <label className="form__label">Add name of project:</label>
                <input
                  type="text"
                  name="NAME"
                  value={editedData.NAME}
                  onChange={handleChange}
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
                name="DESC"
                value={editedData.DESC}
                onChange={handleChange}
                className="form__input form__input-textarea"
                required
              ></textarea>
            </div>
          </div>
          <div className="admin__tag--right">
            <img
              src={showImage}
              alt="img_project"
              className="admin__tag--img"
            />
            <input
              onChange={handleImageChange}
              type="file"
              className="admin__tag--avatarInput"
            />
          </div>
        </div>
        <div className="admin__tag--action">
          <button onClick={handleSave} className="admin__tag--action-btn">
            Save
          </button>
          <button onClick={Click} className="admin__tag--action-btn">
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
function Description({ data, fetchData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });
  const [selectedImage, setSelectedImage] = useState(null);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleSave = async () => {
    try {
      const projectDocRef = doc(db, "PROJECT", editedData.id);
      await updateDoc(projectDocRef, { ...editedData });
      handleSaveImgChange();
      toast.success("Update Successful !");
      await delay(2000);
      await fetchData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating project data:", error);
      toast.error("Error updating !");
    }
  };

  const handleSaveImgChange = () => {
    if (!selectedImage) {
      toast.error("No image selected");
      return;
    }
    const newImageRef = ref(storage, `My_Project/${editedData.id}`);
    const uploadTask = uploadBytesResumable(newImageRef, selectedImage);
    uploadTask.on("state_changed", () => {
      getDownloadURL(newImageRef)
        .then((url) => {
          setEditedData((prevData) => ({
            ...prevData,
            IMAGE_PATH: url,
          }));
          console.log("Image upload and URL update successful");
        })
        .catch((urlError) => {
          console.error("Error getting updated image URL:", urlError);
          toast.error("Error uploading !");
        });
    });
    toast.success("Upload Image Successful!");
  };
  const handleDelete = async () => {
    try {
      const projectId = editedData.id;
      await deleteDoc(doc(db, "PROJECT", projectId));
      const imageRef = ref(storage, `My_Project/${projectId}`);
      await deleteObject(imageRef);
      toast.success("Delete Successful !");
      await delay(1000);
      await fetchData();
    } catch (error) {
      console.error("Error deleting project data:", error);
      toast.error("Error deleting !");
    }
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
            <button className="admin__tag--action-btn" onClick={handleDelete}>
              Delete
            </button>
            <button className="admin__tag--action-btn" onClick={handleEdit}>
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
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const projectDocRef = collection(db, "PROJECT");
      const projectSnapShot = await getDocs(projectDocRef);
      const data = projectSnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (Array.isArray(data)) {
        setProjectData(data || []);
      } else {
        setProjectData([]);
        setNodata(true);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      toast.error("Error fetching data!");
    }
  };
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
        {addProject && (
          <>
            <h3 className="admin__tag--heading">Add Project</h3>
            <AddDescription Click={handleAddProject} fetchData={fetchData} />
          </>
        )}
        <div className="admin__tag--top">
          <h3 className="admin__tag--heading">Project Created</h3>
          <button
            onClick={handleAddProject}
            className={`admin__tag--btn-top btn ${addProject ? "visible" : ""}`}
          >
            Add new project
          </button>
        </div>
        {projectData.map((data, index) => (
          <Description key={index} data={data} fetchData={fetchData} />
        ))}
        <div className="admin__tag--action">
          <Link to="/Project" className="admin__tag--link">
            View to page 📃
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ProjectTag;
