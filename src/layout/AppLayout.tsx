import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

class AppLayout extends Component<RouteComponentProps<any>> {
  render() {
    return (
      <div id="app-container">
        <main>
          <div className="container-fluid">{this.props.children}</div>
        </main>
      </div>
    );
  }
}

export default withRouter(AppLayout);
