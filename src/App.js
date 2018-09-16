import React, { Component } from 'react';
import Home from './containers/Home';
import logo from './assets/images/logo.png';
import './App.css';

//
// starter class
//
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'OpenOceanStudio: Crew Applications',
    }
  }

  //
  // render app
  //
  render() {
    const { title } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{title}</h1>
        </header> 
        <div className="content">
          <Home />
        </div>
      </div>
    );
  }
}
