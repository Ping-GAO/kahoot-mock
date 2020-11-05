import React from "react";
import {useSelector} from "react-redux";

const Home = () => {
    const loginStatus = useSelector((state) => state.authentication);
    const mystyle = {
        backgroundImage: `url(${'https://source.unsplash.com/random'})`,
        height: '100%',
        width:'100%',
        position: 'absolute',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: 'white',
        display:'flex'
    }
    const textstyle={
        margin:'auto',
        textAlign:'center',
        fontSize:'50px',
        fontWeight:'bold'
    }
    return (
        <div style={mystyle} className="container-home">
            <div style={textstyle} className='text'>
                {loginStatus.loggedIn ? "Already Logged in" : "Welcome to the BigBrain Game, please log in to play."}</div>
        </div>
    );
};

export default Home;
