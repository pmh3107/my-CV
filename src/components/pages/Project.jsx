import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { db } from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const projectCollectionRef = collection(db, "PROJECT");
      const projectsSnapshot = await getDocs(projectCollectionRef);

      const projectsData = [];
      for (const doc of projectsSnapshot.docs) {
        const projectData = doc.data();
        projectsData.push({ ...projectData });
      }
      setProjects(projectsData);
    };

    fetchData();
  }, []);

  return (
    <div className="project__list">
      {projects.map((project, index) => (
        <ProjectTag key={index} project={project} />
      ))}
    </div>
  );
}

function ProjectTag({ project }) {
  return (
    <div className="project__tag">
      <div className="project__tag--description">
        <div className="project__tag--title">
          <h2 className="project__tag--heading">{project.TITLE}</h2>
          <p className="project__tag--desc">{project.NAME}</p>
        </div>
        <p className="project__tag--content">{project.DESC}</p>
      </div>
      <div className="project__tag--frame">
        <img
          src={project.IMAGE_PATH}
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
