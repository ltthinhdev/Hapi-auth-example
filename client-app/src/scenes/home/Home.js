import React from 'react';
import './css/Home.css';
import * as api from '../../utilities/api';

class Home extends React.Component {

  componentDidMount () {
    this.checkAuth();
  }

  checkAuth = () => {
    let { history } = this.props;
    api.getRequest('/api/users', {}, api.getToken())
      .then((res) => {
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
        history.push('/login');
      })
      .catch((error) => {
        history.push('/login');
      })
  }

  render() {
    return (
      <div className="wrap">
        <div className="funny-img"></div>
        <div onClick={this.logout} className="logout">
          <div className="button"></div>
        </div>
      </div>
    );
  }
}

export default Home;