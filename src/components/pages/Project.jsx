import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { storage } from "../../Firebase";
import { ref, getDownloadURL } from "firebase/storage";
function ProjectList() {
  return (
    <div className="project__list">
      <ProjectTag />
    </div>
  );
}
function ProjectTag() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Tạo một tham chiếu đến file trong Firebase Storage
    const storageRef = ref(
      storage,
      "gs://mycv-3107.appspot.com/My_Project/UTH_FI.png"
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
    <div className="project__tag">
      <div className="project__tag--description">
        <div className="project__tag--title">
          <h2 className="project__tag--heading">Project Final Internship</h2>
          <p className="project__tag--desc">Sale old car</p>
        </div>

        <p className="project__tag--content">
          This is my graduation internship project. I designed a website selling
          used cars called: "Central Coast Cars". In this project I used ReactJs
          technology in the font end and Firebase for the back end. This website
          has all the functions of an e-commerce website to serve the store's
          car buying and selling more effectively.
        </p>
      </div>
      <div className="project__tag--frame">
        <img
          src={imageUrl}
          alt="Img project"
          className="project__tag--frameImg"
        />
      </div>
    </div>
  );
}
function Project() {
  return (
    <>
      <Header />
      <main className="main project">
        <div className="container">
          <div className="project__inner">
            <div className="title-top resume__title-top">
              <div className="title-top__dot"></div>
              <h1 className="title-top__heading">My Project</h1>
            </div>
            <div className="project__body">
              <p className="project__desc">
                Below are some of my projects. These projects are carried out by
                me through subjects at school or courses I have previously
                studied. These projects are about web design, applications,
                embedded programming, ...
              </p>
              <ProjectList />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
export default Project;
