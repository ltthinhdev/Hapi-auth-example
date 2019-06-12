import React from 'react';
import './css/Login.css';
import * as api from '../../utilities/api';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  submit = () => {
    api.postRequest('/login', {username: this.state.username, password: this.state.password}, api.getToken())
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button onClick={this.submit}>login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;