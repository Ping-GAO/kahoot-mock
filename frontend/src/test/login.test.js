import {mount} from 'enzyme';
import React from "react";
import {Provider} from "react-redux";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import store from "../redux/stores";

import Login from "../pages/login/Login";


// test login page
describe('Login Page', () => {
    it('login page should have a button to login', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Login/>
            </Provider>);
        const loginPage = wrapper.children();
        const loginButton = loginPage.find(Button);
        expect(loginButton.text()).toBe("Log in");
        expect(loginButton).toMatchSnapshot();
    })

    it('login page has a textfield to input user email', () => {
        const component = mount(
            <Provider store={store}>
                <Login/>
            </Provider>);
        expect(component.find(TextField).first().text()).toBe("Email *");
    });

    it('login page has a textfield to input user password ', () => {
        const component = mount(
            <Provider store={store}>
                <Login/>
            </Provider>);
        expect(component.find(TextField).last().text()).toBe("Password *");
    });
})
