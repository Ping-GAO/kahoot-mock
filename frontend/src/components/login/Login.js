import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { API_URL } from "../../constants";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email: email, password: password });
    fetch(`${API_URL}/admin/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <Form className="form-login" onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="with a placeholder"
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="password placeholder"
          onChange={(event) => setPassword(event.target.value)}
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

export default Login;
