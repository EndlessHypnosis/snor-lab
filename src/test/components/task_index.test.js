import React from 'react';
import ReactDOM from 'react-dom';
import TaskIndex from '../../app/components/tasks/tasks_index';
import configureStore from 'redux-mock-store';
import storeUserMock from '../_mock/store_user_mock';
import { MemoryRouter as Router, withRouter } from 'react-router-dom'
import createRouterContext from 'react-router-test-context'

import { shallow, mount } from 'enzyme';

let middlewares;
let mockStore;
let initialState;
let store;

describe('Task Index', () => {
  let wrapper;

  beforeEach(() => {
    middlewares = [];
    mockStore = configureStore(middlewares);
  })

  it('Task Index mounts correctly', () => {
    initialState = {
      currentUser: storeUserMock
    };
    store = mockStore(initialState.currentUser);

    wrapper = mount(<Router><TaskIndex store={store} /></Router>);
    expect(wrapper).toBeDefined;
  });


  it('Renders correct elements with logged in user', () => {
    initialState = {
      currentUser: storeUserMock
    };
    store = mockStore(initialState.currentUser);
    
    wrapper = mount(<Router>
      <TaskIndex currentUser={storeUserMock.currentUser} store={store} />
    </Router>);
    expect(wrapper.find('.my-h2').length).toEqual(1);

  });

  it('state should change when task title receives input', () => {
    initialState = {
      currentUser: storeUserMock
    };
    store = mockStore(initialState.currentUser);

    wrapper = mount(<Router>
      <TaskIndex currentUser={storeUserMock.currentUser} store={store} />
    </Router>);
    expect(wrapper.find('.input-primary').length).toEqual(1);

    const taskInput = wrapper.find('.input-primary').first();
    const tempState = {
      taskTitle: '',
      newTaskTitle: null
    };

    taskInput.simulate('change', { target: { value: 'go to the grocery store' } });
    expect(wrapper.state()).toEqual(tempState.newTaskTitle);
  });


  it.skip('testing new router wrapper', () => {
    initialState = {
      currentUser: storeUserMock
    };
    store = mockStore(initialState.currentUser);
    const context = createRouterContext()
    wrapper = shallow(<TaskIndex currentUser={storeUserMock.currentUser} store={store} />, {context})
    const taskInput = wrapper.find('.input-primary').first();
    expect(taskInput).toBeDefined();
  });

});
