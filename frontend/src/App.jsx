import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import NavigationBar from "./components/navbar/NavigationBar";
import CustomizedSnackbars from "./components/alert/Alert";
import Dashboard from "./pages/home/Dashboard";

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
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
