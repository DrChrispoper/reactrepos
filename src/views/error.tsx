import React, { Component, Fragment } from 'react';
import { Row, Card, CardTitle, Button } from 'reactstrap';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Colxx } from '../components/common/CustomBootstrap';

class Error extends Component<RouteComponentProps<any>> {
  componentDidMount() {
    document.body.classList.add('background');
  }
  componentWillUnmount() {
    document.body.classList.remove('background');
  }
  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="text-white h2">YOU ARE LOST</p>
                  </div>
                  <div className="form-side">
                    <NavLink to={`/`} className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">Error 404</CardTitle>
                    <p className="mb-0 text-muted text-small mb-0">
                      Error code
                    </p>
                    <p className="display-1 font-weight-bold mb-5">404</p>
                    <Button
                      href="/app"
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                    >
                      Go Home
                    </Button>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
    );
  }
}
export default Error;
