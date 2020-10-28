import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './assets/css/vendor/bootstrap.min.css';
import './assets/css/vendor/bootstrap.rtl.only.min.css';

const App = React.lazy(() => import(/* webpackChunkName: "App" */ './App'));

ReactDOM.render(
  <Suspense fallback={<div className="loading" />}>
    <App />
  </Suspense>,
  document.getElementById('root')
);
