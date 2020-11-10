import React from "react";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const EditGameQuestion = () => {
    const { quizId, questionId } = useParams();
    return (
        <div>
            <Typography variant="h5" gutterBottom>
                quizId: {quizId}
            </Typography>
            <Typography variant="h5" gutterBottom>
                questionId: {questionId}
            </Typography>
        </div>
    );
};

export default EditGameQuestion;
