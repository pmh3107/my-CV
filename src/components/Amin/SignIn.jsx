import React, { useState, useEffect } from "react";
import { auth } from "../../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function SignIn() {
  useEffect(() => {
    document.title = "Hien's CV | Login";
  }, []);
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((data) => ({ ...data, [name]: value }));
  };
  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      if (loginData.email === "phanminhhien0701@gmail.com") {
        loginAdmin(userCredential);
        toast.success("Login successfully");
      } else {
        toast.error("Only admin can login !");
      }
      navigate("/Admin");
    } catch (error) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      if (error.code === "auth/invalid-credential") {
        toast.error("Email or password is incorrect");
      } else {
        toast.error("An error occurred while login !");
      }
    }
  };
  return (
    <>
      <header></header>
      <main className="sign">
        <ToastContainer />
        <div className="container">
          <div className="sign__top">
            <h1 className="sign__heading">Sign In</h1>
            <h2 className="sign__content">Welcome back, Hien Phan 👋</h2>
          </div>
          <div className="sign__form">
            <form
              onSubmit={handleSignIn}
              className="form__container sign__form--container"
            >
              <div className="form__input-action">
                <label
                  className="form__label sign__form--label"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  className="form__input sign__form--input"
                  required
                />
              </div>
              <div className="form__input-action">
                <label
                  className="form__label sign__form--label"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                  minLength="6"
                  className="form__input sign__form--input"
                  required
                />
              </div>
              <button
                type="submit"
                className="form__submit-btn btn sign__form--btn"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}
export default SignIn;
