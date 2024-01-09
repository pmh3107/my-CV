import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <h1>Trang admin</h1>
      </header>
    </>
  );
}

function Admin() {
  const [loading, setLoading] = useState(false);
  const { logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logoutAdmin();
    navigate("/");
  };

  useEffect(() => {
    const checkLoggedIn = () => {
      const storedIsLoggedIn =
        localStorage.getItem("isAdminLoggedIn") === "false";
      if (storedIsLoggedIn) {
        // Use a setTimeout to perform navigation asynchronously
        setTimeout(() => {
          setLoading(true);
          navigate("/Error");
        }, 0);
      }
    };

    checkLoggedIn();
  }, [navigate]); // Add navigate as a dependency to the useEffect

  if (loading) {
    return null; // Render nothing while loading
  }

  return (
    <>
      <Header />
      <main className="admin">
        <button className="btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </main>
      <footer></footer>
    </>
  );
}

export default Admin;
