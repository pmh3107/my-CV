import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth, AuthProvider } from "./AuthContext";
import AboutMe from "./components/pages/AboutMe";
import "./scss/main.scss";
import Contact from "./components/pages/Contact";
import Resume from "./components/pages/Resume";
import Project from "./components/pages/Project";
import SignIn from "./components/Amin/SignIn";
import Admin from "./components/Amin/Admin";
import Error from "./components/pages/Error";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AboutMe />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Resume" element={<Resume />} />
          <Route path="/Project" element={<Project />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Error" element={<Error />} />
        </Routes>
      </BrowserRouter>
      <UseEffectInsideAuthProvider />
    </AuthProvider>
  );
}

function UseEffectInsideAuthProvider() {
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    const checkAndRestoreLogin = () => {
      const storedIsLoggedIn =
        localStorage.getItem("isAdminLoggedIn") === "true";
      console.log(storedIsLoggedIn);
      if (storedIsLoggedIn) {
        setIsLoggedIn(storedIsLoggedIn);
      }
    };
    checkAndRestoreLogin();
  }, [setIsLoggedIn]);

  return null;
}
export default App;
