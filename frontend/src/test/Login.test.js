import { mount } from 'enzyme';
import React from "react";
import { Provider } from "react-redux";
import Button from "@material-ui/core/Button";
import Login from "../pages/login/Login";
import store from "../redux/stores";

describe('Login Page', () => {



    it('login page should have a button to login', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Login  />
            </Provider>);
        const loginPage = wrapper.children();
        const loginButton = loginPage.find(Button);
        expect(loginButton.text()).toBe("Log in");
    })
})