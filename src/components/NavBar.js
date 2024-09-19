import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        {/* Use NavLink for the brand logo */}
        <NavLink to="/">
          <Navbar.Brand>
            <h2>Pinch</h2>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            {/* NavLink for Home */}
            <NavLink
                exact
                to="/"
                className="NavLink"
                activeClassName={styles.Active}
            >
              <i className="fa-solid fa-house-chimney"></i> Home
            </NavLink>

            {/* NavLink for Sign-in */}
            <NavLink
                to="/signin"
                className="NavLink"
                activeClassName={styles.Active}
            >
              <i className="fa-solid fa-right-to-bracket"></i> Sign-in
            </NavLink>

            {/* NavLink for Sign-up */}
            <NavLink
                to="/signup"
                className="NavLink"
                activeClassName={styles.Active}
            >
              <i className="fa-solid fa-user-plus"></i> Sign-up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
