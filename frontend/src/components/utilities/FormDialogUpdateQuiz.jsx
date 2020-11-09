import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
// import { useDispatch } from "react-redux";
// import API_URL from "../../constants";
// import { alertError, alertSuccess } from "../../redux/actions";

const FormDialogUpdateQuiz = ({ open, handleClose }) => {
    // add button should call backend api, stub for now

    const [name, setName] = useState("");
    // const dispatch = useDispatch();

    const handleAdd = () => {
        console.log("ok");
        
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Add a new quizze</DialogTitle>
            <DialogContent>
                <DialogContentText>
         FUCK
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Quizze Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
          Cancel
                </Button>
                <Button onClick={handleAdd} color="primary">
          Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

FormDialogUpdateQuiz.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default FormDialogUpdateQuiz;
