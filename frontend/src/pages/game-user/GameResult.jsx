import React from 'react';
import {
    useParams
} from 'react-router-dom'

const GameResult = () => {
    const { playerId,right, wrong} = useParams()
    return (
        <div>
            {playerId} {right}{wrong}awdadw
        </div>
    );
};

export default GameResult;