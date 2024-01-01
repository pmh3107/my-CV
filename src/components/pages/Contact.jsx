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
          type="text"
          id="phone"
          name="phone"
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

      <button className="form__submit-btn btn" type="submit">
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
            <div className="contact-top">
              <div className="contact-top__dot"></div>
              <h1 className="contact-top__heading">Let's talk 🤗</h1>
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
