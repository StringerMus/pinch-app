import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext"; // Import context for current user

// Modal styles
const modalStyles = {
  content: {
    width: "400px",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root"); // To avoid accessibility warnings

const Email = ({ listingId, ownerEmail, itemName }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false); /* A boolean that toggles between true and false to open and close the modal. */
  const currentUser = useCurrentUser(); // Access current user's data

  const [formData, setFormData] = useState({
    name: currentUser?.username || "", // Autofill with username
    email: currentUser?.email || "",
    subject: itemName
      ? `Inquiry about "${itemName}"`
      : "Inquiry about your listing", // Dynamic placeholder subject
    message: "Hi, I am interested in your listing. Is this item available and what is the cost?", // Placeholder message
  });

  const [loading, setLoading] = useState(false);

  //The modal is opened and closed by toggling the modalIsOpen state.
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Ensure required props are provided
  if (!ownerEmail || !listingId) {
    console.error("Missing required props: ownerEmail or listingId.");
    return null;
  }

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
        listing_id: listingId, // ID of the item
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Send Email Modal"
      >
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
              placeholder="Enter a subject for your query"
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
              placeholder="Write your message here..."
              required
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <button type="submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : "Send Email"}
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