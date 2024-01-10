import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "./Layout/AdminHeader";
import { ToastContainer } from "react-toastify";
import AboutMeTag from "./Tag/AboutMeTag";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, pages }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li className={`admin__nav--item ${isActive ? "active" : ""}`}>
      <Link to={to}>{pages}</Link>
    </li>
  );
};
function Admin() {
  const [loading, setLoading] = useState(false);

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

    checkLoggedIn();
  }, [navigate]);

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
                <NavItem to="/Admin" pages="About me" />
                <NavItem to="" pages="Resume" />
                <NavItem to="" pages="Project" />
                <NavItem to="" pages="Contact" />
              </ul>
            </nav>
          </div>
          <div className="admin__inner">
            <AboutMeTag />
          </div>
        </div>
      </main>
    </>
  );
}

export default Admin;
