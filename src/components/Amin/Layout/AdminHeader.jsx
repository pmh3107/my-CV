import React, { useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext";
import { Link, useNavigate } from "react-router-dom";

function HeaderAdmin() {
  const [greetingData, setGreetingData] = useState("");
  const { logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logoutAdmin();
    navigate("/");
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 10) {
      return "🌅 Good morning";
    } else if (currentHour >= 10 && currentHour < 17) {
      return "🌞 Good afternoon";
    } else {
      return "🌃 Good evening";
    }
  };
  useEffect(() => {
    const greeting = getGreeting();
    setGreetingData(greeting);
  }, []);

  return (
    <>
      <header>
        <div className="container">
          <div className="admin__header--inner">
            <div className="admin__header--left">
              <Link to="/Admin">
                <p className="admin__header--left-name">
                  <strong className="admin__header--left-name-hl">
                    {greetingData}, Hien Phan !
                  </strong>
                </p>
              </Link>
            </div>
            <div className="admin__header--right">
              <button
                className="admin__header--btn btn"
                onClick={handleSignOut}
              >
                Log out 👋
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default HeaderAdmin;
