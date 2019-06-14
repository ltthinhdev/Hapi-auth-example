import React from 'react';
// import './css/Login.css';
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
    let { history } = this.props;
    api.postRequestNonAuth('/api/users/authenticate', {username: this.state.username, password: this.state.password})
    .then((res) => {
      api.setToken(res.data.id_token);
      sessionStorage.setItem('username', res.data.username);
      history.push('/');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  changeUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  changePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  register = () => {
    let { history } = this.props;
    history.push('/register');
  }

  render() {
    return (
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input type="text" onChange={this.changeUsername} placeholder="username" />
            <input type="password" onChange={this.changePassword} placeholder="password" />
            <button onClick={this.submit}>login</button>
            <p className="message">Not registered? <a href="#" onClick={this.register}>Create an account</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;