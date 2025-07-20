import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router";

export default function BadgerTransNavBar(props) {
  return <Navbar expand = 'lg' style={{ 
                backgroundColor: "#031F9E", 
                color: "white" 
            }}>
    <Container fluid>
        <Nav className="me-auto">
            <Nav.Link as={Link} to="/about-us" style={{ color: "#E7E7E7" }}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/faq" style={{ color: "#E7E7E7" }}>FAQ</Nav.Link>
        </Nav>

        <Navbar.Brand
          as={Link}
          to="/"
          className="mx-auto"
          style={{ color: "#E7E7E7", fontWeight: "bold", fontSize: "1.25rem" }}
        >
          Badger Breadth Transferology
        </Navbar.Brand>

        <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" style={{ color: "#E7E7E7" }}>Home Page</Nav.Link>
            <Nav.Link as={Link} to="/log-in" style={{ color: "#E7E7E7" }}>Log In</Nav.Link>
            <Nav.Link as={Link} to="/saved-courses" style={{ color: "#E7E7E7" }}>Saved Courses</Nav.Link>
            <Nav.Link as={Link} to="/sign-up" style={{ color: "#E7E7E7" }}>Sign Up</Nav.Link>
        </Nav>
    </Container>
  </Navbar>
}
