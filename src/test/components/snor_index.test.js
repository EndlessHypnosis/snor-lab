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

    expect(wrapper.find('.snor-wrapper-main').length).toEqual(1);
    expect(wrapper.find('.avatar-wrapper').length).toEqual(0);
  });

  it('Snor Index Should NOT render switch button', () => {
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

    expect(wrapper.find('.btn-primary btn-mega').length).toEqual(0);
  });


});
