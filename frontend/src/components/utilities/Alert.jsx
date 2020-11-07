import React, { useState ,useEffect} from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { alertClear } from "../../redux/actions";

const CustomizedSnackbars = ({ type, message }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    const [didMount, setDidMount] = useState(false);

    const handleClose = (_event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(alertClear());
        setOpen(false);
    };

    // without the mounting state checking 
    // You will get following error:
    // Can't perform a React state update on an unmounted component.
    useEffect(() => {
        setDidMount(true);
        return () => setDidMount(false);
    }, []);

    // if the component didn't mount, just return
    if (!didMount) {
        return null;
    }

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
