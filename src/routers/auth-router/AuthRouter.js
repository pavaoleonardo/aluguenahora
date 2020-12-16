import React from 'react';

// Router
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginScreen from '../../components/auth/login/LoginScreen';
import RegisterScreen from '../../components/auth/register/RegisterScreen';

const AuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/auth/login' component={LoginScreen} />
        <Route exact path='/auth/register' component={RegisterScreen} />
        <Redirect to='/auth/login' />
      </Switch>
    </div>
  );
};

export default AuthRouter;
