import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function Header() {
  const [isActive, setIsActive] = useState(false);

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header__left">
            <div className="header__left-dot"></div>
            <p className="header__left-name">
              <strong className="header__left-name-hl">Phan Minh Hien</strong> /
              IT intern
            </p>
          </div>
          <div className="header__nav">
            <div className="navbar">
              <div
                className={`navbar__icon ${isActive ? "active" : ""}`}
                onClick={toggleNavbar}
              >
                <svg
                  id="hamburger"
                  className="navbar__icon-svg"
                  viewBox="0 0 60 40"
                >
                  <g
                    stroke="#0050ff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path id="top-line" d="M10,10 L50,10 Z"></path>
                    <path id="middle-line" d="M10,20 L50,20 Z"></path>
                    <path id="bottom-line" d="M10,30 L50,30 Z"></path>
                  </g>
                </svg>
              </div>
              <ul className={`navbar__list ${isActive ? "visible" : ""}`}>
                <li className="navbar__item active">
                  <Link to="/">About me</Link>
                </li>
                <li className="navbar__item">Resume</li>
                <li className="navbar__item">Project</li>
                <li className="navbar__item">
                  <Link to="/Contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
