// @flow
import React from 'react';
import './User.css';

type Props = {
  user: Object
};

//
// User component. Information related with a single user
//
class User extends React.PureComponent<Props> { 
  
  render() {
    const { user } = this.props;    
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

export default User;
