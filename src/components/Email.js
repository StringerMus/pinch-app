import React, { useState } from "react";
import Modal from "react-modal"; // Install using `npm install react-modal`
import axios from "axios";

// Modal styles (customize as needed)
const modalStyles = {
  content: {
    width: "400px",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root"); // To avoid accessibility warnings

const Email = ({ itemId, ownerEmail }) => { /* Needs changing? */
  const [modalIsOpen, setModalIsOpen] = useState(false); /* What does this mean? */
  const [formData, setFormData] = useState({
    name: "", //autofill with username of requestor
    email: "", //to - autofill with item owners email
    subject: "", //need a placeholder subject
    message: "", // needs placeholder message
  });

  const [loading, setLoading] = useState(false);

  //The modal is opened and closed by toggling the modalIsOpen state.
  // Open the modal
  const openModal = () => setModalIsOpen(true);

  // Close the modal
  const closeModal = () => setModalIsOpen(false);

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/send-email/", {
        ...formData,
        to_email: ownerEmail, // Email of the item owner
        item_id: itemId, // ID of the item
      });

      alert(response.data.success || "Email sent successfully!");
      closeModal(); // Close modal on success
    } catch (error) {
      alert(error.response?.data?.error || "Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Email Button */}
      <button onClick={openModal} className="email-button">
        Email Owner
      </button>

      {/* Email Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
        <h2>Send a Query</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Email"}
            </button>
            <button type="button" onClick={closeModal} style={{ marginLeft: "10px" }}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Email;