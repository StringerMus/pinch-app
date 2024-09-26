import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function PostCreateForm() {
  useRedirect("loggedOut")
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    item_name: "",
    description: "",
    category: "",
    price: "",
    location: "",
    contact_email: "",
    image: "",  
  });
  const { item_name, description, category, price, location, contact_email, image } = postData;

  const imageInput = useRef(null)
  const history = useHistory()

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("item_name", item_name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("contact_email", contact_email);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/listings/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">

    <Form.Group>
      <Form.Label className="d-none">Item Name</Form.Label>
      <Form.Control
          type="text"
          name="item_name"
          placeholder="Item name"
          value={item_name}
          onChange={handleChange}
        />
    </Form.Group>
        {errors.item_name?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}

      <Form.Row>
        <Form.Group as={Col}>
        <Form.Label className="d-none">Cost per day</Form.Label>
        <Form.Control
          type="text"
          name="price"
          placeholder="Cost per day"
          value={price}
          onChange={handleChange}
        />
        </Form.Group>
        {errors.price?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}

        <Form.Group as={Col}>
        <Form.Label className="d-none">Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
        >
          <option>diy</option>
          <option>gardening</option>
          <option>gadgets</option>
          <option>camera</option>
          <option>sports</option>
          <option>wedding</option>
          <option>other</option>
        </Form.Control>
        </Form.Group>
        {errors.category?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
      </Form.Row>

      <Form.Group>
      <Form.Label className="d-none">Description</Form.Label>
      <Form.Control
          as="textarea"
          name="description"
          rows={6}
          placeholder="Describe the item"
          value={description}
          onChange={handleChange}
        />
        </Form.Group>
        {errors.description?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label className="d-none">Location</Form.Label>
            <Form.Control
              placeholder="Town/city "
              type ="text"
              name="location"
              value={location}
              onChange={handleChange}/>
          </Form.Group>
          {errors.location?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}

          <Form.Group as={Col}>
            <Form.Label className="d-none">Contact Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Contact email"
              name="contact_email"
              value={contact_email}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        {errors.contact_email?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Post
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <h2 className={`ml-3 mt-3 mb-2 ${styles.Title}`}>Create a listing</h2>
      </Row>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={6} lg={6}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded/>
                  </figure>
                  <div>
                    <Form.Label
                      className={`$btnStyles.Button} ${btnStyles.Pink} btn`}
                      htmlFor="image-upload"
                    >
                      Change image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    style={{ maxWidth: '100%', height: 'auto' }}
                    message="Click here to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
              <p className={styles.Message}>Max file size 2mb<br/>
                Max height and width 4096px</p>
            </Form.Group>
            {errors.image?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={6} lg={6} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;