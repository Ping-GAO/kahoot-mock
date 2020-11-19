import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import API_URL from "../../constants";
import { alertError, alertSuccess } from "../../redux/actions";

const GameProgression = () => {
    const { quizId, sessionId } = useParams();
    const dispatch = useDispatch();
    // -2 is an impossible value for fetch to return
    // this is set to default value
    const [position, setPosition] = useState(-2);
    const [gameLength, setGameLength] = useState(-1);
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
                setPosition(results.position);
                setGameLength(results.questions.length);
            });
    }, [sessionId]);

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
    } else if (position === gameLength - 1) {
    // didn't end now, end with a timeout
        pageContent = <div>Game End</div>;
    } else {
        pageContent = (
            <Button color="primary" onClick={handleAdvanceGame}>
        Advance
            </Button>
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
