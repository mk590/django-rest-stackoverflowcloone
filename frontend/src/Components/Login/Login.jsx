import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axiosInstance from "../../Interceptors/axios.js";
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    try {
      const { data } = await axiosInstance.post(
        "login/",
        user,
      );

      // Initialize the access and refresh token in localStorage
      console.log(data)
      localStorage.clear();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data["access"]}`;
      window.location.href="/";  
    } catch (error) {
      // Display error message
      alert("Invalid Email or Password!");
    }
  };

  return (
    
    <Container
      className="d-flex justify-content-center align-items-center container-size mt-4 mb-3"
      style={{ backgroundColor: "#BEF0CB" }}
    >
      <Form onSubmit={submit}>
        <h1 className="mb-4 display-1">Login</h1>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
 
  );
};

export default Login;
