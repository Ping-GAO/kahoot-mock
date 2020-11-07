import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        width:"100%"
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
   
    playIcon: {
        height: 38,
        width: 38,
    },
}));

const  MediaControlCard=(question)=> {
    const classes = useStyles();
    console.log(question);
    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
            Live From Space
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
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
}
export default MediaControlCard;