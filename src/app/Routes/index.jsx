import React, { Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

//Layouts
import NonAuthLayout from '../Layouts/NonAuthLayout';
import VerticalLayout from '../Layouts/index';
//routes
import { authProtectedRoutes, publicRoutes } from './allRoutes';
import { AuthProtected, AccessRoute } from './AuthProtected';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { actGetDataProfile } from '../modules/Profile';
import { Redirect } from 'react-router-dom';
import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';
import { Loading, ProviderLoading } from './ProviderLoading';
import Alt404 from '../pages/AuthenticationInner/Errors/Alt404';
import BasicLogout from '../pages/AuthenticationInner/Logout/BasicLogout';

const Index = () => {
  const availablePublicRoutesPaths = publicRoutes.map((r) => r.path);
  const availableAuthRoutesPath = authProtectedRoutes.map((r) => r.path);

  const dispatch = useDispatch();
  const { statusAuth, statuProcess } = useSelector(({ modulProfile }) => ({
    statusAuth: modulProfile.auth,
    statuProcess: modulProfile.status,
  }));

  const { statusLogout } = useSelector(({ modulLogout }) => ({
    statusLogout: modulLogout.status,
  }));

  const { statusLogin } = useSelector(({ modulAuth }) => ({
    statusLogin: modulAuth.status,
  }));

  useEffect(() => {
    if (statusLogin === 'success') {
      // window.location.reload();
    }
  }, [statusAuth]);

  useEffect(() => {
    if (statusLogout === 'success') {
      window.location.href = '/logout';
    }
  }, [statusLogout]);

  useEffect(() => {
    if (statuProcess === 'default') {
      dispatch(actGetDataProfile());
    }
  }, [statusAuth]);

  return (
    <React.Fragment>
      <Suspense fallback={<React.Fragment />}>
        <ProviderLoading>
          <Loading visible={statuProcess === 'loading'} />
          <ToastContainer />
          {statuProcess === 'success' ? (
            <Switch>
              {!statusAuth ? (
                <Route path={availablePublicRoutesPaths}>
                  <NonAuthLayout>
                    <Switch>
                      {publicRoutes.map((route, idx) => (
                        <Route
                          path={route.path}
                          component={route.component}
                          key={idx}
                          exact={true}
                        />
                      ))}
                      <Route path={'/logout'} component={BasicLogout} />
                      <Route from='*' component={Basic404} />
                    </Switch>
                  </NonAuthLayout>
                </Route>
              ) : (
                <>
                  <Route path={availableAuthRoutesPath}>
                    <AuthProtected>
                      <VerticalLayout>
                        <Switch>
                          {authProtectedRoutes.map((route, idx) => (
                            <AccessRoute
                              path={route.path}
                              component={route.component}
                              key={idx}
                              exact={true}
                            />
                          ))}
                          <Route path='*' exact={true} component={Alt404} />
                        </Switch>
                      </VerticalLayout>
                    </AuthProtected>
                  </Route>
                </>
              )}
            </Switch>
          ) : (
            <h1>asdaksjdas</h1>
          )}
        </ProviderLoading>
      </Suspense>
    </React.Fragment>
  );
};

export default Index;
