import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
  const currentUser = useCurrentUser();

  const loggedInIcons = <>{currentUser?.username}</>;
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className="NavLink"
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-right-to-bracket"></i> Sign-in
      </NavLink>

      <NavLink
        to="/signup"
        className="NavLink"
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
