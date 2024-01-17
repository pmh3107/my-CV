import React, { useEffect, useState } from "react";
import { db, storage } from "../../../Firebase";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
  // deleteObject,
} from "firebase/storage";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
            AddExperienceTag ? "visibly" : ""
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
function Experience({ data, fectchData }) {
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
function AllSchool() {
  const [addSchoolTag, setAddSchoolTag] = useState(false);
  const [schoolData, setSchoolData] = useState([]);

  useEffect(() => {
    fetchSchoolData();
  }, []);
  const fetchSchoolData = async () => {
    try {
      const schoolSnapshot = await getDocs(collection(db, "RESUMEEDU"));
      const schoolData = schoolSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSchoolData(schoolData);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };
  const handleAddSchool = () => {
    setAddSchoolTag(!addSchoolTag);
  };
  return (
    <>
      {addSchoolTag && (
        <>
          <h3 className="admin__tag--heading">Add School</h3>
          <AddSchool Click={handleAddSchool} fetchData={fetchSchoolData} />
        </>
      )}
      <div className="admin__tag--top">
        <h3 className="admin__tag--heading">School</h3>
        <button
          onClick={handleAddSchool}
          className={`admin__tag--btn-top btn ${addSchoolTag ? "visibly" : ""}`}
        >
          Add new School
        </button>
      </div>
      {schoolData.map((data) => (
        <School key={data.id} data={data} fectchData={fetchSchoolData} />
      ))}
    </>
  );
}
function AddSchool({ Click, fetchData }) {
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
      const shoolDocRef = await addDoc(collection(db, "RESUMEEDU"), {
        ...editedData,
      });
      const schoolId = shoolDocRef.id;

      if (selectedImage) {
        await handleSaveImgChange(schoolId);
      }
      toast.success("Created new school !");
      await delay(2000);
      await fetchData();
      Click(false);
    } catch (error) {
      console.error("Error updating school data:", error);
      toast.error("Error updating !");
    }
  };

  const handleSaveImgChange = async (schoolId) => {
    try {
      const newImageRef = ref(storage, `Edu/${schoolId}`);
      const uploadTask = uploadBytesResumable(newImageRef, selectedImage);

      await uploadTask;

      const url = await getDownloadURL(newImageRef);
      toast.success("Upload Image Successful!");

      await updateDoc(doc(db, "RESUMEEDU", schoolId), {
        ID: schoolId,
        IMG_PATH: url,
      });
    } catch (error) {
      console.error("Error during image upload:", error);
      toast.error("Error uploading image!");
    }
  };
  return (
    <div className="admin__tag--description">
      <p className="admin__tag--title">Add new school...</p>
      <form>
        <div className="admin__tag--description-form">
          <div className="admin__tag--left">
            <div className="form__name">
              <div className="form__input-action">
                <label className="form__label">Add school name:</label>
                <input
                  type="text"
                  name="EDUNAME"
                  value={editedData.EDUNAME}
                  onChange={handleChange}
                  className="form__input"
                  required
                />
              </div>
              <div className="form__input-action">
                <label className="form__label">Add Specialized:</label>
                <input
                  type="text"
                  name="SPECIALIZED"
                  value={editedData.SPECIALIZED}
                  onChange={handleChange}
                  className="form__input"
                  required
                />
              </div>
            </div>
            <div className="form__input-action">
              <label className="form__label">Add School Address:</label>
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
              <label className="form__label">Add year:</label>
              <input
                type="text"
                name="YEAR"
                value={editedData.YEAR}
                onChange={handleChange}
                className="form__input"
                required
              />
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
function School({ data, fectchData }) {
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

  const handleSave = async () => {
    try {
      const projectDocRef = doc(db, "RESUMEEDU", editedData.id);
      await updateDoc(projectDocRef, { ...editedData });
      handleSaveImgChange();
      toast.success("Update Successful !");
      await delay(2000);
      await fectchData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating project data:", error);
      toast.error("Error updating !");
    }
  };
  const handleDelete = async () => {
    try {
      const schoolId = editedData.id;
      await deleteDoc(doc(db, "RESUMEEDU", schoolId));
      const imageRef = ref(storage, `Edu/${schoolId}`);
      await deleteObject(imageRef);
      toast.success("Delete Successful !");
      await delay(1000);
      await fectchData();
    } catch (error) {
      console.error("Error deleting project data:", error);
      toast.error("Error deleting !");
    }
  };
  const handleSaveImgChange = () => {
    if (!selectedImage) {
      toast.error("No image selected");
      return;
    }
    const newImageRef = ref(storage, `Edu/${editedData.id}`);
    const uploadTask = uploadBytesResumable(newImageRef, selectedImage);
    uploadTask.on("state_changed", () => {
      getDownloadURL(newImageRef)
        .then((url) => {
          setEditedData((prevData) => ({
            ...prevData,
            IMG_PATH: url,
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
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  return (
    <div className="admin__tag--description">
      <div className="admin__tag--description-project">
        {isEditing ? (
          <input
            type="text"
            name="YEAR"
            value={editedData.YEAR}
            onChange={handleChange}
            className="admin__tag--title fixed"
          />
        ) : (
          <p className="admin__tag--title">{data.YEAR}</p>
        )}
        <div className="admin__tag--left">
          {isEditing ? (
            <>
              <p className="admin__tag--desc">
                <strong>Name School: </strong>
                <input
                  type="text"
                  name="EDUNAME"
                  value={editedData.EDUNAME}
                  onChange={handleChange}
                  className="admin__tag--desc fixed"
                />
              </p>
              <p className="admin__tag--desc">
                <strong>Specialized: </strong>
                <input
                  type="text"
                  name="SPECIALIZED"
                  value={editedData.SPECIALIZED}
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
            </>
          ) : (
            <>
              <p className="admin__tag--desc">
                <strong>Name school: </strong>
                {data.EDUNAME}
              </p>
              <p className="admin__tag--desc">
                <strong>Specialized: </strong>
                {data.SPECIALIZED}
              </p>
              <p className="admin__tag--desc">
                <strong>Address:</strong> {data.ADRESS}
              </p>
            </>
          )}
        </div>
        <div className="admin__tag--right">
          {isEditing ? (
            <div>
              <img
                src={editedData.IMG_PATH}
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
              src={editedData.IMG_PATH}
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
function AllSkill() {
  const [skillData, setSkillData] = useState([]);

  useEffect(() => {
    fetchSillData();
  }, []);
  const fetchSillData = async () => {
    const data = await getDocs(collection(db, "SKILLS"));
    setSkillData(data.docs.map((doc) => doc.data()));
  };
  return (
    <>
      <div className="admin__tag--top">
        <h3 className="admin__tag--heading">Skills</h3>
      </div>
      {skillData.map((data, index) => (
        <Skill key={index} data={data} fetchSkillData={fetchSillData} />
      ))}
    </>
  );
}

function Skill({ data, fetchSkillData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [languages, setLanguages] = useState(data.LANGUAGE || []);
  const [personals, setPersonals] = useState(data.PERSONAL || []);
  const [skills, setSkills] = useState(data.SKILL || []);

  const handleAddLanguage = () => {
    setLanguages([...languages, ""]);
  };

  const handleAddPersonal = () => {
    setPersonals([...personals, ""]);
  };

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleFieldChange = (fieldType, index, value) => {
    if (fieldType === "LANGUAGES") {
      const newLanguages = [...languages];
      newLanguages[index] = value;
      setLanguages(newLanguages.filter((language) => language.trim() !== ""));
    } else if (fieldType === "PERSONALS") {
      const newPersonals = [...personals];
      newPersonals[index] = value;
      setPersonals(newPersonals.filter((personal) => personal.trim() !== ""));
    } else if (fieldType === "SKILLS") {
      const newSkills = [...skills];
      newSkills[index] = value;
      setSkills(newSkills.filter((skill) => skill.trim() !== ""));
    }
  };

  const handleSave = async () => {
    try {
      const skillDocRef = doc(collection(db, "SKILLS"), "5vGJVD4L8ReCGg3zF2D3");

      const updatedData = {
        LANGUAGE: languages,
        PERSONAL: personals,
        SKILL: skills,
      };
      await setDoc(skillDocRef, updatedData, { merge: true });
      toast.success("Skills updated successfully!");
      await fetchSkillData();
      setIsEditing(false);
    } catch (error) {
      toast.error("Error updating skills!");
      console.error("Error updating skills:", error);
    }
  };

  return (
    <div className="admin__tag--description">
      {isEditing ? (
        <div className="admin__tag--columns">
          <ul>
            <p className="admin__tag--desc">
              <strong> Languages:</strong>
            </p>
            {languages.map((language, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={language}
                  onChange={(e) =>
                    handleFieldChange("LANGUAGES", index, e.target.value)
                  }
                  className="admin__tag--desc form__input"
                />
              </li>
            ))}
            <button
              className="admin__tag--action-btnSkill"
              onClick={handleAddLanguage}
            >
              Add Language
            </button>
          </ul>
          <ul>
            <p className="admin__tag--desc">
              <strong>Personals:</strong>
            </p>
            {personals.map((personal, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={personal}
                  onChange={(e) =>
                    handleFieldChange("PERSONALS", index, e.target.value)
                  }
                  className="admin__tag--desc form__input"
                />
              </li>
            ))}
            <button
              className="admin__tag--action-btnSkill"
              onClick={handleAddPersonal}
            >
              Add Personal
            </button>
          </ul>
          <ul>
            <p className="admin__tag--desc">
              <strong>Skills:</strong>
            </p>
            {skills.map((skill, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={skill}
                  onChange={(e) =>
                    handleFieldChange("SKILLS", index, e.target.value)
                  }
                  className="admin__tag--desc form__input"
                />
              </div>
            ))}
            <button
              className="admin__tag--action-btnSkill"
              onClick={handleAddSkill}
            >
              Add Skill
            </button>
          </ul>
        </div>
      ) : (
        <div className="admin__tag--columns">
          {Object.keys(data).map((category, index) => (
            <div key={index}>
              <p className="admin__tag--desc">
                <strong>{category}</strong>
              </p>
              <ul>
                {data[category].map((skill, skillIndex) => (
                  <li className="admin__tag--desc" key={skillIndex}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <div className="admin__tag--action">
        {isEditing ? (
          <>
            <button className="admin__tag--action-btn" onClick={handleSave}>
              Save
            </button>
            <button
              className="admin__tag--action-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="admin__tag--action-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

function Resume() {
  return (
    <div className="admin__inner">
      <div className="admin__tag">
        <AllExperience />
        <div className="admin__tag--action">
          <Link to="/Resume" className="admin__tag--link">
            View to page 📃
          </Link>
        </div>
      </div>
      <div className="admin__tag">
        <AllSchool />
        <div className="admin__tag--action">
          <Link to="/Resume" className="admin__tag--link">
            View to page 📃
          </Link>
        </div>
      </div>
      <div className="admin__tag">
        <AllSkill />
        <div className="admin__tag--action">
          <Link to="/Resume" className="admin__tag--link">
            View to page 📃
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Resume;
