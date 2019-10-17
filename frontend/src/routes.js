import React from 'react';
import { Router, Switch } from 'react-router-dom';

import Route from '~/components/Route';
import Login from '~/pages/Login';
import CreateAccount from '~/pages/CreateAccount';
import Dashboard from '~/pages/Dashboard';
import BankStatement from '~/pages/BankStatement';
import Benefited from '~/pages/Benefited';
import history from '~/services/history';

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/bank-statement" component={BankStatement} isPrivate />
        <Route path="/benefited" component={Benefited} isPrivate />
      </Switch>
    </Router>
  );
}
