import React from 'react';
import { Route, IndexRoute, Router } from 'react-router';
import App from './components/app';

import HomeIndex from './components/index_home';
import UserLogin from './components/user/login';
import UserLogout from './components/user/logout';
import UserRegister from './components/user/register';
import UserProfile from './components/user/profile';
import ResetPassword from './components/user/reset_password';
import requireAuth from './utils/authenticated';

export default (
    <Router>
        <Route exact path="/" component={App} />
        <Route exact path="/" component={HomeIndex} />
        <Route path="/login" component={UserLogin} />
        <Route path="/logout" component={UserLogout} />
        <Route path="/register" component={UserRegister} />
        <Route path="/reset" component={ResetPassword} />
        <Route path="/profile" component={UserProfile} onEnter={requireAuth} />
    </Router>
    );

    // <IndexRoute component={HomeIndex} />
