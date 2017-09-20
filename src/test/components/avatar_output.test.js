import React from 'react';
import ReactDOM from 'react-dom';
import AvatarOutput from '../../app/components/snor/avatar_output';
import configureStore from 'redux-mock-store';
import storeUserMock from '../_mock/store_user_mock';
import { MemoryRouter as Router, withRouter } from 'react-router-dom'

import { shallow, mount } from 'enzyme';

let middlewares;
let mockStore;
let initialState;
let store;

describe('Avatar Output', () => {
  let wrapper;

  beforeEach(() => {
    middlewares = [];
    mockStore = configureStore(middlewares);
  })

  it('Avatar Output mounts correctly', () => {
    initialState = {
      currentUser: {},
      userPath: { avatarName: 'Scooby Doo', avatarUrl: 'http://fakeimageurl.com' }
    };
    store = mockStore(initialState);
    wrapper = mount(<AvatarOutput store={store} />);
    expect(wrapper).toBeDefined;
  });

  it('New avatar button should exist when there are tokens available', () => {
    initialState = {
      currentUser: {},
      userPath: {
          avatarName: 'Scooby Doo',
          avatarUrl: 'http://fakeimageurl.com',
          avatarTokens: 2
        }
    };
    store = mockStore(initialState);
    wrapper = mount(<AvatarOutput store={store} />);
    const mockFn = jest.fn();

    let newAvatarBtn = wrapper.find('.btn-primary-small .right-padding .top-padding');
    expect(newAvatarBtn.length).toEqual(1)
  });

  it('New avatar button should NOT exist when there are NO tokens available', () => {
    initialState = {
      currentUser: {},
      userPath: {
          avatarName: 'Scooby Doo',
          avatarUrl: 'http://fakeimageurl.com',
          avatarTokens: 0
        }
    };
    store = mockStore(initialState);
    wrapper = mount(<AvatarOutput store={store} />);
    const mockFn = jest.fn();

    let newAvatarBtn = wrapper.find('.btn-primary-small .right-padding .top-padding');
    expect(newAvatarBtn.length).toEqual(0)
  });

});
