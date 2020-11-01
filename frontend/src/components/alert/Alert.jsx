import React, { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";
import {  useDispatch } from "react-redux";
import { alertClear } from "../../redux/actions";

const CustomizedSnackbars = ({ type, message }) => {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const handleClose = (_event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(alertClear());
        setOpen(false);
    };
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity={type}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

CustomizedSnackbars.propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default CustomizedSnackbars;
