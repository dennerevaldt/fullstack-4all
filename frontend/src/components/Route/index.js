import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '../../pages/_layouts/auth';
import DefaultLayout from '../../pages/_layouts/default';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { logged } = store.getState().session;

  if (!logged && isPrivate) {
    return <Redirect to="/" />;
  }

  if (logged && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = logged ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.any,
  ]).isRequired,
  isPrivate: PropTypes.bool,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
