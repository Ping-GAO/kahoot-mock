import React from 'react';
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

const useStyles = makeStyles((theme) => ({
    root: {

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
    const { quizzeId, quizzeName ,quizzeCreatedAt} = props;
    const classes = useStyles();

    // the original data formal is not standard format ususlly seen convert it to standard
    const dataFormated =  new Date(quizzeCreatedAt);

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={quizzeName}
                subheader={ dataFormated.toDateString() }
            />
            <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    This question&apos;s id is {quizzeId}
                </Typography>
            </CardContent>


        </Card>
    );
}


RecipeReviewCard.propTypes = {
    quizzeId: PropTypes.string.isRequired,
    quizzeName: PropTypes.string,
    quizzeCreatedAt: PropTypes.string.isRequired
}

// some default arguments
RecipeReviewCard.defaultProps ={
    quizzeName: "Don't have a name yet"
}
export default RecipeReviewCard;