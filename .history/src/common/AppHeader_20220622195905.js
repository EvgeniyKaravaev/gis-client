import { Button } from 'antd';
import React, { Component } from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import './AppHeader.css';

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick({ key }) {
    if (key === "logout") {
      this.props.onLogout();
    }
  }

  render() {

    return (

      <div className='container'>
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <a className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
            <Link to="/">ГИС Теплосети</Link>
          </a>
          <a><label>Здравствуйте, Евгений</label></a>
          <div className="col-md-3 text-end">
            {/* <Link to="/login"><button type="button" className="btn btn-outline-primary me-2">Войти</button></Link>
            <Link to="/signup"><button type="button" className="btn btn-primary">Регистрация</button></Link> */}
            <Button>Выйти из системы</Button>
          </div>
        </header>

        <div className="row" data-masonry='{"percentPosition": true }'>
          <div className="col-sm-2 col-lg-2 mb-2">
            <Link to="/table">Источник теплосети</Link>
          </div>
          <div className="col-sm-2 col-lg-2 mb-2">
            <Link to="/tableSection">Участок теплосети</Link>
          </div>
          <div className="col-sm-2 col-lg-2 mb-2">
            <Link to="/tablePotrebitel">Потребитель теплосети</Link>
          </div>
          <div className="col-sm-6 col-lg-2 mb-2">
            <Link to="/tableCamera">Узел ТК теплосети</Link>
          </div>
          <div className="col-sm-6 col-lg-2 mb-2">
            <Link to="/map">Электронная карта</Link>
          </div>
        </div>
      </div>

    );
  }
}

export default withRouter(AppHeader);