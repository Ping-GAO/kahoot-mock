import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import NavigationBar from "./components/navbar/NavigationBar";
import CustomizedSnackbars from "./components/alert/Alert";

const App = () => {
    const alert = useSelector((state) => state.alert);

    return (
        <div>
            {alert.message && (
                <CustomizedSnackbars type={alert.type} message={alert.message} />
            )}
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
        </div>
    );
};

export default App;
