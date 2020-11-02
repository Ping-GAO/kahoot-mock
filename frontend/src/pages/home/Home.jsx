import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import API_URL from "../../constants";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    girdContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 40,
    },
    grid: {
        margin: 0
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

    // run the function body when the user login status change or componentDidMount 
    useEffect(() => {
        if (loginStatus.loggedIn) {
            fetch(`${API_URL}/admin/quiz`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            })
                .then(res => res.json())
                .then((data) => {
                    // console.log(data.quizzes.length);
                    let i = 0;
                    let row = [];
                    let girdLocal = [];
                    data.quizzes.forEach((quizze) => {
                        row.push(
                            <Grid item xs={4} key={i}>
                                <Paper className={classes.paper}>
                                    {quizze.id}
                                </Paper>
                            </Grid>);
                        i += 1;
                        if (row.length === 3) {
                            girdLocal = [...girdLocal,
                                <Grid
                                    container
                                    item xs={12}
                                    spacing={2}
                                    key={i}
                                >
                                    {row}
                                </Grid>
                            ];
                            i += 1;
                            row = [];
                        }

                    });
                    if (row.length !== 0) {
                        // the number of quizzes is not a multiple of 3
                        // the rest of them will be handle here
                        girdLocal = [...girdLocal,
                            <Grid
                                container
                                item xs={12}
                                spacing={4}
                                key={i}
                                className={classes.grid}
                            >
                                {row}
                            </Grid>
                        ];
                        setGrid(girdLocal);
                    }
                    else {
                        setGrid(girdLocal);
                    }
                });
        }
    }, [loginStatus.loggedIn]);





    return (
        <div className={classes.root}>
            {loginStatus.loggedIn ?
                <Grid container spacing={4} className={classes.girdContainer}>
                    {grid}
                </Grid>
                : "Not Log in"}
        </div>
    );
};

export default Home;
