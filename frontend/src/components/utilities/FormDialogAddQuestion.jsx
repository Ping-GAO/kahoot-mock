
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const FormDialogAddQuestion = ({ open, handleClose }) => {
    // add button should call backend api, stub for now
    return <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new question</DialogTitle>
        <DialogContent>
            <DialogContentText>
                To add to this new quizze, please enter the name
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Quizze Name"
                type="text"
                fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
                Add
            </Button>
        </DialogActions>
    </Dialog>;
}


FormDialogAddQuestion.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default FormDialogAddQuestion;