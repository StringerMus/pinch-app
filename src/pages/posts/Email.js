import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext"; // Import context for current user

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useNotification } from "../../contexts/NotificationContext";

Modal.setAppElement("#root"); // To avoid accessibility warnings

const Email = ({ listingId, ownerEmail, itemName, location, contact_email }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false); /* A boolean that toggles between true and false to open and close the modal. */
  const currentUser = useCurrentUser(); // Access current user's data

  const [formData, setFormData] = useState({
    item: `${itemName}`,
    location: `${location}`,
    name: currentUser?.username || "", // Autofill with username
    email: "",
    subject: `Pinch - Enquiry about "${itemName}"`,
    message: "Hi, I am interested in your listing. Is this item available?", // Placeholder message
  });

  const showNotification = useNotification();

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
    <Container>
      <Button
        onClick={openModal}
        className="btn btn-primary"
        size="sm"
        style={{ marginTop: "10px", marginBottom: "20px", marginLeft: "-15px" }}
      >
        Contact Owner
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Send Email Modal"
      >
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Container
              className="p-md-5"
            >
              <Form onSubmit={handleSubmit}>
                <h2 className={`text-center mb-4 ${styles.Title}`}>Send a Query</h2>
              
                <Form.Group as={Row} className="mb-3">
                  <Form.Label>
                    Name:
                  </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label>
                    Email:
                  </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label>
                    Subject:
                  </Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter a subject for your query"
                      required
                    />
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label>
                    Message:
                  </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Write your message here..."
                      required
                    />
                </Form.Group>

                <Row className="mt-4">
                  <Col className="text-center">
                    <Button
                      type="submit"
                      className="btn btn-primary me-2"
                      disabled={loading}
                      margin
                    >
                      {loading ? <span className="spinner"></span> : "Send Email"}
                    </Button>
                    <Button
                      type="button"
                      className="btn btn-secondary m-2 mb-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Col>
        </Row>

      </Modal>
    </Container>
  );
};

export default Email;