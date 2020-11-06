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

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from '@material-ui/core/FormLabel';


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
        flexDirection:"column",
        justifyContent: "center",
        padding: "80px 100px 0px",
        backgroundColor:"#f2f2f2"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    head:{
        flex:1
    },
    body: {
        flex:4
    },
    foot:{
        flex:2
    },

    left: {
        display: "flex",
        padding:"40px 40px",
        flexDirection: "column",
        alignItems: "center",
    },
    right: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height:"80%"
    },
    imgUploader:{
        height:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly"
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

   
   
    const [checked1, setChecked1] = React.useState(true);
    const [checked2, setChecked2] = React.useState(true);
    const [checked3, setChecked3] = React.useState(true);
    const [checked4, setChecked4] = React.useState(true);
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

    const [answer1, setAnswer1] = useState();
    const [answer2, setAnswer2] = useState();
    const [answer3, setAnswer3] = useState();
    const [answer4, setAnswer4] = useState();
   
    console.log(answer1, answer2, answer3, answer4);
   
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
            <Grid container  className={classes.girdContainer} spacing={2}>
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
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12}  className={classes.body}>
                    <Grid item xs={4} className={classes.left}>
                        <Grid
                            item
                            xs={12}
                            container
                            justify="center"
                            alignContent="center"
                        >
                            <FormControl className={classes.formControl}>
                                <FormLabel >Time Limit</FormLabel>
                              
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
                        <Grid
                            item
                            xs={12}
                            container
                            justify="center"
                            alignContent="center"
                        >
                            <FormControl className={classes.formControl}>
                                <FormLabel >Points</FormLabel>
                                <div style={{height:15}}/>
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
                        <Grid
                            item
                            xs={12}
                            container
                            justify="center"
                            alignContent="center"
                        >
                            <FormControl className={classes.formControl}>
                                <FormLabel >Answer options</FormLabel>
                                <div style={{height:15}}/>
                                <Chip label="Basic" />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} className={classes.right} >
                        <div>fuck</div>
                       
                        
                    </Grid>
                    <Grid xs={2}/>
                </Grid>
                <Grid container item xs={12}  className={classes.foot}>
                    <Grid container item xs={12}  spacing={2}>
                        <Grid container item xs={6}>
                            <div className={`${classes.choice} ${classes.choice1}`}>
                                <TextField
                                    id="standard-basic"
                                    label="Answer1"
                                    onChange={(event) => setAnswer1(event.target.value)}
                                    InputProps={{
                                        className: classes.inputText,
                                    }}
                                />
                                <Checkbox
                                    checked={checked1}
                                    onChange={handleChangeCheckBox1}
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                    inputStyle={{ color: "white" }}
                                    style={{ color: "white" }}
                                />
                            </div>
                        </Grid>
                        <Grid container item xs={6}>
                            <div className={`${classes.choice} ${classes.choice2}`}>
                                <TextField
                                    id="standard-basic"
                                    label="Answer2"
                                    onChange={(event) => setAnswer2(event.target.value)}
                                    InputProps={{
                                        className: classes.inputText,
                                    }}
                                />
                                <Checkbox
                                    checked={checked2}
                                    onChange={handleChangeCheckBox2}
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                    inputStyle={{ color: "white" }}
                                    style={{ color: "white" }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        <Grid container item xs={6}>
                            <div className={`${classes.choice} ${classes.choice3}`}>
                                <TextField
                                    id="standard-basic"
                                    label="Answer3"
                                    onChange={(event) => setAnswer3(event.target.value)}
                                    InputProps={{
                                        className: classes.inputText,
                                    }}
                                />
                                <Checkbox
                                    checked={checked3}
                                    onChange={handleChangeCheckBox3}
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                    inputStyle={{ color: "white" }}
                                    style={{ color: "white" }}
                                />
                            </div>
                        </Grid>
                        <Grid container item xs={6}>
                            <div className={`${classes.choice} ${classes.choice4}`}>
                                <TextField
                                    id="standard-basic"
                                    label="Answer4"
                                    onChange={(event) => setAnswer4(event.target.value)}
                                    InputProps={{
                                        className: classes.inputText,
                                    }}
                                />
                                <Checkbox
                                    checked={checked4}
                                    onChange={handleChangeCheckBox4}
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                    inputStyle={{ color: "white" }}
                                    style={{ color: "white" }}
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
