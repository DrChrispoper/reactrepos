import React, { Component, Suspense } from 'react';
import {
  Route,
  withRouter,
  Switch,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';

import AppLayout from '../../layout/AppLayout';

const ReposTable = React.lazy(
  () => import(/* webpackChunkName: "viwes-gogo" */ './repostable')
);

class App extends Component<RouteComponentProps<any>> {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/repos`}
              />
              <Route
                path={`${match.url}/repos`}
                render={props => <ReposTable {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}

export default withRouter(App);
