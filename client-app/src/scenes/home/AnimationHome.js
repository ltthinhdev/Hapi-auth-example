import React from 'react';
import './css/AnimationHome.css';
import Animation from './utils/Animation';
import * as api from '../../utilities/api';

class AnimationHome extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      username: sessionStorage.getItem('username')
    }
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = () => {
    let { history } = this.props;
    api.getRequest('/api/users', {}, api.getToken())
      .then((res) => {
        Animation.setup();
        Animation.draw();
      })
      .catch((error) => {
        console.log(error);
        history.push('/login');
      })
  }

  logout = () => {
    let { history } = this.props;
    api.getRequest('/api/users/logout', {}, api.getToken())
      .then((res) => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        history.push('/login');
      })
      .catch((error) => {
        history.push('/login');
      })
  }

  render() {
    return (
      <div className="home_animation">
        <canvas id="canvas"></canvas>
        <h2>Move the mouse!</h2>
        <div className="logoutContain">{this.state.username} | <span className="logoutBtn" onClick={this.logout}>Logout</span></div>
      </div>
    )
  }
}

export default AnimationHome;