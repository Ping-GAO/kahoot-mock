import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../../constants";

const GameProgression = () => {
    const { sessionId } = useParams();
    useEffect(()=>{
        fetch(`${API_URL}/admin/session/${sessionId}/status`,{
            method:"GET",
            headers:{
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            }
        
        })
            .then(res=>res.json())
            .then(data=>console.log(data));
    },[sessionId]);
    
    return <div>{sessionId}</div>;
};


export default GameProgression;
