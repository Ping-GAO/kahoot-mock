import React from 'react';
import { useParams  } from "react-router-dom";

const GamePlay = () => {
    const { playerId } = useParams();
    return (
        <div>
			awd{playerId}
        </div>
    );
};

export default GamePlay;