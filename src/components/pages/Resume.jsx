import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { db, storage } from "../../Firebase";
import { getDocs, collection } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

function TagList() {
  const DownloadCV = async () => {
    const storageRef = ref(
      storage,
      "gs://mycv-3107.appspot.com/CV_PDF/Phan-Minh-Hien_CV.pdf"
    );

    try {
      const url = await getDownloadURL(storageRef);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.target = "_blank";
      anchor.download = "Phan-Minh-Hien_CV.pdf";
      anchor.click();
      if (anchor.parentNode) {
        anchor.parentNode.removeChild(anchor);
      }
    } catch (error) {
      console.error("Error getting download URL: ", error);
    }
  };

  // Fetch Data
  const [resumeJobData, setResumeJobData] = useState([]);
  const [resumeEduData, setResumeEduData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobCollectionRef = collection(db, "RESUMEJOB");
        const eduCollectionRef = collection(db, "RESUMEEDU");
        const [jobSnapshot, eduSnapshot] = await Promise.all([
          getDocs(jobCollectionRef),
          getDocs(eduCollectionRef),
        ]);
        const jobData = jobSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const eduData = eduSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResumeJobData(jobData);
        setResumeEduData(eduData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="resume__list">
      <div className="resume__action">
        <h2 className="resume__heading">Experience</h2>
        <button onClick={DownloadCV} className="resume__action--btn">
          Download CV
        </button>
      </div>
      {resumeJobData.map((jobData) => (
        <JobTag key={jobData.id} job={jobData} />
      ))}
      <div className="resume__action">
        <h2 className="resume__heading">Education</h2>
      </div>
      {resumeEduData.map((eduData) => (
        <EduTag key={eduData.id} edu={eduData} />
      ))}

      <SkillTag />
    </div>
  );
}
function SkillTag() {
  const [professionalSkills, setProfessionalSkills] = useState([]);
  const [specializedSkills, setSpecializedSkills] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const skillsCollectionRef = collection(db, "SKILLS");
      const skillsSnapshot = await getDocs(skillsCollectionRef);
      const skillsData = skillsSnapshot.docs[0]?.data();
      console.log(skillsData);
      if (skillsData) {
        setProfessionalSkills(skillsData.PERSONAL || []);
        setSpecializedSkills(skillsData.SKILL || []);
        setLanguages(skillsData.LANGUAGE || []);
      }
    };

    fetchData();
  }, []);

  const renderSkillsList = (skills) => {
    return (
      <ul className="resume__tag--list">
        {skills.map((skill, index) => (
          <li key={index} className="resume__tag--item">
            <div className="resume__tag--dot"></div>
            <p className="resume__tag--content">{skill}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="resume__tag">
      <h3 className="resume__tag--heading-big">Professional skillset</h3>
      {renderSkillsList(professionalSkills)}

      <h3 className="resume__tag--heading-big">Specialized skills</h3>
      {renderSkillsList(specializedSkills)}

      <h3 className="resume__tag--heading-big">Language</h3>
      {renderSkillsList(languages)}
    </div>
  );
}
function JobTag({ job }) {
  return (
    <div className="resume__tag">
      <h3 className="resume__tag--year">{job.YEAR}</h3>
      <div className="resume__tag--inner">
        <div className="resume__tag--title">
          <h3 className="resume__tag--heading">{job.JOBTITLE}</h3>
          <p className="resume__tag--heading-Small">{job.JOBNAME}</p>
          <p className="resume__tag--heading-Small">{job.ADRESS}</p>
        </div>
        <div className="resume__tag--desc">
          <p className="resume__tag--content">{job.DESC}</p>
        </div>
      </div>
    </div>
  );
}

function EduTag({ edu }) {
  return (
    <div className="resume__tag">
      <h3 className="resume__tag--year">{edu.YEAR}</h3>
      <div className="resume__tag--inner">
        <div className="resume__tag--title">
          <p className="resume__tag--heading">{edu.EDUNAME}</p>
          <p className="resume__tag--heading-Small">{edu.SPECIALIZED}</p>
          <p className="resume__tag--heading-Small">{edu.ADRESS}</p>
        </div>
        <div className="resume__tag--frame">
          <img
            src={edu.IMG_PATH}
            alt={edu.EDUNAME}
            className="resume__tag--frame-img"
          />
        </div>
      </div>
    </div>
  );
}

function Resume() {
  return (
    <>
      <Header />
      <main className="main resume">
        <div className="container">
          <div className="resume__inner">
            <div className="title-top resume__title-top">
              <div className="title-top__dot"></div>
              <h1 className="title-top__heading">Resume</h1>
            </div>
            <div className="resume__body">
              <TagList />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Resume;
