import React, { Component } from 'react';
import UserService from '../../data/UserService';
import Drag from '../Drag';
import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      items: null,
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
            interviewed: [],
            hired: [],
          },
        });
      })
      .catch((error) => {
        console.log('error', error);
        this.setState({
          isLoading: false,
        });
      });
  }

  renderItems() {
    const { items } = this.state;
    return (
      <div>
        <Drag items={items} />
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="App">
        {isLoading && <span>Loading...</span>}
        {!isLoading && (this.renderItems())}
      </div>
    );
  }
}
