import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutMe from "./components/pages/AboutMe";
import "./scss/main.scss";
import Contact from "./components/pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutMe />} />
        <Route path="/Contact" element={<Contact />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
