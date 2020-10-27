import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './login/Login';
import Signup from './signup/Signup';
import Home from './home/Home';
import NavigationBar from "./navbar/NavigationBar";
const App = () => {
	return (
		<Router>
			<NavigationBar />
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/signup">
					<Signup />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	);
};


export default App;
