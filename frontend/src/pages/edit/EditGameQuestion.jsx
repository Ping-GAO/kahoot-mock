import React, {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import API_URL from "../../constants";


const EditGameQuestion = () => {
    const {quizId, questionId} = useParams();
    const [questionData,setQUestionData] = useState();
    useEffect(() => {
       
        fetch(`${API_URL}/admin/quiz/${quizId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.questions.filter())
              
                setQUestionData(data.questions.filter(q=>q.questionId === questionId));
            });
    }, [questionId, quizId]);
    
    
    console.log(questionData);
    
    
    return (
        <div>
            fuck
        </div>
    );
};

export default EditGameQuestion;
