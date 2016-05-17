import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddCity from './components/AddCity';
import CityList from './components/CityList';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/add' component={AddCity} />
    <Route path=':category' component={CityList}>
    <Route path=':name' component={CityList}>
    <Route path=':crimeLevel' component={CityList}/>
    </Route>
    </Route>
  </Route>
);
