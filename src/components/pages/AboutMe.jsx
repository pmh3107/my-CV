import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Social from "../common/SocialIcon";
import { Link } from "react-router-dom";
function AboutMe() {
  return (
    <>
      <Header />
      <main className="main aboutMe">
        <div className="container">
          <div className="aboutMe__inner">
            <div className="tag-info">
              <figure className="tag-info__thumb">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mycv-80922.appspot.com/o/cv.jpg?alt=media&token=1ad2d375-60ca-4b68-84fc-90c2150c90a8"
                  alt="Phan Minh Hiển"
                  className="tag-info__avatar"
                />
              </figure>
              <h2 className="tag-info__name">Phan Minh Hien</h2>
              <span className="tag-info__separate" />
              <p className="tag-info__describe">IT INTERN</p>
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
                <button className="content__link">PROJECT</button>
              </div>
              <div className="content__info-all">
                <p className="content__info">
                  I'm Hien Phan, a passionate techie and explorer! As a
                  fourth-year IT student, I've honed my skills to become a
                  skilled front-end developer. I'm fluent in HTML, CSS, and have
                  a grasp of JavaScript, React, and web app development. Plus,
                  I'm a TOEIC 600+ holder!
                </p>
                <p className="content__info">
                  Want to connect? Reach out through{" "}
                  <Link to="/Contact" className="content__info--link">
                    the contact
                  </Link>{" "}
                  form or my social media!
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
