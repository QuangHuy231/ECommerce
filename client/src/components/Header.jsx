import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Amazon</Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
