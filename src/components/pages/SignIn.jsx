import React from "react";

function SignIn() {
  return (
    <>
      <header></header>
      <main className="sign">
        <div className="container">
          <div className="sign__top">
            <h1 className="sign__heading">Sign In</h1>
            <h2 className="sign__content">Welcome back, Hien Phan 👋</h2>
          </div>
          <div className="sign__form">
            <form action="" className="form__container sign__form--container">
              <div className="form__input-action">
                <label className="form__label sign__form--label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
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
