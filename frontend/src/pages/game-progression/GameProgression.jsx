import React from "react";
import { useParams } from "react-router-dom";

const GameProgression = () => {
    const { sessionId } = useParams();
    
    return <div>{sessionId}</div>;
};

export default GameProgression;
