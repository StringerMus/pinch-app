import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser
} from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/listings/create"
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
    <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
      <i className="fas fa-sign-out-alt"></i>Sign out
    </NavLink>
    <NavLink
      className={styles.NavLink}
      to={`/profiles/${currentUser?.profile_id}`}
    >
      <Avatar src={currentUser?.profile_image} height={40} />
      <span className={styles.Username}>{currentUser?.username}</span>
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
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
      <Container>

        <NavLink to="/">
          <Navbar.Brand >
            <h2 className={styles.Logo}>Pinch</h2>
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
          
            <NavLink
                exact
                to="/"
                className={styles.NavLink}
                activeClassName={styles.Active}
            >
              <i className="fa-solid fa-house-chimney"></i> Home
            </NavLink>
            {/* create a lisitng */}
            {currentUser && addPostIcon}
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
