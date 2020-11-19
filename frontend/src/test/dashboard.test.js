import {mount} from "enzyme";
import {Provider} from "react-redux";
import store from "../redux/stores";
import Dashboard from "../pages/home/Dashboard";
import Typography from "@material-ui/core/Typography";
import React from "react";

describe('Dashboard Page', () => {
    // test dashboard welcome text
    it('Dashboard page should have a welcome text', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Dashboard/>
            </Provider>);
        const dashboard = wrapper.children();
        const dashboard_text = dashboard.find(Typography);
        expect(dashboard_text.text()).toBe("Welcome to the BigBrain game, please log in to play!");
    })
})
