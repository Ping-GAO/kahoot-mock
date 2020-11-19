import {mount} from "enzyme";
import {Provider} from "react-redux";
import Button from "@material-ui/core/Button";
import React from "react";
import store from "../redux/stores";
import Signup from "../pages/signup/Signup";

// test signup button
describe('Signup Page', () => {
    it('Signup page should have a button to signup', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Signup/>
            </Provider>);
        const signup = wrapper.children();
        const signupButton = signup.find(Button);
        expect(signupButton.text()).toBe("Signup");
        expect(signupButton).toMatchSnapshot();
    })
})
