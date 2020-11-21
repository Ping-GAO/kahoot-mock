import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import uuid from 'react-uuid'
import { alertError, alertSuccess } from "../../redux/actions";
import API_URL, { playerData } from "../../constants";


const useStyles = makeStyles(() => ({
    timer: {
        fontFamily: "Montserrat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "30px",
    },
    text: {
        color: "#aaa",
        fontSize: "25px",
    },
    value: {
        fontSize: "40px",
    },
    id: {
        fontSize: "30px",
        textAlign: "center",
        marginTop: "5%",
        marginBottom: "5%",
    },
    end: {
        fontSize: "50px",
        textAlign: "center",
        marginTop: "10%",
    },
}));

const GameProgression = () => {
    const { quizId, sessionId } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();

    // -2 is an impossible value for fetch to return
    // this is set to default value
    const [timeLimitCurrent, setTimeLimitCurrent] = useState(1000);
    const [position, setPosition] = useState(-2);
    const [gameLength, setGameLength] = useState(-1);
    const [key, setKey] = useState(0);
    const [remainTime, setRemainTime] = useState(1000);
    const [advanceDisabled, setAdvanceDisabled] = useState(true);
    const [result, setResult] = useState([]);
    const [mark, setMark] = useState();
    // const [list,setList]=useState();
    // const [name,setName]=useState([]);

    useEffect(() => {
        fetch(`${API_URL}/admin/session/${sessionId}/status`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const { results } = data;
                console.log("in fetch", results);
                // could access gameStatus attribute to get posotion and length
                // create extra state varible just to make the code more
                // readable to myself

                setPosition(results.position);
                setGameLength(results.questions.length);
                // console.log("result postion", results.position);
                if (
                    results.position !== -1 &&
                    results.position !== results.questions.length
                ) {
                    const now = moment(new Date());
                    const questionStart = moment(results.isoTimeLastQuestionStarted);
                    const questionEnd = questionStart.add(
                        results.questions[results.position].timeLimit,
                        "seconds"
                    );

                    const diffInSeconds = moment
                        .duration(questionEnd.diff(now))
                        .asSeconds();

                    if (diffInSeconds > 0) {
                        setRemainTime(diffInSeconds);
                        setTimeLimitCurrent(results.questions[results.position].timeLimit);
                        setKey((prevKey) => prevKey + 1);
                    } else {
                        // if already pass the time limit
                        // enable the advance button
                        // and set the countdown to the stop stage
                        setRemainTime(0);
                        setTimeLimitCurrent(0);
                        setAdvanceDisabled(false);
                        setKey((prevKey) => prevKey + 1);
                    }
                }

                if (results.position === results.questions.length) {
                    fetch(`${API_URL}/admin/session/${sessionId}/results`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    })
                        .then((res) => res.json())
                        .then((data2) => {
                            console.log("in fetgc 2", data2);
                            setMark(results);
                            setResult(data2.results);
                        });
                }
            });
    }, [sessionId, position]);

    const handleAdvanceGame = () => {
        // api with error handling
        fetch(`${API_URL}/admin/quiz/${quizId}/advance`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return Promise.resolve(res.json());
                }
                return Promise.resolve(res.json()).then((data) => {
                    return Promise.reject(data.error);
                });
            })
            .then(
                () => {
                    dispatch(alertSuccess("Advance Sucess"));
                    console.log("length", gameLength);
                    setAdvanceDisabled(true);
                    setPosition((prevPosition) => prevPosition + 1);
                },
                (error) => {
                    dispatch(alertError(error));
                }
            );
    };
    // console.log(position,gameLength);

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <div className={classes.timer}>Too late...</div>;
        }

        return (
            <div className={classes.timer}>
                <div className={classes.text}>Remaining</div>
                <div className={classes.value}>{remainingTime}</div>
                <div className={classes.text}>seconds</div>
            </div>
        );
    };

    console.log(timeLimitCurrent);

    console.log(position, gameLength);

    let pageContent;
    if (position === -2) {
        return null;
    }
    if (position === -1) {
        pageContent = (
            <Button color="primary" variant="contained" onClick={handleAdvanceGame}>
                Start The Game
            </Button>
        );
        // use setTimeout to get the answer then refresh the page by changing state varible
    } else if (position === gameLength) {
        // didn't end now, end with a timeout
        // when game end show final result

        // console.log("awdawd", result);
        // console.log("sdasds", mark);
        const scoreList = [];
        for (let i = 0; i < result.length; i += 1) {
            let grade = 0;
            for (let j = 0; j < result[i].answers.length; j += 1) {
                if (result[i].answers[j].correct === true) {
                    grade += mark.questions[j].worthOfPoints;
                }
            }
            scoreList.push(grade);
        }
        console.log("scoliwst", scoreList);
        const playDataList = [];
        for (let n = 0; n < scoreList.length; n += 1) {
            playDataList.push(playerData(result[n].name, scoreList[n]));
        }
        playDataList.sort((a, b) => {
            return b.playerScore - a.playerScore;
        });

        const arr = [];
        for (let i = 0; i < playDataList.length; i += 1) {
            const body = (
                <TableRow key={uuid()}>
                    <TableCell>{playDataList[i].playerName}</TableCell>
                    <TableCell>{playDataList[i].playerScore}</TableCell>
                </TableRow>
            );

            arr.push(body);
        }

        pageContent = (<TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>player name</TableCell>
                        <TableCell>player score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {arr}
                </TableBody>
            </Table>
        </TableContainer>);
    } else {
        // should be a countdown timer here
        // console.log("advanceDisabled", advanceDisabled);
        pageContent = (
            <>
                <div style={{ display: "flex" }}>
                    <div style={{ margin: "auto" }}>
                        <CountdownCircleTimer
                            onComplete={() => {
                                // should to some api call
                                console.log("end");
                                setAdvanceDisabled(false);
                            }}
                            isPlaying
                            key={key}
                            duration={timeLimitCurrent}
                            initialRemainingTime={remainTime}
                            colors={[
                                ["#004777", 0.33],
                                ["#F7B801", 0.33],
                                ["#A30000", 0.33],
                            ]}
                        >
                            {renderTime}
                        </CountdownCircleTimer>
                    </div>
                </div>
                <Button
                    style={{ marginTop: "5%" }}
                    color="primary"
                    onClick={handleAdvanceGame}
                    variant="contained"
                    disabled={advanceDisabled}
                >
                    Advance
                </Button>
            </>
        );
    }

    return (
        <>
            <div className={classes.id}>sessionId:{sessionId}</div>
            <div style={{ fontSize: "50px", textAlign: "center" }}>{pageContent}</div>
        </>
    );
};

export default GameProgression;
