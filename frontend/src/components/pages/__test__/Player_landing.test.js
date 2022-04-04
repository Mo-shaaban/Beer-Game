import React from 'react';
import { shallow } from 'enzyme';
import PlayerLanding from '../player_landing';
    describe('Player GameLogin component tests', ()=> {
        const wrapper = shallow(<PlayerLanding />);

        it('should have a btn component', ()=> {

            //There should be only one button
            expect(wrapper.find('button#Button')).toHaveLength(1);

            //Button should be of type button
            expect(wrapper.find('button#Button').type()).toEqual('button');

            //Button should have matching text
            expect(wrapper.find('button#Button').text()).toEqual('Enter Game');
        });

        it('should have input for email and password', ()=> {
            //Game ID and password input field should be present
            expect(wrapper.find('input#game_ID')).toHaveLength(1);
            expect(wrapper.find('input#game_password')).toHaveLength(1);
        });

        it('should have an empty email and password state var', ()=> {
            //Optionally test to check if password and Game ID are empty strings on setup
            expect(wrapper.find('input#game_ID').props().value).toEqual('');
            expect(wrapper.find('input#game_password').props().value).toEqual('');
        });
    });