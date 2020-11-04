import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import API_URL from "../../constants";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    girdContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "80px 0px 0px",
        padding: "0px 150px"
    }
   
}));
const EditGame = () => {
    const classes = useStyles();
    // extract the quizId from url path
    const { quizId } = useParams();

    const [quizze, setQuizze] = useState();
    useEffect(() => {
        fetch(`${API_URL}/admin/quiz/${quizId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setQuizze(data);
            });
    }, []);

    console.log(quizze);

    return (
        <div className={classes.root}>
            <Grid container spacing={4} className={classes.girdContainer}>
                <Grid container item xs={12} spacing={5} >
                    <Grid item container  xs={12} 
                        justify="flex-end"
                        alignItems="center" >
                        <Button variant="contained" color="primary">
                        Add A NEW QUESTION 
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default EditGame;
