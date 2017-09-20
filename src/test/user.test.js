import React from 'react';
import ReactDOM from 'react-dom';
import { spy } from 'sinon'
import {shallow, mount} from 'enzyme';
import UserLogin from '../app/components/user/login';
import "firebase/storage";
import configureStore from 'redux-mock-store';
import { loginUser, fetchUser, loginWithProvider } from '../app/actions/firebase_actions';

let middlewares;
let mockStore;
let initialState;
let store;


describe('User Actions', () => {
  let wrapper;

  beforeEach(() => {
    middlewares = [];
    mockStore = configureStore(middlewares);
  })


it('should verify wrapper works properly', () => {

  initialState = [];
  store = mockStore(initialState);

  wrapper = shallow(<UserLogin store={store} />);

  expect(wrapper).toBeDefined();
})



it('should sign in user on submit', () => {
  const mockfn = jest.fn();
  const callback = spy();

  initialState = {
    message: ''
  }
  store = mockStore(initialState);

  wrapper = mount(<UserLogin firebaseLoginUser={mockfn} onSubmit={callback} store={store}/>);

  const submitBtn = wrapper.find('.btn-primary').at(0);
  const form = wrapper.find('form').at(0);

  store.dispatch(loginUser({ email: 'ccc@ccc.com', password: 'asdfasdf' }))


  // console.log('HIHI:', store)
  // console.log('DDDD:', store.getState())



  // { email, password }

  // expect(form.props().onSubmit).toBeDefined();
  // expect(form.props().onSubmit).toEqual(callback);

  // submitBtn.simulate('submit');

  //
  // expect(callback).toHaveBeenCalled();
});





})