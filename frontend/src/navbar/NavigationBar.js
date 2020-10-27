import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
const NavigationBar = () => {
  // a div contianer added for future usage
  return (
    <div className="container-nav">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/home">Home</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem className="mx-2">
            <Button outline color="primary">
              <Link to="/signup">Signup</Link>
            </Button>
          </NavItem>
          <NavItem>
            <Button outline color="primary">
              <Link to="/login">Login</Link>
            </Button>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
