import React from 'react';
import styled from 'styled-components'
import Home from './containers/Home';
import logo from './assets/images/logo.png';
import './App.css';

const Application = styled.div`
  text-align: center;
`;

//
// starter class. 
// Avoid to use the estlint rule stateless on this class
//
class App extends React.PureComponent {     // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Application className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">OpenOceanStudio: Crew Applications</h1>
        </header> 
        <div className="content">
          <Home />
        </div>
      </Application>
    );
  }
}

export default App;
