import React, { forwardRef, useState, useEffect } from "react";
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
import PanoramaOutlinedIcon from "@material-ui/icons/PanoramaOutlined";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import {useDispatch} from "react-redux";
import {alertError} from "../../redux/actions";
import {newAnswer} from "../../constants";
import './responsive_design.css'


// diable eslint warning for no-eval in this file
/* eslint-disable no-eval */
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
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 100px 0px",
        backgroundColor: "#f2f2f2",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    head: {
        flex: 1,
    },
    body: {
        flex: 4,
    },
    foot: {
        flex: 2,
    },

    left: {
        padding: "40px 40px",
        alignItems: "center",
    },
    right: {
        margin: "0px 0px 40px",
        border: "2px dashed rgb(204, 204, 204)",
    },
    imageContainer: {
        height: "85%",
    },
    imageFrame: {
        display: "inline-flex",
        borderRadius: 2,
        border: "1px solid #eaeaea",
        margin: 10,
        maxWidth: 600,
        maxHeight: 370,
        padding: 4,
        boxSizing: "border-box",
    },
    imageFrameInner: {
        display: "flex",
        minWidth: 0,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageIcon: {
        width: 100,
        height: 100,
        color: "rgb(101, 105, 105)",
    },
    choice: {
        width: "100%",
        height: "80%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
    choice1: {
        backgroundColor: "#e21b3c",
    },
    choice2: {
        backgroundColor: "#1368ce",
    },
    choice3: {
        backgroundColor: "#d89e00",
    },
    choice4: {
        backgroundColor: "#26890c",
    },
    inputText: {
        color: "white",
    },
    upload: {
        margin: 12,
    },
    placeHolder: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5em",
    },
}));


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialogAddQuestion = ({ open, handleClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    const [timeLimit, setTimeLimit] = useState("");
    const [points, setPoints] = useState(1000);

    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [questionType, setQuestionType] = useState("Question Type");
    const [upload, setUpload] = useState({ imagePreviewUrl: "" });

    const handleChange = (event) => {
        setTimeLimit(event.target.value);
    };
    const valuetext = (value) => {
        return value;
    };

    const handleChangeCheckBox1 = (event) => {
        setChecked1(event.target.checked);
    };
    const handleChangeCheckBox2 = (event) => {
        setChecked2(event.target.checked);
    };
    const handleChangeCheckBox3 = (event) => {
        setChecked3(event.target.checked);
    };
    const handleChangeCheckBox4 = (event) => {
        setChecked4(event.target.checked);
    };


    useEffect(() => {
        let cnt = 0;
        for (let i = 1; i <= 4; i += 1) {
            if (eval(`checked${i}`) === true) {
                cnt += 1;
            }
        }
        console.log(cnt);
        if (cnt === 0) {
            setQuestionType("Question Type");
        } else if (cnt > 1) {
            setQuestionType("Mutiple Choice");
        } else {
            setQuestionType("Single Choice");
        }
    }, [checked1, checked2, checked3, checked4]);


    const handleImageChange = (e) => {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            setUpload({
                imagePreviewUrl: reader.result,
            });
        };

        reader.readAsDataURL(file);
    };

    let imagePlaceHolder;

    if (upload.imagePreviewUrl) {
        imagePlaceHolder = (
            <div className={classes.imageFrameInner}>
                <div className={classes.imageFrame}>
                    <img
                        src={upload.imagePreviewUrl}
                        alt="upload"
                        className={classes.image}
                    />
                </div>
            </div>
        );
    } else {
        imagePlaceHolder = (
            <div className={classes.placeHolder}>
                <PanoramaOutlinedIcon className={classes.imageIcon}/>
                <div style={{height: "20px"}}/>
                <Typography variant="body1" gutterBottom>
                    <span>Preview Uploaded Image Here</span>
                </Typography>
            </div>
        );
    }

    const handleSave = () => {
    // check if user fill in all the field required to make a new question
        if (!(answer1 && answer2 && answer3 && answer4)) {
            dispatch(alertError("Please Fill In All Answers"));
            return;
        }
        if (!title) {
            dispatch(alertError("Please Fill in Title"));
            return;
        }
        if (!timeLimit) {
            dispatch(alertError("Please Set Time Limit"));
            return;
        }
        if (!upload.imagePreviewUrl) {
            dispatch(alertError("Please Upload An Image"));
            return;
        }

        // make a new question
        const answers = [];

        for (let i = 1; i <= 4; i += 1) {
            answers.push(newAnswer(eval(`answer${i}`), eval(`checked${i}`)));
        }

        handleClose();
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
                    <Button autoFocus color="inherit" onClick={handleSave}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container className={classes.girdContainer} spacing={2}>
                <Grid container item xs={12} className={classes.head}>
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
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12} className={classes.body}>
                    <Grid id="disappear" item container xs={4} className={classes.left}>
                        <Grid item xs={12} container justify="center" alignContent="center">
                            <FormControl className={classes.formControl}>
                                <FormLabel>Time Limit</FormLabel>

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
                                <FormLabel>Points</FormLabel>
                                <div style={{height: 15}}/>
                                <Slider
                                    getAriaValueText={valuetext}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={200}
                                    marks
                                    min={500}
                                    max={2000}
                                    onChange={(event, newValue) => {
                                        setPoints(newValue);
                                    }}
                                    value={points}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} container justify="center" alignContent="center">
                            <FormControl className={classes.formControl}>
                                <FormLabel>Answer options</FormLabel>

                                <div style={{ height: 15 }} />
                                <Chip label={questionType} />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid id='uploadbox' item container xs={6} className={classes.right}>
                        <Grid
                            container
                            item
                            xs={12}
                            className={classes.imageContainer}
                            justify="center"
                            alignItems="center"
                        >
                            {imagePlaceHolder}
                        </Grid>
                        <Grid item xs={12} container justify="center" alignItems="center">
                            <label htmlFor="raised-button-file">
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    style={{display: "none"}}
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleImageChange}
                                />

                                <Button
                                    variant="contained"
                                    component="span"
                                    className={classes.button}
                                    size="small"
                                >
                                    Upload
                                </Button>
                            </label>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}/>
                </Grid>
                <Grid container item xs={12} className={classes.foot}>
                    <Grid container item xs={12} spacing={2}>
                        <Grid container item xs={6}>
                            <div className={`${classes.choice} ${classes.choice1}`}>
                                <TextField
                                    id="text"
                                    label="Answer1"
                                    onChange={(event) => setAnswer1(event.target.value)}
                                    InputProps={{
                                        className: classes.inputText,
                                    }}
                                    value={answer1}
                                />
                                <Checkbox
                                    checked={checked1}
                                    onChange={handleChangeCheckBox1}
                                    inputProps={{"aria-label": "primary checkbox"}}
                                    inputstyle={{color: "white"}}
                                    style={{color: "white"}}
                                />
                            </div>
                        </Grid>
                        <Grid container item xs={6}>
                            <div className={`${classes.choice} ${classes.choice2}`}>
                                <TextField
                                    id="text"
                                    label="Answer2"
                                    onChange={(event) => setAnswer2(event.target.value)}
                                    InputProps={{
                                        className: classes.inputText,
                                    }}
                                    value={answer2}
                                />
                                <Checkbox
                                    checked={checked2}
                                    onChange={handleChangeCheckBox2}
                                    inputProps={{"aria-label": "primary checkbox"}}
                                    inputstyle={{color: "white"}}
                                    style={{color: "white"}}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        <Grid container item xs={6}>
                            <div className={`${classes.choice} ${classes.choice3}`}>
                                <TextField
                                    id="text"
                                    label="Answer3"
                                    onChange={(event) => setAnswer3(event.target.value)}
                                    InputProps={{
                                        className: classes.inputText,
                                    }}
                                    value={answer3}
                                />
                                <Checkbox
                                    checked={checked3}
                                    onChange={handleChangeCheckBox3}
                                    inputProps={{"aria-label": "primary checkbox"}}
                                    inputstyle={{color: "white"}}
                                    style={{color: "white"}}
                                />
                            </div>
                        </Grid>
                        <Grid container item xs={6}>
                            <div className={`${classes.choice} ${classes.choice4}`}>
                                <TextField
                                    id="text"
                                    label="Answer4"
                                    onChange={(event) => setAnswer4(event.target.value)}
                                    InputProps={{
                                        className: classes.inputText,
                                    }}
                                    value={answer4}
                                />
                                <Checkbox
                                    checked={checked4}
                                    onChange={handleChangeCheckBox4}
                                    inputProps={{"aria-label": "primary checkbox"}}
                                    inputstyle={{color: "white"}}
                                    style={{color: "white"}}
                                />
                            </div>
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
