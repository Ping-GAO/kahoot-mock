import React, { forwardRef, useState } from "react";
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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";
import Chip from "@material-ui/core/Chip";
import PublishIcon from "@material-ui/icons/Publish";

import Fab from "@material-ui/core/Fab";

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
        padding: "0px 500px",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    body: {
        minHeight: 500,
    },
    left: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    right: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        display: "none",
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    img: {
        width: "100%",
        height: "100%",
        maxHeight: 300,
        maxWidth: 300,
    },
    upper: {
        flex: 2,
    },
    lower: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    },
}));

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialogAddQuestion = ({ open, handleClose }) => {
    const classes = useStyles();

    const [timeLimit, setTimeLimit] = React.useState("");

    const handleChange = (event) => {
        setTimeLimit(event.target.value);
    };
    const valuetext = (value) => {
        return `${value}°C`;
    };

    const [image, setImage] = useState({
        imageUploaded: false,
        selectedFile: null,
    });
    const handleUploadClick = (event) => {
        const file = event.target.files[0];
        if (file && file.type.match("image.*")) {
            const reader = new FileReader();
            const url = reader.readAsDataURL(file);
            let imageLocal = { ...image };
            reader.onloadend = () => {
                setImage({ ...imageLocal, selectedFile: [reader.result] });
            };
            console.log(url); // Would see a path?

            imageLocal = {
                ...imageLocal,
                selectedFile: event.target.files[0],
                imageUploaded: true,
            };
            setImage(imageLocal);
        }
    };

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
                    <Grid item container xs={12}>
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
                </Grid>
                <Grid container item xs={12} spacing={5} className={classes.body}>
                    <Grid item xs={4} className={classes.left}>
                        <Grid
                            item
                            xs={12}
                            container
                            justify="center"
                            alignContent="flex-start"
                        >
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">
                  Time Limit
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={timeLimit}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>10 sec</MenuItem>
                                    <MenuItem value={20}>20 sec</MenuItem>
                                    <MenuItem value={30}>30 sec</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} container justify="center" alignContent="center">
                            <FormControl className={classes.formControl}>
                                <Typography id="discrete-slider" gutterBottom>
                  Points
                                </Typography>
                                <Slider
                                    defaultValue={1000}
                                    getAriaValueText={valuetext}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={200}
                                    marks
                                    min={500}
                                    max={2000}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} container justify="center" alignContent="center">
                            <FormControl className={classes.formControl}>
                                <Chip label="Basic" />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} className={classes.right}>
                        <Grid item xs={12} className={classes.upper}>
                            {image.imageUploaded && (
                                <img
                                    className={classes.img}
                                    src={image.selectedFile[0]}
                                    alt="fukc"
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} container className={classes.lower}>
                            <label htmlFor="contained-button-file">
                                <Fab
                                    component="span"
                                    variant="extended"
                                    size="small"
                                    aria-label="add"
                                >
                                    <PublishIcon className={classes.extendedIcon} />
                  Upload image
                                </Fab>

                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    type="file"
                                    id="contained-button-file"
                                    multiple
                                    onChange={handleUploadClick}
                                />
                            </label>
                        </Grid>
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
