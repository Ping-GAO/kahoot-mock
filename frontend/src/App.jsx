import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import NavigationBar from "./components/navbar/NavigationBar";
import CustomizedSnackbars from "./components/utilities/Alert";
import Dashboard from "./pages/home/Dashboard";
import EditGame from "./pages/edit/EditGame";
import EditGameQuestion from "./pages/edit/EditGameQuestion";

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
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/signup">
                        <Signup />
                    </Route>
                    <Route exact path="/dashboard/:quizId">
                        <EditGame />
                    </Route>
                    <Route exact path="/dashboard/:quizId/:questionId">
                        <EditGameQuestion />
                    </Route>
                    <Route exact path="/game/join/:sessionId"> 
                        <div>fuck1</div>
                    </Route>
                    <Route exact path="/game/play/:sessionId/:name"> 
                        <div>fuck2</div>
                    </Route>
                    <Route exact path="/game/status/:sessionId"> 
                        <div>fuck3</div>
                    </Route>
                    <Route path="/">
                        <Dashboard />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
