import React, { Component } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

class Main extends Component<RouteComponentProps<any>> {
  render() {
    return <Redirect to="/app" />;
  }
}
export default Main;
