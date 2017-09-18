import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import React, { Component } from 'react';
import configureStore from 'redux-mock-store';
import { setAvatarName, setAvatarUrl, setAvatarTokens, setPathLevel } from '../app/actions/index';


const middlewares = [];
const mockStore = configureStore(middlewares);

it('Test Action: setAvatarName', () => {
  const initialState = [];
  const store = mockStore(initialState);

  store.dispatch(setAvatarName('B3X-Ozwalt'));

  const actions = store.getActions();
  const expectedPayload = { type: 'SET_AVATAR_NAME', payload: 'B3X-Ozwalt' };
  expect(actions).toEqual([expectedPayload]);
})

it('Test Action: setAvatarUrl', () => {
  const initialState = [];
  const store = mockStore(initialState);

  store.dispatch(setAvatarUrl('http://fakeimageurl.com/image123.png'));

  const actions = store.getActions();
  const expectedPayload = { type: 'SET_AVATAR_URL', payload: 'http://fakeimageurl.com/image123.png' };
  expect(actions).toEqual([expectedPayload]);
})

it('Test Action: setAvatarTokens', () => {
  const initialState = [];
  const store = mockStore(initialState);

  store.dispatch(setAvatarTokens(3));

  const actions = store.getActions();
  const expectedPayload = { type: 'SET_AVATAR_TOKENS', payload: 3 };
  expect(actions).toEqual([expectedPayload]);
})

it('Test Action: setPathLevel', () => {
  const initialState = [];
  const store = mockStore(initialState);

  store.dispatch(setPathLevel('\level-1\\1b'));

  const actions = store.getActions();
  const expectedPayload = { type: 'SET_PATH_LEVEL', payload: '\level-1\\1b' };
  expect(actions).toEqual([expectedPayload]);
})


