import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import API_URL from "../../constants";
import { alertError, alertSuccess } from "../../redux/actions";





const useStyles = makeStyles(() => ({
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





const GameProgression = () => {
    const { quizId, sessionId } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();

    // -2 is an impossible value for fetch to return
    // this is set to default value
    const [timeLimitCurrent,setTimeLimitCurrent] = useState(1000);
    const [position, setPosition] = useState(-2);
    const [gameLength, setGameLength] = useState(-1);
    const [key, setKey] = useState(0);
    const [remainTime, setRemainTime] = useState(1000);
    const [advanceDisabled, setAdvanceDisabled] = useState(true);

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
                console.log(results);
                // could access gameStatus attribute to get posotion and length
                // create extra state varible just to make the code more
                // readable to myself
                
                
                setPosition(results.position);
                setGameLength(results.questions.length);
                if(results.position !== -1 && (results.position!== results.questions.length)){
                    setTimeLimitCurrent(results.questions[results.position].timeLimit);

                    const now = moment(new Date());
                    const questionStart = moment(results.isoTimeLastQuestionStarted);
                    const questionEnd = questionStart.add(results.questions[results.position].timeLimit, "seconds");
					
                    const diffInSeconds = moment
                        .duration(questionEnd.diff(now))
                        .asSeconds();
					
					
                    if (diffInSeconds > 0) {
                        setRemainTime(diffInSeconds);
                        setKey((prevKey) => prevKey + 1);
                    }
                }
                
                
                
            });
    }, [sessionId,position]);

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










    console.log(timeLimitCurrent)



    let pageContent;
    if (position === -2) {
        return null;
    }
    if (position === -1) {
        pageContent = (
            <Button color="primary" onClick={handleAdvanceGame}>
        Start The Game
            </Button>
        );
        // use setTimeout to get the answer then refresh the page by changing state varible
    } else if (position === gameLength ) {
        // didn't end now, end with a timeout
        // when game end show final result
        
        pageContent = <div>Game End</div>;
       
       
    } else {
        // should be a countdown timer here
        console.log("advanceDisabled",advanceDisabled);
        pageContent = (
            <>
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
                <Button color="primary" onClick={handleAdvanceGame}  
                    disabled={advanceDisabled}
                >
        Advance
                </Button>
            </>
        );
    }

    return (
        <>
            <div>sessionId:{sessionId}</div>
            {pageContent}
        </>
    );
};

export default GameProgression;
