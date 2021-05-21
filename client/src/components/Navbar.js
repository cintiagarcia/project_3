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
    <MDBNavbar expand="lg" className="navbar">
      <MDBNavbarBrand href="#">
        <a class="navbar-brand" href="#">
          <img src="/images/baby3.0.png" height="30px" alt="" />
        </a>
      </MDBNavbarBrand>
      <MDBNavbarLink href="/" class="text-white">
        Home
      </MDBNavbarLink>

      {props.user ? (
        <>
          <Link to="/rent" class="text-white">
            Rent
          </Link>
          <Link to="/equipments" class="text-white">
            Add baby's equipment
          </Link>
          <Link to="/googleMap" class="text-white">
            Map
          </Link>
          <Link to="/" onClick={() => handleLogout()}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/rent" class="text-white">
            Rent
          </Link>
          <Link to="/signup" class="text-white">
            Signup
          </Link>
          <Link to="/login" class="text-white">
            Login
          </Link>
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
