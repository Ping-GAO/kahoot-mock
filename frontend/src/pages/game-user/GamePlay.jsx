import React ,{useEffect, useState}from 'react';
import { useParams  } from "react-router-dom";
import API_URL from '../../constants';

let pollingTimeout = null;
const GamePlay = () => {
    const { playerId } = useParams();
    
    const [started,setStarted] = useState(false);
    
    // using polling to get the ongoing game status
    useEffect(()=>{
    
        const getGameStutus = ()=>{
            fetch(`${API_URL}/play/${playerId}/status`,{
                method:"GET",
            })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    if(data.started === true){
                        setStarted(true);
                    }   
                })
        }

        if(started === false){
            getGameStutus();
            pollingTimeout = setInterval(()=>getGameStutus(),1000);
        }
        else{
            clearInterval(pollingTimeout);
            console.log("game already started");
        }   
        return()=>{
            clearInterval(pollingTimeout);
        }
    
    },[playerId, started]);
    return (
        <div>
			awd{playerId}
        </div>
    );
};

export default GamePlay;