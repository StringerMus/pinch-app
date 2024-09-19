import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
// Crreate and Add a logo - import logo from '../assets/logo.png'
import styles from "../styles/NavBar.module.css"

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
        <Container>
            <Navbar.Brand>
                <h2>Pinch</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-right">
                    <Nav.Link>
                        <i className="fa-solid fa-house-chimney"></i>Home</Nav.Link>
                    <Nav.Link>
                    <i className="fa-solid fa-right-to-bracket"></i>Sign-in</Nav.Link>
                    <Nav.Link>
                    <i className="fa-solid fa-user-plus"></i>Sign-up</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
};

export default NavBar