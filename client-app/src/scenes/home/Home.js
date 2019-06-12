import React from 'react';
import './css/Home.css';
import * as api from '../../utilities/api';

class Home extends React.Component {

  componentDidMount () {
    this.checkAuth();
  }

  checkAuth = () => {
    let { history } = this.props;
    api.getRequest('/home', {}, api.getToken())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        history.push('/login');
      })
  }

  render() {
    return (
      <div className="wrap">
        <div className="funny-img"></div>
        <div className="logout">
          <div className="button"></div>
        </div>
      </div>
    );
  }
}

export default Home;