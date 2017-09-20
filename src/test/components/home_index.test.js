import React from 'react';
import ReactDOM from 'react-dom';
import HomeIndex from '../../app/components/home_index';
import configureStore from 'redux-mock-store';
import storeUserMock from '../_mock/store_user_mock';
import { MemoryRouter as Router, withRouter } from 'react-router-dom'

import { shallow, mount } from 'enzyme';

let middlewares;
let mockStore;
let initialState;
let store;

describe('Home Index', () => {
  let wrapper;

  beforeEach(() => {
    middlewares = [];
    mockStore = configureStore(middlewares);
  })

  it('Home Index mounts correctly', () => {
    initialState = [];
    store = mockStore(initialState);
    wrapper = mount(<Router><HomeIndex store={store} /></Router>);
    expect(wrapper).toBeDefined;
  });

  // it('renders home button correctly', () => {
  //   initialState = {
  //     currentUser: {}
  //   };
  //   store = mockStore(initialState);
  //   wrapper = mount(<App store={store} />);

  //   expect(wrapper.find('.btn-primary .btn-mega .bot-padding').length).toEqual(1);
  //   expect(wrapper.find('.btn-primary .btn-mega .bot-padding').first().text()).toEqual('Home');
  // });

  // it('renders login/register buttons when no user detected', () => {
  //   initialState = {
  //     currentUser: {}
  //   };
  //   store = mockStore(initialState);
  //   wrapper = mount(<App store={store} />);

  //   expect(wrapper.find('.btn-primary .btn-mega .bot-padding').length).toEqual(1);
  //   expect(wrapper.find('.btn-primary .bot-padding').first().text()).toEqual('Home');
  //   expect(wrapper.find('.btn-primary .bot-padding').last().text()).toEqual('Login');
  //   expect(wrapper.find('.btn-primary').last().text()).toEqual('Register');
  // });

  it('Renders correct elements with logged in user', () => {
    initialState = {
      currentUser: storeUserMock
    };
    store = mockStore(initialState.currentUser);
    
    wrapper = mount(<Router>
      <HomeIndex currentUser={storeUserMock.currentUser} store={store} />
    </Router>);

    expect(wrapper.find('.home-user-wrapper').length).toEqual(1);
    expect(wrapper.find('.home-index-wrapper').length).toEqual(0);
    
    // expect(wrapper.find('.btn-primary .bot-padding').first().text()).toEqual('Home');
    // expect(wrapper.find('.btn-primary .bot-padding').last().text()).toEqual('Profile');
    // expect(wrapper.find('.btn-primary').last().text()).toEqual('Logout');
  });

  it('Renders correct elements with NO user', () => {
    initialState = {
      currentUser: {}
    };
    store = mockStore(initialState.currentUser);
    
    wrapper = mount(<Router>
      <HomeIndex currentUser={storeUserMock.currentUser} store={store} />
    </Router>);

    expect(wrapper.find('.home-user-wrapper').length).toEqual(0);
    expect(wrapper.find('.home-index-wrapper').length).toEqual(1);
    // expect(wrapper.find('.btn-primary .bot-padding').first().text()).toEqual('Home');
    // expect(wrapper.find('.btn-primary .bot-padding').last().text()).toEqual('Profile');
    // expect(wrapper.find('.btn-primary').last().text()).toEqual('Logout');
  });

});
