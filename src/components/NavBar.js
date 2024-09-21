import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from "./Avatar";
import axios from 'axios';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addPostIcon = (
    <NavLink
      to="/listings/create"
      className="NavLink"
      activeClassName={styles.Active}
    >
      <i className="fa-regular fa-square-plus"></i> List item
    </NavLink>
  );
  const loggedInIcons = (
  <>
    <NavLink
      to="/liked"
      className={styles.NavLink}
      activeClassName={styles.Active}
    >
      <i className="fa-solid fa-heart"></i>Liked
    </NavLink>
    <NavLink
      to="/" onClick={handleSignOut}
      className={styles.NavLink}
    >
      <i className="fa-solid fa-right-from-bracket"></i>Sign out
    </NavLink>
    <NavLink
      className={styles.NavLink}
      to={`/profiles/${currentUser?.profile_id}`}
    >
      <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
    </NavLink>
  </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-right-to-bracket"></i> Sign-in
      </NavLink>

      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-user-plus"></i> Sign-up
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>

        <NavLink to="/">
          <Navbar.Brand>
            <h2>Pinch</h2>
          </Navbar.Brand>
        </NavLink>
        {/* create a lisitng */}
        {currentUser && addPostIcon}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">

            <NavLink
                exact
                to="/"
                className="NavLink"
                activeClassName={styles.Active}
            >
              <i className="fa-solid fa-house-chimney"></i> Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
