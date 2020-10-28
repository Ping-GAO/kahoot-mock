import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { login } from "../../redux/actions";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.authentication);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
    console.log(loginStatus);
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
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default Login;
