// test signup button
import {mount} from "enzyme";
import {Provider} from "react-redux";
import store from "../redux/stores";
import Signup from "../pages/signup/Signup";
import Button from "@material-ui/core/Button";
import React from "react";

describe('Signup Page', () => {
    it('Signup page should have a button to signup', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Signup/>
            </Provider>);
        const signup = wrapper.children();
        const signupButton = signup.find(Button);
        expect(signupButton.text()).toBe("Signup");
    })
})