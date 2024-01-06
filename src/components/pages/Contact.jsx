import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: " ",
    lastName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactColection = collection(db, "CONTACT");
    const contactDocRef = doc(contactColection, formData.email);
    try {
      await setDoc(contactDocRef, {
        name: formData.lastName + " " + formData.firstName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });
      toast.success("Message sent successfully");
    } catch (e) {
      console.log("Error writing document: ", e);
      console.log("Firebase error code: ", e.code);
      console.log("Firebase error message: ", e.message);
      toast.error("An error occurred while sending the message");
    }

    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <form className="form__container" onSubmit={handleSubmit}>
      <div className="form__name">
        <div className="form__input-action">
          <label className="form__label" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form__input"
            required
          />
        </div>

        <div className="form__input-action">
          <label className="form__label" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form__input"
            required
          />
        </div>
      </div>
      <div className="form__input-action">
        <label className="form__label" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          pattern="[0-9]*"
          value={formData.phone}
          onChange={handleChange}
          className="form__input"
          required
        />
      </div>
      <div className="form__input-action">
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form__input"
          required
        />
      </div>

      <div className="form__input-action">
        <label className="form__label" htmlFor="subject">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="form__input"
          required
        />
      </div>

      <div className="form__input-action">
        <label className="form__label" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="form__input form__input-textarea"
          required
        ></textarea>
      </div>

      <button type="submit" className="form__submit-btn btn">
        SEND
      </button>
    </form>
  );
};

function Contact() {
  return (
    <>
      <Header />
      <ToastContainer />
      <main className="main contact">
        <div className="container">
          <div className="contact-inner">
            <div className="title-top">
              <div className="title-top__dot"></div>
              <h1 className="title-top__heading">Let's talk 🤗</h1>
            </div>
            <div className="contact-form">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
export default Contact;
