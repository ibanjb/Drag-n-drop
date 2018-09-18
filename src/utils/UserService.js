//
// UserService. Has all the logic related to user. For this PoC, only the GET method is implemented
//
class UserService {
  constructor() {
    this.serviceUrl = 'https://randomuser.me/api/?nat=gb&results=10';
  }

  //
  // retrieve users from the URL specified in the property 'serviceUrl'
  //
  getUsers() {
    const myPromise = new Promise((resolve, reject) => {
      fetch(this.serviceUrl, { method: 'GET' })
        .then(resp => resp.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return myPromise;
  }
}

export default UserService;
