import React, { useState } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
            typeof="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form__input"
            placeholder=" "
            required
          />
        </div>

        <div className="form__input-action">
          <label className="form__label" htmlFor="lastName">
            Last Name
          </label>
          <input
            typeof="text"
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
          typeof="tel"
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
          typeof="email"
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
          typeof="text"
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

      <button className="form__submit-btn btn" typeof="submit">
        SEND
      </button>
    </form>
  );
};

function Contact() {
  return (
    <>
      <Header />
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
