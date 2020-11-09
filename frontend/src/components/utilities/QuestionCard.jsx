import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
    },
    details: {
        display: "flex",
        justifyContent: "space-between",
    },
    content: {
    // flex: "1 0 auto",
    },
    cover: {
        width: 200,
    },
    cardHeader: {
        flexGrow: 1,
        padding: 0,
    },
}));

function QuestionCard({ question, quizId }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleClose();
        history.push(`/dashboard/${quizId}/${question.questionId}`);
    };
	
    const handleDelete = ()=>{
        console.log("delete mock");
    };
    const renderMenu = (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
    );
    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    className={classes.cardHeader}
                    action={
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            {question.questionBody}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
              Worth {question.worthOfPoints} points
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
              Timit Limit {question.timeLimit} secs
                        </Typography>
                    </CardContent>

                    <CardMedia
                        className={classes.cover}
                        image={question.image}
                        title="Live from space album cover"
                    />
                </div>
            </Card>
            {renderMenu}
        </>
    );
}

QuestionCard.propTypes = {
    question: PropTypes.shape({
        questionId: PropTypes.string.isRequired,
        questionBody: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf.isRequired,
        type: PropTypes.string.isRequired,
        timeLimit: PropTypes.number.isRequired,
        worthOfPoints: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    quizId: PropTypes.string.isRequired,
};
export default QuestionCard;
