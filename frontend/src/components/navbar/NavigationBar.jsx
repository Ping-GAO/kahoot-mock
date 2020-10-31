import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const ButtonAppBar = () => {
    const classes = useStyles();
    const loginStatus = useSelector(state => state.authentication);
    const dispatch = useDispatch();
    const history = useHistory();
    // condition rendering base on loginStatus
    let button;
    if (loginStatus.loggedIn) {
        button = (
            <Button
                color="inherit"
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
            <Button color="inherit" href="/login" >Login</Button>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button color="inherit" href="/signup">Signup</Button>
                    {button}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ButtonAppBar;
