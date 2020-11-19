import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import API_URL from "../../constants";
import { alertError, alertSuccess } from "../../redux/actions";

const GameProgression = () => {
    const { quizId, sessionId } = useParams();
    const dispatch = useDispatch();
    // -2 is an impossible value for fetch to return
    // this is set to default value 
    const [position,setPosition] = useState(-2);
    useEffect(() => {
        fetch(`${API_URL}/admin/session/${sessionId}/status`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
            
               
                const {results} = data;
                console.log(results)
                setPosition(results.position);
            
            });
    }, [sessionId]);

    const handleAdvanceGame = () => {
    // api with error handling
        fetch(`${API_URL}/admin/quiz/${quizId}/advance`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return Promise.resolve(res.json());
                }
                return Promise.resolve(res.json()).then((data) => {
                    return Promise.reject(data.error);
                });
            })
            .then(
                () => {
                    dispatch(alertSuccess("Advance Sucess"));
                },
                (error) => {
                    dispatch(alertError(error));
                }
            );
    };
    console.log(position);
    
    
    let  pageContent;
    if(position===-2){
        return null; 
    }
    if(position===-1){
        pageContent =  (   <Button color="primary" onClick={handleAdvanceGame}>
        Start The Game
        </Button>);
    
    }
    else{
        pageContent =  (   <Button color="primary" onClick={handleAdvanceGame}>
        Advance 
        </Button>)
        
    
    }
    
    
    
    
    
    
    return (
        <>
            <div>sessionId:{sessionId}</div>
            {pageContent}
        </>
    );
};

export default GameProgression;
