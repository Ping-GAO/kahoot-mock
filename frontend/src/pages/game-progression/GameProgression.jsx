import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import API_URL from "../../constants";
import { alertError, alertSuccess } from "../../redux/actions";

const GameProgression = () => {
    const { quizId, sessionId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${API_URL}/admin/session/${sessionId}/status`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
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
                },
                (error) => {
                    dispatch(alertError(error));
                }
            );
    };

    return (
        <>
            <div>sessionId:{sessionId}</div>
            <Button color="primary" onClick={handleAdvanceGame}>
        Advance
            </Button>
        </>
    );
};

export default GameProgression;
