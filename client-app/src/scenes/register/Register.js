import React from 'react';
// import './css/Register.css';
import * as api from '../../utilities/api';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      error: ''
    };
  }

  submit = () => {
    let { history } = this.props;
    api.postRequestNonAuth('/api/createUsers', {email: this.state.email, username: this.state.username, password: this.state.password})
    .then((res) => {
      history.push('/login');
    })
    .catch((error) => {
      if(error) {
        this.setState({error: error.message});
      }
    })
  }

  changeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
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

  login = () => {
    let { history } = this.props;
    history.push('/login');
  }

  render() {
    return (
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input type="email" onChange={this.changeEmail} placeholder="Email" />
            <input type="text" onChange={this.changeUsername} placeholder="Username" />
            <input type="password" onChange={this.changePassword} placeholder="Password" />
            { this.state.error ? <p className="error">{this.state.error}</p> : null }
            <button onClick={this.submit}>Register</button>
            <p class="message">Go back to<a href="#" onClick={this.login}> Login</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;