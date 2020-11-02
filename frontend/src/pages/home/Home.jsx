import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import API_URL from "../../constants";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const Home = () => {
    const loginStatus = useSelector((state) => state.authentication);
   
    // a gird with 3 card contains the detail of a quiz's information
    // if the user is logged in fetch all game and show them
    const [grid, setGrid] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        if (loginStatus.loggedIn) {
            fetch(`${API_URL}/admin/quiz`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            })
                .then(res=>res.json())
                .then((data) => {
                    let i = 0;
                    let row = [];
                    data.quizzes.forEach((quizze) => {
                        console.log(quizze);
                        row.push(
                            <Grid item xs={4} key={i}>
                                <Paper className={classes.paper}>
                                    {quizze.id}
                                </Paper>
                            </Grid>);
                        i += 1;
                        if (row.length === 3) {
                            setGrid([...grid,
                                <Grid 
                                    container 
                                    item xs={12} 
                                    spacing={3}
                                    key={i} 
                                >
                                    {row}
                                </Grid>
                            ]);
                            i += 1;
                            row = [];

                        }

                    });
                });
        }
    }, []);





    return (
        <div className="container-home">
            {loginStatus.loggedIn ? 
                <Grid container spacing={1}>{grid}</Grid> 
                : "Not Log in"}
        </div>
    );
};

export default Home;
