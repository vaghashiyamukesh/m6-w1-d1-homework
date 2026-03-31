import logo from './logo.svg';
import React, {Component} from 'react';
import Home from './Home';
import InventoryList from './InventoryList';
import InventoryEdit from './InventoryEdit';
import {BrowserRouter as Router, Route, Switch, Routes} from 'react-router-dom';  
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" exact={true} component={Home} />
          <Route path="/inventories" exact={true} component={InventoryList} />
          <Route path="/inventories/:id" component={InventoryEdit} />
        </Routes>
      </Router>
    );
  }
}

export default App;
