import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";

function PostCreateForm() {
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

  const textFields = (
    <div className="text-center">

    <Form>
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

        <Form.Row>
        {/* need to be a figure */}
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

            <Form.Group as={Col}>
            <Form.Label className="d-none">Category</Form.Label>
            <Form.Control
                as="select"
                name="category"
                defaultValue="OTHER"
                value={category}
                onChange={handleChange}
            >
                <option>DIY</option>
                <option>GARDENING</option>
                <option>GADGETS</option>
                <option>CAMERA</option>
                <option>SPORTS</option>
                <option>WEDDING</option>
                <option>OTHER</option>
            </Form.Control>
            </Form.Group>
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

        <Form.Row>
            <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label className="d-none">Location</Form.Label>
                <Form.Control
                    placeholder="Town/city "
                    type ="text"
                    name="location"
                    value={location}
                    onChange={handleChange}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
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
    </Form>
    {/* end of form */}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        post
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
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
                        <Asset src={Upload} style={{ maxWidth: '100%', height: 'auto' }} message="Click here to upload an image" />
                    </Form.Label>
                )}

            <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
            />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;