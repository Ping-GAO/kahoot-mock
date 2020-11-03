import React from 'react';
import { useParams } from "react-router-dom";

const EditGame = () => {
    // extract the quizId from url path
    const { quizId } = useParams();
    return (<div>{quizId}</div>);
}

export default EditGame;