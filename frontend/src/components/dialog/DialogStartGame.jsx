import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import API_URL from "../../constants";
import { alertError, alertSuccess } from "../../redux/actions";

const useStyles = makeStyles(() => ({
    link: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
}));
const DialogStartGame = ({ open, handleClose, quizid }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(() => {
        if (open) {
            fetch(`${API_URL}/admin/quiz/${quizid}/start`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            })
                .then(res => {
                    if (res.ok) {
                        return Promise.resolve(res.json());
                    }
                    return Promise.resolve(res.json()).then(
                        data => {
                            return Promise.reject(data.error);
                        }
                    )
                })

                .then(
                    () => {
                        dispatch(alertSuccess("Start Game Success"));
                        // if start game successful should get the session id

                        fetch(`${API_URL}/admin/quiz/${quizid}`, {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                            },
                        })
                            .then(res => res.json())
                            .then(data => { console.log(data) });
                    },
                    error => {
                        dispatch(alertError(error));
                    }
                )
                .catch(
                    error => {
                        dispatch(alertError(error.message));
                    }
                );

        }




    }, [quizid, dispatch, open]);
    return (


        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="form-dialog-title">Join Game</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Copy the link to join the game
                </DialogContentText>
                <div className={classes.link}>
                    <TextField

                        label="Session Id"
                        defaultValue="Hello World"
                        InputProps={{
                            readOnly: true,
                        }}

                    />
                    <CopyToClipboard text="fucxk"
                        onCopy={() => console.log("ok")}>
                        <button type="button" style={{ height: "30px" }}>
                            Copy to clipboard with button
                        </button>
                    </CopyToClipboard>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>

            </DialogActions>
        </Dialog>

    );
}
DialogStartGame.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    quizid: PropTypes.number.isRequired

}

export default DialogStartGame;