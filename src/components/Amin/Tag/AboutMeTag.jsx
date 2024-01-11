import React, { useEffect, useState } from "react";
import { db, storage } from "../../../Firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Avatar() {
  const [imageUrl, setImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isChangeImageVisible, setIsChangeImageVisible] = useState(false);

  useEffect(() => {
    const storageRef = ref(storage, "Avatar/cv.jpg");

    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("Error getting image URL:", error);
      });
  }, []);

  const handleUpdateImage = async () => {
    if (!selectedImage) {
      toast.error("No image selected");
      return;
    }
    const newImageRef = ref(storage, "Avatar/new_image.jpg");
    const uploadTask = uploadBytesResumable(newImageRef, selectedImage);
    uploadTask.on(
      "state_changed",
      (error) => {
        console.error("Error uploading image:", error);
        toast.error("Error uploading !");
      },
      () => {
        getDownloadURL(newImageRef)
          .then((url) => {
            setImageUrl(url);
            console.log("Image upload and URL update successful");
            toast.success("Upload complete!");

            setIsChangeImageVisible(false);
          })
          .catch((urlError) => {
            console.error("Error getting updated image URL:", urlError);
            toast.error("Error uploading !");
          });
      }
    );
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setIsChangeImageVisible(true);
  };

  return (
    <div className="admin__tag--description admin__tag--descriptionAvatar">
      <p className="admin__tag--title">Avatar</p>
      <div>
        <div>
          {imageUrl && (
            <img src={imageUrl} alt="Avatar" className="admin__tag--avatar" />
          )}
        </div>
        {isChangeImageVisible && (
          <>
            <input
              type="file"
              onChange={handleImageChange}
              className="admin__tag--avatarInput"
            />
            <div className="admin__tag--upImg admin__tag--action ">
              <button
                onClick={handleUpdateImage}
                className="admin__tag--action-btn admin__tag--action-btnAvatar"
              >
                Update Image
              </button>
              <button
                onClick={() => setIsChangeImageVisible(false)}
                className="admin__tag--action-btn admin__tag--action-btnAvatar"
              >
                Back
              </button>
            </div>
          </>
        )}
        {!isChangeImageVisible && (
          <div className="admin__tag--upImg admin__tag--action">
            <button
              onClick={() => setIsChangeImageVisible(true)}
              className="admin__tag--action-btn admin__tag--action-btnAvatar"
            >
              Change Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AboutMeTag() {
  const [aboutMeData, setAboutMeData] = useState("");
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [editedJob, setEditedJob] = useState("");
  const [editedDesc, setEditedDesc] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutMeDocRef = collection(db, "ABOUTME");
        const aboutMeSnapShot = await getDocs(aboutMeDocRef);
        const data = aboutMeSnapShot.docs.map((doc) => doc.data())[0];
        setAboutMeData(data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleUpdateJob = async () => {
    try {
      const aboutMeDocRef = doc(db, "ABOUTME", "rWyjFdu3pLmop9FvAT01");
      await updateDoc(aboutMeDocRef, {
        JOB: editedJob,
      });
      setAboutMeData((prevData) => ({
        ...prevData,
        JOB: editedJob,
      }));

      setIsEditingJob(false);
      setEditedJob("");
      toast.success("Update Successful !");
    } catch (error) {
      console.error("Error updating job data:", error);
      toast.error("Error updating !");
    }
  };

  const handleUpdateDesc = async () => {
    try {
      const aboutMeDocRef = doc(db, "ABOUTME", "rWyjFdu3pLmop9FvAT01");
      await updateDoc(aboutMeDocRef, {
        DESCRIBE: editedDesc,
      });
      setAboutMeData((prevData) => ({
        ...prevData,
        DESCRIBE: editedDesc,
      }));
      setIsEditingDesc(false);
      setEditedDesc("");
      toast.success("Update Successful !");
    } catch (error) {
      console.error("Error updating description data:", error);
      toast.error("Error updating !");
    }
  };

  const handleBack = () => {
    setIsEditingJob(false);
    setIsEditingDesc(false);
  };

  return (
    <div className="admin__inner">
      <div className="admin__tag">
        <h3 className="admin__tag--heading">About Me</h3>
        {/* Avatar */}
        <Avatar />
        {/* Job Section */}
        <div className="admin__tag--description">
          <p className="admin__tag--title">Content of work position</p>
          {isEditingJob ? (
            <input
              type="text"
              value={editedJob}
              onChange={(e) => setEditedJob(e.target.value)}
              className="admin__tag--input"
            />
          ) : (
            <p className="admin__tag--desc">{aboutMeData.JOB}</p>
          )}
          <div className="admin__tag--action">
            {isEditingJob ? (
              <div className="admin__tag--action">
                <button
                  className="admin__tag--action-btn"
                  onClick={handleUpdateJob}
                >
                  Save
                </button>
                <button className="admin__tag--action-btn" onClick={handleBack}>
                  Back
                </button>
              </div>
            ) : (
              <button
                className="admin__tag--action-btn"
                onClick={() => setIsEditingJob(true)}
              >
                Editing
              </button>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="admin__tag--description">
          <p className="admin__tag--title">Self-introduction content</p>
          {isEditingDesc ? (
            <textarea
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
              className="admin__tag--input"
            />
          ) : (
            <p className="admin__tag--desc">{aboutMeData.DESCRIBE}</p>
          )}
          <div className="admin__tag--action">
            {isEditingDesc ? (
              <div className="admin__tag--action">
                <button
                  className="admin__tag--action-btn"
                  onClick={handleUpdateDesc}
                >
                  Save
                </button>
                <button className="admin__tag--action-btn" onClick={handleBack}>
                  Back
                </button>
              </div>
            ) : (
              <button
                className="admin__tag--action-btn"
                onClick={() => setIsEditingDesc(true)}
              >
                Editing
              </button>
            )}
          </div>
        </div>
        <div className="admin__tag--action">
          <Link to="/" className="admin__tag--link">
            View to page 📃
          </Link>
        </div>
      </div>
    </div>
  );
}
export default AboutMeTag;
