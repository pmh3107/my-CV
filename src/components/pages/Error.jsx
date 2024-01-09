import React from "react";
import { Link } from "react-router-dom";
function Error() {
  const ErrorIcon =
    "https://firebasestorage.googleapis.com/v0/b/mycv-3107.appspot.com/o/Error%2FError.svg?alt=media&token=e1e78a42-f78f-42be-b431-81f49826d7ac";

  return (
    <>
      <header></header>
      <main className="error">
        <div className="container">
          <div className="error__inner">
            <div className="error__left">
              <p className="error__left--name">
                <strong>Hien's CV</strong>
                #pmh3107
              </p>
              <img src={ErrorIcon} alt="Error" className="error__left--img" />
            </div>
            <div className="error__right">
              <h1 className="error__title">ERRO !</h1>
              <p className="error__desc">
                Sorry, there is a problem with the page you are looking for
              </p>
              <div className="error__action">
                <button className="error__btn btn">
                  <Link to="/">Home Page</Link>
                </button>
                <button className="error__btn btn">
                  <Link to="/Contact">Contact</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}
export default Error;
