import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { realdb } from "../../Firebase";
import { ref, onValue } from "firebase/database";
import HeaderAdmin from "./Layout/AdminHeader";
import AboutMeTag from "./Tag/AboutMeTag";
import ContactTag from "./Tag/ContactTag";
import ProjectTag from "./Tag/ProjectTag";

const NavItem = ({ to, pages, onClick, isActive, value }) => {
  return (
    <li
      className={`admin__nav--item ${isActive ? "active" : ""} `}
      onClick={onClick}
    >
      {to === "Contact" ? <div className="rounded">{value}</div> : ""}
      {pages}
    </li>
  );
};

function Admin() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("AboutMe");
  const [contactCount, setContactCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = () => {
      const storedIsLoggedIn =
        localStorage.getItem("isAdminLoggedIn") === "false";
      if (storedIsLoggedIn) {
        setTimeout(() => {
          setLoading(true);
          navigate("/Error");
        }, 0);
      }
    };

    const getContactCount = async () => {
      const ContactRef = ref(realdb, "CONTACT");

      const unsubscribe = onValue(ContactRef, (snapshot) => {
        let count = 0;
        snapshot.forEach(() => {
          count++;
        });
        setContactCount(count);
      });

      return () => unsubscribe();
    };

    getContactCount();
    checkLoggedIn();
  }, [navigate, contactCount]);

  const handleNavItemClick = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <HeaderAdmin />
      <main className="admin">
        <ToastContainer />
        <div className="container">
          <div className="admin__top">
            <h2 className="admin__top--heading">Manage website content</h2>
            <nav className="admin__nav">
              <ul className="admin__nav--list">
                <NavItem
                  to="/Admin"
                  pages="About me"
                  onClick={() => handleNavItemClick("AboutMe")}
                  isActive={activeTab === "AboutMe"}
                />
                <NavItem
                  to=""
                  pages="Resume"
                  onClick={() => handleNavItemClick("Resume")}
                  isActive={activeTab === "Resume"}
                />
                <NavItem
                  to=""
                  pages="Project"
                  onClick={() => handleNavItemClick("Project")}
                  isActive={activeTab === "Project"}
                />
                <NavItem
                  to="Contact"
                  pages="Contact"
                  onClick={() => handleNavItemClick("Contact")}
                  isActive={activeTab === "Contact"}
                  value={contactCount}
                />
              </ul>
            </nav>
          </div>
          <div className="content-container">
            {activeTab === "AboutMe" && <AboutMeTag />}
            {activeTab === "Contact" && <ContactTag />}
            {activeTab === "Project" && <ProjectTag />}
            {/* Thêm các điều kiện cho các tab khác nếu cần */}
          </div>
        </div>
      </main>
    </>
  );
}

export default Admin;
