import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
} from "mdb-react-ui-kit";

export default function Navbar(props) {
  const handleLogout = () => {
    logout().then(() => {
      props.setUser(null);
    });
  };

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBNavbarBrand href="#">Baby 3.0</MDBNavbarBrand>
      <MDBNavbarLink href="/">Home</MDBNavbarLink>
      

      {props.user ? (
        <>
          <MDBNavbarLink href="/about">About</MDBNavbarLink>
          <MDBNavbarLink href="/" onClick={() => handleLogout()}>
            Logout
          </MDBNavbarLink>
        </>
      ) : (
        <>
          <MDBNavbarLink href="/signup">Signup</MDBNavbarLink>
          <MDBNavbarLink href="/login">Login</MDBNavbarLink>
        </>
      )}
      <form class="d-flex input-group w-auto">
        <input
          type="search"
          class="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <span class="input-group-text border-0" id="search-addon">
          <i class="fas fa-search"></i>
        </span>
      </form>
    </MDBNavbar>
  );
}
