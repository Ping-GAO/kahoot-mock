import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        width: "100%",
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        flex: "1 0 auto",
    },
    cover: {
        width: 151,
    },

    playIcon: {
        height: 38,
        width: 38,
    },
}));

const QuestionCard = (question) => {
    const classes = useStyles();
    
    const questionContent = question.question;
   
    console.log(questionContent);
    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {questionContent.questionBody}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
            Worth {questionContent.worthOfPoints} points
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                Timit Limit {questionContent.timeLimit} secs
                    </Typography>
                </CardContent>
            </div>
            <CardMedia
                className={classes.cover}
                image="/static/images/cards/live-from-space.jpg"
                title="Live from space album cover"
            />
        </Card>
    );
};

QuestionCard.protoTypes = {
    question: PropTypes.shape.isRequired,
};
export default QuestionCard;
