import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Insert } from './components/Insert';
import { Update } from './components/Update';

import { InsertBrand } from './components/Brand/InsertBrand';
import { UpdateBrand } from './components/Brand/UpdateBrand';
import { Brand } from './components/Brand/Brand';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/Brand' component={Brand} />
        <Route exact path='/Insert' component={Insert} />
        <Route exact path='/InsertBrand' component={InsertBrand} />
        <Route path='/Update/:productId' component={Update} />
        <Route path='/UpdateBrand/:brandId' component={UpdateBrand} />
      </Layout>
    );
  }
}
