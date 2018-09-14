export default class UserService {
  constructor() {
    this.serviceUrl = 'https://randomuser.me/api/?nat=gb&results=10';
  }

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
