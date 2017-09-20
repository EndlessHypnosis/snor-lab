import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../app/components/app';
import configureStore from 'redux-mock-store';
import storeUserMock from '../_mock/store_user_mock';

import { shallow, mount } from 'enzyme';

let middlewares;
let mockStore;
let initialState;
let store;

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    middlewares = [];
    mockStore = configureStore(middlewares);
  })

  it('App mounts correctly', () => {
    initialState = [];
    store = mockStore(initialState);
    wrapper = mount(<App store={store} />);
    expect(wrapper).toBeDefined;
  });

  it('renders home button correctly', () => {
    initialState = {
      currentUser: {}
    };
    store = mockStore(initialState);
    wrapper = mount(<App store={store} />);

    expect(wrapper.find('.btn-primary .btn-mega .bot-padding').length).toEqual(1);
    expect(wrapper.find('.btn-primary .btn-mega .bot-padding').first().text()).toEqual('Home');
  });

  it('renders login/register buttons when no user detected', () => {
    initialState = {
      currentUser: {}
    };
    store = mockStore(initialState);
    wrapper = mount(<App store={store} />);

    expect(wrapper.find('.btn-primary .btn-mega .bot-padding').length).toEqual(1);
    expect(wrapper.find('.btn-primary .bot-padding').first().text()).toEqual('Home');
    expect(wrapper.find('.btn-primary .bot-padding').last().text()).toEqual('Login');
    expect(wrapper.find('.btn-primary').last().text()).toEqual('Register');
  });

  it('renders logged in buttons when user is detected', () => {
    initialState = {
      currentUser: storeUserMock
    };
    store = mockStore(initialState.currentUser);
    wrapper = mount(<App currentUser={storeUserMock.currentUser}  store={store} />);

    expect(wrapper.find('.btn-primary .btn-mega .bot-padding').length).toEqual(1);
    expect(wrapper.find('.btn-primary .bot-padding').first().text()).toEqual('Home');
    expect(wrapper.find('.btn-primary .bot-padding').last().text()).toEqual('Profile');
    expect(wrapper.find('.btn-primary').last().text()).toEqual('Logout');
  });

});
