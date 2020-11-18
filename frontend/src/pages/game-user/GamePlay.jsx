import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import moment from "moment";
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
        [theme.breakpoints.down("sm")]: {
            padding: "70px 20px 0px",
            flexWrap: "nowrap",
        },
        [theme.breakpoints.up("md")]: {
            padding: "20px 40px 0px",
        },
        [theme.breakpoints.up("lg")]: {
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
    headWrapper: {
        display: "flex",
        justifyContent: "center",
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

        [theme.breakpoints.down("sm")]: {
            maxWidth: 220,
            maxHeight: 370,
        },
        [theme.breakpoints.up("md")]: {
            maxWidth: 240,
            maxHeight: 370,
        },
        [theme.breakpoints.up("lg")]: {
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
    choice: {
        width: "100%",
        margin: 8,
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },

    timer: {
        fontFamily: "Montserrat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    text: {
        color: "#aaa",
    },
    value: {
        fontSize: "40px",
    },
}));

const GamePlay = () => {
    const { playerId } = useParams();
    const classes = useStyles();

    const [started, setStarted] = useState(false);
    const [key, setKey] = useState(0);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    // const [isoTimeCurrent, setIsoTimeCurrent] = useState();
    const [remainTime, setRemainTime] = useState(0);
    const [questionCurrent, setQuestionCurrent] = useState({
        questionBody: "",
        answers: [
            { answerBody: "" },
            { answerBody: "" },
            { answerBody: "" },
            { answerBody: "" },
        ],
        timeLimit:0
    });

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

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <div className={classes.timer}>Too lale...</div>;
        }

        return (
            <div className={classes.timer}>
                <div className={classes.text}>Remaining</div>
                <div className={classes.value}>{remainingTime}</div>
                <div className={classes.text}>seconds</div>
            </div>
        );
    };

    // console.log( isoTimeCurrent);

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
                    // setIsoTimeCurrent(isoTimeLastQuestionStarted);
                    // console.log(rest);
                    setQuestionCurrent(rest);

                    // need a way to perserve the time remaining value between user refresh page
                    // i used real time calculation, so no matter how you refrest the page
                    // the time remain is presist
                    const now = moment(new Date());
                    const questionStart = moment(isoTimeLastQuestionStarted);
                    const questionEnd = questionStart.add(rest.timeLimit, "seconds");
                    
                    const diffInSeconds = moment
                        .duration(questionEnd.diff(now))
                        .asSeconds();
                    if (diffInSeconds > 0) {
                        setRemainTime(diffInSeconds);
                        // reset the coutdown based on real time value
                        setKey((prevKey) => prevKey + 1);
                    }
                });
        };
        if (started === false) {
            getGameStutus();
            pollingTimeout = setInterval(() => getGameStutus(), 1000);
        } else {
            clearInterval(pollingTimeout);
            // should fetch the first question of the game here
            getQuestion();
            console.log("game already started");
        }
        return () => {
            // when component unmounted, stop pooling
            clearInterval(pollingTimeout);
        };
    }, [playerId, started]);

    console.log(key);
    let pageContent = null;
    if (started === false) {
        pageContent = <div>awd{playerId}</div>;
    } else {
        console.log("awdawd", questionCurrent.timeLimit);
        pageContent = (
            <Grid container className={classes.girdContainer} spacing={2}>
                <Grid container item xs={12} className={classes.head}>
                    <Grid item container xs={12} className={classes.headWrapper}>
                        <Typography variant="h3" gutterBottom>
                            {questionCurrent.questionBody}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} className={classes.body}>
                    <Grid item container xs={12} sm={4} md={4} className={classes.left}>
                        <Grid item xs={12} container justify="center" alignContent="center">
                            <CountdownCircleTimer
                                onComplete={() => {
                                    // should to some api call
                                    console.log("end");
                                }}
                                isPlaying
                                key={key}
                                duration={questionCurrent.timeLimit}
                                initialRemainingTime={remainTime}
                                colors={[
                                    ["#004777", 0.33],
                                    ["#F7B801", 0.33],
                                    ["#A30000", 0.33],
                                ]}
                            >
                                {renderTime}
                            </CountdownCircleTimer>
                        </Grid>
                        <Grid item xs={12} container justify="center" alignContent="center">
              number of points
                        </Grid>
                        <Grid item xs={12} container justify="center" alignContent="center">
                            <Chip label={questionCurrent.type} />
                        </Grid>
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
                            <div className={classes.imageFrameInner}>
                                <div className={classes.imageFrame}>
                                    <img
                                        src={questionCurrent.image}
                                        alt="question"
                                        className={classes.image}
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item md={2} />
                </Grid>
                <Grid container item xs={12} className={classes.foot}>
                    <Grid container item xs={12} spacing={1}>
                        <Grid container item xs={12} sm={12} md={12} lg={6}>
                            <div className={`${classes.choice} ${classes.choice1}`}>
                                <Typography variant="button" display="block" gutterBottom>
                                    {questionCurrent.answers[0].answerBody}
                                </Typography>
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
                                <Typography variant="button" display="block" gutterBottom>
                                    {questionCurrent.answers[1].answerBody}
                                </Typography>
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
                                <Typography variant="button" display="block" gutterBottom>
                                    {questionCurrent.answers[2].answerBody}
                                </Typography>
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
                                <Typography variant="button" display="block" gutterBottom>
                                    {questionCurrent.answers[3].answerBody}
                                </Typography>
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
            </Grid>
        );
    }
    return pageContent;
};

export default GamePlay;
