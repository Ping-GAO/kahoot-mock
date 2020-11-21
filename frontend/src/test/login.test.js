import {mount} from 'enzyme';
import React from "react";
import {Provider} from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import store from "../redux/stores";
import Login from "../pages/login/Login";


// test login page
describe('Login Page', () => {


    let loginPage;
    let wrapper;
    beforeEach(()=>{
        wrapper= mount(
            <Provider store={store}>
                <Login/>
            </Provider>);
        loginPage = wrapper.children();
    });
    afterEach(() => {
        wrapper.unmount();
	 });

    
    it('render a button to login', () => {
       
       
        const loginButton = loginPage.find(Button);
        expect(loginButton.text()).toBe("Log in");
        expect(loginButton).toMatchSnapshot();
    })

    it('render a textfield to input user email', () => {
      
        expect(loginPage.find(TextField).first().text()).toBe("Email *");
    });

    it('render a textfield to input user password ', () => {
      
        expect(loginPage.find(TextField).last().text()).toBe("Password *");
    });
    
    

    describe('my sweet test', () => {
        it('clicks it', () => {
		  
		   
		   console.log();
            //    const spy = jest.spyOn(instance, 'myClickFunc')
	   
            //    instance.forceUpdate();    
	   
            //    const p = app.find('.App-intro')
            //    p.simulate('click')
            //    expect(spy).toHaveBeenCalled()
        })
	   })
	

        
        
})