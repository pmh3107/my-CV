import React from "react";
import Social from "../common/SocialIcon";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__content">
            <div className="footer__copyright">
              <p className="footer__copyright-content">©2023 by Hien Phan</p>
              <p className="footer__copyright-content">Code by Hien Phan</p>
            </div>
          </div>
          <div className="footer__columns">
            <ul className="footer__list">
              <li className="footer__item">
                <h3>Phone number</h3>
              </li>
              <li className="footer__item">
                <a className="footer__content" href="tel:0917779407">
                  0917779407
                </a>
              </li>
            </ul>
            <ul className="footer__list">
              <li className="footer__item">
                <h3>Email</h3>
              </li>
              <li className="footer__item">
                <a
                  className="footer__content"
                  href="mailto:phanminhhien0701@gmail.com"
                >
                  phanminhhien0701@gmail.com
                </a>
              </li>
            </ul>
            <ul className="footer__list">
              <li className="footer__item">
                <h3>Follow me</h3>
              </li>
              <li className="footer__item">
                <Social />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
