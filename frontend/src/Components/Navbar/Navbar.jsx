import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import stackoverflow from "./stackoverflow.jpg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import axiosInstance from "../../Interceptors/axios.js";
import Profile from "../Profile/Profile";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [userid, setUserid] = useState(null);
  
// If userid is not null then call getUserDetails
  const openProfilepage = () => {
    window.location.href = `/profile/${userid}`;
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    // perform any additional logout logic here
    window.location.href = "/logout/";
  };
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsLoggedIn(true);
      getUserDetails();
    }
  }, [isLoggedIn]);

  const callAlert = () => {
    alert("Sorry we are still working on this feature!");
  };
  const getUserDetails = async () => {
    // const token = localStorage.getItem("access_token");
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    // const options = {
    //   withCredentials: true, // add withCredentials option if API requires authentication
    // };

    try {
      const response = await axiosInstance.get("user-detail/", {
        // headers,
        // ...options,
      });
      console.log(response.data);
      const name = response.data.first_name;
      setUser(name);
      setUserid(response.data.id);
      console.log(response.data.id);
      console.log(userid)
      console.log(`His id is ${userid}`);
    } catch (error) {
      console.error(error);
      // alert("Please Sign Up again!");
      handleLogout();
    }
  };

  return (
    <Navbar
      bg="light"
      variant="dark"
      expand="lg"
      collapseOnSelect={true}
      style={{
        borderBottom: "1px solid black",
        padding: "1px",
        marginRight: "0px",
      }}
    >
      <div className="NavDiv">
        <Navbar.Brand href="/">
          <img src={stackoverflow} alt="" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto flex-fill">
            <Link
              to="/"
              className="NavLinks btn "
              style={{
                borderRadius: "10px",
                marginRight: "60px",
                fontWeight: "bold",
              }}
            >
              Home
            </Link>{" "}
            <Link
              to="#"
              className="NavLinks btn "
              style={{ marginRight: "60px", fontWeight: "bold" }}
              onClick={callAlert}
            >
              Topics
            </Link>
            <Link
              to="#"
              className="NavLinks btn "
              onClick={getUserDetails}
              style={{ marginLeft: "10px", fontWeight: "bold" }}
              onClick={callAlert}
            >
              Products
            </Link>
          </Nav>
          {isLoggedIn ? (
            <>
              <Nav>
                <button
                  onClick={openProfilepage}
                  className="btn"
                  style={{ fontWeight: "bold" }}
                >
                  {user}
                </button>
              </Nav>
              <Nav style={{ marginRight: "0%" }}>
                <button
                  className="btn"
                  style={{ fontWeight: "bold", marginRight: "0px" }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Nav>
            </>
          ) : (
            <Nav>
              <Link
                to="/register"
                className="NavLinks btn "
                style={{ fontWeight: "bold" }}
              >
                Register
              </Link>{" "}
              <Link
                to="/login"
                className="NavLinks btn "
                style={{ marginLeft: "60px", fontWeight: "bold" }}
              >
                Login
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Navigation;
