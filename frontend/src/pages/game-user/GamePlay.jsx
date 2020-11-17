import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../../constants";

let pollingTimeout = null;
const GamePlay = () => {
    const { playerId } = useParams();

    const [started, setStarted] = useState(false);
    const [questionCurrent, setQuestionCurrent] = useState(null);
    const [isoTimeCurrent, setIsoTimeCurrent] = useState();

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
    if (questionCurrent === null) {
        pageContent = <div>awd{playerId}</div>;
    } else {
        pageContent = <div>awdawdww{playerId}</div>;
    }
    return pageContent;
};

export default GamePlay;
