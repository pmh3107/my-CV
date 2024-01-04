import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";

function TagList() {
  // connect api fire base and fix this link
  const LinkCV =
    "https://firebasestorage.googleapis.com/v0/b/mycv-80922.appspot.com/o/Cv_PDF%2FPhan-Minh-Hien_CV.pdf?alt=media&token=183dc758-82c7-4df5-b38f-8102cd17449d";
  return (
    <div className="resume__list">
      <div className="resume__action">
        <h2 className="resume__heading">Experience</h2>
        <Link to={LinkCV} className="resume__action--btn">
          Download CV
        </Link>
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
            <div className="title-top">
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
