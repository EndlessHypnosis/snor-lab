import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
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
import ReduxPromise from 'redux-promise';
import rootReducers from './reducers';
import './bundle.scss';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const browserHistory = createBrowserHistory();

const store = createStore(
    rootReducers,
    devTools,
    applyMiddleware(ReduxPromise)
)
window.appStore = store;    // In case you want to see what's inside
                            // by executing appStore.getState() in console;

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={browserHistory}>
            <div className='app-core'>
                <div className='app-wrapper'>
                    <div className='holygrail-header'>
                        <h1>snorLab</h1>
                    </div>
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
                    <div className='holygrail-footer'><span className='footer-span ubuntu-dark-small'><i className="icon ion-ios-analytics"></i> snorLab built by Nick Svetnicka for Turing</span></div>
                </div>
            </div>
        </ConnectedRouter>
    </Provider>
    , document.querySelector('.react-root'));
                