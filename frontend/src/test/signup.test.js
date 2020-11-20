import { mount } from "enzyme";
import { Provider } from "react-redux";
import Button from "@material-ui/core/Button";
import React from "react";
import TextField from "@material-ui/core/TextField";
import store from "../redux/stores";
import Signup from "../pages/signup/Signup";
// import Login from "../pages/login/Login";

// test signup button
describe('Signup Page', () => {
    it('Signup page should have a button to signup', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Signup />
            </Provider>);
        const signup = wrapper.children();
        const signupButton = signup.find(Button);
        expect(signupButton.text()).toBe("Signup");
        expect(signupButton).toMatchSnapshot();
    })

    it('Signup page has a textfield to input user email', () => {
        const component = mount(
            <Provider store={store}>
                <Signup />
            </Provider>);
        expect(component.find(TextField).first().text()).toBe("Email *");
    });

    it('Signup page has a textfield to input user email', () => {
        const component = mount(
            <Provider store={store}>
                <Signup />
            </Provider>);
        expect(component.find(TextField).first().text()).toBe("Email *");
    });

    it('Signup page has a textfield to input user password', () => {
        const component = mount(
            <Provider store={store}>
                <Signup />
            </Provider>);
        expect(component.find(TextField).at(1).text()).toBe("Password *");
    });

    it('Signup page has a textfield to verify user password', () => {
        const component = mount(
            <Provider store={store}>
                <Signup />
            </Provider>);
        expect(component.find(TextField).at(2).text()).toBe("Type password again *");
    });


    it('Signup page has a textfield to input user name', () => {
        const component = mount(
            <Provider store={store}>
                <Signup />
            </Provider>);
        expect(component.find(TextField).last().text()).toBe("Name *");
    });
})
