import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch,
  Link
} from 'react-router-dom';


import Map from '../map_proj/Map';
import BoilerTable from '../table/BoilerTable';
import SectionTable from '../table/SectionTable';
import PotrebitelTable from '../table/PotrebitelTable';
import CameraTable from '../table/CameraTable';


import BoilerConnect from '../Boiler/BoilerConnect';
import SectionConnect from '../section/SectionConnect';
import CameraConnect from '../ThermalCamera/CameraConnect';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';


import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';

import { Layout, notification } from 'antd';
import PotrebitelConnect from '../potrebitel/PotrebitelConnect';
const { Content } = Layout;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: true
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });
  }

  loadCurrentUser() {
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      }).catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo = "/", notificationType = "Успешно", description = "Вы успешно вышли из системы.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);

    notification[notificationType]({
      message: 'ГИС',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'ГИС',
      description: "Вы успешно вошли в систему.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />
    }

    return (
      <Layout className="site-layout">
        <AppHeader className="site-layout-background"
          style={{
            padding: 0,
          }} isAuthenticated={this.state.isAuthenticated}
          currentUser={this.state.currentUser}
          onLogout={this.handleLogout} />


        <Content className="app-content">
          <div className="container">
            <Switch>
              <Route path="/login"
                render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
              <Route path="/signup" component={Signup}></Route>
              <Route path="/map">
                <h5>Электронная карта</h5>
                <hr />
                <Map />
              </Route>
              <Route path="/table">
                <div className="row" data-masonry='{"percentPosition": true }'>
                  <div className="col-sm-6 col-lg-4 mb-4">
                    <div className="card text-center">
                      <Link to="/tableBoiler">Редактировать таблицу</Link>
                    </div>
                  </div>
                </div>
                <BoilerTable />
              </Route>
              <Route path="/tableSection">
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card text-center">
                    <Link to="/tableSectionOpen">Редактировать таблицу</Link>
                  </div>
                </div>
                <hr />
                <SectionTable />
              </Route>
              <Route path="/tablePotrebitel">
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card text-center">
                    <Link to="/tablePotrebitelRed">Редактировать таблицу</Link>
                  </div>
                </div>
                <hr />
                <PotrebitelTable />
              </Route>

              <Route path="/tableCamera">
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card text-center">
                    <Link to="/tableThermCamera">Редактировать таблицу</Link>
                  </div>
                </div>
                <hr />
                <CameraTable />
              </Route>
              <Route path="/tableBoiler">
                <BoilerConnect />
              </Route>
              <Route path="/tableSectionOpen">
                <SectionConnect />
              </Route>
              <Route path="/tablePotrebitelRed">
                <PotrebitelConnect />
              </Route>
              <Route path="/tableThermCamera">
                <CameraConnect />
              </Route>
              <Route path="/">
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card text-center">
                    <div className="card-body">
                      <Link to="/map">Электронная карта</Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card text-center">
                    <div className="card-body">
                      <Link to="/table">Таблица объектов ( ИСТОЧНИК ) теплосети</Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card text-center">
                    <div className="card-body">
                      <Link to="/tableSection">Таблица объектов ( УЧАСТОК ) теплосети</Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card text-center">
                    <div className="card-body">
                      <Link to="/tablePotrebitel">Таблица объектов ( ПОТРЕБИТЕЛЬ ) теплосети</Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card text-center">
                    <div className="card-body">
                      <Link to="/tableCamera">Таблица объектов ( УЗЕЛ ТК ) теплосети</Link>
                    </div>
                  </div>
                </div>
              </Route>
              <Route path="/users/:username"
                render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props} />}>
              </Route>
              <PrivateRoute authenticated={this.state.isAuthenticated} path="/" handleLogout={this.handleLogout}></PrivateRoute>
              <Route component={NotFound}></Route>

            </Switch>
          </div>
        </Content>
      </Layout >
    );
  }
}

export default withRouter(App);

