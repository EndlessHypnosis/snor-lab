import React from 'react';
import ReactDOM from 'react-dom';
import SnorIndex from '../../app/components/snor/snor_index';
import configureStore from 'redux-mock-store';
import storeUserMock from '../_mock/store_user_mock';
import { MemoryRouter as Router, withRouter } from 'react-router-dom'

import { shallow, mount } from 'enzyme';

let middlewares;
let mockStore;
let initialState;
let store;

describe('Snor Index', () => {
  let wrapper;

  beforeEach(() => {
    middlewares = [];
    mockStore = configureStore(middlewares);
  })

  it('Snor Index mounts correctly', () => {
    initialState = {
      currentUser: storeUserMock
    };
    store = mockStore(storeUserMock);
    wrapper = mount(
      <Router>
        <SnorIndex currentUser={storeUserMock.currentUser} store={store} />
      </Router>
    );
    // console.log('DOGGY:', wrapper.props().children)
    expect(wrapper).toBeDefined;
  });

  it('Snor Index Displayed Tasks', () => {
    initialState = {
      currentUser: storeUserMock,
      taskOrReminder: 'task'
    };
    store = mockStore(initialState);
    wrapper = mount(
      <Router>
        <SnorIndex state={initialState} currentUser={storeUserMock.currentUser} store={store} />
      </Router>
    );

    // console.log('DOGGY:', wrapper.children().first())
    expect(wrapper.find('.snor-wrapper-main').length).toEqual(1);
    expect(wrapper.find('.avatar-wrapper').length).toEqual(0);
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

  // it('renders logged in buttons when user is detected', () => {
  //   initialState = {
  //     currentUser: storeUserMock
  //   };
  //   store = mockStore(storeUserMock);
  //   wrapper = mount(<App currentUser={storeUserMock.currentUser} store={store} />);

  //   expect(wrapper.find('.btn-primary .btn-mega .bot-padding').length).toEqual(1);
  //   expect(wrapper.find('.btn-primary .bot-padding').first().text()).toEqual('Home');
  //   expect(wrapper.find('.btn-primary .bot-padding').last().text()).toEqual('Profile');
  //   expect(wrapper.find('.btn-primary').last().text()).toEqual('Logout');
  // });

});
