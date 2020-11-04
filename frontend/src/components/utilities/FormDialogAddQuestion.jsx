import React, { forwardRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    girdContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "80px 0px 0px",
        padding: "0px 150px",
    },
}));

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialogAddQuestion = ({ open, handleClose }) => {
    const classes = useStyles();
    // add button should call backend api, stub for now
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
            Sound
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
            save
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container spacing={4} className={classes.girdContainer}>
                <Grid container item xs={12} spacing={5}>
                    <TextField
                        id="outlined-full-width"
                        label="Start typing your question"
                        style={{ margin: 8 }}
                        placeholder="How many hours did you spend on this assignment?"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid container item xs={12} spacing={5}>
                    <Grid item xs={4}>
            fucj
                    </Grid>
                    <Grid item xs={8}>
            fucj
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    );
};

FormDialogAddQuestion.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default FormDialogAddQuestion;
