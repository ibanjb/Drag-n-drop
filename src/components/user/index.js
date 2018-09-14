import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

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
        <img src={user.picture.thumbnail} alt={user.name.last} />
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

User.propTypes  = {
  user: PropTypes.object.isRequired,
}

export default User;
