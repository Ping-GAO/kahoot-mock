import React from "react";
import { useParams } from "react-router-dom";

const GameStatus = () => {
    const { sessionId } = useParams();
    return <div>{sessionId}</div>;
};

export default GameStatus;
