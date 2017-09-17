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
// import 'bootstrap-social';

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
            <div className='app-core'>
                <div className='app-wrapper'>
                    <div className='holygrail-header'>Header here</div>
                    <div className='holygrail-body'>
                        <div className='holygrail-content'>
                            <Route path="/" component={HomeIndex} />
                        </div>
                        
                        <div className='holygrail-left'>
                            <Route path="/" component={App} />
                        </div>
                        
                        <div className='holygrail-right'>
                            <Route path="/logout" component={UserLogout} />
                        </div>
                    </div>
                    <div className='holygrail-footer'>Footer here</div>
                </div>
            </div>
        </ConnectedRouter>
    </Provider>
    , document.querySelector('.react-root'));
                
                // <Route path="/snor" component={SnorIndex} />
                // <Route path="/register" component={UserRegister} />
                // <Route path="/reset" component={ResetPassword} />
                // <Route path="/profile" component={UserProfile} onEnter={requireAuth} />
                // <Route path="/login" component={UserLogin} />
                // <Route path="/tasks" component={TasksIndex} />