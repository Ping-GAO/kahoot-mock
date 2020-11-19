import {mount} from 'enzyme';
import React from "react";
import {Provider} from "react-redux";
import Button from "@material-ui/core/Button";
import Login from "../pages/login/Login";
import store from "../redux/stores";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import TextField from "@material-ui/core/TextField";
import EmailIcon from "@material-ui/icons/Email";

// test login button
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

    it('test onchange', () => {
        const wrapper = mount(
            <TextField
                label="Email"
                type="email"
                margin="normal"
                required
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon/>
                        </InputAdornment>
                    ),
                }}
                onChange={(event) => setEmail(event.target.value)}
            />)
        const spy = jest.spyOn(TextField.prototype, 'onChange')
        wrapper.find(TextField).find('input').simulate('change', {currentTarget: {value: "custom value"}}, spy);
        expect(spy).toHaveBeenCalledWith('custom value');
    });

})
