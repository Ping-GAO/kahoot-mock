import React from "react";

import { useSelector } from "react-redux";

const Home = () => {
    const loginStatus = useSelector((state) => state.authentication);
    return (
        <div className="container-home">
            {loginStatus.loggedIn ? "Already Logged in" : "Not Log in"}
        </div>
    );
};

export default Home;
