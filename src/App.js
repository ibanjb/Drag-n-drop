import React, { Component } from 'react';
import logo from './assets/images/logo.png';
import './App.css';
import UserService from './UserService';
import Drag from './Drag';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {
        applied: [],
        interviewed: [],
        hired: [],
      }
    };
    this.getUsers();
  }  

  getUsers() {
    this.service = new UserService();
    this.service.getUsers()
      .then((data) => {        
        this.setState({
          isLoading: false,
          items: {
            applied: data.results,
            interviewed: data.results,
            hired: data.results,
          }          
        });
        console.log(data);
      })
      .catch((error) => {        
        alert('Ops! Something was going wrong!');
        this.setState({          
          isLoading: false,
        })
      });    
  }

  render() {
    const isLoading = this.state.isLoading;    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">OpenOceanStudio: Crew Applications</h1>          
        </header>
        <div className="App-intro">
          {isLoading && <span>Loading...</span>}
          {!isLoading && ( this.renderItems() )}
        </div>        
      </div>
    );
  }


  renderItems() {
    const items = this.state.items;
    return (
      <div className="container">
        <div className="column">
          <h2>Applied</h2>
          <Drag items={items.applied}/>
        </div>
        <div className="column">
          <h2>interviewing</h2>
          <Drag items={items.interviewed}/>
        </div>  
        <div className="column">
          <h2>Hired</h2>
          <Drag items={items.hired}/>
        </div>
      </div>
    );
  }
}
