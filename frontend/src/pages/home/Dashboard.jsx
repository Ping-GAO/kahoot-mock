import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import API_URL from "../../constants";
import Card from "../../components/utilities/Card";
import FormDialogAddQuiz from "../../components/utilities/FormDialogAddQuiz";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    girdContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "80px 0px 0px",
        padding: "0px 150px",
    },
}));
const Dashboard = () => {
    const loginStatus = useSelector((state) => state.authentication);

    // a gird with 3 cards each row contains the detail of a quiz's information
    const [grid, setGrid] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // run the function body when the user login status change or componentDidMount
    useEffect(() => {
    // if the user is logged in fetch all game and show them
        if (loginStatus.loggedIn) {
            fetch(`${API_URL}/admin/quiz`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data.quizzes.length);
                    // console.log(data.quizzes);
                    let i = 0;
                    let row = [];
                    let girdLocal = [];

                    girdLocal.push(
                        <Grid container item xs={12} spacing={5} key={i}>
                            <Grid
                                item
                                container
                                xs={12}
                                key={i}
                                alignItems="center"
                                justify="flex-end"
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<AddCircleIcon />}
                                    onClick={handleClickOpen}
                                >
                  Add a new quizze
                                </Button>
                            </Grid>
                        </Grid>
                    );
                    data.quizzes.forEach((quizze) => {
                        row.push(
                            <Grid item xs={4} key={i}>
                                <Card
                                    id={quizze.id}
                                    name={quizze.name}
                                    createdAt={quizze.createdAt}
                                    thumbnail={quizze.thumbnail}
                                />
                            </Grid>
                        );
                        i += 1;
                        if (row.length === 3) {
                            girdLocal = [
                                ...girdLocal,
                                <Grid container item xs={12} spacing={5} key={i}>
                                    {row}
                                </Grid>,
                            ];
                            i += 1;
                            row = [];
                        }
                    });
                    if (row.length !== 0) {
                        // the number of quizzes is not a multiple of 3
                        // the rest of them will be handle here
                        girdLocal = [
                            ...girdLocal,
                            <Grid container item xs={12} spacing={4} key={i}>
                                {row}
                            </Grid>,
                        ];
                        setGrid(girdLocal);
                    } else {
                        setGrid(girdLocal);
                    }
                });
        }
    }, [loginStatus.loggedIn]);

    // conditional render based on user's login status
    return (
        <div className={classes.root}>
            {loginStatus.loggedIn ? (
                <Grid container spacing={4} className={classes.girdContainer}>
                    {grid}
                </Grid>
            ) : (
                "Not Log in"
            )}
            <FormDialogAddQuiz open={open} handleClose={handleClose} />
        </div>
    );
};

export default Dashboard;
