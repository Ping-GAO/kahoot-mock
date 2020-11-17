import shallow from "enzyme/src/shallow";
import React from "react";
import Login from "../pages/login/Login";


describe('Button', () => {
    const noop = () => {
    };
    it('triggers onClick event handler when clicked', () => {
        const onClick = jest.fn();
        shallow(<Login onClick={onClick}/>).simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
    })
})