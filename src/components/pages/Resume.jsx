import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { storage } from "../../Firebase";
import { ref, getDownloadURL } from "firebase/storage";
function TagList() {
  const DownloadCV = async () => {
    const storageRef = ref(
      storage,
      "gs://mycv-3107.appspot.com/CV_PDF/Phan-Minh-Hien_CV.pdf"
    );

    try {
      const url = await getDownloadURL(storageRef);

      // Create a temporary anchor element
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.target = "_blank";
      anchor.download = "Phan-Minh-Hien_CV.pdf";

      // Simulate a click on the anchor element
      anchor.click();
      if (anchor.parentNode) {
        anchor.parentNode.removeChild(anchor);
      }
    } catch (error) {
      console.error("Error getting download URL: ", error);
    }
  };

  return (
    <div className="resume__list">
      <div className="resume__action">
        <h2 className="resume__heading">Experience</h2>
        <button onClick={DownloadCV} className="resume__action--btn">
          Download CV
        </button>
      </div>
      <JobTag />
      <div className="resume__action">
        <h2 className="resume__heading">Education</h2>
      </div>
      <EduTag />
      <SkillTag />
    </div>
  );
}
function JobTag() {
  // const addJobToFirestore = async () => {
  //   try {
  //     const jobsCollection = collection(db, "jobs"); // "jobs" là tên của collection trong Firestore

  //     const jobData = {
  //       year: "2020 - Present",
  //       title: "Freelance",
  //       subTitle1: "Sale electric device",
  //       subTitle2: "HCM & Da Lat city",
  //       description: [
  //         "Purchasing electronic devices (phones, laptops, tablets,...). Check products. Post sales on social networking platforms (Facebook, Cho Tot,...).",
  //         "Improve communication skills. Be more careful in work. Improve sales skills. Improve knowledge about technology products.",
  //       ],
  //     };

  //     await addDoc(jobsCollection, jobData);
  //     console.log("Job information added to Firestore successfully!");
  //   } catch (error) {
  //     console.error("Error adding job information to Firestore: ", error);
  //   }
  // };
  // useEffect(() => {
  //   // Gọi hàm để thêm thông tin vào Firestore khi component được tạo ra
  //   addJobToFirestore();
  // }, []);

  return (
    <div className="resume__tag">
      <h3 className="resume__tag--year">2020 - Present</h3>
      <div className="resume__tag--inner">
        <div className="resume__tag--title">
          <h3 className="resume__tag--heading">Freelance</h3>
          <p className="resume__tag--heading-Small">Sale electric device</p>
          <p className="resume__tag--heading-Small">HCM & Da Lat city</p>
        </div>
        <div className="resume__tag--desc">
          <p className="resume__tag--content">
            Purchasing electronic devices (phones, laptops, tablets,...). Check
            products. Post sales on social networking platforms (Facebook, Cho
            Tot,...).
          </p>
          <p className="resume__tag--content">
            Improve communication skills. Be more careful in work. Improve sales
            skills. Improve knowledge about technology products.
          </p>
        </div>
      </div>
    </div>
  );
}
function EduTag() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Tạo một tham chiếu đến file trong Firebase Storage
    const storageRef = ref(
      storage,
      "gs://mycv-3107.appspot.com/Edu/giao-thong-van-tai.jpeg"
    );
    // Lấy URL tải xuống
    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("Error getting download URL: ", error);
      });
  }, []);
  return (
    <div className="resume__tag">
      <h3 className="resume__tag--year">2020 - Present</h3>
      <div className="resume__tag--inner">
        <div className="resume__tag--title">
          <p className="resume__tag--heading">
            Ho Chi Minh City University of Transport
          </p>
          <p className="resume__tag--heading-Small">information technology</p>
          <p className="resume__tag--heading-Small">HCM city</p>
        </div>
        <div className="resume__tag--frame">
          <img src={imageUrl} alt="" className="resume__tag--frame-img" />
        </div>
      </div>
    </div>
  );
}
function SkillTag() {
  return (
    <>
      <div className="resume__tag">
        <h3 className="resume__tag--heading-big">Professional skillset</h3>
        <ul className="resume__tag--list">
          <li className="resume__tag--item">
            <div className="resume__tag--dot"></div>
            <p className="resume__tag--content">Teamwork & Collaboration</p>
          </li>
          <li className="resume__tag--item">
            <div className="resume__tag--dot"></div>
            <p className="resume__tag--content">Self learning</p>
          </li>
        </ul>
        <h3 className="resume__tag--heading-big">Specialized skills</h3>
        <ul className="resume__tag--list">
          <li className="resume__tag--item">
            <div className="resume__tag--dot"></div>
            <p className="resume__tag--content">HTML, CSS, JavaScript</p>
          </li>
          <li className="resume__tag--item">
            <div className="resume__tag--dot"></div>
            <p className="resume__tag--content">ReacJs</p>
          </li>
          <li className="resume__tag--item">
            <div className="resume__tag--dot"></div>
            <p className="resume__tag--content">Firebase</p>
          </li>
        </ul>
        <h3 className="resume__tag--heading-big">Language</h3>
        <ul className="resume__tag--list">
          <li className="resume__tag--item">
            <div className="resume__tag--dot"></div>
            <p className="resume__tag--content">English (Toiec 600 +)</p>
          </li>
        </ul>
      </div>
    </>
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
