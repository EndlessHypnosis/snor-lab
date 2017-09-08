import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {createBrowserHistory} from 'history';
// OR
// import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import thunk from 'redux-thunk';

// import { Router } from 'react-router-dom';


// from boiler - do i need?
// import ReduxPromise from 'redux-promise';

import rootReducers from './reducers';
import routes from './routes';

// will remove bootstrap
import 'bootstrap-social';

// for bundling your styles
import './bundle.scss';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
window.appStore = store;    //In case you want to see what's inside
                            // by executing appStore.getState() in console;


// from boiler - replaced with const store below
// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const browserHistory = createBrowserHistory();
// OR
// const history = createHistory();

const store = createStore(
    rootReducers,
    devTools,
    applyMiddleware(thunk)
)



ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={ browserHistory } routes={ routes } />
    </Provider>
  , document.querySelector('.react-root'));
