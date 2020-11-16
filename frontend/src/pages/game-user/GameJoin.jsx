import React,{useState} from "react";
import { useParams , useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    form: {
        display: "flex",
        flexDirection: "column",
        width: 250,
    },
}));

// this page should allow the user to enter their name and redirect them to play page
const GameJoin = () => {
    const { sessionId } = useParams();
    const classes = useStyles();
    const history = useHistory();
    const [name,setName] = useState('');
    const handleSubmit = (e)=>{
        e.preventDefault();
        history.push(`/game/play/${sessionId}/${name}`);
    };
    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField label="Enter your player name" 
                    required
                    onChange={(event) => setName(event.target.value)}
                />
                <div style={{ height: 20 }} />
                <Button color="primary" variant="contained" type="submit">
          Submit
                </Button>
            </form>
        </div>
    );
};

export default GameJoin;
