// // import React, { useState } from "react";
// import React from "react";
// // import "./Login.css";
// // import { useDispatch } from "react-redux";
// // import { useHistory } from "react-router-dom";
// // import { login } from "../../redux/actions";

// const Login = () => {
//     // const [email, setEmail] = useState();
//     // const [password, setPassword] = useState();
//     // const dispatch = useDispatch();
//     // const history = useHistory();
//     return (
//     // <Form
//     //   className="form-login"
//     //   onSubmit={e => {
//     //     e.preventDefault();
//     //     dispatch(login(email, password));
//     //     history.push("/home");
//     //   }}
//     // >
//     //   <FormGroup>
//     //     <Label for="exampleEmail">Email</Label>
//     //     <Input
//     //       type="email"
//     //       name="email"
//     //       placeholder="with a placeholder"
//     //       onChange={event => setEmail(event.target.value)}
//     //     />
//     //   </FormGroup>
//     //   <FormGroup>
//     //     <Label for="examplePassword">Password</Label>
//     //     <Input
//     //       type="password"
//     //       name="password"
//     //       placeholder="password placeholder"
//     //       onChange={event => setPassword(event.target.value)}
//     //     />
//     //   </FormGroup>
//     //   <Button type="submit">Submit</Button>
//     // </Form>
//         <div>fuck</div>
//     );
// };

// export default Login;


import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// 64px is the height of navbar
const useStyles = makeStyles(() => ({
    root: {
        height: "calc(100vh - 64px)",
        justifyContent: "center",
        alignItems: "center",

    },
    form: {
        display: 'flex',
        flexDirection: "column",
        maxWidth: 400,
        minWidth: 300,
    }

}));
const Login = () => {

    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <form className={classes.form} >
                <TextField label="Email" />
                <TextField label="Password" />
                <div style={{ height: 20 }} />
                <Button color="primary" variant="contained">Log in</Button>
            </form>
        </Grid>

    );
};

export default Login;