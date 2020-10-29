import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import "./NavigationBar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions";

const NavigationBar = () => {
  // get loginStatus from reudex store
  const loginStatus = useSelector(state => state.authentication);
  // condition rendering base on loginStatus
  let button;
  const dispatch = useDispatch();
  const history = useHistory();
  if (loginStatus.loggedIn) {
    button = (
      <Button
        outline
        color="primary"
        onClick={() => {
          dispatch(logout());
          history.push("/home");
        }}
      >
        Logout
      </Button>
    );
  } else {
    button = (
      <Button outline color="primary">
        <Link to="/login">Login</Link>
      </Button>
    );
  }

  return (
    // a div contianer added for future usage
    <div className="container-nav">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/home">Home</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem className="mx-2">
            <Button outline color="primary">
              <Link to="/signup">Signup</Link>
            </Button>
          </NavItem>
          <NavItem>{button}</NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
