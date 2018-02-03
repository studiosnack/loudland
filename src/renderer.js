// @flow
import * as React from 'react';
import ReactDom from 'react-dom';

const {Fragment} = React;

const Root = () => (
  <Fragment>
    <h1>ohai</h1>
    <p>lol</p>
  </Fragment>
);

ReactDom.render(<Root />, document.getElementById('react-root'));
