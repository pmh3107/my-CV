import React, { useEffect, useState } from "react";
import { db } from "../../../Firebase";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

function AllExperience() {
  const [jobData, setJobData] = useState([]);
  const [AddExperienceTag, setAddExperienceTag] = useState(false);
  useEffect(() => {
    fectchData();
  }, []);
  const fectchData = async () => {
    const jobDocRef = collection(db, "RESUMEJOB");
    const jobSnapShot = await getDocs(jobDocRef);
    const jobFbData = jobSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (Array.isArray(jobFbData)) {
      setJobData(jobFbData);
    }
  };
  const handleAddExperience = () => {
    setAddExperienceTag(!AddExperienceTag);
  };
  return (
    <>
      {AddExperienceTag && (
        <>
          <h3 className="admin__tag--heading">Add Experience</h3>
          <AddExperience Click={handleAddExperience} fectchData={fectchData} />
        </>
      )}
      <div className="admin__tag--top">
        <h3 className="admin__tag--heading">Experience</h3>
        <button
          onClick={handleAddExperience}
          className={`admin__tag--btn-top btn ${
            AddExperienceTag ? "visible" : ""
          }`}
        >
          Add new project
        </button>
      </div>
      {jobData.map((data) => (
        <Experience key={data.id} data={data} fectchData={fectchData} />
      ))}
    </>
  );
}
function AddExperience({ Click, fectchData }) {
  const [editedData, setEditedData] = useState({});
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSave = async (e) => {
    e.preventDefault();
    toast("Proceed to save ....");
    try {
      const experienceDocRef = await addDoc(collection(db, "RESUMEJOB"), {
        ...editedData,
      });
      const experienceId = experienceDocRef.id;
      setEditedData((prevData) => ({ ...prevData, id: experienceId }));
      toast.success("Created new experience !");
      await delay(1000);
      await fectchData();
      Click(false);
    } catch (error) {
      console.error("Error updating experience data:", error);
      toast.error("Error updating !");
    }
  };
  return (
    <>
      <div className="admin__tag--description">
        <p className="admin__tag--title">Add new Experience ...</p>
        <form>
          <div className="form__name">
            <div className="form__input-action">
              <label className="form__label">Add job name:</label>
              <input
                type="text"
                name="JOBNAME"
                value={editedData.JOBNAME}
                onChange={handleChange}
                className="form__input"
                required
              />
            </div>
            <div className="form__input-action">
              <label className="form__label">Add name of position:</label>
              <input
                type="text"
                name="JOBTITLE"
                value={editedData.TITLE}
                onChange={handleChange}
                className="form__input"
                required
              />
            </div>
          </div>
          <div className="form__input-action">
            <label className="form__label">Add working time:</label>
            <input
              type="text"
              name="YEAR"
              value={editedData.YEAR}
              onChange={handleChange}
              className="form__input"
              required
            />
          </div>
          <div className="form__input-action">
            <label className="form__label">Add Location:</label>
            <input
              type="text"
              name="ADRESS"
              value={editedData.ADRESS}
              onChange={handleChange}
              className="form__input"
              required
            />
          </div>
          <div className="form__input-action">
            <label className="form__label" htmlFor="message">
              Add describe
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
    </>
  );
}
function Experience({ data, fectchData, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const jobDocRef = doc(collection(db, "RESUMEJOB"), editedData.id);
      await updateDoc(jobDocRef, { ...editedData });
      toast.success("Update Successful !");
      await delay(1000);
      await fectchData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating job data:", error);
      toast.error("Error updating !");
    }
  };

  const handleDelete = async () => {
    try {
      const jobId = editedData.id;
      const jobDocRef = doc(collection(db, "RESUMEJOB"), jobId);
      await deleteDoc(jobDocRef);
      toast.success("Delete Successful !");
      await delay(1000);
      await fectchData();
    } catch (error) {
      console.error("Error deleting job data:", error);
      toast.error("Error deleting !");
    }
  };

  return (
    <div className="admin__tag--description">
      {isEditing ? (
        <>
          <input
            type="text"
            name="YEAR"
            value={editedData.YEAR}
            onChange={handleChange}
            className="admin__tag--title fixed"
          />
          <p className="admin__tag--desc">
            <strong>Name job: </strong>
            <input
              type="text"
              name="JOBNAME"
              value={editedData.JOBNAME}
              onChange={handleChange}
              className="admin__tag--desc fixed"
            />
          </p>
          <p className="admin__tag--desc">
            <strong>Position: </strong>
            <input
              type="text"
              name="JOBTITLE"
              value={editedData.JOBTITLE}
              onChange={handleChange}
              className="admin__tag--desc fixed"
            />
          </p>
          <p className="admin__tag--desc">
            <strong>Address: </strong>
            <input
              type="text"
              name="ADRESS"
              value={editedData.ADRESS}
              onChange={handleChange}
              className="admin__tag--desc fixed"
            />
          </p>
          <p className="admin__tag--desc">
            <strong>Description:</strong>
          </p>
          <textarea
            name="DESC"
            value={editedData.DESC}
            onChange={handleChange}
            className="admin__tag--desc-textarea fixed"
          />
        </>
      ) : (
        <>
          <p className="admin__tag--title">{data.YEAR}</p>
          <p className="admin__tag--desc">
            <strong>Name job: </strong>
            {data.JOBNAME}
          </p>
          <p className="admin__tag--desc">
            <strong>Position: </strong>
            {data.JOBTITLE}
          </p>
          <p className="admin__tag--desc">
            <strong>Address:</strong> {data.ADRESS}
          </p>
          <p className="admin__tag--desc">
            <strong>Description:</strong>
            <br />
            <small>{data.DESC}</small>
          </p>
        </>
      )}
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
function AllEducation() {
  const [AddEducationTag, setAddEducationTag] = useState(false);
  return (
    <>
      {AddEducationTag && (
        <>
          <h3 className="admin__tag--heading">Add Education</h3>
        </>
      )}
      <div className="admin__tag--top">
        <h3 className="admin__tag--heading">Education</h3>
        <button
          className={`admin__tag--btn-top btn ${
            AddEducationTag ? "visible" : ""
          }`}
        >
          Add new Education
        </button>
      </div>
      {/* {jobData.map((data) => (
        <Experience key={data.id} data={data} fectchData={fectchData} />
      ))} */}
    </>
  );
}

function Resume() {
  return (
    <div className="admin__inner">
      <div className="admin__tag">
        <AllExperience />
      </div>
      <div className="admin__tag">
        <AllEducation />
      </div>
    </div>
  );
}
export default Resume;
