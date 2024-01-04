import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { storage } from "../../Firebase";
import { ref, getDownloadURL } from "firebase/storage";
function TagList() {
  const DownloadCV = async () => {
    const storageRef = ref(
      storage,
      "gs://mycv-dd880.appspot.com/CV_pdf/Phan-Minh-Hien_CV.pdf"
    );

    try {
      const url = await getDownloadURL(storageRef);

      // Create a temporary anchor element
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.target = "_blank"; // Open in a new tab/window if needed
      anchor.download = "Phan-Minh-Hien_CV.pdf"; // Set the desired file name

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
      <Tag />
    </div>
  );
}
// connect api data
function Tag() {
  return (
    <div className="resume__tag">
      <h3 className="resume__tag--year">2020 - Present</h3>
      <div className="resume__tag--inner">
        <div className="resume__tag--title">
          <p className="resume__tag--job">Freelance</p>
          <p className="resume__tag--company">Sale electric device</p>
          <p className="resume__tag--location">HCM & Da Lat city</p>
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
