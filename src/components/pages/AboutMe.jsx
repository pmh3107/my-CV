import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Social from "../common/SocialIcon";

function AboutMe() {
  const [aboutMeData, setAboutMeData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutMeDocRef = collection(db, "ABOUTME");
        const aboutMeSnapShot = await getDocs(aboutMeDocRef);
        const data = aboutMeSnapShot.docs.map((doc) => doc.data())[0]; // Assuming there is only one document
        setAboutMeData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main className="main aboutMe">
        <div className="container">
          <div className="aboutMe__inner">
            <div className="tag-info">
              <figure className="tag-info__thumb">
                <img
                  src={aboutMeData.IMG_PATH}
                  alt="Phan Minh Hiển"
                  className="tag-info__avatar"
                />
              </figure>
              <h2 className="tag-info__name">Phan Minh Hien</h2>
              <span className="tag-info__separate" />
              <p className="tag-info__describe">{aboutMeData.JOB}</p>
              <div className="tag-info__social">
                <Social />
              </div>
            </div>
            <div className="content">
              <h2 className="content__title">Hello✌️</h2>
              <h3 className="content__describe">Here's who I am & what I do</h3>
              <div className="content__action">
                <Link to="/Resume" className="content__link">
                  RESUME
                </Link>
                <Link to="/Project" className="content__link">
                  PROJECT
                </Link>
              </div>
              <div className="content__info-all">
                <p className="content__info">{aboutMeData.DESCRIBE}</p>
                <p className="content__info">
                  Want to connect? Reach out through{" "}
                  <Link to="/Contact" className="content__info--link">
                    the contact page
                  </Link>{" "}
                  or my social media!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AboutMe;
