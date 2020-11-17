import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
// import Typography from "@material-ui/core/Typography";
import FormDialogUpdateQuestion from "../../components/dialog/FormDialogUpdateQuestion";
import API_URL from "../../constants";


const EditGameQuestion = () => {
    const {quizId, questionId} = useParams();
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // TODO handle 403 error case
        fetch(`${API_URL}/admin/quiz/${quizId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                fetch(`${API_URL}/admin/quiz/${quizId}`, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body: JSON.stringify({
                        ...data,
                        questionId
                    }),
                })
                    .then((res) => console.log(res.status))
                    .then(() => {
                        console.log(data)
                    });
            });
    }, [quizId, questionId]);

    return (
        <div>
            <FormDialogUpdateQuestion handleClose={handleClose} open={open} id={quizId}/>
        </div>
    );
};

export default EditGameQuestion;
