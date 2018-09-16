import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

//
// User component. Information related with a single user
//
class User extends React.Component { 
  
  constructor(props) {
    super(props);    
    const { user } = this.props;
    this.state = {
      user: user,
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="userBox">
        <img className="img-circle" src={user.picture.thumbnail} alt={user.name.last} />
        <div className="userName">
          <div> 
            {' '}
            {user.name.first} 
            {' '}
            {user.name.last}
          </div>
          <div>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    );
  }
}

//
// user is an object with all the properties related to itself
//
User.propTypes  = {
  user: PropTypes.object.isRequired,
}

export default User;
