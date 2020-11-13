import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import API_URL from "../../constants";
import FormDialogUpdateQuiz from "../dialog/FormDialogUpdateQuiz";
import DialogStartGame from "../dialog/DialogStartGame";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    butContainer: {
        display: "flex",
        justifyContent: "flex-end",
    },
    but: {
        margin: "10px 15px 0px"
    }
}));

const QuizzeCard = ({ id, name, createdAt, thumbnail, setEdit }) => {

    const classes = useStyles();
    const history = useHistory();
    const [quiz, setQuiz] = useState({ questions: [], active: null });
    // the original data formal is not standard format ususlly seen convert it to standard
    const dataFormated = new Date(createdAt);
    const [anchorEl, setAnchorEl] = useState(null);
    const [gameDialog, setGameDialog] = useState(false);
    const [editLocal, setEditLocal] = useState(false);


    useEffect(() => {
        const loadQuiz = async () => {
            const res = await fetch(`${API_URL}/admin/quiz/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    }
                }
            );
            const data = await res.json();
            setQuiz(data);
        }
        loadQuiz();
    }, [id, gameDialog]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEditClose = () => {
        // toogle the edit global state vairlbe because the user may edit multiple times
        setEdit(prevState => !prevState);
        setEditLocal(false);
    }
    const handleEditOpen = () => {
        setEditLocal(true);
    }

    const handeEditQuizze = () => {
        handleClose();
        handleEditOpen();
    };

    const handleEditQuestion = () => {
        handleClose();
        history.push(`/dashboard/${id}`);
    };

    const handleDelete = () => {
        handleClose();
    };

    const handleStartGame = () => {

        setGameDialog(true);
        handleClose();

    };

    const renderMenu = (<Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
    >
        <MenuItem onClick={handleStartGame}>Start Game</MenuItem>
        <MenuItem onClick={handeEditQuizze}>Edit Quizze</MenuItem>
        <MenuItem onClick={handleEditQuestion}>Edit Question</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>

    </Menu>);
    console.log("acitve", quiz.active);
    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={

                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>

                    }
                    title={name}
                    subheader={dataFormated.toDateString()}
                />

                <CardMedia
                    className={classes.media}
                    image={thumbnail ?? `${process.env.PUBLIC_URL}/trump.jpg`}
                    title="Paella dish"
                />

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        This question&apos;s id is {id}, it has {quiz.questions.length} questions.
                    </Typography>
                    <div className={classes.butContainer}>
                        {

                            quiz.active === null ?
                                (<Button variant="contained"
                                    className={classes.but}>
                                    Start Game
                                </Button>)
                                : (<Button variant="contained"
                                    className={classes.but}>
                                    End Current Game
                                </Button>)

                        }
                    </div>
                </CardContent>


            </Card>
            {renderMenu}
            <FormDialogUpdateQuiz
                open={editLocal}
                handleClose={handleEditClose}
                id={id}
            />
            <DialogStartGame open={gameDialog}
                handleClose={() => { setGameDialog(false) }}
                quizid={id}
            />
        </div>
    );
}


QuizzeCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    setEdit: PropTypes.func.isRequired
}

QuizzeCard.defaultProps = {
    thumbnail: null
};
export default QuizzeCard;
