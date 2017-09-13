import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
// OR
// import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import thunk from 'redux-thunk';

// import { Router } from 'react-router-dom';

import App from './components/app';
import HomeIndex from './components/home_index';

import TasksIndex from './components/tasks/tasks_index';
import SnorIndex from './components/snor/snor_index';

import UserLogin from './components/user/login';
import UserLogout from './components/user/logout';
import UserRegister from './components/user/register';
import UserProfile from './components/user/profile';
import ResetPassword from './components/user/reset_password';
import requireAuth from './utils/authenticated';

// from boiler - do i need?
import ReduxPromise from 'redux-promise';

import rootReducers from './reducers';
// import routes from './routes';

// will remove bootstrap
import 'bootstrap-social';

// for bundling your styles
import './bundle.scss';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const browserHistory = createBrowserHistory();
// OR
// const history = createHistory();


// from boiler - replaced with const store below
// const store = applyMiddleware(ReduxPromise)(createStore);


// from movie tracker
// const middleware = routerMiddleware(browserHistory)
// const store = createStore(rootReducers, devTools, applyMiddleware(middleware));

// thunk approach?
const store = createStore(
    rootReducers,
    devTools,
    applyMiddleware(ReduxPromise) // from thunk to ReduxPromise
)

window.appStore = store;    //In case you want to see what's inside
// by executing appStore.getState() in console;


// ifyou use a <Switch> wrapper </Switch> only the first child that
// matches the path.

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={browserHistory}>
            <div>
                <Route path="/" component={App} />
                <Route exact path="/" component={HomeIndex} />
                <Route path="/snor" component={SnorIndex} />
                <Route path="/tasks" component={TasksIndex} />
                <Route path="/login" component={UserLogin} />
                <Route path="/logout" component={UserLogout} />
                <Route path="/register" component={UserRegister} />
                <Route path="/reset" component={ResetPassword} />
                <Route path="/profile" component={UserProfile} onEnter={requireAuth} />
            </div>
        </ConnectedRouter>
    </Provider>
    , document.querySelector('.react-root'));
