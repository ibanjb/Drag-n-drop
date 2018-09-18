// @flow
import React from 'react';
import Drag from '../Drag';
import UserService from '../../utils/UserService';
import './Home.css';

type Props = {};
type State = {
  isLoading: boolean,  
  items:  Object,
};

//
// Main container. On this PoC we will have only one main page, called Home
//
class Home extends React.PureComponent<Props, State> {

  state = {
    isLoading: true,
    items: {},
  };

  constructor() {
    super();
    this.getUsers();
  }

  //
  // retrieve users from the API service
  //
  getUsers() {
    const service = new UserService();
    service.getUsers()
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
        //
        // If there is an error related to the API call, here we will define how to proceed.
        // We can show an error to the user, generate a log in our system,...
        //
        console.log('error', error);        

        //
        // On this case, we will create an empty items object
        //
        this.setState({
          isLoading: false,
          items: {
            applied: [],
            interviewed: [],
            hired: [],
          },
        });        
      });
  }

  //
  // Shows a loading spinner meanwhile data is loading (from getUser method)
  //
  renderLoading() {
    return (
      <span>
        <p>Loading</p>
        <i className="fa fa-spinner fa-spin" />
      </span>
    );
  }

  //
  // Show the Drag component with the data retrieved 
  //
  renderItems() {
    const { items } = this.state;
    return (
      <div>
        <Drag items={items} />
      </div>
    );
  }

  //
  // If is loading, shows renderLoading result, otherwise shows renderItems
  //
  render() {
    const { isLoading } = this.state;
    return (
      <div className="Home">
        {isLoading && (this.renderLoading())}          
        {!isLoading && (this.renderItems())}
      </div>
    );
  }
}

export default Home;
