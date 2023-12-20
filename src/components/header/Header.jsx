import React from "react";
function Header() {
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
            <ul className="navbar__list">
              <li className="navbar__item">About me</li>
              <li className="navbar__item">Project</li>
              <li className="navbar__item">Contact</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
