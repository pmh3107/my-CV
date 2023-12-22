import React from "react";
import Facebook from "../../icon/Facebook.svg";
import Zalo from "../../icon/Zalo.svg";
import Github from "../../icon/Github.svg";
import Twitter from "../../icon/Twitter.svg";
function Social() {
  return (
    <div className="social">
      <a href="https://www.facebook.com/king.phan.10/" className="social__link">
        <img src={Facebook} alt="Facebook" className="social__icon" />
      </a>
      <a href="https://zalo.me/0917779407" className="social__link">
        <img src={Zalo} alt="Zalo" className="social__icon" />
      </a>
      <a href="https://github.com/pmh3107" className="social__link">
        <img src={Github} alt="Github" className="social__icon" />
      </a>
      <a href="https://twitter.com/pmh_3107" className="social__link">
        <img src={Twitter} alt="twitter" className="social__icon" />
      </a>
    </div>
  );
}
export default Social;
