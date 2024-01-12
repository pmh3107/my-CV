import React, { useEffect, useState } from "react";
import { realdb } from "../../../Firebase";
import { ref, onValue, remove } from "firebase/database";
import { toast } from "react-toastify";

function Description({ data, onDelete }) {
  const [replyData, setReplyData] = useState(null);
  const [options, setOptions] = useState(true);
  const handleReplyClick = () => {
    setOptions(false);
    setReplyData(data.phone, data.email);
  };
  const handleDeleteClick = () => {
    onDelete(data);
  };

  return (
    <div className="admin__tag--description">
      <p className="admin__tag--title">{data.name}</p>
      <p className="admin__tag--desc">
        <small>PHONE: {data.phone}</small>
      </p>
      <p className="admin__tag--desc">
        <small>EMAIL: {data.email}</small>
      </p>
      <p className="admin__tag--desc">
        <strong>SUBJECT: {data.subject}</strong>
      </p>
      <p className="admin__tag--desc">
        <strong>MESSAGE: {data.message}</strong>
      </p>

      {options ? (
        <div className="admin__tag--action">
          <button className="admin__tag--action-btn" onClick={handleReplyClick}>
            Reply
          </button>
          <button
            className="admin__tag--action-btn"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="admin__tag--action">
          <button
            className="admin__tag--action-btn"
            onClick={() => (window.location.href = `tel:${replyData.phone}`)}
          >
            Phone
          </button>
          <button
            className="admin__tag--action-btn"
            onClick={() => (window.location.href = `mailto:${replyData.email}`)}
          >
            Send email
          </button>
          <button
            className="admin__tag--action-btn"
            onClick={() => {
              setOptions(true);
            }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}

function ContactTag() {
  const [contactData, setContactData] = useState([]);
  const [nodata, setNodata] = useState(false);
  useEffect(() => {
    const fetchData = () => {
      const ContactRef = ref(realdb, "CONTACT");
      const unsubscribe = onValue(ContactRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const dataArray = Object.keys(data).map((key) => ({
            ...data[key],
            id: key,
          }));
          setContactData(dataArray || []);
        } else {
          setContactData([]);
          setNodata(true);
        }
      });

      return () => unsubscribe();
    };

    fetchData();
  }, []);

  const handleDelete = (data) => {
    const { id } = data;
    const contactRef = ref(realdb, `CONTACT/${id}`);
    try {
      remove(contactRef);
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log("Error deleting contact: ", error);
      toast.error("Error deleting contact");
    }
  };
  if (nodata) {
    return (
      <div className="admin__inner">
        <div className="admin__tag">
          <h3 className="admin__tag--heading">Contact</h3>
          <p className="admin__tag--desc">
            <strong>You have no Information !</strong>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="admin__inner">
      <div className="admin__tag">
        <h3 className="admin__tag--heading">Contact</h3>
        {contactData.map((data) => (
          <Description key={data.id} data={data} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default ContactTag;
