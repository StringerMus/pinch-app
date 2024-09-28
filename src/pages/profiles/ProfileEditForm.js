import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useNotification } from "../../contexts/NotificationContext"; // Note
import styles from "../../styles/PostCreateEditForm.module.css";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();
  const showNotification = useNotification(); // Get showNotification from context

  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
  });
  const { name, content, image } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, image } = data;
          setProfileData({ name, content, image });
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      showNotification("Profile edited successfully!"); // Show notification
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className={`ml-3 mt-3 mb-2 ${styles.Title}`}>Edit profile</h2>
      <Container className={`py-2 p-0 p-md-2 text-center ${appStyles.Content}`}>
        <Form.Group>
          {image && (
            <figure>
              <Image src={image} fluid />
            </figure>
          )}
          {errors?.image?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <div>
            <Form.Label
              className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
              htmlFor="image-upload"
            >
              Change image
            </Form.Label>
          </div>
          <Form.File
            id="image-upload"
            ref={imageFile}
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length) {
                setProfileData({
                  ...profileData,
                  image: URL.createObjectURL(e.target.files[0]),
                });
              }
            }}
          />
        </Form.Group>
        <Button
         className={`${btnStyles.Button} ${btnStyles.Blue}`}
         onClick={() => history.goBack()}
       >
         Cancel
       </Button>
       <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
         Save
       </Button>
      </Container>
    </Form>
  );
};

export default ProfileEditForm;