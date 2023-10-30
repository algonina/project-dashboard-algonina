import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { setAuthorization } from '../../vendor/helpers/api_helper';
import { useDispatch, useSelector } from 'react-redux';

import { useProfile } from '../../vendor/Components/Hooks/UserHooks';

import { logoutUser } from '../../vendor/store/actions';

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const { statusAuth } = useSelector(({ modulProfile }) => ({
    statusAuth: modulProfile.auth,
  }));
  /*
    redirect is un-auth access protected routes via url
    */

  if (!statusAuth) {
    // return <Redirect from='/' to={{ pathname: '/dashboard', state: { from: props.location } }} />;
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <Component {...props} />{' '}
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
