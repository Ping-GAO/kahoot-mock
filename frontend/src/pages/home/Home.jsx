import React from "react";

import { useSelector } from "react-redux";

const Home = () => {
  const loginStatus = useSelector(state => state.authentication);
  console.log(loginStatus);
  return <div className="container-home">Fuck</div>;
};

export default Home;
