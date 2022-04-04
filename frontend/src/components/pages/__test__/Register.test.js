import React from 'react';
import { shallow } from 'enzyme';
import {Register} from '../SignUp';
    describe('Register component tests', ()=> {
        const wrapper = shallow(<Register />);

        it('should have a btn component', ()=> {

            //There should be only one button
            expect(wrapper.find('button#Button')).toHaveLength(1);

            //Button should be of type button
            expect(wrapper.find('button#Button').type()).toEqual('button');

            //Button should have matching text
            expect(wrapper.find('button#Button').text()).toEqual('Register');
        });

        it('should have input for name, email, password and confirm password', ()=> {
            //Email and password input field should be present
            expect(wrapper.find('input#name')).toHaveLength(1);
            expect(wrapper.find('input#email')).toHaveLength(1);
            expect(wrapper.find('input#password')).toHaveLength(1);
            expect(wrapper.find('input#confirm_password')).toHaveLength(1);
        });

        it('should have an empty name, email, password and confirm password state var', ()=> {
            //Optionally test to check if password and email are empty strings on 
            expect(wrapper.find('input#name').props().value).toEqual('');
            expect(wrapper.find('input#email').props().value).toEqual('');
            expect(wrapper.find('input#password').props().value).toEqual('');
            expect(wrapper.find('input#confirm_password').props().value).toEqual('');
        });
    });