import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Checkbox from "@material-ui/core/Checkbox";
import Typography from '@material-ui/core/Typography';
import API_URL from "../../constants";

let pollingTimeout = null;


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
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
        [theme.breakpoints.down('sm')]: {
            padding: "70px 20px 0px",
            flexWrap: "nowrap"
        },
        [theme.breakpoints.up('md')]: {
            padding: "20px 40px 0px",
        },
        [theme.breakpoints.up('lg')]: {
            padding: "80px 150px 0px",
        },
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
        padding: 4,
        boxSizing: "border-box",

        [theme.breakpoints.down('sm')]: {
            maxWidth: 220,
            maxHeight: 370,
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: 240,
            maxHeight: 370,
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: 300,
            maxHeight: 370,
        },
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
        margin: 8,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
    choice1: {
        backgroundColor: props => props.answer1 ? "#e21b3c" : "#ffffff"
    },
    choice2: {
        backgroundColor: props => props.answer2 ? "#1368ce" : "#ffffff"
    },
    choice3: {
        backgroundColor: props => props.answer3 ? "#d89e00" : "#ffffff"
    },
    choice4: {
        backgroundColor: props => props.answer4 ? "#26890c" : "#ffffff"
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const GamePlay = () => {
    const { playerId } = useParams();

    const [started, setStarted] = useState(false);
    const [questionCurrent, setQuestionCurrent] = useState(null);
    const [isoTimeCurrent, setIsoTimeCurrent] = useState();
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);

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
    
    
    const classes = useStyles({ answer1, answer2, answer3, answer4 });


    console.log(questionCurrent, isoTimeCurrent);

    useEffect(() => {
    // using polling to get the ongoing game status
        const getGameStutus = () => {
            fetch(`${API_URL}/play/${playerId}/status`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.started === true) {
                        setStarted(true);
                    }
                });
        };
        const getQuestion = () => {
            fetch(`${API_URL}/play/${playerId}/question`, {
                method: "GET",
            })
                .then((res) => res.json())

                .then((data) => {
                    const { question } = data;
                    const { isoTimeLastQuestionStarted, ...rest } = question;
                    setIsoTimeCurrent(isoTimeLastQuestionStarted);
                    // console.log(rest);
                    setQuestionCurrent(rest);
                });
        };
        if (started === false) {
            getGameStutus();
            pollingTimeout = setInterval(() => getGameStutus(), 1000);
        } else {
            clearInterval(pollingTimeout);
            console.log("game already started");
            // should fetch the first question of the game here
        }
        return () => {
            clearInterval(pollingTimeout);
            getQuestion();
        };
    }, [playerId, started]);

    let pageContent = null;
    if (started === false) {
        pageContent = <div>awd{playerId}</div>;
    } else {
        pageContent = (
            <Grid container className={classes.girdContainer} spacing={2}>
                <Grid container item xs={12} className={classes.head}>
                    <Grid item container xs={12}>
                        <Typography variant="h3" gutterBottom>
        h3. Heading
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} className={classes.body}>
                    <Grid item container xs={12} sm={4} md={4} className={classes.left}>
                        <div>should be a vounter down timer</div>
                    </Grid>
                    <Grid item container xs={12} sm={8} md={6} className={classes.right}>
                        <Grid
                            container
                            item
                            xs={12}
                            className={classes.imageContainer}
                            justify="center"
                            alignItems="center"
                        >
                            <div>image</div>
                        </Grid>
                        
                    </Grid>
                    <Grid item md={2} />
                </Grid>
                <Grid container item xs={12} className={classes.foot}>
                    <Grid container item xs={12} spacing={1}>
                        <Grid container item xs={12} sm={12} md={12} lg={6}>
                            <div className={`${classes.choice} ${classes.choice1}`}>
                                <TextField
                                    className="text"
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
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                    inputstyle={{ color: "white" }}
                                    style={{ color: "white" }}
                                />
                            </div>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={6}>
                            <div className={`${classes.choice} ${classes.choice2}`}>
                                <TextField
                                    className="text"
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
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                    inputstyle={{ color: "white" }}
                                    style={{ color: "white" }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                        <Grid container item xs={12} sm={12} md={12} lg={6}>
                            <div className={`${classes.choice} ${classes.choice3}`}>
                                <TextField
                                    className="text"
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
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                    inputstyle={{ color: "white" }}
                                    style={{ color: "white" }}
                                />
                            </div>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={6}>
                            <div className={`${classes.choice} ${classes.choice4}`}>
                                <TextField
                                    className="text"
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
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                    inputstyle={{ color: "white" }}
                                    style={{ color: "white" }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>);
    }
    return pageContent;
};

export default GamePlay;
