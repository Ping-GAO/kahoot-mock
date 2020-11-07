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
import API_URL, { stubImage } from "../../constants";

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
}));

const RecipeReviewCard = (props) => {
    const { id, name, createdAt } = props;
    let { thumbnail } = props;
    const classes = useStyles();
    const [quiz, setQuiz] = useState({ questions: [] });
    // the original data formal is not standard format ususlly seen convert it to standard
    const dataFormated = new Date(createdAt);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();
    // provide a stub thumbnail
    if (thumbnail === null) {
        thumbnail = `data:image/png;base64,${stubImage}`;
    }

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
            // console.log(data)
        }
        loadQuiz();
    }, [id]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleClose();
        history.push(`/dashboard/${id}`);
    };

    const renderMenu = (<Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
    >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>

    </Menu>);


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
                    image={thumbnail}
                    title="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        This question&apos;s id is {id}, it has {quiz.questions.length} questions.
                    </Typography>
                </CardContent>


            </Card>
            {renderMenu}
        </div>
    );
}


RecipeReviewCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
}
// some default arguments
RecipeReviewCard.defaultProps = {
    name: "Don't have a name yet",
    thumbnail: "null"
}
export default RecipeReviewCard;
